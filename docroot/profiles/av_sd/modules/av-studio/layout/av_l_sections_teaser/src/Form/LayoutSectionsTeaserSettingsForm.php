<?php
   ############################
   # Admin Settings
   ############################
   namespace Drupal\av_l_sections_teaser\Form;
   
   use Drupal\Core\Form\ConfigFormBase;
   use Drupal\Core\Form\FormStateInterface;

   use Drupal\av_l_default\Helper;
   
   class LayoutSectionsTeaserSettingsForm extends ConfigFormBase
      {
         const LAYOUT_SETTINGS = 'av_l_sections_teaser.settings';        
            
         public function __construct()
            {
               
            } 
            
         public function getFormId()
            {
               return 'av_l_sections_teaser_settings';
            }
            
         protected function getEditableConfigNames()
            {
               return [static::LAYOUT_SETTINGS,];
            }
            
         public function buildForm(array $form, FormStateInterface $form_state)
            {
               // load settings NOT REMOVE!!!
               $config = $this->config(static::LAYOUT_SETTINGS);
               // set form elements
               $form += Helper::get_backend_form_elements($this->get_setup(),static::LAYOUT_SETTINGS);
                        
               return parent::buildForm($form, $form_state);
            }
            
         public function submitForm(array &$form, FormStateInterface $form_state) 
            {
               $values = $form_state->getValues();
               unset($values['submit']);
               unset($values['op']);
               $setup = $this->get_setup();
               $settings = Helper::get_backend_submit_form_elements($setup,$values);
               
               $this->configFactory->getEditable(static::LAYOUT_SETTINGS)->delete();
               $config = $this->configFactory->getEditable(static::LAYOUT_SETTINGS);
                                 
               foreach($settings as $key => $value) 
                  {
                     $config->set($key, $value);
                  }

               $config->save();
               parent::submitForm($form, $form_state);
            }
         // ###########################################################################################
         // custom functions

         public function get_setup()
            {
               return   [
                     # vertical tab
                     'setting' => [
                           'title' => 'Einstellungen',
                           'items' => [
                                 # details
                                 'default' => [
                                       'title' => 'Standard Werte',
                                       'items' => [
                                             # fieldset
                                             'section' => [
                                                   'title' => 'Abschnitt',
                                                   'description' => 'Standard Eigenschaften des Abschnittes',
                                                   'items' => [
                                                         # fields     
                                                         /*                                                         
                                                         '' => [
                                                               'type' => '',
                                                               'title' => '',
                                                               'default_value' => '',
                                                               'description' => '',
                                                            ],
                                                         */  
                                                         'section_expansion' => [
                                                               'type' => 'textarea',
                                                               'title' => 'Ausdehnung des Inhalts',
                                                               'default_value' => "cssf--gc_content|Container für Standard Inhalte\r\ncssf--gc_outside|Container für Teaser oder Eye-Catcher\r\ncssf--gc_full|Container für Blöcke",
                                                               'description' => 'key|value und umbruch; set --layout-content und --layout-outside in Theme',
                                                            ],
                                                   #      'section_align_items' => [
                                                   #            'type' => 'textarea',
                                                   #            'title' => 'Regionen ausrichten (Vertikal)',
                                                   #            'default_value' => "cssf--ai_stretch|Auf volle Höhe ausdehnen\r\ncssf--ai_start|oben positionieren\r\ncssf--ai_center|mittig positionieren\r\ncssf--ai_end|unten positionieren",
                                                   #            'description' => 'key|value und umbruch',
                                                   #         ], 
                                                         'section_background_color' => [
                                                               'type' => 'textarea',
                                                               'title' => 'Hintergrundfarben',
                                                               'default_value' => "#000000|cssf--tpl-bgc-var_1\r\n#ffffff|cssf--tpl-bgc-var_2\r\n#ffaaaa|cssf--tpl-bgc-var_3\r\n#aaffaa|cssf--tpl-bgc-var_4\r\n#aaaaff|cssf--tpl-bgc-var_5\r\n#ffffaa|cssf--tpl-bgc-var_6\r\n#ffaaff|cssf--tpl-bgc-var_7\r\n#aaffff|cssf--tpl-bgc-var_8\r\n#aa3333|cssf--tpl-bgc-var_9\r\n#33aa33|cssf--tpl-bgc-var_10\r\n#3333aa|cssf--tpl-bgc-var_11\r\n#aaaa33|cssf--tpl-bgc-var_12\r\n#aa33aa|cssf--tpl-bgc-var_13\r\n#33aaaa|cssf--tpl-bgc-var_14",
                                                               'description' => 'Hex|class mit Umbruch',
                                                            ],
                                                         'section_custom' => [
                                                               'type' => 'textarea',
                                                               'title' => 'Benutzerdefiniert',
                                                               'default_value' => "custom-section-none|-\r\ncustom-section-1|Benutzerdefiniert 1",
                                                               'description' => 'key|value mit Umbruch',
                                                            ],
                                                      ] ,  
                                                ],
                                             # fieldset
                                             'header' => [
                                                   'title' => 'Kopfbereich',
                                                   'description' => 'Standard Eigenschaften des Kopfbereichs',
                                                   'items' => [
                                                         # fields     
                                                         /*                                                         
                                                         '' => [
                                                               'type' => '',
                                                               'title' => '',
                                                               'default_value' => '',
                                                               'description' => '',
                                                            ],
                                                         */  
                                                         'header_justify_content' => [
                                                               'type' => 'textarea',
                                                               'title' => 'Inhalt ausrichten (Horizontal)',
                                                               'default_value' => "cssf--jc_start|links\r\ncssf--jc_center|mittig\r\ncssf--jc_end|rechts",
                                                               'description|key|value und umbruch',
                                                            ],
                                                         'header_align_content' => [
                                                               'type' => 'textarea',
                                                               'title' => 'Inhalt ausrichten (Vertikal)',
                                                               'default_value' => "cssf--ac_start|oben\r\ncssf--ac_center|mittig\r\ncssf--ac_end|unten",
                                                               'description' => 'key|value und umbruch',
                                                            ], 
                                                         'header_background_color' => [
                                                               'type' => 'textarea',
                                                               'title' => 'Hintergrundfarben',
                                                               'default_value' => "#000000|cssf--tpl-bgc-var_1\r\n#ffffff|cssf--tpl-bgc-var_2",
                                                               'description' => 'Hex|class mit Umbruch',
                                                            ],
                                                         'header_custom' => [
                                                               'type' => 'textarea',
                                                               'title' => 'Benutzerdefiniert',
                                                               'default_value' => "custom-region-header-none|-\r\ncustom-region-header-1|Benutzerdefiniert 1",
                                                               'description' => 'key|value mit Umbruch',
                                                            ],
                                                      ] ,  
                                                ],
                                             # fieldset
                                             'region_1' => [
                                                   'title' => 'Region 1',
                                                   'description' => 'Standard Eigenschaften der 1. Region',
                                                   'items' => [
                                                         # fields     
                                                         /*                                                         
                                                         '' => [
                                                               'type' => '',
                                                               'title' => '',
                                                               'default_value' => '',
                                                               'description' => '',
                                                            ],
                                                         */  
                                                         'region_1_align_self' => [
                                                               'type' => 'textarea',
                                                               'title' => 'Region ausrichten (Vertikal)',
                                                               'default_value' => "cssf--as_unset|-\r\ncssf--as_stretch|Auf Container-Höhe ausdehnen\r\ncssf--as_start|oben positionieren\r\ncssf--as_center|mittig positionieren\r\ncssf--as_end|unten positionieren",
                                                               'description' => 'key|value und umbruch',
                                                            ], 
                                                         'region_1_justify_content' => [
                                                               'type' => 'textarea',
                                                               'title' => 'Inhalt ausrichten (Horizontal)',
                                                               'default_value' => "cssf--jc_start|links\r\ncssf--jc_center|mittig\r\ncssf--jc_end|rechts",
                                                               'description|key|value und umbruch',
                                                            ],
                                                         'region_1_align_content' => [
                                                               'type' => 'textarea',
                                                               'title' => 'Inhalt ausrichten (Vertikal)',
                                                               'default_value' => "cssf--ac_start|oben\r\ncssf--ac_center|mittig\r\ncssf--ac_end|unten",
                                                               'description' => 'key|value und umbruch',
                                                            ], 
                                                         'region_1_background_color' => [
                                                               'type' => 'textarea',
                                                               'title' => 'Hintergrundfarben',
                                                               'default_value' => "#000000|cssf--tpl-bgc-var_1\r\n#ffffff|cssf--tpl-bgc-var_2",
                                                               'description' => 'Hex|class mit Umbruch',
                                                            ],
                                                         'region_1_custom' => [
                                                               'type' => 'textarea',
                                                               'title' => 'Benutzerdefiniert',
                                                               'default_value' => "custom-region-1-none|-\r\ncustom-region-1-1|Benutzerdefiniert 1",
                                                               'description' => 'key|value mit Umbruch',
                                                            ],
                                                      ] ,  
                                                ],
                                             # fieldset
                                             'region_2' => [
                                                   'title' => 'Region 2',
                                                   'description' => 'Standard Eigenschaften der 2. Region',
                                                   'items' => [
                                                         # fields     
                                                         /*                                                         
                                                         '' => [
                                                               'type' => '',
                                                               'title' => '',
                                                               'default_value' => '',
                                                               'description' => '',
                                                            ],
                                                         */   
                                                         'region_2_align_self' => [
                                                               'type' => 'textarea',
                                                               'title' => 'Region ausrichten (Vertikal)',
                                                               'default_value' => "cssf--as_unset|-\r\ncssf--as_stretch|Auf Container-Höhe ausdehnen\r\ncssf--as_start|oben positionieren\r\ncssf--as_center|mittig positionieren\r\ncssf--as_end|unten positionieren",
                                                               'description' => 'key|value und umbruch',
                                                            ], 
                                                         'region_2_justify_content' => [
                                                               'type' => 'textarea',
                                                               'title' => 'Inhalt ausrichten (Horizontal)',
                                                               'default_value' => "cssf--jc_start|links\r\ncssf--jc_center|mittig\r\ncssf--jc_end|rechts",
                                                               'description|key|value und umbruch',
                                                            ],
                                                         'region_2_align_content' => [
                                                               'type' => 'textarea',
                                                               'title' => 'Inhalt ausrichten (Vertikal)',
                                                               'default_value' => "cssf--ac_start|oben\r\ncssf--ac_center|mittig\r\ncssf--ac_end|unten",
                                                               'description' => 'key|value und umbruch',
                                                            ],
                                                         'region_2_background_color' => [
                                                               'type' => 'textarea',
                                                               'title' => 'Hintergrundfarben',
                                                               'default_value' => "#000000|cssf--tpl-bgc-var_1\r\n#ffffff|cssf--tpl-bgc-var_2",
                                                               'description' => 'Hex|class mit Umbruch',
                                                            ],
                                                         'region_2_custom' => [
                                                               'type' => 'textarea',
                                                               'title' => 'Benutzerdefiniert',
                                                               'default_value' => "custom-region-2-none|-\r\ncustom-region-2-1|Benutzerdefiniert 1",
                                                               'description' => 'key|value mit Umbruch',
                                                            ],
                                                      ] ,  
                                                ],
                                             # fieldset
                                             'region_3' => [
                                                   'title' => 'Region 3',
                                                   'description' => 'Standard Eigenschaften der 3. Region',
                                                   'items' => [
                                                         # fields     
                                                         /*                                                         
                                                         '' => [
                                                               'type' => '',
                                                               'title' => '',
                                                               'default_value' => '',
                                                               'description' => '',
                                                            ],
                                                         */  
                                                         'region_3_align_self' => [
                                                               'type' => 'textarea',
                                                               'title' => 'Region ausrichten (Vertikal)',
                                                               'default_value' => "cssf--as_unset|-\r\ncssf--as_stretch|Auf Container-Höhe ausdehnen\r\ncssf--as_start|oben positionieren\r\ncssf--as_center|mittig positionieren\r\ncssf--as_end|unten positionieren",
                                                               'description' => 'key|value und umbruch',
                                                            ], 
                                                         'region_3_justify_content' => [
                                                               'type' => 'textarea',
                                                               'title' => 'Inhalt ausrichten (Horizontal)',
                                                               'default_value' => "cssf--jc_start|links\r\ncssf--jc_center|mittig\r\ncssf--jc_end|rechts",
                                                               'description|key|value und umbruch',
                                                            ],
                                                         'region_3_align_content' => [
                                                               'type' => 'textarea',
                                                               'title' => 'Inhalt ausrichten (Vertikal)',
                                                               'default_value' => "cssf--ac_start|oben\r\ncssf--ac_center|mittig\r\ncssf--ac_end|unten",
                                                               'description' => 'key|value und umbruch',
                                                            ],
                                                         'region_3_background_color' => [
                                                               'type' => 'textarea',
                                                               'title' => 'Hintergrundfarben',
                                                               'default_value' => "#000000|cssf--tpl-bgc-var_1\r\n#ffffff|cssf--tpl-bgc-var_2",
                                                               'description' => 'Hex|class mit Umbruch',
                                                            ],
                                                         'region_3_custom' => [
                                                               'type' => 'textarea',
                                                               'title' => 'Benutzerdefiniert',
                                                               'default_value' => "custom-region-3-none|-\r\ncustom-region-3-1|Benutzerdefiniert 1",
                                                               'description' => 'key|value mit Umbruch',
                                                            ],
                                                      ] ,  
                                                ],
                                             # fieldset
                                             'region_4' => [
                                                   'title' => 'Region 4',
                                                   'description' => 'Standard Eigenschaften der 4. Region',
                                                   'items' => [
                                                         # fields     
                                                         /*                                                         
                                                         '' => [
                                                               'type' => '',
                                                               'title' => '',
                                                               'default_value' => '',
                                                               'description' => '',
                                                            ],
                                                         */   
                                                         'region_4_align_self' => [
                                                               'type' => 'textarea',
                                                               'title' => 'Region ausrichten (Vertikal)',
                                                               'default_value' => "cssf--as_unset|-\r\ncssf--as_stretch|Auf Container-Höhe ausdehnen\r\ncssf--as_start|oben positionieren\r\ncssf--as_center|mittig positionieren\r\ncssf--as_end|unten positionieren",
                                                               'description' => 'key|value und umbruch',
                                                            ], 
                                                         'region_4_justify_content' => [
                                                               'type' => 'textarea',
                                                               'title' => 'Inhalt ausrichten (Horizontal)',
                                                               'default_value' => "cssf--jc_start|links\r\ncssf--jc_center|mittig\r\ncssf--jc_end|rechts",
                                                               'description|key|value und umbruch',
                                                            ],
                                                         'region_4_align_content' => [
                                                               'type' => 'textarea',
                                                               'title' => 'Inhalt ausrichten (Vertikal)',
                                                               'default_value' => "cssf--ac_start|oben\r\ncssf--ac_center|mittig\r\ncssf--ac_end|unten",
                                                               'description' => 'key|value und umbruch',
                                                            ],
                                                         'region_4_background_color' => [
                                                               'type' => 'textarea',
                                                               'title' => 'Hintergrundfarben',
                                                               'default_value' => "#000000|cssf--tpl-bgc-var_1\r\n#ffffff|cssf--tpl-bgc-var_2",
                                                               'description' => 'Hex|class mit Umbruch',
                                                            ],
                                                         'region_4_custom' => [
                                                               'type' => 'textarea',
                                                               'title' => 'Benutzerdefiniert',
                                                               'default_value' => "custom-region-4-none|-\r\ncustom-region-4-1|Benutzerdefiniert 1",
                                                               'description' => 'key|value mit Umbruch',
                                                            ],
                                                      ] ,  
                                                ],
                                             # fieldset
                                             'footer' => [
                                                   'title' => 'Fußbereich',
                                                   'description' => 'Standard Eigenschaften des Fußbereichts',
                                                   'items' => [
                                                         # fields     
                                                         /*                                                         
                                                         '' => [
                                                               'type' => '',
                                                               'title' => '',
                                                               'default_value' => '',
                                                               'description' => '',
                                                            ],
                                                         */   
                                                         'footer_justify_content' => [
                                                               'type' => 'textarea',
                                                               'title' => 'Inhalt ausrichten (Horizontal)',
                                                               'default_value' => "cssf--jc_start|links\r\ncssf--jc_center|mittig\r\ncssf--jc_end|rechts",
                                                               'description|key|value und umbruch',
                                                            ],
                                                         'footer_align_content' => [
                                                               'type' => 'textarea',
                                                               'title' => 'Inhalt ausrichten (Vertikal)',
                                                               'default_value' => "cssf--ac_start|oben\r\ncssf--ac_center|mittig\r\ncssf--ac_end|unten",
                                                               'description' => 'key|value und umbruch',
                                                            ],
                                                         'footer_background_color' => [
                                                               'type' => 'textarea',
                                                               'title' => 'Hintergrundfarben',
                                                               'default_value' => "#000000|cssf--tpl-bgc-var_1\r\n#ffffff|cssf--tpl-bgc-var_2",
                                                               'description' => 'Hex|class mit Umbruch',
                                                            ],
                                                         'footer_custom' => [
                                                               'type' => 'textarea',
                                                               'title' => 'Benutzerdefiniert',
                                                               'default_value' => "custom-region-footer-none|-\r\ncustom-region-footer-1|Benutzerdefiniert 1",
                                                               'description' => 'key|value mit Umbruch',
                                                            ],
                                                      ] ,  
                                                ],
                                          ],
                                    ],
                                 # details
                                 'preset' => [
                                       'title' => 'Vorauswahl',
                                       'items' => [
                                             # fieldset                                             
                                             'section' => [
                                                   'title' => 'Abschnitt',
                                                   'items' => [
                                                         # fields
                                                         /*
                                                         '' => [
                                                               'type' => '',
                                                               'title' => '',
                                                               'default_value' => '',
                                                               'description' => '',
                                                            ],
                                                         */                
                                                         'section_header' => [
                                                            'type' => 'checkbox',
                                                            'title' => 'Kopfbereich hinzufügen',
                                                               'default_value' => 0,
                                                            'description' => 'Header hinzufügen',
                                                            ],                       
                                                         'section_footer' => [
                                                            'type' => 'checkbox',
                                                            'title' => 'Fußbereich hinzufügen',
                                                               'default_value' => 0,
                                                            'description' => 'Footer hinzufügen',
                                                            ],  
                                                         'section_expansion' => [
                                                            'type' => 'textfield',
                                                            'title' => 'Ausdehnung des Inhalts',
                                                            'default_value' => 'cssf--gc_content',
                                                            'description' => 'key',
                                                            ],
                                                         'section_gap' => [
                                                            'type' => 'checkbox',
                                                            'title' => 'Zwischenabstände zwischen den Regionen',
                                                            'default_value' => 1,
                                                            ],
                                                         'section_spacing' => [
                                                               'type' => 'checkbox',
                                                               'title' => 'Container Abstände hinzufügen (oben und unten)',
                                                               'default_value' => 1,
                                                            ],     
                                                         'section_align_items' => [
                                                               'type' => 'textfield',
                                                               'title' => 'Regionen ausrichten (Vertikal)',
                                                               'default_value' => "cssf--ai_stretch",
                                                               'description' => 'key; Hier die CSS-Framework Klasse eintragen ohne Punkt',
                                                            ], 
                                                         'section_background_color' => [
                                                               'type' => 'textfield',
                                                               'title' => 'Hintergrundfarben',
                                                               'default_value' => "",
                                                               'description' => 'Hex',
                                                            ],
                                                         'section_custom' => [
                                                               'type' => 'textfield',
                                                               'title' => 'Benutzerdefiniert',
                                                               'default_value' => "",
                                                               'description' => 'key; Hier die CSS-Klasse eintragen',
                                                            ],
                                                      ] ,    
                                                ],
                                             # fieldset 
                                             'header' => [
                                                   'title' => 'Kopfbereich',
                                                   'items' => [
                                                         # fields
                                                         /*
                                                         '' => [
                                                            'type' => '',
                                                            'title' => '',
                                                            'default_value' => '',
                                                            'description' => '',
                                                            ],
                                                         */
                                                         'header_justify_content' => [
                                                               'type' => 'textfield',
                                                               'title' => 'Inhalt justieren (Horizontal)',
                                                               'default_value' => "cssf--jc_start",
                                                               'description' => 'key; Hier die CSS-Framework Klasse eintragen ohne Punkt',
                                                            ],
                                                         'header_align_content' => [
                                                               'type' => 'textfield',
                                                               'title' => 'Inhalt ausrichten (Vertikal)',
                                                               'default_value' => 'cssf--ac_start',
                                                               'description' => 'key; Hier die CSS-Framework Klasse eintragen ohne Punkt',
                                                            ],
                                                         'header_background_color' => [
                                                               'type' => 'textfield',
                                                               'title' => 'Hintergrundfarben',
                                                               'default_value' => "",
                                                               'description' => 'Hex',
                                                            ],
                                                         'header_custom' => [
                                                               'type' => 'textfield',
                                                               'title' => 'Benutzerdefiniert',
                                                               'default_value' => "",
                                                               'description' => 'key; Hier die CSS-Klasse eintragen',
                                                            ],
                                                      ] ,  
                                                ],
                                             # fieldset 
                                             'region_1' => [
                                                   'title' => 'Region 1',
                                                   'items' => [
                                                         # fields
                                                         /*
                                                         '' => [
                                                               'type' => '',
                                                               'title' => '',
                                                               'default_value' => '',
                                                               'description' => '',
                                                            ],
                                                         */
                                                         'region_1_align_self' => [
                                                               'type' => 'textfield',
                                                               'title' => 'Region ausrichten (Vertikal)',
                                                               'default_value' => 'cssf--as_unset',
                                                               'description' => 'key; Hier die CSS-Framework Klasse eintragen ohne Punkt',
                                                            ], 
                                                         'region_1_justify_content' => [
                                                               'type' => 'textfield',
                                                               'title' => 'Inhalt justieren (Horizontal)',
                                                               'default_value' => "cssf--jc_start",
                                                               'description' => 'key; Hier die CSS-Framework Klasse eintragen ohne Punkt',
                                                            ],
                                                         'region_1_align_content' => [
                                                               'type' => 'textfield',
                                                               'title' => 'Inhalt ausrichten (Vertikal)',
                                                               'default_value' => 'cssf--ac_start',
                                                               'description' => 'key; Hier die CSS-Framework Klasse eintragen ohne Punkt',
                                                            ],
                                                         'region_1_background_color' => [
                                                               'type' => 'textfield',
                                                               'title' => 'Hintergrundfarben',
                                                               'default_value' => "",
                                                               'description' => 'Hex',
                                                            ],
                                                         'region_1_custom' => [
                                                               'type' => 'textfield',
                                                               'title' => 'Benutzerdefiniert',
                                                               'default_value' => "",
                                                               'description' => 'key; Hier die CSS-Klasse eintragen',
                                                            ],
                                                      ] ,  
                                                ],
                                             # fieldset 
                                             'region_2' => [
                                                   'title' => 'Region 2',
                                                   'items' => [
                                                         # fields
                                                         /*
                                                         '' => [
                                                               'type' => '',
                                                               'title' => '',
                                                               'default_value' => '',
                                                               'description' => '',
                                                            ],
                                                         */
                                                         'region_2_align_self' => [
                                                               'type' => 'textfield',
                                                               'title' => 'Region ausrichten (Vertikal)',
                                                               'default_value' => 'cssf--as_unset',
                                                               'description' => 'key; Hier die CSS-Framework Klasse eintragen ohne Punkt',
                                                            ], 
                                                         'region_2_justify_content' => [
                                                               'type' => 'textfield',
                                                               'title' => 'Inhalt justieren (Horizontal)',
                                                               'default_value' => "cssf--jc_start",
                                                               'description' => 'key; Hier die CSS-Framework Klasse eintragen ohne Punkt',
                                                            ],
                                                         'region_2_align_content' => [
                                                               'type' => 'textfield',
                                                               'title' => 'Inhalt ausrichten (Vertikal)',
                                                               'default_value' => 'cssf--ac_start',
                                                               'description' => 'key; Hier die CSS-Framework Klasse eintragen ohne Punkt',
                                                            ],
                                                         'region_2_background_color' => [
                                                               'type' => 'textfield',
                                                               'title' => 'Hintergrundfarben',
                                                               'default_value' => "",
                                                               'description' => 'Hex',
                                                            ],
                                                         'region_2_custom' => [
                                                               'type' => 'textfield',
                                                               'title' => 'Benutzerdefiniert',
                                                               'default_value' => "",
                                                               'description' => 'key; Hier die CSS-Klasse eintragen',
                                                            ],
                                                      ] ,  
                                                ],
                                             # fieldset 
                                             'region_3' => [
                                                   'title' => 'Region 3',
                                                   'items' => [
                                                         # fields
                                                         /*
                                                         '' => [
                                                            'type' => '',
                                                            'title' => '',
                                                            'default_value' => '',
                                                            'description' => '',
                                                            ],
                                                         */
                                                         'region_3_align_self' => [
                                                               'type' => 'textfield',
                                                               'title' => 'Region ausrichten (Vertikal)',
                                                               'default_value' => 'cssf--as_unset',
                                                               'description' => 'key; Hier die CSS-Framework Klasse eintragen ohne Punkt',
                                                            ], 
                                                         'region_3_justify_content' => [
                                                               'type' => 'textfield',
                                                               'title' => 'Inhalt justieren (Horizontal)',
                                                               'default_value' => "cssf--jc_start",
                                                               'description' => 'key; Hier die CSS-Framework Klasse eintragen ohne Punkt',
                                                            ],
                                                         'region_3_align_content' => [
                                                               'type' => 'textfield',
                                                               'title' => 'Inhalt ausrichten (Vertikal)',
                                                               'default_value' => 'cssf--ac_start',
                                                               'description' => 'key; Hier die CSS-Framework Klasse eintragen ohne Punkt',
                                                            ],
                                                         'region_3_background_color' => [
                                                               'type' => 'textfield',
                                                               'title' => 'Hintergrundfarben',
                                                               'default_value' => "",
                                                               'description' => 'Hex',
                                                            ],
                                                         'region_3_custom' => [
                                                               'type' => 'textfield',
                                                               'title' => 'Benutzerdefiniert',
                                                               'default_value' => "",
                                                               'description' => 'key; Hier die CSS-Klasse eintragen',
                                                            ],
                                                      ] ,  
                                                ],
                                             # fieldset 
                                             'region_4' => [
                                                   'title' => 'Region 4',
                                                   'items' => [
                                                         # fields
                                                         /*
                                                         '' => [
                                                            'type' => '',
                                                            'title' => '',
                                                            'default_value' => '',
                                                            'description' => '',
                                                            ],
                                                         */
                                                         'region_4_align_self' => [
                                                               'type' => 'textfield',
                                                               'title' => 'Region ausrichten (Vertikal)',
                                                               'default_value' => 'cssf--as_unset',
                                                               'description' => 'key; Hier die CSS-Framework Klasse eintragen ohne Punkt',
                                                            ], 
                                                         'region_4_justify_content' => [
                                                               'type' => 'textfield',
                                                               'title' => 'Inhalt justieren (Horizontal)',
                                                               'default_value' => "cssf--jc_start",
                                                               'description' => 'key; Hier die CSS-Framework Klasse eintragen ohne Punkt',
                                                            ],
                                                         'region_4_align_content' => [
                                                               'type' => 'textfield',
                                                               'title' => 'Inhalt ausrichten (Vertikal)',
                                                               'default_value' => 'cssf--ac_start',
                                                               'description' => 'key; Hier die CSS-Framework Klasse eintragen ohne Punkt',
                                                            ],
                                                         'region_4_background_color' => [
                                                               'type' => 'textfield',
                                                               'title' => 'Hintergrundfarben',
                                                               'default_value' => "",
                                                               'description' => 'Hex',
                                                            ],
                                                         'region_4_custom' => [
                                                               'type' => 'textfield',
                                                               'title' => 'Benutzerdefiniert',
                                                               'default_value' => "",
                                                               'description' => 'key; Hier die CSS-Klasse eintragen',
                                                            ],
                                                      ] ,  
                                                ],
                                             # fieldset 
                                             'footer' => [
                                                   'title' => 'Fußbereich',
                                                   'items' => [
                                                         # fields
                                                         /*
                                                         '' => [
                                                            'type' => '',
                                                            'title' => '',
                                                            'default_value' => '',
                                                            'description' => '',
                                                            ],
                                                         */
                                                         'footer_justify_content' => [
                                                               'type' => 'textfield',
                                                               'title' => 'Inhalt justieren (Horizontal)',
                                                               'default_value' => "cssf--jc_start",
                                                               'description' => 'key; Hier die CSS-Framework Klasse eintragen ohne Punkt',
                                                            ],
                                                         'footer_align_content' => [
                                                               'type' => 'textfield',
                                                               'title' => 'Inhalt ausrichten (Vertikal)',
                                                               'default_value' => 'cssf--ac_start',
                                                               'description' => 'key; Hier die CSS-Framework Klasse eintragen ohne Punkt',
                                                            ],
                                                         'footer_background_color' => [
                                                               'type' => 'textfield',
                                                               'title' => 'Hintergrundfarben',
                                                               'default_value' => "",
                                                               'description' => 'Hex',
                                                            ],
                                                         'footer_custom' => [
                                                               'type' => 'textfield',
                                                               'title' => 'Benutzerdefiniert',
                                                               'default_value' => "",
                                                               'description' => 'key; Hier die CSS-Klasse eintragen',
                                                            ],
                                                      ] ,  
                                                ],
                                          ],
                                    ],
                                 # details
                                 'active' => [
                                       'title' => 'Aktive Optionen',
                                       'items' => [
                                             # fieldset
                                             'section' => [
                                                   'title' => 'Abschnitt',
                                                   'items' => [
                                                         # fields
                                                         /*
                                                         '' => [
                                                               'type' => 'checkbox',
                                                               'title' => '',
                                                               'default_value' => 1,
                                                            ],*/            
                                                         'section_header' => [
                                                            'type' => 'checkbox',
                                                            'title' => 'Kopfbereich hinzufügen',
                                                               'default_value' => 1,
                                                            'description' => 'Fügt über den Spalten eine Region hinzu z. B. um einen Titel zu erstellen',
                                                            ],                       
                                                         'section_footer' => [
                                                            'type' => 'checkbox',
                                                            'title' => 'Fußbereich hinzufügen',
                                                               'default_value' => 1,
                                                            'description' => 'Fügt unter den Spalten eine Region hinzu z. B. um einen Beschreibungstext hinzuzufügen',
                                                            ],      
                                                         'section_id' => [
                                                               'type' => 'checkbox',
                                                               'title' => 'ID (Anker)',
                                                               'default_value' => 1,
                                                            ],
                                                         'section_expansion' => [
                                                            'type' => 'checkbox',
                                                            'title' => 'Ausdehnung der Regionen',
                                                            'default_value' => 1,
                                                            ],    
                                                         'section_gap' => [
                                                            'type' => 'checkbox',
                                                            'title' => 'Zwischenabstände zwischen den Regionen',
                                                            'default_value' => 0,
                                                            ],                                                        
                                                         'section_spacing' => [
                                                               'type' => 'checkbox',
                                                               'title' => 'Container Abstände hinzufügen (oben und unten)',
                                                               'default_value' => 1,
                                                            ],
                                                         'section_align_items' => [
                                                               'type' => 'checkbox',
                                                               'title' => 'Regionen ausrichten (Vertikal)',
                                                               'default_value' => 0,
                                                            ], 
                                                         'section_background_color' => [
                                                               'type' => 'checkbox',
                                                               'title' => 'Hintergrundfarben',
                                                               'default_value' => 0,
                                                            ],
                                                         'section_custom' => [
                                                               'type' => 'checkbox',
                                                               'title' => 'Benutzerdefiniert',
                                                               'default_value' => 0,
                                                            ],
                                                      ] ,  
                                                ],
                                             # fieldset
                                             'header' => [
                                                   'title' => 'Kopfbereicht',
                                                   'items' => [
                                                         # fields
                                                         /*
                                                         '' => [
                                                               'type' => 'checkbox',
                                                               'title' => '',
                                                               'default_value' => 1,
                                                            ],*/
                                                         'header_justify_content' => [
                                                               'type' => 'checkbox',
                                                               'title' => 'Inhalt justieren (Horizontal)',
                                                               'default_value' => 0,
                                                            ],
                                                         'header_align_content' => [
                                                               'type' => 'checkbox',
                                                               'title' => 'Inhalt ausrichten (Vertikal)',
                                                               'default_value' => 0,
                                                            ],
                                                         'header_background_color' => [
                                                               'type' => 'checkbox',
                                                               'title' => 'Hintergrundfarben',
                                                               'default_value' => 0,
                                                            ],
                                                         'header_custom' => [
                                                               'type' => 'checkbox',
                                                               'title' => 'Benutzerdefiniert',
                                                               'default_value' => 0,
                                                            ],
                                                      ],  
                                                ],
                                             # fieldset
                                             'region_1' => [
                                                   'title' => 'Region 1',
                                                   'items' => [
                                                         # fields
                                                         /*
                                                         '' => [
                                                               'type' => 'checkbox',
                                                               'title' => '',
                                                               'default_value' => 1,
                                                            ],*/
                                                         'region_1_align_self' => [
                                                               'type' => 'checkbox',
                                                               'title' => 'Region ausrichten (Vertikal)',
                                                               'default_value' => 0,
                                                            ], 
                                                         'region_1_justify_content' => [
                                                               'type' => 'checkbox',
                                                               'title' => 'Inhalt justieren (Horizontal)',
                                                               'default_value' => 0,
                                                            ],
                                                         'region_1_align_content' => [
                                                               'type' => 'checkbox',
                                                               'title' => 'Inhalt ausrichten (Vertikal)',
                                                               'default_value' => 0,
                                                            ],
                                                         'region_1_background_color' => [
                                                               'type' => 'checkbox',
                                                               'title' => 'Hintergrundfarben',
                                                               'default_value' => 0,
                                                            ],
                                                         'region_1_custom' => [
                                                               'type' => 'checkbox',
                                                               'title' => 'Benutzerdefiniert',
                                                               'default_value' => 0,
                                                            ],
                                                      ],  
                                                ],
                                             # fieldset
                                             'region_2' => [
                                                   'title' => 'Region 2',
                                                   'items' => [
                                                         # fields
                                                         /*
                                                         '' => [
                                                               'type' => 'checkbox',
                                                               'title' => '',
                                                               'default_value' => 1,
                                                            ],*/
                                                         'region_2_align_self' => [
                                                               'type' => 'checkbox',
                                                               'title' => 'Region ausrichten (Vertikal)',
                                                               'default_value' => 0,
                                                            ], 
                                                         'region_2_justify_content' => [
                                                               'type' => 'checkbox',
                                                               'title' => 'Inhalt justieren (Horizontal)',
                                                               'default_value' => 0,
                                                            ],
                                                         'region_2_align_content' => [
                                                               'type' => 'checkbox',
                                                               'title' => 'Inhalt ausrichten (Vertikal)',
                                                               'default_value' => 0,
                                                            ],
                                                         'region_2_background_color' => [
                                                               'type' => 'checkbox',
                                                               'title' => 'Hintergrundfarben',
                                                               'default_value' => 0,
                                                            ],
                                                         'region_2_custom' => [
                                                               'type' => 'checkbox',
                                                               'title' => 'Benutzerdefiniert',
                                                               'default_value' => 0,
                                                            ],
                                                      ],  
                                                ],
                                             # fieldset
                                             'region_3' => [
                                                   'title' => 'Region 3',
                                                   'items' => [
                                                         # fields
                                                         /*
                                                         '' => [
                                                               'type' => 'checkbox',
                                                               'title' => '',
                                                               'default_value' => 1,
                                                            ],*/
                                                         'region_3_align_self' => [
                                                               'type' => 'checkbox',
                                                               'title' => 'Region ausrichten (Vertikal)',
                                                               'default_value' => 0,
                                                            ], 
                                                         'region_3_justify_content' => [
                                                               'type' => 'checkbox',
                                                               'title' => 'Inhalt justieren (Horizontal)',
                                                               'default_value' => 0,
                                                            ],
                                                         'region_3_align_content' => [
                                                               'type' => 'checkbox',
                                                               'title' => 'Inhalt ausrichten (Vertikal)',
                                                               'default_value' => 0,
                                                            ],
                                                         'region_3_background_color' => [
                                                               'type' => 'checkbox',
                                                               'title' => 'Hintergrundfarben',
                                                               'default_value' => 0,
                                                            ],
                                                         'region_3_custom' => [
                                                               'type' => 'checkbox',
                                                               'title' => 'Benutzerdefiniert',
                                                               'default_value' => 0,
                                                            ],
                                                      ],  
                                                ],
                                             # fieldset
                                             'region_4' => [
                                                   'title' => 'Region 4',
                                                   'items' => [
                                                         # fields
                                                         /*
                                                         '' => [
                                                               'type' => 'checkbox',
                                                               'title' => '',
                                                               'default_value' => 1,
                                                            ],*/
                                                         'region_4_align_self' => [
                                                               'type' => 'checkbox',
                                                               'title' => 'Region ausrichten (Vertikal)',
                                                               'default_value' => 0,
                                                            ], 
                                                         'region_4_justify_content' => [
                                                               'type' => 'checkbox',
                                                               'title' => 'Inhalt justieren (Horizontal)',
                                                               'default_value' => 0,
                                                            ],
                                                         'region_4_align_content' => [
                                                               'type' => 'checkbox',
                                                               'title' => 'Inhalt ausrichten (Vertikal)',
                                                               'default_value' => 0,
                                                            ],
                                                         'region_4_background_color' => [
                                                               'type' => 'checkbox',
                                                               'title' => 'Hintergrundfarben',
                                                               'default_value' => 0,
                                                            ],
                                                         'region_4_custom' => [
                                                               'type' => 'checkbox',
                                                               'title' => 'Benutzerdefiniert',
                                                               'default_value' => 0,
                                                            ],
                                                      ],  
                                                ],
                                             # fieldset
                                             'footer' => [
                                                   'title' => 'Fußbereich',
                                                   'items' => [
                                                         # fields
                                                         /*
                                                         '' => [
                                                               'type' => 'checkbox',
                                                               'title' => '',
                                                               'default_value' => 1,
                                                            ],*/
                                                         'footer_justify_content' => [
                                                               'type' => 'checkbox',
                                                               'title' => 'Inhalt justieren (Horizontal)',
                                                               'default_value' => 0,
                                                            ],
                                                         'footer_align_content' => [
                                                               'type' => 'checkbox',
                                                               'title' => 'Inhalt ausrichten (Vertikal)',
                                                               'default_value' => 0,
                                                            ],
                                                         'footer_background_color' => [
                                                               'type' => 'checkbox',
                                                               'title' => 'Hintergrundfarben',
                                                               'default_value' => 0,
                                                            ],
                                                         'footer_custom' => [
                                                               'type' => 'checkbox',
                                                               'title' => 'Benutzerdefiniert',
                                                               'default_value' => 0,
                                                            ],
                                                      ],  
                                                ],
                                             
                                          ],
                                    ],   
                              ],
                              
                        ],
                     
                  ];
            }  
      }