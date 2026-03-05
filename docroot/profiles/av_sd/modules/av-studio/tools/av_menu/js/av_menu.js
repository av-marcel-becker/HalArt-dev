class AvMenu extends HTMLElement {
  constructor() {
    super();
    
    this.attachShadow({ mode: 'open' });
    
    this._type = 'desktop';
    this._maxWidth = '100%';
    this._settings = {};
    
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          max-width: var(--av-menu-max-width, ${this._maxWidth});
        }

        :host([type="desktop"]) #menu {
  
        }

        :host([type="desktop-second"]) #menu {
  
        }

        :host([type="mobile"]) #menu {

        }

        :host([type="mobile-second"]) #menu {

        }

      </style>
      <div id="menu">
        <slot></slot>
      </div>
    `;
  }
  
  get type() {
    return this._type;
  }
  
  set type(value) {
    this.setAttribute('type', value);
  }

  get maxWidth() {
    return this._maxWidth;
  }

  set maxWidth(value) {
    this.setAttribute('max-width', value);
  }

  get settings() {
    return this._settings;
  }

  set settings(value) {
    this.setAttribute('settings', JSON.stringify(value));
  }

  static get observedAttributes() {
    return ['type', 'max-width', 'settings'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'type') {
      this._type = newValue;
    } else if (name === 'max-width') {
      this._maxWidth = newValue;
      this.shadowRoot.host.style.setProperty('--av-menu-max-width', newValue);
    } else if (name === 'settings') {
      this._settings = JSON.parse(newValue);
    }
  }
}

customElements.define('av-menu', AvMenu);
