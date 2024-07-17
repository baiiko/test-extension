const variables = {};
let scriptReady = false;
window.addEventListener('responseVariable', (e) => {
  variables[e.detail.variable] = e.detail.value;
});

window.addEventListener('scriptVariable', () => {
  scriptReady = true;
});

export default async (variable) => {
  if (!document.getElementById('variable-script')) {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.id = 'variable-script';
    script.src = chrome.runtime.getURL('./services/scripts/variable.js');
    (document.body || document.head || document.documentElement).appendChild(script);
  }

  while (!scriptReady) {
    // eslint-disable-next-line no-await-in-loop
    await new Promise((r) => { setTimeout(r, 5); });
  }

  const event = new CustomEvent('requestVariable', { detail: { variable } });
  window.dispatchEvent(event);

  while (typeof variables[variable] === 'undefined') {
    // eslint-disable-next-line no-await-in-loop
    await new Promise((r) => { setTimeout(r, 5); });
  }

  return variables[variable];
};
