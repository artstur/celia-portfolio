(() => {
  const viewer = document.getElementById('workbench-image-viewer');
  if (typeof viewer?.showModal !== 'function') return;

  const image = viewer.querySelector('img');
  let openedFrom;
  for (const frame of document.querySelectorAll('.workbench-frame')) {
    frame.addEventListener('click', (event) => {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      openedFrom = frame;
      frame.focus({ preventScroll: true });
      image.alt = frame.querySelector('img').alt;
      image.src = frame.href;
      viewer.showModal();
    });
  }
  viewer.addEventListener('click', (event) => {
    if (event.target === viewer) viewer.close();
  });
  viewer.addEventListener('close', () => {
    openedFrom?.focus({ preventScroll: true });
  });
})();
