import OGIObserver from '../services/observer.js';

const observer = new OGIObserver();

// Observe tab change
observer(document.querySelector('#messagecontainercomponent'), (elements) => {
  elements.forEach((element) => {
    // We want only if nodes has been added
    if (element.addedNodes.length === 0) return;

    if (!element.target.classList.contains('messagesHolder')) return;

    console.log(element);
  });
});

export default {};
