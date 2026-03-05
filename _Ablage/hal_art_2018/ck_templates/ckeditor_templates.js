
// Override the default template set
CKEDITOR.addTemplates( 'default', {
	// The name of sub folder which hold the shortcut preview images of the
	// templates.
	imagesPath: '/sites/all/themes/mkb_2018/ck_templates/',

	// The templates definitions.
	templates: [ {
		title: 'Kontakt- / Adressfelder',
		image: 'label_text.png',
		description: 'Vorlage für Kontaktangaben bzw. Adressen',
		html: '<p class="m-0">' +
			       '<strong class="font-weight-bold">' +
                  'Überschrift / Firma' +
               '</strong>' +
            '</p>' +
            '<table>' +
               '<tr>' +
                  '<td>' +
                     'Straße, Hausnummer: ' +
                  '</td>' +
                  '<td>?</td>' +
               '</tr>' +
               '<tr>' +
                  '<td>' +
                     'PLZ, Ort: ' +
                  '</td>' +
                  '<td>?</td>' +
               '</tr>' +
               '<tr>' +
                  '<td>' +
                     'Tel.: ' +
                  '</td>' +
                  '<td>?</td>' +
               '</tr>' +
               '<tr>' +
                  '<td>' +
                     'Fax: ' +
                  '</td>' +
                  '<td>?</td>' +
               '</tr>' +
               '<tr>' +
                  '<td>' +
                     'E-Mail: ' +
                  '</td>' +
                  '<td>?</td>' +
               '</tr>' +
               '<tr>' +
                  '<td>' +
                     'Web: ' +
                  '</td>' +
                  '<td>?</td>' +
               '</tr>' +
            '</table>'
	} ]
} );
