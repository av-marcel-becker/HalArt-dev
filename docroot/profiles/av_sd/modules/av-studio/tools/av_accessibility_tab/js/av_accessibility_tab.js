(function() {
  // Konfiguration für funktionale Aspekte
  const config = {
    // Helligkeitsschwellwert zur Unterscheidung hell/dunkel (0-255)
    brightnessThreshold: 128,
    // Standard-Fokusfarben (können über CSS überschrieben werden)
    defaultLightFocusColor: '#0066cc',
    defaultDarkFocusColor: '#4db8ff',
  };

  // Hilfsfunktion zum Umwandeln von RGB in Helligkeitswert
  const getBrightness = (r, g, b) => {
    // Berechnung der Helligkeit nach YIQ-Formel
    return (r * 299 + g * 587 + b * 114) / 1000;
  };

  // Cache für bereits berechnete Werte - jetzt mit regulären Maps
  let brightnessCache = new Map();
  let focusColorCache = new Map();
  let backgroundElementCache = new Map();
  // Ein Map zum Speichern der event listener für Labels
  const labelListeners = new Map();

  // Hilfsfunktion zur Begrenzung der Anzahl der Aufrufe einer Funktion
  const debounce = (func, wait) => {
    let timeout;
    return function(...args) {
      const later = () => {
        timeout = null;
        func.apply(this, args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  };

  // Funktion zur Bestimmung der Helligkeit einer Farbe - optimiert
  const getBackgroundBrightness = (element, recursionDepth = 0) => {
    // Rekursionstiefe begrenzen, um Endlosschleifen zu vermeiden
    if (!element || recursionDepth > 10) {
      return config.brightnessThreshold; // Fallback-Wert
    }

    // Prüfen, ob für dieses Element bereits eine Helligkeit berechnet wurde
    const elementId = element.id || element.tagName + "-" + Math.random().toString(36).substr(2, 9);
    if (brightnessCache.has(elementId)) {
      return brightnessCache.get(elementId);
    }

    // Wir verwenden try/catch um mögliche DOM-Fehler zu verhindern
    try {
      const style = window.getComputedStyle(element);
      let backgroundColor = style.backgroundColor;

      // Wenn transparent, prüfe übergeordnete Elemente
      if (backgroundColor === 'transparent' || backgroundColor === 'rgba(0, 0, 0, 0)') {
        if (element.parentElement) {
          const parentBrightness = getBackgroundBrightness(element.parentElement, recursionDepth + 1);
          brightnessCache.set(elementId, parentBrightness); // Cache auch für transparente Elemente
          return parentBrightness;
        }
        // Fallback: Annahme eines mittleren Grautons
        return config.brightnessThreshold;
      }

      // RGB-Werte extrahieren
      let r = 128, g = 128, b = 128; // Standard-Grauton als Fallback

      if (backgroundColor.startsWith('rgb')) {
        const match = backgroundColor.match(/\d+/g);
        if (match && match.length >= 3) {
          r = parseInt(match[0], 10);
          g = parseInt(match[1], 10);
          b = parseInt(match[2], 10);
        }
      } else if (backgroundColor.startsWith('#')) {
        // Hex-Farben verarbeiten
        const hex = backgroundColor.substring(1);
        if (hex.length === 3) { // Kurzform #RGB
            r = parseInt(hex.substring(0, 1) + hex.substring(0, 1), 16);
            g = parseInt(hex.substring(1, 2) + hex.substring(1, 2), 16);
            b = parseInt(hex.substring(2, 3) + hex.substring(2, 3), 16);
        } else if (hex.length === 6) { // Langform #RRGGBB
            r = parseInt(hex.substring(0, 2), 16);
            g = parseInt(hex.substring(2, 4), 16);
            b = parseInt(hex.substring(4, 6), 16);
        }
      }
      // Andere Farbformate werden mit dem Fallback-Grauton behandelt

      // Helligkeit berechnen
      const brightness = getBrightness(r, g, b);

      // Im Cache speichern
      brightnessCache.set(elementId, brightness);

      return brightness;
    } catch (e) {
      console.warn('Fehler bei Helligkeitsberechnung:', e);
      return config.brightnessThreshold; // Fallback bei Fehlern
    }
  };

  // Funktion zur Bestimmung der optimalen Fokusfarbe aus CSS-Variablen - optimiert
  const getOptimalFocusColor = (element) => {
    // Cache prüfen
    const elementId = element.id || element.tagName + "-" + Math.random().toString(36).substr(2, 9);
    if (focusColorCache.has(elementId)) {
      return focusColorCache.get(elementId);
    }

    // Funktionsaufrufe reduzieren durch Referenzierung
    try {
      const brightness = getBackgroundBrightness(element);
      const rootStyle = getComputedStyle(document.documentElement);

      // Lese die Farbwerte aus den CSS-Variablen, mit Fallback auf die JS-Defaults
      const lightColor = rootStyle.getPropertyValue('--focus-color-light').trim() || config.defaultLightFocusColor;
      const darkColor = rootStyle.getPropertyValue('--focus-color-dark').trim() || config.defaultDarkFocusColor;

      // Für dunkle Hintergründe helle Fokusfarbe, für helle Hintergründe dunkle Fokusfarbe
      const color = brightness < config.brightnessThreshold ? darkColor : lightColor;
      
      // Im Cache speichern
      focusColorCache.set(elementId, color);
      
      return color;
    } catch (e) {
      console.warn('Fehler bei Farbbestimmung:', e);
      return config.defaultLightFocusColor; // Fallback
    }
  };

  // Funktion zur Ermittlung des umgebenden Hintergrunds - optimiert
  const getSurroundingBackground = (element) => {
    // Cache prüfen
    const elementId = element.id || element.tagName + "-" + Math.random().toString(36).substr(2, 9);
    if (backgroundElementCache.has(elementId)) {
      return backgroundElementCache.get(elementId);
    }

    try {
      // Finde den nächsten Eltern-Container mit definiertem Hintergrund
      let current = element;
      let maxDepth = 10; // Tiefenbegrenzung hinzugefügt
      
      while (current && current !== document.body && maxDepth > 0) {
        // Wir prüfen einen Level höher, um den Hintergrund zu finden, auf dem das Element liegt
        if (current.parentElement) {
          current = current.parentElement;
          const style = window.getComputedStyle(current);
          const backgroundColor = style.backgroundColor;

          // Wenn ein nicht-transparenter Hintergrund gefunden wurde
          if (backgroundColor !== 'transparent' && backgroundColor !== 'rgba(0, 0, 0, 0)') {
            backgroundElementCache.set(elementId, current);
            return current;
          }
        } else {
          break;
        }
        maxDepth--;
      }

      // Fallback: body oder das ursprüngliche Element zurückgeben
      const result = document.body || element;
      backgroundElementCache.set(elementId, result);
      return result;
    } catch (e) {
      console.warn('Fehler bei Hintergrundermittlung:', e);
      return document.body || element; // Fallback
    }
  };

  // CSS für die Fokus-Markierung erstellen (nutzt CSS-Variablen)
  const createFocusStyles = () => {
    // Prüfen, ob bereits ein Style-Element existiert
    if (document.getElementById('focus-styles')) {
      return;
    }
    
    const style = document.createElement('style');
    style.id = 'focus-styles';
    style.textContent = `
      /* Standard-CSS-Variablen für den Fokus-Indikator */
      :root {
        --focus-outline-width: 3px;
        --focus-outline-style: solid;
        --focus-outline-offset: 2px;
        --focus-border-radius: 2px;
        --focus-transition: outline-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out; /* Übergang für Farbe und ggf. Offset */
        --focus-color-light: ${config.defaultLightFocusColor}; /* Fallback, falls nicht im CSS definiert */
        --focus-color-dark: ${config.defaultDarkFocusColor};   /* Fallback, falls nicht im CSS definiert */
        --current-focus-color: var(--focus-color-light); /* Standardmäßig helle Farbe */
      }

      /* Basis-Stil: Standard-Outline entfernen, wenn JS aktiv ist */
      .js-focus-visible :focus:not(.focus-visible) {
        outline: none;
      }

      /* Sichtbare Markierung nur für Tastatur-Fokus */
      .js-focus-visible .focus-visible {
        /* Verwende CSS-Variablen für das Styling */
        outline-width: var(--focus-outline-width) !important;
        outline-style: var(--focus-outline-style) !important;
        outline-offset: var(--focus-outline-offset) !important;
        border-radius: var(--focus-border-radius) !important;
        transition: var(--focus-transition) !important;
        /* Die Farbe wird über die Variable --current-focus-color gesteuert */
        outline-color: var(--current-focus-color) !important;
      }
      
      /* Labels ohne tabindex sollen nicht fokussierbar sein */
      label[for]:not([tabindex]) {
        outline: none !important;
      }
    `;
    document.head.appendChild(style);
  };

  // Verbesserte Funktion zur Erkennung der Tab-Navigation
  const setupTabNavigation = () => {
    let isUsingKeyboard = false;

    // Bei Tastatur-Events
    document.addEventListener('keydown', e => {
      // Tab-Taste erkennen (9) oder Pfeiltasten etc.
      if (e.key === 'Tab' || e.key.startsWith('Arrow')) {
        isUsingKeyboard = true;
        document.body.classList.add('js-focus-visible');
      }
    });

    // Bei Maus-Events Keyboard-Modus deaktivieren
    document.addEventListener('mousedown', () => {
      isUsingKeyboard = false;
    }, { passive: true }); // Passive listener hinzugefügt

    // Bei Touch-Events Keyboard-Modus deaktivieren
    document.addEventListener('touchstart', () => {
      isUsingKeyboard = false;
    }, { passive: true });

    // Fokus-Events optimiert überwachen
    document.addEventListener('focusin', e => {
      try {
        if (isUsingKeyboard && e.target) {
          // Nur für fokussierbare Elemente
          if (e.target.matches('a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])')) {
            e.target.classList.add('focus-visible');

            // Spezielle Behandlung für File-Input mit opacity: 0
            if (e.target.tagName === 'INPUT' && e.target.type === 'file') {
              const style = window.getComputedStyle(e.target);
              
              // Wenn Opacity 0 ist, versuche .upload-name zu finden
              if (style.opacity === '0') {
                // Finde den Container, in dem sich der Input befindet
                const container = e.target.closest('.upload-container') || e.target.parentElement;
                if (container) {
                  // Finde das .upload-name Element im Container
                  const uploadName = container.querySelector('.upload-name');
                  if (uploadName) {
                    // Entferne focus-visible vom input
                    e.target.classList.remove('focus-visible');
                    
                    // Übertrage focus-visible auf .upload-name
                    uploadName.classList.add('focus-visible');
                    
                    // Optimierte Hintergrund- und Farbberechnung
                    const backgroundElement = getSurroundingBackground(uploadName);
                    const focusColor = getOptimalFocusColor(backgroundElement);
                    
                    // Setze die CSS-Variable für die aktuelle Fokusfarbe am .upload-name Element
                    uploadName.style.setProperty('--current-focus-color', focusColor);
                  }
                }
              } else {
                // Standard-Behandlung für sichtbare Inputs
                const backgroundElement = getSurroundingBackground(e.target);
                const focusColor = getOptimalFocusColor(backgroundElement);
                e.target.style.setProperty('--current-focus-color', focusColor);
              }
            } else {
              // Normaler Fall mit optimierter Verarbeitung
              const backgroundElement = getSurroundingBackground(e.target);
              const focusColor = getOptimalFocusColor(backgroundElement);
              e.target.style.setProperty('--current-focus-color', focusColor);
            }
          }
        }
      } catch (err) {
        console.warn('Fehler bei Fokusbehandlung:', err);
      }
    });

    document.addEventListener('focusout', e => {
      try {
        if (e.target && typeof e.target.classList?.remove === 'function') {
          e.target.classList.remove('focus-visible');
          e.target.style.removeProperty('--current-focus-color');
          
          // Falls es sich um ein File-Input handelt, auch das .upload-name Element bereinigen
          if (e.target.tagName === 'INPUT' && e.target.type === 'file') {
            const style = window.getComputedStyle(e.target);
            
            if (style.opacity === '0') {
              const container = e.target.closest('.upload-container') || e.target.parentElement;
              if (container) {
                const uploadName = container.querySelector('.upload-name');
                if (uploadName) {
                  uploadName.classList.remove('focus-visible');
                  uploadName.style.removeProperty('--current-focus-color');
                }
              }
            }
          }
        }
      } catch (err) {
        console.warn('Fehler bei Fokus-Out-Behandlung:', err);
      }
    });
  };

  // Optimierte Funktion für das Management der Labels-Fokussierbarkeit
  const setupLabelsFocusability = () => {
    // Funktion zum setzen der Tabindex und Listener für Labels
    const processLabel = (label) => {
      try {
        if (!label.hasAttribute('for')) return;
        
        const inputId = label.getAttribute('for');
        const inputField = document.getElementById(inputId);
        
        if (!inputField) return;
        
        // Bestehende Listener entfernen, falls vorhanden
        const labelId = label.id || 'label-' + inputId;
        if (labelListeners.has(labelId)) {
          label.removeEventListener('keydown', labelListeners.get(labelId));
          labelListeners.delete(labelId);
        }
        
        // Compute style nur einmal aufrufen
        const style = window.getComputedStyle(inputField);
        
        // Label nur fokussierbar machen, wenn das zugehörige Feld visibility: hidden hat
        if (style.visibility === 'hidden') {
          label.setAttribute('tabindex', '0');
          
          // Neuen Listener erstellen und speichern
          const listener = (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault();
              
              inputField.focus();
              if (inputField.type === 'checkbox' || inputField.type === 'radio') {
                inputField.click();
              }
            }
          };
          
          // Listener speichern und hinzufügen
          labelListeners.set(labelId, listener);
          label.addEventListener('keydown', listener);
        } else {
          // Stelle sicher, dass Label nicht fokussierbar ist, wenn Input sichtbar ist
          label.removeAttribute('tabindex');
        }
      } catch (err) {
        console.warn('Fehler bei Label-Processing:', err);
      }
    };
    
    // Debounced Funktion zur Verarbeitung aller Labels
    const updateAllLabels = debounce(() => {
      try {
        const labels = document.querySelectorAll('label[for]');
        labels.forEach(processLabel);
      } catch (err) {
        console.warn('Fehler bei Label-Updates:', err);
      }
    }, 100); // 100ms Verzögerung
    
    // Initial alle Labels verarbeiten
    updateAllLabels();
    
    // MutationObserver optimiert: Nur auf relevante Änderungen reagieren
    const observer = new MutationObserver(mutations => {
      let shouldUpdate = false;
      
      for (const mutation of mutations) {
        // Nur bestimmte Änderungen berücksichtigen
        if (mutation.type === 'attributes' && 
           (mutation.attributeName === 'style' || 
            mutation.attributeName === 'visibility' || 
            mutation.attributeName === 'for')) {
          shouldUpdate = true;
          break;
        }
        
        // Nur bei DOM-Änderungen prüfen, wenn neue Labels/Inputs hinzugefügt wurden
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
          for (const node of mutation.addedNodes) {
            if (node.nodeType === Node.ELEMENT_NODE) {
              if (node.matches('label[for]') || 
                  node.matches('input') || 
                  node.querySelector('label[for], input')) {
                shouldUpdate = true;
                break;
              }
            }
          }
        }
        
        if (shouldUpdate) break;
      }
      
      if (shouldUpdate) {
        // Debounced Funktion aufrufen, um gehäufte Aufrufe zu vermeiden
        updateAllLabels();
      }
    });
    
    // Observer effizienter konfigurieren
    observer.observe(document.body, { 
      childList: true, 
      subtree: true,
      attributes: true,
      attributeFilter: ['style', 'visibility', 'for'],
      attributeOldValue: false // Alte Werte nicht tracken
    });
    
    // Observer für Cleanup speichern
    window.tabNavigationObserver = observer;
  };

  // Cache leeren Funktion - mit neuem Ansatz
  const clearCaches = debounce(() => {
    // Caches komplett neu erstellen statt .clear()
    brightnessCache = new Map();
    focusColorCache = new Map();
    backgroundElementCache = new Map();
  }, 5000);

  // Aufräumen bei Window-Events
  window.addEventListener('resize', clearCaches);
  window.addEventListener('scroll', debounce(clearCaches, 1000), { passive: true });

  // Initialisierung
  const init = () => {
    try {
      createFocusStyles();
      setupTabNavigation();
      setupLabelsFocusability();
      
      // Log beim Start
      console.log('Tab Navigation Focus Indicator (optimierte Version) initialisiert');
    } catch (err) {
      console.error('Fehler bei der Initialisierung:', err);
    }
  };

  // Script starten, wenn das DOM geladen ist
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();