

/**
 * @file
 * Passt das Styling des jQuery UI Dialogs an (Native JS + MutationObserver).
 */

(function () {
  'use strict';

  // Definiert die gewünschte vertikale Polsterung (oben + unten) für den Dialog.
  // 10px oben + 10px unten = 20px insgesamt.
  const VERTICAL_PADDING = 20;

  /**
   * Berechnet die dynamische Höhe des Dialog-Inhalts und wendet Styles an.
   * @param {HTMLElement} dialogElement - Das .ui-dialog Element.
   */
  function applyDialogStyles(dialogElement) {
    // Verhindert rekursive Aufrufe während des Updates
    if (dialogElement._isUpdating) {
      return;
    }
    dialogElement._isUpdating = true;

    const dialogContent = dialogElement.querySelector('.ui-dialog-content');
    if (!dialogContent) {
      dialogElement._isUpdating = false;
      return;
    }

    // Falls bereits ein interner Observer existiert, pausieren wir ihn, 
    // um keine Loop durch eigene Style-Änderungen auszulösen.
    if (dialogElement._internalObserver) {
        dialogElement._internalObserver.disconnect();
    }

    const headerElement = dialogElement.querySelector('.ui-widget-header');
    const buttonPaneElement = dialogElement.querySelector('.ui-dialog-buttonpane');

    // 1. *** Positionierung auf 'fixed' setzen und 10px Top
    dialogElement.style.setProperty('position', 'fixed', 'important');
    dialogElement.style.setProperty('top', '10px', 'important');
    dialogElement.style.setProperty('left', '50%', 'important');
    dialogElement.style.setProperty('transform', 'translateX(-50%)', 'important');
    dialogElement.style.setProperty('margin-left', '0', 'important');

    // Breite anpassen: 95% Breite, aber maximal 1200px
    dialogElement.style.setProperty('width', '95%', 'important');
    dialogElement.style.setProperty('max-width', '1200px', 'important');
    
    // Bottom auf auto setzen, da wir die Height explizit steuern
    dialogElement.style.setProperty('bottom', 'auto', 'important');
    
    // Wichtig: Box-Sizing auf Border-Box
    dialogElement.style.setProperty('box-sizing', 'border-box', 'important');

    // 2. Höhe der Bedienelemente abrufen
    const headerHeight = headerElement ? headerElement.offsetHeight : 0;
    const buttonPaneHeight = buttonPaneElement ? buttonPaneElement.offsetHeight : 0;

    // 3. Bestimme die Gesamthöhe des Dialog-Wrappers (.ui-dialog).
    const dialogHeight = window.innerHeight - VERTICAL_PADDING;
    
    dialogElement.style.setProperty('height', `${dialogHeight}px`, 'important');

    // 4. Berechne die Höhe des Inhalts.
    // Regel: ui-dialog-content höhe = ui-dialog - ui-widget-header - ui-dialog-buttonpane
    const calculatedContentHeight = dialogHeight - headerHeight - buttonPaneHeight;

    // 5. Wende die berechnete Höhe auf den Inhalt an.
    dialogContent.style.setProperty('box-sizing', 'border-box', 'important');
    dialogContent.style.setProperty('height', `${calculatedContentHeight}px`, 'important');
    dialogContent.style.setProperty('max-height', 'none', 'important');

    // 6. Internen Observer konfigurieren
    const observerConfig = { 
        childList: true, // Überwacht Hinzufügen/Entfernen von Elementen (z.B. Fehler-Divs)
        subtree: true,   // Auch tiefer im Baum
        attributes: true, // Attribute (z.B. style-Änderungen durch jQuery UI)
        attributeFilter: ['style', 'class', 'hidden'] 
    };

    // Internen Observer erstellen, falls noch nicht vorhanden
    if (!dialogElement._internalObserver) {
        dialogElement._internalObserver = new MutationObserver((mutations) => {
             // Wir rufen applyDialogStyles erneut auf, wenn sich im Dialog etwas ändert.
             applyDialogStyles(dialogElement);
        });
    }
    
    // Observer (wieder) starten
    dialogElement._internalObserver.observe(dialogElement, observerConfig);

    dialogElement._isUpdating = false;
  }

  // Globaler Resize Handler
  let resizeTimeout;
  window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
          const dialogs = document.querySelectorAll('.ui-dialog');
          dialogs.forEach(dialog => {
              applyDialogStyles(dialog);
          });
      }, 100);
  });

  /**
   * MutationObserver für den Body (neue Dialoge)
   */
  const observerCallback = (mutationsList) => {
    for (const mutation of mutationsList) {
      if (mutation.type === 'childList') {
        mutation.addedNodes.forEach(node => {
          if (node.nodeType === 1 && node.classList.contains('ui-dialog')) {
            setTimeout(() => applyDialogStyles(node), 0);
          }
        });
      }
    }
  };

  const observer = new MutationObserver(observerCallback);
  document.addEventListener('DOMContentLoaded', () => {
    observer.observe(document.body, { childList: true });
    // Initial check
    document.querySelectorAll('.ui-dialog').forEach(node => applyDialogStyles(node));
  });

})();