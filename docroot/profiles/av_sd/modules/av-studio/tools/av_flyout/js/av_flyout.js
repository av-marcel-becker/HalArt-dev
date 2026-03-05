class AvFlyout extends HTMLElement {
  constructor() {
    super();
    
    this._settings = {};
    
    const shadow = this.attachShadow({ mode: 'open' });
    const style = document.createElement('style');
    
    style.textContent = `
        :host {
          display: contents;
        }
        nav.flyout {
          position: fixed;
          z-index: var(--av-flyout-z-index, 4);
          top: var(--av-flyout-top, 50%);
          right: var(--av-flyout-right, 0);
          bottom: var(--av-flyout-bottom, auto);
          left: var(--av-flyout-left, auto);
          transform: var(--av-flyout-transform, translateY(-50%));
          width: auto;
        }

        .flyout ul {
          display: flex;
          list-style: none;
          margin: 0rem;
          padding: 0rem;
          white-space: nowrap;
          text-align: center;
          flex-direction: var(--av-flyout-flex-direction, column);
        }

        .flyout li {
           margin: var(--av-flyout-item-li-margin, 0);
           display: inline-block;
        }
        
        .flyout a:hover,
        .flyout a:focus {
           --av-flyout-item-label-color: var(--av-flyout-item-hover-label-color);
           --av-flyout-item-label-background: var(--av-flyout-item-hover-label-background);
         
           --av-flyout-item-icon-color: var(--av-flyout-item-hover-icon-color);
           --av-flyout-item-icon-background: var(--av-flyout-item-hover-icon-background);
           --av-flyout-item-icon-border-top-left-radius:  var(--av-flyout-item-hover-icon-border-top-left-radius);
           --av-flyout-item-icon-border-top-right-radius:  var(--av-flyout-item-hover-icon-border-top-right-radius);
           --av-flyout-item-icon-border-bottom-left-radius:  var(--av-flyout-item-hover-icon-border-bottom-left-radius);
           --av-flyout-item-icon-border-bottom-right-radius:  var(--av-flyout-item-hover-icon-border-bottom-right-radius); 
           --av-flyout-item-icon-box-shadow: var(--av-flyout-item-hover-icon-box-shadow);
           
           --av-flyout-item-label-top: var(--av-flyout-item-hover-label-top);
           --av-flyout-item-label-right: var(--av-flyout-item-hover-label-right);
           --av-flyout-item-label-bottom: var(--av-flyout-item-hover-label-bottom);
           --av-flyout-item-label-left: var(--av-flyout-item-hover-label-left);    
           --av-flyout-item-label-border-top-left-radius:  var(--av-flyout-item-hover-label-border-top-left-radius);
           --av-flyout-item-label-border-top-right-radius:  var(--av-flyout-item-hover-label-border-top-right-radius);
           --av-flyout-item-label-border-bottom-left-radius:  var(--av-flyout-item-hover-label-border-bottom-left-radius);
           --av-flyout-item-label-border-bottom-right-radius:  var(--av-flyout-item-hover-label-border-bottom-right-radius); 
           --av-flyout-item-label-box-shadow: var(--av-flyout-item-hover-label-box-shadow);
        }

        .flyout a {
          display: inline-flex;
          flex-direction: var(--av-flyout-item-a-flex-direction, row);
          align-content: stretch;
          align-items: stretch;
          justify-content: space-between;
          flex-wrap: nowrap;
          padding: var(--av-flyout-item-a-padding, 0);
          text-decoration: none;
        }


        .flyout a .flyout-btn-label {
          display: flex;
          align-items: center;
          position: absolute;
          z-index: 0;
          height: var(--av-flyout-item-icon-height, 48px);
          top: var(--av-flyout-item-label-top, auto);
          right: var(--av-flyout-item-label-right, auto);
          bottom: var(--av-flyout-item-label-bottom, auto);
          left: var(--av-flyout-item-label-left, auto);
          padding: var(--av-flyout-item-label-padding, 5px 0);
          text-align: var(--av-flyout-item-label-text-align, left);
          overflow: hidden;
          font-size: var(--av-flyout-item-label-font-size, 10px);
          line-height: var(--av-flyout-item-label-line-height, 14px);
          font-family: var(--av-flyout-item-label-font-family, sans-serif);
          font-style: var(--av-flyout-item-label-font-style, normal);
          font-weight: var(--av-flyout-item-label-font-weight, normal);
          color: var(--av-flyout-item-label-color, #000);
          background: var(--av-flyout-item-label-background, #fff);
          transition: var(--av-flyout-item-label-transition, top 1s cubic-bezier(0.34, 1.56, 0.64, 1) 0s,
                                      right 1s cubic-bezier(0.34, 1.56, 0.64, 1) 0s,
                                      bottom 1s cubic-bezier(0.34, 1.56, 0.64, 1) 0s,
                                      left 1s cubic-bezier(0.34, 1.56, 0.64, 1) 0s,
                                      border-top-left-radius 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) 0s,
                                      border-top-right-radius 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) 0s,
                                      border-bottom-left-radius 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) 0s,
                                      border-bottom-right-radius 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) 0s);
          transform: var(--av-flyout-item-label-transform, none);
          transform-origin: var(--av-flyout-item-label-transform-origin);
           border-top-left-radius: var(--av-flyout-item-label-border-top-left-radius, 0);
           border-top-right-radius: var(--av-flyout-item-label-border-top-right-radius, 0);
           border-bottom-left-radius: var(--av-flyout-item-label-border-bottom-left-radius, 0);
           border-bottom-right-radius: var(--av-flyout-item-label-border-bottom-right-radius, 0);
           box-shadow: var(--av-flyout-item-label-box-shadow, 0 0 6px rgba(0,0,0,0.25));
        }
        .flyout a .flyout-btn-icon {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          align-content: stretch;
          align-self: stretch;
          flex-shrink: 0;
          align-items: center;
          justify-content: center;
          position: relative;
          z-index: 1;
          color: var(--av-flyout-item-icon-color, #000);
          background: var(--av-flyout-item-icon-background, #fff);
          font-size: var(--av-flyout-item-icon-font-size, 28px);
          line-height: var(--av-flyout-item-icon-line-height, 28px);
          width: var(--av-flyout-item-icon-width, 48px);
          height: var(--av-flyout-item-icon-height, 48px);
          border: var(--av-flyout-item-icon-border, 0 solid transparent);
           border-top-left-radius: var(--av-flyout-item-icon-border-top-left-radius, 0);
           border-top-right-radius: var(--av-flyout-item-icon-border-top-right-radius, 0);
           border-bottom-left-radius: var(--av-flyout-item-icon-border-bottom-left-radius, 0);
           border-bottom-right-radius: var(--av-flyout-item-icon-border-bottom-right-radius, 0);
          box-shadow: var(--av-flyout-item-icon-box-shadow, 0 0 6px rgba(0,0,0,0.25));
          padding: var(--av-flyout-item-icon-padding, 0);
          margin: var(--av-flyout-item-icon-margin, 0);
          transition: var(--av-flyout-item-icon-transition, border-top-right-radius 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) 0s,
                                      border-bottom-left-radius 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) 0s,
                                      border-bottom-right-radius 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) 0s);
        }
      .flyout .flyout-btn-icon::before {
          content: var(--av-flyout-item-icon-content, '');
          -moz-osx-font-smoothing: grayscale;
          -webkit-font-smoothing: antialiased;
          text-rendering: auto;
          line-height: 1;
          display: inline-block;
          font-family: var(--av-flyout-item-icon-font-family, sans-serif);
          font-style: var(--av-flyout-item-icon-font-style, normal);
          font-weight: var(--av-flyout-item-icon-font-weight, normal);
          font-variant: var(--av-flyout-item-icon-font-variant, normal);
      }
    `;

    const nav = document.createElement('nav');
    nav.classList.add('flyout');
    const ul = document.createElement('ul');
    ul.classList.add('flyout-list');
    nav.appendChild(ul);
    shadow.appendChild(style);
    shadow.appendChild(nav);

    document.addEventListener('DOMContentLoaded', () => {
      this.renderFlyoutItems();
    });
  }

  get settings() {
    return this._settings;
  }

  set settings(value) {
    this.setAttribute('settings', JSON.stringify(value));
  }

  static get observedAttributes() {
    return ['settings'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'settings') {
      this._settings = JSON.parse(newValue);
    }
  }

  connectedCallback() {
    /* this.renderFlyoutItems(); */
  }

  renderFlyoutItems() {
    const flyoutItems = this.querySelectorAll('av-flyout-item');
    const ul = this.shadowRoot.querySelector('.flyout-list');

    flyoutItems.forEach(item => {
      const href = item.getAttribute('href') || '/';
      const rel = item.getAttribute('rel') || 'nofollow';
      const title = item.getAttribute('title') || 'Test';
      const label = item.getAttribute('label') || 'E-Mail';
      const icon = item.getAttribute('icon') || 'f007';

      const a = document.createElement('a');
      a.setAttribute('class', 'flyout-btn');
      a.setAttribute('href', href);
      a.setAttribute('rel', rel);
      a.setAttribute('title', title);

      const labelSpan = document.createElement('span');
      labelSpan.setAttribute('class', 'flyout-btn-label');
      labelSpan.textContent = item.textContent;

      const iconSpan = document.createElement('span');
      iconSpan.setAttribute('class', 'flyout-btn-icon');
      iconSpan.style.setProperty('--av-flyout-item-icon-content', `"\\${icon}"`);

      a.appendChild(labelSpan);
      a.appendChild(iconSpan);

      const li = document.createElement('li');
      li.appendChild(a);

      ul.appendChild(li);
    });
  }
}

customElements.define('av-flyout', AvFlyout);

class AvFlyoutItem extends HTMLElement {
  constructor() {
    super();
    
    const shadow = this.attachShadow({ mode: 'open' });
    const style = document.createElement('style');
    
    style.textContent = `
        :host {
                display: contents;
              }
    `;
    
    shadow.appendChild(style);
  }
}

customElements.define('av-flyout-item', AvFlyoutItem);

