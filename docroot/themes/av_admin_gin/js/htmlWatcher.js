class HTMLWatcher {
  constructor() {
    this.addClasses();
    this.observeChanges();
  }

  addClasses() {
    this.applyClass(document.querySelectorAll('.ck-editor'), 'cssf');
    this.applyClass(document.querySelectorAll('.js-lpb-component-list .text-formatted'), 'cssf');
    this.applyClass(document.querySelectorAll('.js-lpb-component.lpb-layout .js-lpb-region .lpb-controls + *'), 'cssf');
  }

  applyClass(elements, className) {
    elements.forEach(element => {
      if (!element.classList.contains(className)) {
        element.classList.add(className);
      }
    });
  }

  observeChanges() {
    const observer = new MutationObserver(mutationsList => {
      mutationsList.forEach(mutation => {
        if (mutation.type === 'childList') {
          const addedNodes = Array.from(mutation.addedNodes);
          addedNodes.forEach(node => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              this.addClasses(node.querySelectorAll('.ck-editor'), 'cssf');
              this.addClasses(node.querySelectorAll('.js-lpb-component-list .text-formatted'), 'cssf');
              this.addClasses(node.querySelectorAll('.js-lpb-component.lpb-layout .js-lpb-region .lpb-controls + *'), 'cssf');
            }
          });
        }
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const htmlWatcher = new HTMLWatcher();
});
