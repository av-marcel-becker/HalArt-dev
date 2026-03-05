class AvAccessibility extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: inline-block;
          position: relative;
        }

        .focus-arrow {
          position: absolute;
          left: var(--focus-arrow-left, 50%);
          transform: translateX(-50%) rotate(180deg);
          width: 0;
          height: 0;
          border-left: calc(var(--av-accessibility-focus-arrow-size, 10px) / 2) solid transparent;
          border-right: calc(var(--av-accessibility-focus-arrow-size, 10px) / 2) solid transparent;
          border-bottom: var(--av-accessibility-focus-arrow-size, 10px) solid var(--av-accessibility-focus-arrow-color, black);
          display: none;
          z-index: 9999;
          animation: bounce var(--av-accessibility-focus-arrow-transition-time, 1s) infinite alternate;
          transition-timing-function: var(--av-accessibility-focus-arrow-transition-timing, ease);
        }

        @keyframes bounce {
          from {
            top: calc(var(--focus-arrow-top, -20px) - 5px);
          }
          to {
            top: calc(var(--focus-arrow-top, -20px) + 5px);
          }
        }

        @keyframes bounce-invert {
          from {
            top: calc(var(--focus-arrow-top, -20px) + 5px);
          }
          to {
            top: calc(var(--focus-arrow-top, -20px) - 5px);
          }
        }
      </style>
      <div class="focus-arrow"></div>
      <slot></slot>
    `;
    
    /* const textContent = this.textContent.trim(); */
    const textContent = this.innerHTML.trim();
    this.textContent = '';
    
    this.type = this.getAttribute('type');
    this.settings = JSON.parse(this.getAttribute('settings') || "[]");
    this.focusActive = false;

    this.aElement = document.createElement('a');
    this.aElement.setAttribute('href', '#');
    this.aElement.setAttribute('class', this.getAttribute('class'));
    
    const spanElement = document.createElement('span');
          /* spanElement.textContent = textContent !== '' ? textContent : `${this.type} settings`; */
          spanElement.innerHTML = textContent !== '' ? textContent : `${this.type} settings`;
          spanElement.classList.add('accessibility-focus-target');

    this.aElement.appendChild(spanElement);
    
    this.appendChild(this.aElement);
    
    this.classList.forEach(className => {
      this.aElement.classList.add(className);
    });
    this.classList = [];

    this.classList.add('cssf--d_contents');
    
    switch (this.type) {
      case 'mode':
        this.aElement.addEventListener('click', (event) => this.toggleMode(event));
        this.loadMode();
        break;
      case 'size':
        this.currentSizeIndex = localStorage.getItem(`av-accessibility-${this.type}`)??(this.settings.length + 1);
        this.loadSize();
        this.aElement.addEventListener('click', (event) => this.toggleSize(event));
        break;
      case 'contrast':
        this.aElement.addEventListener('click', (event) => this.toggleContrast(event));
        this.loadContrast();
        break;
      case 'focus':
        this.aElement.addEventListener('click', (event) => {
          this.toggleFocusArrow(event);
          if (this.focusActive) {
            this.placeFocusArrow();
            this.showFocusArrow();
          }
        });
        this.loadState(); 
        break;
      default:
        console.error('Invalid accessibility type');
    }

    document.addEventListener('blur', this.handleDocumentBlur.bind(this));
  }

  toggleMode(event) {
    event.preventDefault();
    localStorage.setItem(`av-accessibility-${this.type}`, document.body.classList.contains('darkmode') ? 'lightmode' : 'darkmode');
    /*
    document.body.classList.toggle('darkmode');
    document.body.classList.toggle('lightmode');
    */
     const mode = localStorage.getItem(`av-accessibility-${this.type}`); 
    if (mode == 'darkmode') { /*  && !document.body.classList.contains('darkmode') */
       document.body.classList.remove('lightmode');
       document.body.classList.add('darkmode');
    } else {
      document.body.classList.remove('darkmode');
      document.body.classList.add('lightmode');
    } 
    /* this.saveState(); */
  }

  toggleSize(event) {
    event.preventDefault(); 
    this.currentSizeIndex = (this.currentSizeIndex + 1) % (this.settings.length + 1);
    localStorage.setItem(`av-accessibility-${this.type}`, this.currentSizeIndex);
    this.loadSize();
  }
  loadSize() {  
    const size = this.settings[this.currentSizeIndex];  
    if ((this.currentSizeIndex) < this.settings.length) {
      document.documentElement.style.fontSize = `${size}px`;
    } else {
      document.documentElement.style.fontSize = '';
    }
  }
  loadMode() {  
    const mode = localStorage.getItem(`av-accessibility-${this.type}`);  
    if(mode && mode.length > 0)
      {
          if (mode == 'darkmode') { /*  && !document.body.classList.contains('darkmode') */
             document.body.classList.remove('lightmode');
             document.body.classList.add('darkmode');
          } else {
            document.body.classList.remove('darkmode');
            document.body.classList.add('lightmode');
          }         
      }

  }
  loadContrast() {  
    const mode = localStorage.getItem(`av-accessibility-${this.type}-state`);  
    if (mode == 'active' && !document.body.classList.contains('contrast')) {
       document.body.classList.toggle('contrast');
    }
  }

  toggleContrast(event) {
    event.preventDefault(); 
    document.body.classList.toggle('contrast');
    /* this.saveState(); */
    localStorage.setItem(`av-accessibility-${this.type}-state`, document.body.classList.contains('contrast') ? 'active' : 'inactive');
  }

  toggleFocusArrow(event) {
    event.preventDefault(); 
    this.focusActive = !this.focusActive;
    if (this.focusActive) {
      document.addEventListener('focusin', this.handleFocusIn);
      document.addEventListener('click', this.handleFocusOut);
      this.placeFocusArrow();
    } else {
      document.removeEventListener('focusin', this.handleFocusIn);
      document.removeEventListener('click', this.handleFocusOut);
      this.hideFocusArrow();
    }
    this.saveState(); 
  }

   handleFocusIn = (event) => {
       if (this.focusActive) {
          let focusedElement = event.target;
              const focusTarget = focusedElement.querySelector('.accessibility-focus-target');
              if (focusTarget) {
                  focusedElement = focusTarget;
              }
           const updatePosition = () => {
              let focusedElement = event.target;
              const focusTarget = focusedElement.querySelector('.accessibility-focus-target');
              if (focusTarget) {
                  focusedElement = focusTarget;
              }
              const focusArrow = this.shadowRoot.querySelector('.focus-arrow');
              const hostRect = this.getBoundingClientRect();
              
              const rect = focusedElement.getBoundingClientRect();
              const offsetY = rect.top + window.scrollY - hostRect.top - 20;
              if (offsetY < window.scrollY) {
                 const bottom = offsetY + rect.height + 20;
                  focusArrow.style.setProperty('--focus-arrow-left', `${rect.left + rect.width / 2}px`);
                  focusArrow.style.setProperty('--focus-arrow-top', `${bottom}px`);
                  focusArrow.style.setProperty('transform', 'translateX(-50%) rotate(0deg)');
                  focusArrow.style.setProperty('animation-name', 'bounce');
              } else {
                  focusArrow.style.setProperty('--focus-arrow-left', `${rect.left + rect.width / 2}px`);
                  focusArrow.style.setProperty('--focus-arrow-top', `${offsetY}px`);
                  focusArrow.style.setProperty('transform', 'translateX(-50%) rotate(180deg)');
                  focusArrow.style.setProperty('animation-name', 'bounce-invert');
              }
              this.showFocusArrow();
         
           };
        updatePosition();
        /*
        const initialRect = focusedElement.getBoundingClientRect();
        setTimeout(() => {
            const currentRect = focusedElement.getBoundingClientRect();
             // if (initialRect.top === currentRect.top) {} 
                updatePosition();
            
        }, 100); 
        */
       }
       
       
   }


  handleFocusOut = (event) => {
    const focusArrow = this.shadowRoot.querySelector('.focus-arrow');
    if (!this.contains(event.target)) {
      this.hideFocusArrow();
    }
  }

  handleDocumentBlur(event) {
    if (!this.contains(event.relatedTarget)) {
      this.hideFocusArrow();
    }
  }

  showFocusArrow() {
    this.shadowRoot.querySelector('.focus-arrow').style.display = 'block';
  }

  hideFocusArrow() {
    this.shadowRoot.querySelector('.focus-arrow').style.display = 'none';
  }

  placeFocusArrow() {
    if (this.focusActive && this.type === 'focus') {
      const focusedElement = document.activeElement;
      if (focusedElement) {
        const focusArrow = this.shadowRoot.querySelector('.focus-arrow');
        const rect = focusedElement.getBoundingClientRect();
        const hostRect = this.getBoundingClientRect();
        /* const offsetY = rect.top - hostRect.top - 20; */
        const offsetY = rect.top + window.scrollY - hostRect.top - 20;
        if (offsetY < window.scrollY) {
           const bottom = offsetY + rect.height + 20;
          focusArrow.style.setProperty('--focus-arrow-left', `${rect.left + rect.width / 2}px`);
          focusArrow.style.setProperty('--focus-arrow-top', `${bottom}px`);
          focusArrow.style.setProperty('transform', 'translateX(-50%) rotate(0deg)');
          focusArrow.style.setProperty('animation-name', 'bounce');
        } else {
          focusArrow.style.setProperty('--focus-arrow-left', `${rect.left + rect.width / 2}px`);
          focusArrow.style.setProperty('--focus-arrow-top', `${offsetY}px`);
          focusArrow.style.setProperty('transform', 'translateX(-50%) rotate(180deg)');
          focusArrow.style.setProperty('animation-name', 'bounce-invert');
        }
      }
    }
    /*
    const observer = new MutationObserver(() => {
                this.handleFocusIn();
            });
    observer.observe(focusedElement, { attributes: true, childList: true, subtree: true });
    */
  }

  saveState() {
    localStorage.setItem(`av-accessibility-${this.type}-state`, this.focusActive ? 'active' : 'inactive');
  }

  loadState() {
    const state = localStorage.getItem(`av-accessibility-${this.type}-state`);
    if (state === 'active') {
      this.focusActive = true;
      if (this.type === 'focus') {
        this.placeFocusArrow();
      }
      document.addEventListener('focusin', this.handleFocusIn);
      document.addEventListener('focusout', this.handleFocusOut);
    }
  }
}

customElements.define('av-accessibility', AvAccessibility);


/* 
   <av-accessibility type="" settings=""></av-accessibility>
   types: mode (toggle darkmode or lightmode), focus (tab focus), size (settings=[18,20]; switch font-size), contrast (toggle contrast)
*/
