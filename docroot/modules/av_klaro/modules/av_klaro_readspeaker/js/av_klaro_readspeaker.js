/* full custom - ReadSpeaker Handler with Native Klaro Styles */
class ReadSpeakerHandler {
    constructor(options = {}) {
        this.config = {
            containerId: 'readspeaker_button1',
            consentName: 'av_readspeaker',
            headline: 'Vorlesefunktion aktivieren',
            message: 'Um den Text anzuhören, müssen Sie den Cookies für ReadSpeaker zustimmen.',
            btnAccept: 'Zustimmen',
            btnClose: 'Schließen',
            ...options
        };

        this.init();
    }

    init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setup());
        } else {
            this.setup();
        }
    }

    setup() {
        const container = document.getElementById(this.config.containerId);
        if (!container) return;

        this.link = container.querySelector('a');
        if (!this.link) return;

        this.link.addEventListener('click', (e) => this.handleTrigger(e));
        this.injectStyles();
    }

    hasConsent() {
        if (typeof klaro !== 'undefined') {
            const manager = klaro.getManager();
            if (manager) {
                const consents = manager.consents || (typeof manager.getConsents === 'function' ? manager.getConsents() : {});
                return !!consents[this.config.consentName];
            }
        }
        return false;
    }

    handleTrigger(e) {
        if (this.hasConsent()) {
            return; 
        } else {
            e.preventDefault();
            e.stopPropagation();
            this.showPopup();
        }
    }

    showPopup() {
        if (!document.getElementById('rs-dynamic-modal')) {
            this.createPopup();
        }
        document.getElementById('rs-dynamic-modal').style.display = 'flex';
    }

    createPopup() {
        const modal = document.createElement('div');
        modal.id = 'rs-dynamic-modal';
        modal.className = 'rs-modal-overlay klaro'; // Klasse klaro für Variablen-Scope hinzugefügt
        
        modal.innerHTML = `
            <div class="rs-modal-content">
                <h3>${this.config.headline}</h3>
                <p>${this.config.message}</p>
                <div class="rs-modal-buttons">
                    <button class="rs-btn-confirm">${this.config.btnAccept}</button>
                    <button class="rs-btn-close">${this.config.btnClose}</button>
                </div>
            </div>
        `;

        modal.onclick = (e) => { if (e.target === modal) this.hidePopup(); };
        modal.querySelector('.rs-btn-confirm').onclick = () => this.acceptAll();
        modal.querySelector('.rs-btn-close').onclick = () => this.hidePopup();

        document.body.appendChild(modal);
    }

    hidePopup() {
        const modal = document.getElementById('rs-dynamic-modal');
        if (modal) modal.style.display = 'none';
    }

    acceptAll() {
        if (typeof klaro !== 'undefined') {
            const manager = klaro.getManager();
            if (manager) {
                manager.updateConsent(this.config.consentName, true);
                if (typeof manager.saveAndApplyConsents === 'function') {
                    manager.saveAndApplyConsents();
                } else {
                    manager.saveConsents();
                }
            }
        }
        
        this.hidePopup();
        
        setTimeout(() => {
            this.link.click();
        }, 200);
    }

    injectStyles() {
        if (document.getElementById('rs-dynamic-styles')) return;
        const style = document.createElement('style');
        style.id = 'rs-dynamic-styles';
        
        style.innerHTML = `
            .rs-modal-overlay.klaro {
                position: fixed; inset: 0; background: rgba(0,0,0,0.7);
                display: none; align-items: center; justify-content: center;
                z-index: 1000000; 
                font-family: var(--font-family, sans-serif);
            }
            .rs-modal-content {
                background: #ffffff; 
                padding: 30px; 
                border-radius: 0; 
                max-width: 500px; 
                width: 90%; 
                text-align: left;
                box-shadow: var(--klaro-dialog-focus-box-shadow, 0 4px 6px rgba(0,0,0,0.2));
            }
            .rs-modal-content h3 { 
                margin: 0 0 15px 0; 
                color: var(--color-3, #333); 
                font-size: 1.5rem; 
                font-family: var(--title-font-family, inherit);
                font-weight: bold;
            }
            .rs-modal-content p { 
                color: #555; 
                line-height: 1.6; 
                font-size: 1rem; 
                margin-bottom: 30px;
            }
            .rs-modal-buttons { 
                display: flex; 
                flex-wrap: wrap;
                gap: 10px; 
                justify-content: flex-start; 
            }
            /* Zustimmen Button - Nutzt deine Primary Variablen */
            .rs-btn-confirm { 
                background: var(--klaro-button-bg);
                color: var(--klaro-button-text-color);
                border: var(--klaro-button-border);
                border-radius: var(--klaro-button-border-radius);
                padding: var(--klaro-button-padding);
                font-size: var(--klaro-button-font-size);
                font-weight: var(--klaro-button-font-weight);
                line-height: var(--klaro-button-line-height);
                cursor: pointer;
            }
            .rs-btn-confirm:hover {
                background: var(--klaro-button-bg-hover);
                color: var(--klaro-button-text-color-hover);
                border: var(--klaro-button-border-hover);
            }
            /* Schließen Button - Nutzt die Danger/Sekundär Optik aus deiner CSS */
            .rs-btn-close { 
                background: var(--color-2, #eee);
                color: var(--color-3, #333);
                border: 3px solid var(--color-3, #333);
                border-radius: var(--klaro-button-border-radius);
                padding: var(--klaro-button-padding);
                cursor: pointer;
                font-size: var(--klaro-button-font-size);
            }
            .rs-btn-close:hover {
                background: var(--color-4);
                color: var(--color-2);
                border-color: var(--color-4);
            }
        `;
        document.head.appendChild(style);
    }
}

// Initialisierung
const rsHandler = new ReadSpeakerHandler();