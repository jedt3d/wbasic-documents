(() => {
  const root = document.documentElement;
  const body = document.body;
  const themeButton = document.querySelector('[data-theme-toggle]');
  const languageSwitcher = document.querySelector('[data-language-switcher]');
  const dialog = document.querySelector('[data-search-dialog]');
  const searchInput = document.querySelector('[data-search-input]');
  const searchResults = document.querySelector('[data-search-results]');
  const emptyTemplate = document.querySelector('[data-search-empty]');
  let searchIndex;

  function syncThemeControl() {
    themeButton?.setAttribute('aria-pressed', String(root.dataset.theme === 'dark'));
  }

  syncThemeControl();

  themeButton?.addEventListener('click', () => {
    const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
    root.dataset.theme = next;
    localStorage.setItem('wbasic-theme', next);
    syncThemeControl();
  });

  languageSwitcher?.addEventListener('change', (event) => {
    window.location.assign(event.target.value);
  });

  function setNavigation(open) {
    body.classList.toggle('nav-open', open);
    document.querySelector('[data-nav-open]')?.setAttribute('aria-expanded', String(open));
  }
  document.querySelector('[data-nav-open]')?.addEventListener('click', () => setNavigation(true));
  document.querySelectorAll('[data-nav-close]').forEach((control) => control.addEventListener('click', () => setNavigation(false)));

  async function loadSearch() {
    if (!searchIndex) {
      const response = await fetch(body.dataset.searchIndex, { credentials: 'same-origin' });
      if (!response.ok) throw new Error(`Search index request failed: ${response.status}`);
      searchIndex = await response.json();
    }
    return searchIndex;
  }

  function resultNode(item) {
    const link = document.createElement('a');
    link.className = 'search-result';
    link.href = item.url;
    const book = document.createElement('small');
    book.textContent = item.book;
    const title = document.createElement('strong');
    title.textContent = item.title;
    const summary = document.createElement('span');
    summary.textContent = item.summary;
    link.append(book, title, summary);
    return link;
  }

  function renderSearch(items) {
    searchResults.replaceChildren();
    if (!items.length) {
      searchResults.append(emptyTemplate.content.cloneNode(true));
      return;
    }
    const fragment = document.createDocumentFragment();
    for (const item of items.slice(0, 12)) fragment.append(resultNode(item));
    searchResults.append(fragment);
  }

  function matches(query, item) {
    const title = item.title.toLocaleLowerCase();
    const book = item.book.toLocaleLowerCase();
    const summary = item.summary.toLocaleLowerCase();
    const score = (title.includes(query) ? 4 : 0) + (book.includes(query) ? 2 : 0) + (summary.includes(query) ? 1 : 0);
    return { item, score };
  }

  searchInput?.addEventListener('input', async () => {
    const query = searchInput.value.trim().toLocaleLowerCase();
    if (!query) { searchResults.replaceChildren(); return; }
    try {
      const items = await loadSearch();
      const found = items.map((item) => matches(query, item)).filter(({ score }) => score).sort((a, b) => b.score - a.score).map(({ item }) => item);
      renderSearch(found);
    } catch {
      renderSearch([]);
    }
  });

  async function openSearch() {
    dialog.showModal();
    searchInput.focus();
    try { await loadSearch(); } catch { /* The empty state remains usable offline. */ }
  }
  document.querySelectorAll('[data-search-open]').forEach((button) => button.addEventListener('click', openSearch));
  dialog?.addEventListener('click', (event) => { if (event.target === dialog) dialog.close(); });
  document.addEventListener('keydown', (event) => {
    if ((event.ctrlKey || event.metaKey) && event.key.toLocaleLowerCase() === 'k') {
      event.preventDefault();
      openSearch();
    }
  });

  const tocLinks = [...document.querySelectorAll('.page-navigation a[href^="#"]')];
  const headings = tocLinks.map((link) => document.getElementById(decodeURIComponent(link.hash.slice(1)))).filter(Boolean);
  if (headings.length && 'IntersectionObserver' in window) {
    const linksById = new Map(tocLinks.map((link) => [decodeURIComponent(link.hash.slice(1)), link]));
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        tocLinks.forEach((link) => link.classList.remove('is-visible'));
        linksById.get(entry.target.id)?.classList.add('is-visible');
      }
    }, { rootMargin: '-18% 0px -72% 0px' });
    headings.forEach((heading) => observer.observe(heading));
  }

  const keywords = new Set([
    'And', 'As', 'Boolean', 'ByRef', 'ByVal', 'Case', 'Catch', 'CompileIf',
    'Const', 'Continue', 'Div', 'Do', 'Each', 'Else', 'ElseIf', 'End',
    'EndIf', 'EndProcedure', 'EndSelect', 'EndStructure', 'EndTry', 'Enum',
    'Exit', 'False', 'Finally', 'Flags', 'For', 'From', 'If', 'Import',
    'In', 'Internal', 'Let', 'Loop', 'Map', 'Mod', 'Module', 'New', 'Next',
    'Not', 'Null', 'Of', 'Or', 'Private', 'Procedure', 'Public', 'Return',
    'Select', 'Step', 'Structure', 'Then', 'Throw', 'To', 'True', 'Try',
    'Using', 'When', 'While', 'With', 'Xor'
  ]);
  const types = new Set(['Array', 'Byte', 'Float', 'Integer', 'String']);
  const identifierStart = /[\p{ID_Start}_]/u;
  const identifierContinue = /[\p{ID_Continue}_]/u;
  const decimalDigit = /\p{Decimal_Number}/u;

  function token(className, value) {
    const span = document.createElement('span');
    span.className = className;
    span.textContent = value;
    return span;
  }

  function highlightWBasic(code) {
    const source = code.textContent;
    const fragment = document.createDocumentFragment();
    let index = 0;
    const appendText = (value) => fragment.append(document.createTextNode(value));

    while (index < source.length) {
      const current = source[index];

      if (/\s/u.test(current)) {
        const start = index++;
        while (index < source.length && /\s/u.test(source[index])) index++;
        appendText(source.slice(start, index));
        continue;
      }

      if (current === "'") {
        const start = index++;
        while (index < source.length && source[index] !== '\n') index++;
        fragment.append(token('tok-comment', source.slice(start, index)));
        continue;
      }

      if (source.startsWith('///', index)) {
        const start = index;
        index += 3;
        while (index < source.length && source[index] !== '\n') index++;
        fragment.append(token('tok-comment', source.slice(start, index)));
        continue;
      }

      const hasStringPrefix = (current === '$' || current === 'r') && source[index + 1] === '"';
      if (current === '"' || hasStringPrefix) {
        const start = index;
        const raw = current === 'r';
        index += hasStringPrefix ? 2 : 1;
        while (index < source.length) {
          if (!raw && source[index] === '\\') { index += Math.min(2, source.length - index); continue; }
          if (source[index] === '"') {
            if (raw && source[index + 1] === '"') { index += 2; continue; }
            index++;
            break;
          }
          index++;
        }
        fragment.append(token('tok-string', source.slice(start, index)));
        continue;
      }

      if (decimalDigit.test(current)) {
        const start = index++;
        if (current === '0' && /[xXbB]/u.test(source[index] || '')) {
          index++;
          while (index < source.length && /[0-9A-Fa-f_]/u.test(source[index])) index++;
        } else {
          while (index < source.length && (decimalDigit.test(source[index]) || source[index] === '_')) index++;
          if (source[index] === '.') {
            index++;
            while (index < source.length && (decimalDigit.test(source[index]) || source[index] === '_')) index++;
          }
          if (/[eE]/u.test(source[index] || '')) {
            index++;
            if (/[+-]/u.test(source[index] || '')) index++;
            while (index < source.length && (decimalDigit.test(source[index]) || source[index] === '_')) index++;
          }
        }
        fragment.append(token('tok-number', source.slice(start, index)));
        continue;
      }

      if (identifierStart.test(current)) {
        const start = index++;
        while (index < source.length && identifierContinue.test(source[index])) index++;
        const value = source.slice(start, index);
        const next = source.slice(index).match(/^\s*\(/u);
        const className = keywords.has(value) ? 'tok-keyword' : types.has(value) ? 'tok-type' : next ? 'tok-call' : '';
        if (className) fragment.append(token(className, value)); else appendText(value);
        continue;
      }

      if (/[+\-*/=<>&|?:.,()[\]{}]/u.test(current)) fragment.append(token('tok-operator', current));
      else appendText(current);
      index++;
    }

    code.replaceChildren(fragment);
    code.dataset.highlighted = 'true';
  }

  document.querySelectorAll('pre code.language-basic').forEach((code) => highlightWBasic(code));
})();
