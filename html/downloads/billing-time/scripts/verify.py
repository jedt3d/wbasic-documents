"""Check/build/execute BillingTime and verify real SQLite results. Standard library only."""
import argparse
from contextlib import closing
import hashlib
import json
import os
from pathlib import Path
import sqlite3
import struct
import subprocess
import tempfile

parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('--wb', default=os.environ.get('WB_CLI', 'wb'))
options = parser.parse_args()
project = Path(__file__).resolve().parents[1]
manifest = project / 'billing-time.wproj'
observations = []

def run(args, *, cwd=project, expected_status=0):
    result = subprocess.run([str(a) for a in args], cwd=cwd, capture_output=True,
                            text=True, timeout=60)
    assert result.returncode == expected_status, result.stdout + result.stderr
    return result

capabilities = json.loads(run([options.wb, '--capabilities']).stdout)
target = capabilities['target']
assert target in ['aarch64-pc-windows-msvc', 'aarch64-apple-darwin', 'aarch64-unknown-linux-gnu']
assert json.loads(run([options.wb, 'check', manifest, '--json']).stdout)['accepted']
expected = ['schema: ready', 'project: Website refresh for Acme Studio',
            'time logged: 210 minutes', 'invoice: #1 (2 lines)',
            'invoice total: 18000 cents', 'billed entries: 2']

with tempfile.TemporaryDirectory(prefix='billing-time-verify-') as scratch_name:
    scratch = Path(scratch_name)
    for profile in ['debug', 'release']:
        run([options.wb, 'build', manifest, '--profile', profile])
        binary = project / 'build' / target / profile / ('BillingTime.exe' if os.name == 'nt' else 'BillingTime')
        image = binary.read_bytes()
        if target == 'aarch64-pc-windows-msvc':
            pe = struct.unpack_from('<I', image, 0x3c)[0]
            assert struct.unpack_from('<H', image, pe + 4)[0] == 0xaa64
        elif target == 'aarch64-apple-darwin':
            assert struct.unpack_from('<II', image, 0) == (0xfeedfacf, 0x0100000c)
        else:
            assert image[:4] == b'\x7fELF' and image[5] == 1
            assert struct.unpack_from('<H', image, 18)[0] == 183
        database = scratch / (profile + '-ไทย.sqlite')
        assert not database.exists()
        first = run([binary, database])
        assert first.stdout.splitlines() == expected
        with closing(sqlite3.connect(database)) as connection:
            assert connection.execute('SELECT COUNT(*), SUM(AmountCents) FROM invoice_lines').fetchone() == (2, 18000)
            assert connection.execute('SELECT Minutes, RateCentsPerHour FROM time_entries ORDER BY Id').fetchall() == [(120, 6000), (90, 4000)]
            assert connection.execute('SELECT COUNT(*) FROM time_entries WHERE InvoiceId IS NOT NULL').fetchone() == (2,)
        second = run([binary, database])
        assert second.stdout.splitlines() == [s.replace('invoice: #1', 'invoice: #2') for s in expected]
        with closing(sqlite3.connect(database)) as connection:
            assert connection.execute('SELECT COUNT(*), SUM(AmountCents) FROM invoice_lines').fetchone() == (4, 36000)
        untouched = scratch / (profile + '-must-not-exist.sqlite')
        run([binary, untouched, 'extra'], expected_status=1)
        assert not untouched.exists()
        empty = run([binary, ''], expected_status=1)
        assert 'database path must not be empty' in empty.stderr
        observations.append({'profile': profile, 'target': target,
                             'imageSha256': hashlib.sha256(image).hexdigest(),
                             'freshInvoiceCents': 18000, 'repeatInvoice': 2,
                             'invalidArgumentsBeforeDatabase': True})
    # This is the actual generic VS Code Run Project argument pattern.
    generic = run([options.wb, 'run', manifest, '--profile', 'debug'], cwd=scratch)
    assert generic.stdout.splitlines() == expected
    assert (scratch / 'billing-time-demo.sqlite').exists()
    explicit = run([options.wb, 'run', manifest, '--profile', 'debug', '--', scratch / 'explicit.sqlite'])
    assert explicit.stdout.splitlines() == expected

print(json.dumps({'status': 'Passed', 'compiler': run([options.wb, '--version']).stdout.strip(),
                  'profiles': observations, 'genericRunWithoutArguments': 'Passed',
                  'explicitDatabaseArgument': 'Passed'}, indent=2))
