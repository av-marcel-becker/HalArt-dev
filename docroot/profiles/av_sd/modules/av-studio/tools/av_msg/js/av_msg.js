class AvMsg extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._title = '';
    this._width = '';
    this._height = '';
    this._settings = {
      translation: {
         en: {
           Menu: 'Menu',
           Language: 'Language',
           Close: 'Close',
           Info: 'Info'
         },
         de: {
           Menu: 'Menü',
           Language: 'Sprache',
           Close: 'Schließen',
           Info: 'Info'
         }
      }  
    };
    this._lang = this.detectLanguage();
    this._previouslyFocusedElement = null;
    this._handleKeyDown = this.handleKeyDown.bind(this);
  }
  
  connectedCallback() {
    this.render();
    this.observeDrupalMessages();
    this.observeFormSubmit();
    document.addEventListener('DOMContentLoaded', () => {
        this.checkInitialMessages();
    });
  }

  static get observedAttributes() {
    return ['width', 'height', 'title', 'settings', 'translation'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'width' || name === 'height' || name === 'title') {
      this._settings[name] = newValue;
      this.render();
    } else if (name === 'settings' && newValue) {
      this._settings = Object.assign({}, this._settings, JSON.parse(newValue));
      this.render();
    } else if (name === 'translation' && newValue) {
      this._settings.translation = Object.assign({}, this._settings.translation, JSON.parse(newValue));
      this.render();
    }
  }

  render() { 
    const popupContainer = document.createElement('div');
    popupContainer.classList.add('popup-container');
    popupContainer.style.display = 'none';

    const popupBox = document.createElement('div');
    popupBox.classList.add('popup-box');
    popupBox.setAttribute('role', 'dialog');
    popupBox.setAttribute('aria-modal', 'true');
    popupBox.setAttribute('aria-labelledby', 'av-msg-title');
    popupBox.style.width = this._settings.width || 'auto';
    popupBox.style.height = this._settings.height || 'auto';

    const title = document.createElement('h6');
    title.id = 'av-msg-title';
    title.textContent = this.translate(this._settings.title) || this.translate('Info');

    const closeButton = document.createElement('button');
    closeButton.classList.add('close-button');
    closeButton.setAttribute('aria-label', this.translate('Close'));
    closeButton.textContent = this.translate('Close');
    closeButton.addEventListener('click', () => this.closePopup());

    const content = document.createElement('div');
    content.classList.add('content');

    popupBox.appendChild(title);
    popupBox.appendChild(closeButton);
    popupBox.appendChild(content);
    popupContainer.appendChild(popupBox);

    const style = document.createElement('style');
    style.textContent = `
      .popup-container {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: var(--av-msg-overlay-background, rgba(0, 0, 0, 0.5));
        display: none;
        justify-content: center;
        align-items: center;
        z-index: 1000;
      }
      .popup-box {
        background: var(--av-msg-popup-background, white);
        padding: var(--av-msg-popup-padding, 20px);
        border-radius: var(--av-msg-popup-border-radius, 5px);
        box-shadow: var(--av-msg-popup-box-shadow, 0 0 10px rgba(0, 0, 0, 0.3));
        max-width: 90%;
        max-height: 90%;
        overflow: auto;
        position: relative;
        min-width: 250px;
      }
      .close-button {
        position: absolute;
        top: 10px;
        right: 10px;
        background: none;
        border: none;
        cursor: pointer;
        color: var(--av-msg-close-color, black);
        font-family: var(--av-msg-close-font-family, sans-serif);
        font-style: var(--av-msg-close-font-style, normal);
        font-weight: var(--av-msg-close-font-weight, normal);
        font-size: var(--av-msg-close-font-size, 16px);
        line-height: var(--av-msg-close-line-height, 16px);
      }
      .close-button::after {  
        content: var(--av-msg-close-after-content, 'X');
        font-family: var(--av-msg-close-after-font-family, sans-serif);
        font-style: var(--av-msg-close-after-font-style, normal);
        font-weight: var(--av-msg-close-after-font-weight, normal);
        font-variant: var(--av-msg-close-after-font-variant, normal);
        font-size: var(--av-msg-close-after-font-size, 16px);
        line-height: var(--av-msg-close-after-line-height, 16px);
        border: var(--av-msg-close-after-border, none);
        border-radius: var(--av-msg-close-after-border-radius, 0);
        background: var(--av-msg-close-after-background, none);
      }
      .content {
        margin: var(--av-msg-content-margin, 10px 0 0 0);
        color: var(--av-msg-content-color, black);
        font-size: var(--av-msg-content-font-size, 16px);
        font-family: var(--av-msg-content-font-family, sans-serif);
        font-weight: var(--av-msg-content-font-weight, normal);
      }
      .content a {
        display: inline-block;
        font-family: var(--av-msg-a-font-family, inherit);
        font-style: var(--av-msg-a-font-style, inherit);
        font-weight: var(--av-msg-a-font-weight, inherit);
        font-size: var(--av-msg-a-font-size, inherit);
        line-height: var(--av-msg-a-line-height, inherit);
        color: var(--av-msg-a-color, #0066cc);
        text-decoration: var(--av-msg-a-text-decoration, underline);
        background: var(--av-msg-a-background, transparent);
        border: var(--av-msg-a-border, none);
        border-radius: var(--av-msg-a-border-radius, 0);
        border-bottom: var(--av-msg-a-border-bottom, none);
        text-underline-position: var(--av-msg-a-text-underline-position, auto);
        text-decoration-thickness: var(--av-msg-a-text-decoration-thickness, auto);
        padding: var(--av-msg-a-padding, 0);
        margin: var(--av-msg-a-margin, 0);
        transition: var(--av-msg-a-transition, all 0.2s ease);
        transform: var(--av-msg-a-transform, none);
        text-transform: var(--av-msg-a-text-transform, none);
        letter-spacing: var(--av-msg-a-letter-spacing, normal);
        vertical-align: var(--av-msg-a-vertical-align, baseline);
      }
      .content a:hover {
        color: var(--av-msg-a-hover-color, #004499);
        text-decoration: var(--av-msg-a-hover-text-decoration, underline);
        background: var(--av-msg-a-hover-background, transparent);
        border: var(--av-msg-a-hover-border, none);
        transform: var(--av-msg-a-hover-transform, none);
      }
      .content a:focus {
        color: var(--av-msg-a-focus-color, #004499);
        text-decoration: var(--av-msg-a-focus-text-decoration, underline);
        background: var(--av-msg-a-focus-background, transparent);
        outline: var(--av-msg-a-focus-outline, 2px solid currentColor);
        outline-offset: 2px;
      }
      h6 {
        color: var(--av-msg-title-color, black);
        font-size: var(--av-msg-title-font-size, 20px);
        font-family: var(--av-msg-title-font-family, sans-serif);
        font-weight: var(--av-msg-title-font-weight, normal);
        margin: 0;
      }
      .error-list {
        list-style-type: none;
        padding-left: 0;
      }
      .error-list li {
        margin-bottom: 5px;
      }
    `;

    this.shadowRoot.innerHTML = '';
    this.shadowRoot.appendChild(style);
    this.shadowRoot.appendChild(popupContainer); 
  }

  handleKeyDown(e) {
    if (e.key === 'Escape') {
      this.closePopup();
    }
    if (e.key === 'Tab') {
      const focusableElements = Array.from(this.shadowRoot.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'));
      if (focusableElements.length === 0) return;

      const first = focusableElements[0];
      const last = focusableElements[focusableElements.length - 1];

      if (e.shiftKey) {
        if (this.shadowRoot.activeElement === first) {
          last.focus();
          e.preventDefault();
        }
      } else {
        if (this.shadowRoot.activeElement === last) {
          first.focus();
          e.preventDefault();
        }
      }
    }
  }

  showPopup(message) {
    this._previouslyFocusedElement = document.activeElement;
    const container = this.shadowRoot.querySelector('.popup-container');
    const content = this.shadowRoot.querySelector('.content');
    
    if (!container || !content) {
      this.render();
      return this.showPopup(message);
    }

    content.innerHTML = message;
    container.style.display = 'flex';
    
    window.addEventListener('keydown', this._handleKeyDown);

    // Fokus auf den Schließen-Button setzen für Barrierefreiheit
    setTimeout(() => {
      const closeBtn = this.shadowRoot.querySelector('.close-button');
      if (closeBtn) closeBtn.focus();
    }, 0);
  }

  closePopup() {
    const container = this.shadowRoot.querySelector('.popup-container');
    if (container) {
      container.style.display = 'none';
    }
    window.removeEventListener('keydown', this._handleKeyDown);
    if (this._previouslyFocusedElement) {
      this._previouslyFocusedElement.focus();
    }
  }

  detectLanguage() {
    const htmlLangAttribute = document.documentElement.getAttribute('lang');
    if (htmlLangAttribute) {
        return htmlLangAttribute.substring(0, 2);
    } else {
        return (navigator.language || navigator.userLanguage).substring(0, 2); 
    }
  }

  translate(key) {
    if (!this._settings.translation[this._lang]) return key;
    return this._settings.translation[this._lang][key] || key;
  }

  observeDrupalMessages() {
    const observer = new MutationObserver(mutationsList => {
      mutationsList.forEach(mutation => {
        mutation.addedNodes.forEach(node => {
          if (node.nodeType === Node.ELEMENT_NODE && node.dataset && node.dataset.drupalMessages !== undefined) {
            const messages = node.querySelectorAll('.messages');
            if (messages.length > 0) {
              messages.forEach(message => {
                const text = message.innerHTML.trim();
                if (text) {
                  this.showPopup(text);
                }
              });
            }
          }
        });
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });
  }

  observeFormSubmit() {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
      form.addEventListener('submit', event => {
        const requiredFields = form.querySelectorAll('[required]');
        const missingFields = Array.from(requiredFields).filter(field => !field.value.trim());
        if (missingFields.length > 0) {
          event.preventDefault();
          const msg = this.generateErrorMessage(missingFields);
          this.showPopup(msg);
        }
      });
    });
  }

  checkInitialMessages() {
    const initialMessages = document.querySelectorAll('.messages');
    initialMessages.forEach(message => {
      const text = message.innerHTML.trim();
      if (text) {
        this.showPopup(text);
      }
    });
  }

  generateErrorMessage(fields) {
    let msg = '<ul class="error-list">';
    fields.forEach(field => {
      const attrName = field.getAttribute('name');
      const errorMsg = field.dataset.webformRequiredError || 'Required field missing';
      
      if (attrName && attrName.includes('name')) {
        msg += `<li>${this.translate('Please enter your name')}</li>`;
      } else if (attrName && attrName.includes('tel')) {
        msg += `<li>${this.translate('Please enter your telephone number')}</li>`;
      } else {
        msg += `<li>${errorMsg}</li>`;
      }
    });
    msg += '</ul>';
    return msg;
  }
}

customElements.define('av-msg', AvMsg);