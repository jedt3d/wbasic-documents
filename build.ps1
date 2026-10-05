[CmdletBinding()]
param(
    [string]$Hugo = 'hugo'
)

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'
$documentsRoot = $PSScriptRoot
$sourceRoot = Join-Path $documentsRoot 'src'
$outputRoot = Join-Path $documentsRoot 'html'
$requiredVersion = (Get-Content -LiteralPath (Join-Path $sourceRoot '.hugo-version') -Raw).Trim()

$versionOutput = & $Hugo version
if ($LASTEXITCODE -ne 0) { throw 'Unable to run Hugo.' }
if ($versionOutput -notmatch "hugo v$([regex]::Escape($requiredVersion))(?:\D|$)") {
    throw "Hugo $requiredVersion is required; observed: $versionOutput"
}

& $Hugo --source $sourceRoot --destination $outputRoot --cleanDestinationDir --gc --minify
if ($LASTEXITCODE -ne 0) { throw 'Hugo build failed.' }

& node (Join-Path $documentsRoot 'verify-site.mjs')
if ($LASTEXITCODE -ne 0) { throw 'Generated-site verification failed.' }

& node (Join-Path $documentsRoot 'verify-small-projects-site.mjs')
if ($LASTEXITCODE -ne 0) { throw 'Project-book verification failed.' }
& node (Join-Path $documentsRoot 'verify-english-edition.mjs')
if ($LASTEXITCODE -ne 0) { throw 'English-edition verification failed.' }
& node (Join-Path $documentsRoot 'verify-release.mjs')
if ($LASTEXITCODE -ne 0) { throw 'Release footer verification failed.' }
& node (Join-Path $documentsRoot 'verify-extension-guide.mjs')
if ($LASTEXITCODE -ne 0) { throw 'WBasic Extension guide verification failed.' }
& node (Join-Path $documentsRoot 'verify-project-drafts.mjs')
if ($LASTEXITCODE -ne 0) { throw 'Draft-project verification failed.' }

& node (Join-Path $documentsRoot 'verify-compiler-release.mjs')
if ($LASTEXITCODE -ne 0) { throw 'Compiler release alignment verification failed.' }

& node (Join-Path $documentsRoot 'verify-japanese-edition.mjs')
if ($LASTEXITCODE -ne 0) { throw 'Japanese-edition verification failed.' }
& node (Join-Path $documentsRoot 'verify-billing-snapshot.mjs')
if ($LASTEXITCODE -ne 0) { throw 'Billing snapshot verification failed.' }
