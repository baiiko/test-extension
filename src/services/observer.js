function OGIObserver() {
  const MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

  return (element, callback, options = {}) => {
    if (!element || element.nodeType !== 1) return;

    const observerOptions = {
      ...{ childList: true, subtree: true },
      ...options,
    };

    const observer = new MutationObserver(callback);

    observer.observe(element, observerOptions);

    // eslint-disable-next-line consistent-return
    return observer;
  };
}

export default OGIObserver;
