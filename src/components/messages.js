import OGIObserver from '../services/observer.js';

const observer = OGIObserver();

// Observe tab change
observer(document.querySelector('#messagecontainercomponent'), (elements) => {
  let target;
  elements.forEach((element) => {
    // We want only if nodes has been added
    if (element.addedNodes.length === 0) return;

    if (!element.target.classList.contains('messagesHolder')) return;

    target = element.target;
  });

  return target;
});

export default {};
