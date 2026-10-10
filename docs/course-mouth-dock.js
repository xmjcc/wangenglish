// Keep the reserved mouth region useful before playback and after clearing it.
(() => {
  const panel = document.getElementById('mouth');
  const slow = document.getElementById('mSlow');
  function renderState() {
    const active = panel.classList.contains('show');
    slow.disabled = !active;
    if (active) return;
    document.getElementById('mWord').textContent = '\u2014';
    document.getElementById('mPhs').replaceChildren();
    document.getElementById('mFront').innerHTML = frontSVG({ jaw: .12, wide: .62, round: 0, closed: 0, lipteeth: 0, tongue: 0, tip: 0 });
    document.getElementById('mSide').innerHTML = FR.AH || '';
  }
  const clear = document.getElementById('mClose');
  clear.title = '\u6e05\u9664\u53e3\u578b';
  clear.setAttribute('aria-label', clear.title);
  new MutationObserver(renderState).observe(panel, { attributes: true, attributeFilter: ['class'] });
  document.getElementById('optMouth').addEventListener('change', event => {
    if (!event.target.checked) clear.click();
  });
  renderState();
})();
