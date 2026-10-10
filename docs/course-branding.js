// Change presentation labels only; source paths, timings, and engine IDs stay intact.
(() => {
  const label = value => value
    .replace(/Jerry\s*English/gi, 'Wang English')
    .replace(/非\s*Jerry\s*原[声音]/gi, '非真人原声')
    .replace(/Jerry\s*原[声音]/gi, '真人原声')
    .replace(/Jerry/gi, '老师');
  function apply(root) {
    if (root.nodeType === Node.TEXT_NODE) {
      if (root.parentElement?.closest('script,style')) return;
      const next = label(root.nodeValue);
      if (next !== root.nodeValue) root.nodeValue = next;
      return;
    }
    if (root.nodeType !== Node.ELEMENT_NODE || root.matches('script,style')) return;
    for (const name of ['title', 'aria-label', 'alt', 'data-label']) {
      if (root.hasAttribute(name)) {
        const value = root.getAttribute(name), next = label(value);
        if (value !== next) root.setAttribute(name, next);
      }
    }
    for (const child of root.childNodes) apply(child);
  }
  document.title = label(document.title);
  apply(document.body);
  new MutationObserver(changes => {
    for (const change of changes) {
      if (change.type === 'characterData') apply(change.target);
      else for (const node of change.addedNodes) apply(node);
    }
  }).observe(document.body, { childList: true, subtree: true, characterData: true });
})();
