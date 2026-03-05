class AvScroll extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: 'open' });

        this._type = 'top';
        this._target = '';
        this._threshold = 800;
        this._opacity = 1;

        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: none;
                    position: fixed;
                    z-index: var(--av-scroll-z-index, 999);
                    top: var(--av-scroll-top, auto);
                    bottom: var(--av-scroll-bottom, auto);
                    left: var(--av-scroll-left, auto);
                    right: var(--av-scroll-right, auto);
                    transform: var(--av-scroll-transform, none);
                    background: var(--av-scroll-background, #fff);
                    color: var(--av-scroll-color, #000);
                    border: var(--av-scroll-border, none);
                    border-radius: var(--av-scroll-border-radius, 0);
                    padding: var(--av-scroll-padding, 10px);
                    cursor: pointer;
                    transition: var(--av-scroll-transition, opacity 0.3s ease-in-out);
                    opacity: var(--av-scroll-opacity, 1);
                    font-size: var(--av-scroll-font-size, 1rem) !important;
                    width: calc(var(--av-scroll-padding, 10px) * 2 + var(--av-scroll-font-size, 1rem));
                    height: calc(var(--av-scroll-padding, 10px) * 2 + var(--av-scroll-font-size, 1rem));
                    justify-content: center;
                    align-items: center;
                    box-shadow: var(--av-scroll-box-shadow, 0rem 0.125rem 0.9375rem rgba(0,0,0,0.15));
                }

                :host(:hover) {
                    transform: var(--av-scroll-hover-transform, none);
                    border-radius: var(--av-scroll-hover-border-radius, var(--av-scroll-border-radius));
                    border: var(--av-scroll-hover-border, var(--av-scroll-border));
                    background: var(--av-scroll-hover-background, #f0f0f0);
                    color: var(--av-scroll-hover-color, var(--av-scroll-color));
                }
            </style>
            <slot></slot>
        `;

        this.addEventListener('click', () => this.scroll());
        this.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.scroll();
            }
        });
    }

    connectedCallback() {
        if (!this.hasAttribute('tabindex')) {
            this.setAttribute('tabindex', '0');
        }
        if (!this.hasAttribute('role')) {
            this.setAttribute('role', 'button');
        }
        this.handleScroll();
        window.addEventListener('scroll', () => this.handleScroll());
    }

    handleScroll() {
        if (this._type === 'top' && window.scrollY > this._threshold) {
            this.style.display = 'flex';
        } else if (this._type === 'bottom' && window.scrollY < (document.documentElement.scrollHeight - window.innerHeight - this._threshold)) {
            this.style.display = 'flex';
        } else if (this._type === 'target' && window.scrollY < 1) {
            this.style.display = 'flex';
        } else {
            this.style.display = 'none';
        }
    }

    scroll() {
        if (this._type === 'top') {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        } else if (this._type === 'bottom') {
            window.scrollTo({
                top: document.documentElement.scrollHeight,
                behavior: 'smooth'
            });
        } else if (this._type === 'target' && this._target) {
            const targetElement = document.getElementById(this._target);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        }
    }

    static get observedAttributes() {
        return ['type', 'target', 'threshold'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            switch (name) {
                case 'type':
                    this._type = newValue;
                    break;
                case 'target':
                    this._target = newValue;
                    break;
                case 'threshold':
                    this._threshold = parseInt(newValue);
                    break;
                default:
                    break;
            }
            this.handleScroll();
        }
    }
}

customElements.define('av-scroll', AvScroll);
