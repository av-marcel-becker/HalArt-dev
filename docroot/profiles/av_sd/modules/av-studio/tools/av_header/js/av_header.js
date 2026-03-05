class AvHeader extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    this._heightMobile = '90';
    this._heightDesktop = '105';
    this._positionStatic = false;
    this._background = false;
    this._borderBottom = false;
    this._shadow = false;

    this.updateShadowDOM();
  }

  connectedCallback() {
    let cachePos = 0;
    let go = true;
    const header = this;

    const handleScroll = () => {
      if (go) {
        const currentPos = window.pageYOffset || document.documentElement.scrollTop;

        let toolbarHeight = 0;
        const toolbar = document.querySelector('.gin-secondary-toolbar');
        if (toolbar) {
          const toolbarRect = toolbar.getBoundingClientRect();
          toolbarHeight = toolbarRect.height;
        }
        if (currentPos > (85 + 30 + 60) && currentPos > cachePos) {
          header.style.top = '-100%';
          cachePos = currentPos - 50;
        } else {
          header.style.top = (0 + toolbarHeight) + 'px';
          cachePos = currentPos;
        }
      }
    };

    const handleFocus = (event) => {
      const currentPos = window.pageYOffset || document.documentElement.scrollTop; 
      if (this.contains(event.target)) {
        this.style.transition = 'top 0.3s';
        this.style.top = '0';
      } else {
         if (currentPos > (85 + 30 + 60)) {
            this.style.transition = 'top 0.3s';
            this.style.top = '-100%';
         }
      }
    };
    
    if(this._positionStatic != '1' && this._positionStatic != 'true') {
       window.addEventListener('scroll', handleScroll);
       window.addEventListener('resize', this.updatePosition.bind(this));
       document.addEventListener("DOMContentLoaded", () => {
         this.updatePosition();
       });
       document.addEventListener('focus', handleFocus, true);
    }
  }

  updatePosition() {
    const body = document.body;
    const mainCanvas = document.querySelector('.dialog-off-canvas-main-canvas');
    if (!mainCanvas) return;

    const headerHeight = parseFloat(this.offsetHeight);
    let toolbarHeight = 0;

    const toolbar = document.querySelector('.gin-secondary-toolbar');
    if (toolbar) {
      const toolbarRect = toolbar.getBoundingClientRect();
      toolbarHeight = toolbarRect.height;
    }

    const paddingTop = headerHeight;

    mainCanvas.style.paddingTop = paddingTop + 'px';
    this.style.top = toolbarHeight + 'px';
  }

  get heightMobile() {
    return this._heightMobile;
  }

  set heightMobile(value) {
    this.setAttribute('height-mobile', value);
  }

  get heightDesktop() {
    return this._heightDesktop;
  }

  set heightDesktop(value) {
    this.setAttribute('height-desktop', value);
  }

  get positionStatic() {
    return this._positionStatic;
  }

  set positionStatic(value) {
    this.setAttribute('position-static', value);
  }

  get background() {
    return this._background;
  }

  set background(value) {
    this.setAttribute('background', value);
  }

  get borderBottom() {
    return this._borderBottom;
  }

  set borderBottom(value) {
    this.setAttribute('border-bottom', value);
  }

  get shadow() {
    return this._shadow;
  }

  set shadow(value) {
    this.setAttribute('shadow', value);
  }

  set settings(value) {
    this.setAttribute('settings', JSON.stringify(value));
  }

  static get observedAttributes() {
    return ['height-mobile', 'height-desktop', 'position-static', 'background', 'border-bottom', 'shadow', 'settings'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case 'height-mobile':
        this._heightMobile = newValue;
        break;
      case 'height-desktop':
        this._heightDesktop = newValue;
        break;
      case 'position-static':
        this._positionStatic = newValue;
        break;
      case 'background':
        this._background = newValue;
        break;
      case 'border-bottom':
        this._borderBottom = newValue;
        break;
      case 'shadow':
        this._shadow = newValue;
        break;
      case 'settings':
        this._settings = JSON.parse(newValue);
        break;
    }
    this.updateShadowDOM();
  }

  updateShadowDOM() {
    const style = document.createElement('style');
    style.textContent = `
      :host {
        display: block;
        position: ${this._positionStatic == '1' || this._positionStatic == 'true'? 'static' : 'fixed'};
        width: 100%;
        top: 0;
        left: 0;
        right: 0;
        transition: top 0.3s;
        z-index: 10;
        height: ${this.convertToRem(this._heightMobile)}rem;
        ${this._background ? 'background: ' + this._background + ';' : ''}
        ${this._borderBottom ? 'border-bottom: ' + this._borderBottom + ';' : ''}
        ${this._shadow ? 'box-shadow: ' + this._shadow + ';' : ''}
      }
      
      @media (min-width: 768px) {
        :host {
          height: ${this.convertToRem(this._heightDesktop)}rem;
        }
      }
    `;
    this.shadowRoot.innerHTML = '';
    this.shadowRoot.appendChild(style);

    const slot = document.createElement('slot');
    this.shadowRoot.appendChild(slot);
  }

  convertToRem(valueInPixel) {
    return parseFloat(valueInPixel) / parseFloat(getComputedStyle(document.documentElement).fontSize);
  }
}

customElements.define('av-header', AvHeader);
