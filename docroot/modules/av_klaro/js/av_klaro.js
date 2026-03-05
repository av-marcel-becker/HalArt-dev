// Funktion, um den onclick-Handler zu einem Link hinzuzufügen.
const addKlaroClickHandler = (linkElement) => {
  // Setzt das onclick-Attribut, um den Klaro-Cookie-Manager anzuzeigen.
  linkElement.setAttribute('onclick', 'klaro.show(); return false;');
};

// Funktion, um Links in einem gegebenen Knoten (und seinen Kindern) zu finden und zu verarbeiten.
const processLinksInNode = (node) => {
  // Sicherstellen, dass der Knoten ein Element-Knoten ist.
  if (node.nodeType === Node.ELEMENT_NODE) {
    const element = node;

    // Überprüfen, ob der Knoten selbst der gesuchte Link ist.
    if (element.matches('a[href="#cookie_einstellungen"]')) {
      addKlaroClickHandler(element);
    }

    // Alle passenden Links innerhalb des Knotens finden und verarbeiten.
    const links = element.querySelectorAll('a[href="#cookie_einstellungen"]');
    links.forEach(addKlaroClickHandler);
  }
};

// Dieses Skript wird ausgeführt, nachdem das Dokument vollständig geladen wurde.
document.addEventListener('DOMContentLoaded', () => {
  // Zuerst alle Links verarbeiten, die beim Laden der Seite bereits vorhanden sind.
  processLinksInNode(document.body);

  // Erstellen eines MutationObserver, um auf zukünftige Änderungen im DOM zu achten.
  const observer = new MutationObserver((mutationsList) => {
    // Für jede Mutation...
    for (const mutation of mutationsList) {
      // ...wenn neue Knoten hinzugefügt wurden...
      if (mutation.type === 'childList') {
        // ...verarbeiten Sie jeden hinzugefügten Knoten.
        mutation.addedNodes.forEach(processLinksInNode);
      }
    }
  });

  // Konfiguration für den Observer: Beobachte das Hinzufügen von Kind-Elementen im gesamten body-Subtree.
  const config = {
    childList: true,
    subtree: true
  };

  // Starten des Observers, um den body auf Änderungen zu überwachen.
  observer.observe(document.body, config);
});

/*
document.addEventListener('DOMContentLoaded', () => {
  // Finden Sie alle a-Elemente mit einem href-Attribut von "#cookie_einstellungen".
  const cookieSettingLinks = document.querySelectorAll('a[href="#cookie_einstellungen"]');

  // Fügen Sie fuer jeden dieser Links das onclick-Attribut hinzu, um den Klaro-Cookie-Manager anzuzeigen.
  cookieSettingLinks.forEach(link => {
    link.setAttribute('onclick', 'klaro.show(); return false;');
  });
});
*/