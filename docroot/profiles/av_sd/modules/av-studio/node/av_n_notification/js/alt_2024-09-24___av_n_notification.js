class AVNotification extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.render();
    }

    connectedCallback() {
        this.shadowRoot.querySelector('.av-notification-close').addEventListener('click', () => this.close());
        const time = parseInt(this.getAttribute('time'), 10);
        const now = Date.now();

        if (time === -1) {
            this.open();
        } else if (time === 0) {
            if (!localStorage.getItem(this.id)) {
                this.open();
            }
        } else if (time > 0) {
            const storedTime = localStorage.getItem(this.id);
            if (!storedTime || (now > parseInt(storedTime, 10))) {
                this.open();
            }
        } else {
            this.open();
        }
    }

    open() {
        this.shadowRoot.querySelector('.av-notification-background').style.display = 'flex';
    }

    close() {
        this.shadowRoot.querySelector('.av-notification-background').style.display = 'none';
        const time = parseInt(this.getAttribute('time'), 10);
        if (time > 0) {
            const now = Date.now();
            localStorage.setItem(this.id, now + time * 1000);
        }
    }

    render() {
        const headerText = this.getAttribute('header-text') || 'Info';
        const footerText = this.getAttribute('footer-text') || '';
        const footerAlign = this.getAttribute('footer-align') || 'right';
        const headerAlign = this.getAttribute('header-align') || 'left';
        const showIcon = this.getAttribute('show-icon') || 'true';
        const icon = this.getAttribute('icon');
        const linkData = this.getAttribute('link');

        let linkAttributes = {};
        if (linkData) {
            try {
                linkAttributes = JSON.parse(linkData);
            } catch (e) {
                console.error('Invalid JSON in link attribute:', e);
            }
        }

        const link = linkAttributes.href ? `
            <a href="${linkAttributes.href}" title="${linkAttributes.title || ''}" target="${linkAttributes.target || '_self'}" class="av-notification-link">
                ${linkAttributes.content || 'Click me'}
            </a>
        ` : '';

        this.shadowRoot.innerHTML = `
            <style>
                .av-notification-background {
                    display: none;
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: var(--av-notification-overlay-background);
                    justify-content: center;
                    align-items: center;
                    z-index: 10;
                }

                .av-notification-body {
                    background: var(--av-notification-body-background);
                    padding: var(--av-notification-body-padding);
                    border-radius: var(--av-notification-body-border-radius);
                    width: var(--av-notification-body-width);
                    box-shadow: var(--av-notification-body-box-shadow);
                    max-width: 90%;
                }

                .av-notification-header {
                    position: relative;
                    display: block;
                    justify-content: space-between;
                    align-items: center;
                    min-height: var(--av-notification-header-min-height);
                    margin: var(--av-notification-header-margin);
                    padding: var(--av-notification-header-padding);
                }

                .av-notification-content {
                    font-weight: var(--av-notification-content-font-weight);
                    color: var(--av-notification-content-color);
                    font-size: var(--av-notification-content-font-size);
                    font-family: var(--av-notification-content-font-family);
                    padding: var(--av-notification-content-padding);
                }

                .av-notification-footer {
                    position: relative;
                    font-weight: var(--av-notification-footer-text-font-weight);
                    color: var(--av-notification-footer-text-color);
                    font-size: var(--av-notification-footer-text-font-size);
                    font-family: var(--av-notification-footer-text-font-family);
                    text-align: ${footerAlign};
                    min-height: var(--av-notification-footer-min-height);
                    margin: var(--av-notification-footer-margin);
                    padding: var(--av-notification-footer-padding);
                }

                .av-notification-header-text-icon::before {
                    content: ${icon?`'`+icon+`'`:`var(--av-notification-header-text-icon-content)`};
                    font-family: var(--av-notification-header-text-icon-font-family);
                    font-weight: var(--av-notification-header-text-icon-font-weight);
                    font-style: normal;
                    color: var(--av-notification-header-text-icon-color);
                    font-size: var(--av-notification-header-text-icon-font-size);
                    position: absolute;
                    top: var(--av-notification-header-text-icon-top);
                    left: var(--av-notification-header-text-icon-left);
                    min-height: var(--av-notification-header-text-icon-min-height);
                    background: var(--av-notification-header-text-icon-background);
                    width: var(--av-notification-header-text-icon-width);
                    height: var(--av-notification-header-text-icon-height);
                    border: var(--av-notification-header-text-icon-border);
                    border-radius: var(--av-notification-header-text-icon-border-radius);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .av-notification-close::before {
                    content: var(--av-notification-close-icon-content);
                    font-family: var(--av-notification-close-icon-font-family);
                    font-weight: var(--av-notification-close-icon-font-weight);
                    font-style: normal;
                    color: var(--av-notification-close-icon-color);
                    font-size: var(--av-notification-close-icon-font-size);
                    position: absolute;
                    top: var(--av-notification-close-icon-top);
                    right: var(--av-notification-close-icon-right);
                    left: var(--av-notification-close-icon-left);
                    min-height: var(--av-notification-close-icon-min-height);
                    cursor: pointer;
                    background: var(--av-notification-close-icon-background);
                    width: var(--av-notification-close-icon-width);
                    height: var(--av-notification-close-icon-height);
                    border: var(--av-notification-close-icon-border);
                    border-radius: var(--av-notification-close-icon-border-radius);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .av-notification-header-text {
                    font-weight: var(--av-notification-header-text-font-weight);
                    color: var(--av-notification-header-text-color);
                    font-size: var(--av-notification-header-text-font-size);
                    font-family: var(--av-notification-header-text-font-family);
                    text-align: ${headerAlign};
                    position: relative;
                    padding: var(--av-notification-header-text-padding);
                    min-height: var(--av-notification-header-text-min-height);
                    display: flex;
                    align-items: center;                    
                }

                .av-notification-link {
                    color: var(--av-notification-link-color);
                    font-weight: var(--av-notification-link-font-weight);
                    font-size: var(--av-notification-link-font-size);
                    font-family: var(--av-notification-link-font-family);
                    background-color: var(--av-notification-link-background-color);
                    border: var(--av-notification-link-border);
                    border-radius: var(--av-notification-link-border-radius);
                    padding: var(--av-notification-link-padding);
                    cursor: pointer;
                    text-decoration: none;
                    display: inline-block;
                }
                .av-notification-link:hover,
                .av-notification-link:focus {
                    color: var(--av-notification-link-hover-color);
                    background-color: var(--av-notification-link-hover-background-color);
                    border: var(--av-notification-link-hover-border);
                }
            </style>
            <div class="av-notification-background">
                <div class="av-notification-body">
                    ${headerText ? `
                        <div class="av-notification-header">
                            ${showIcon == 'true' || showIcon == '1'?`<i class="av-notification-header-text-icon"></i>`:``}
                            <div class="av-notification-header-text">${headerText}</div>
                            <i class="av-notification-close" title="Schließen"></i>
                        </div>
                    ` : `
                        <i class="av-notification-close"></i>
                    `}
                    <div class="av-notification-content">
                        <slot></slot>
                    </div>
                    ${footerText || link ? `
                        <div class="av-notification-footer">
                            ${footerText}
                            ${link}
                        </div>
                    ` : ''}
                </div>
            </div>
        `;
    }
}

customElements.define('av-notification', AVNotification);