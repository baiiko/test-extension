window.addEventListener('requestVariable', (e) => {
  const value = window?.[e.detail.variable] || null;

  const event = new CustomEvent('responseVariable', { detail: { value, variable: e.detail.variable } });
  window.dispatchEvent(event);
});

const scriptEvent = new CustomEvent('scriptVariable');
window.dispatchEvent(scriptEvent);
