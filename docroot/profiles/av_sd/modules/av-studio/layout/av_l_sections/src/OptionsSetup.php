<?php
namespace Drupal\av_l_sections;

class OptionsSetup
   {
      /* *************************************************** */
      public static function get_backend_section_setup($options=[])
         {
            
         }
      public static function get_frontend_section_setup($options=[])
         {
            $setup = [];
            if(!empty($options))
               {
                  $setup['section'] = [
                        'title' => 'Abschnitt',
                        'description' => 'Hier werden die Einstellungen getätigt, die den Abschnitt als ganzes betreffen.',
                        'items' => [ 
                              /*   
                              # fields   
                              '' => [
                                 'type' => '',
                                 'title' => '',
                                 'default_value' => '',
                                 'description' => '',
                                 ],
                              */
                           ],
                     ];
                  if(in_array('section_expansion',$options))
                     {  
                        $setup['section']['items']['section_expansion'] = [    
                              'type' => 'select',
                              'title' => 'Ausdehnung des Inhalts',
                              'description' => 'Bestimmt die maximale Breite des Inhalts-Containers',
                           ];
                     }
                  if(in_array('section_spacing',$options))
                     {
                        $setup['section']['items']['section_spacing'] = [
                              'type' => 'checkbox',
                              'title' => 'Container Abstände hinzufügen (oben und unten)',
                              'description' => '',     
                           ];
                     }
                  if(in_array('section_header',$options))
                     {  
                        $setup['section']['items']['section_header'] = [    
                              'type' => 'checkbox',
                              'title' => 'Kopfbereich hinzufügen',
                              'description' => 'Fügt über den Spalten eine Region hinzu z. B. um einen Titel zu erstellen',
                           ];
                     }
                  if(in_array('section_footer',$options))
                     {
                        $setup['section']['items']['section_footer'] = [
                              'type' => 'checkbox',
                              'title' => 'Fußbereich hinzufügen',
                              'description' => 'Fügt unter den Spalten eine Region hinzu z. B. um einen Beschreibungstext hinzuzufügen',   
                           ];
                     }
                  if(in_array('section_id',$options))
                     {
                        $setup['section']['items']['section_id'] = [
                              'type' => 'textfield',
                              'title' => 'ID',
                              'description' => 'ID der Sprungmarke (Anker) ohne Sonderzeichen, -Leerzeichen und klein geschrieben. Dies kann in Links verwendet werden z. B. ID: "test_sprung", Link: "#test_sprung"',
                           ];
                     } 
                  if(in_array('section_gap',$options))
                     {  
                        $setup['section']['items']['section_gap'] = [    
                              'type' => 'checkbox',
                              'title' => 'Zwischenabstände hinzufügen',
                              'description' => 'Zwischenabstände zwischen den Regionen',
                           ];
                     }
                  if(in_array('section_align_items',$options))
                     {
                        $setup['section']['items']['section_align_items'] = [
                              'type' => 'select',
                              'title' => 'Regionen ausrichten (Vertikal)',
                              'description' => 'Alle Regionen auf einmal Positionieren',   
                           ];
                     }
                  if(in_array('section_background_color',$options))
                     {
                        $setup['section']['items']['section_background_color'] = [
                              'type' => 'color_field_element_box',
                              'title' => 'Hintergrundfarbe',
                              'description' => 'Eine Hintergrundfarbe wählen die sich auf die ganze Fläche auswirkt',    
                           ];
                     }
                  if(in_array('section_custom',$options))
                     {  
                        $setup['section']['items']['section_custom'] = [    
                              'type' => 'checkboxes',
                              'title' => 'Sonstiges',
                            #  'description' => 'Benutzerdefinierte Einstellung (<a href="/themes/av_sub/doc/demo.html" target="_blank" title="Vorschau">Demo</a>)',
                           ];
                     }    
               }
            return $setup;
         }
      /* *************************************************** */
      public static function get_backend_header_setup($options=[])
         {
            
         }
      public static function get_frontend_header_setup($options=[])
         {
            $setup = [];
            if(!empty($options))
               {
                  $setup['header'] = [
                        'title' => 'Kopfbereich',
                        'items' => [ 
                              /*   
                              # fields   
                              '' => [
                                 'type' => '',
                                 'title' => '',
                                 'default_value' => '',
                                 'description' => '',
                                 ],
                              */
                           ],
                     ];
                  if(in_array('header_align_self',$options))
                     {
                        $setup['header']['items']['header_align_self'] = [
                              'type' => 'select',
                              'title' => 'Region ausrichten (Vertikal)',
                           ];
                     } 
                  if(in_array('header_justify_content',$options))
                     {
                        $setup['header']['items']['header_justify_content'] = [
                              'type' => 'select',
                              'title' => 'Inhalt ausrichten (Horizontal)',
                              'description' => '',
                           ];
                     } 
                  if(in_array('header_align_content',$options))
                     {
                        $setup['header']['items']['header_align_content'] = [
                              'type' => 'select',
                              'title' => 'Inhalt ausrichten (Vertikal)',
                              'description' => '',
                           ];
                     } 
                  if(in_array('header_background_color',$options))
                     {
                        $setup['header']['items']['header_background_color'] = [
                              'type' => 'color_field_element_box',
                              'title' => 'Hintergrundfarbe',
                              'description' => 'Eine Hintergrundfarbe wählen',
                           ];
                     } 
                  if(in_array('header_custom',$options))
                     {  
                        $setup['header']['items']['header_custom'] = [    
                              'type' => 'select',
                              'title' => 'Benutzerdefiniert',
                            #  'description' => 'Benutzerdefinierte Einstellung (<a href="/themes/av_sub/doc/demo.html" target="_blank" title="Vorschau">Demo</a>)',
                           ];
                     }  
                       
               }
            return $setup;
                                   
         }
      /* *************************************************** */
      public static function get_backend_region_1_setup($options=[])
         {
            
         }
      public static function get_frontend_region_1_setup($options=[])
         {
            $setup = [];
            if(!empty($options))
               {
                  $setup['region_1'] = [
                        'title' => '1. Region',
                        'items' => [ 
                              /*   
                              # fields   
                              '' => [
                                 'type' => '',
                                 'title' => '',
                                 'default_value' => '',
                                 'description' => '',
                                 ],
                              */
                           ],
                     ];
                  if(in_array('region_1_align_self',$options))
                     {
                        $setup['region_1']['items']['region_1_align_self'] = [
                              'type' => 'select',
                              'title' => 'Region ausrichten (Vertikal)',
                           ];
                     } 
                  if(in_array('region_1_justify_content',$options))
                     {
                        $setup['region_1']['items']['region_1_justify_content'] = [
                              'type' => 'select',
                              'title' => 'Inhalt ausrichten (Horizontal)',
                              'description' => '',
                           ];
                     } 
                  if(in_array('region_1_align_content',$options))
                     {
                        $setup['region_1']['items']['region_1_align_content'] = [
                              'type' => 'select',
                              'title' => 'Inhalt ausrichten (Vertikal)',
                              'description' => '',
                           ];
                     } 
                  if(in_array('region_1_background_color',$options))
                     {
                        $setup['region_1']['items']['region_1_background_color'] = [
                              'type' => 'color_field_element_box',
                              'title' => 'Hintergrundfarbe',
                              'description' => 'Eine Hintergrundfarbe wählen',
                           ];
                     } 
                  if(in_array('region_1_custom',$options))
                     {  
                        $setup['region_1']['items']['region_1_custom'] = [    
                              'type' => 'select',
                              'title' => 'Benutzerdefiniert',
                             # 'description' => 'Benutzerdefinierte Einstellung (<a href="/themes/av_sub/doc/demo.html" target="_blank" title="Vorschau">Demo</a>)',
                           ];
                     }  
                       
               }
            return $setup;
         }
      /* *************************************************** */
      public static function get_backend_region_2_setup($options=[])
         {
            
         }
      public static function get_frontend_region_2_setup($options=[])
         {
            $setup = [];
            if(!empty($options))
               {
                  $setup['region_2'] = [
                        'title' => '2. Region',
                        'items' => [ 
                              /*   
                              # fields   
                              '' => [
                                 'type' => '',
                                 'title' => '',
                                 'default_value' => '',
                                 'description' => '',
                                 ],
                              */
                           ],
                     ];
                  if(in_array('region_2_align_self',$options))
                     {
                        $setup['region_2']['items']['region_2_align_self'] = [
                              'type' => 'select',
                              'title' => 'Region ausrichten (Vertikal)',
                           ];
                     } 
                  if(in_array('region_2_justify_content',$options))
                     {
                        $setup['region_2']['items']['region_2_justify_content'] = [
                              'type' => 'select',
                              'title' => 'Inhalt ausrichten (Horizontal)',
                              'description' => '',
                           ];
                     } 
                  if(in_array('region_2_align_content',$options))
                     {
                        $setup['region_2']['items']['region_2_align_content'] = [
                              'type' => 'select',
                              'title' => 'Inhalt ausrichten (Vertikal)',
                              'description' => '',
                           ];
                     } 
                  if(in_array('region_2_background_color',$options))
                     {
                        $setup['region_2']['items']['region_2_background_color'] = [
                              'type' => 'color_field_element_box',
                              'title' => 'Hintergrundfarbe',
                              'description' => 'Eine Hintergrundfarbe wählen',
                           ];
                     } 
                  if(in_array('region_2_custom',$options))
                     {  
                        $setup['region_2']['items']['region_2_custom'] = [    
                              'type' => 'select',
                              'title' => 'Benutzerdefiniert',
                          #    'description' => 'Benutzerdefinierte Einstellung (<a href="/themes/av_sub/doc/demo.html" target="_blank" title="Vorschau">Demo</a>)',
                           ];
                     }  
               }
            return $setup;
         }
      /* *************************************************** */
      public static function get_backend_region_3_setup($options=[])
         {
            
         }
      public static function get_frontend_region_3_setup($options=[])
         {
            $setup = [];
            if(!empty($options))
               {
                  $setup['region_3'] = [
                        'title' => '3. Region',
                        'items' => [ 
                              /*   
                              # fields   
                              '' => [
                                 'type' => '',
                                 'title' => '',
                                 'default_value' => '',
                                 'description' => '',
                                 ],
                              */
                           ],
                     ];
                  if(in_array('region_3_align_self',$options))
                     {
                        $setup['region_3']['items']['region_3_align_self'] = [
                              'type' => 'select',
                              'title' => 'Region ausrichten (Vertikal)',
                           ];
                     } 
                  if(in_array('region_3_justify_content',$options))
                     {
                        $setup['region_3']['items']['region_3_justify_content'] = [
                              'type' => 'select',
                              'title' => 'Inhalt ausrichten (Horizontal)',
                              'description' => '',
                           ];
                     } 
                  if(in_array('region_3_align_content',$options))
                     {
                        $setup['region_3']['items']['region_3_align_content'] = [
                              'type' => 'select',
                              'title' => 'Inhalt ausrichten (Vertikal)',
                              'description' => '',
                           ];
                     } 
                  if(in_array('region_3_background_color',$options))
                     {
                        $setup['region_3']['items']['region_3_background_color'] = [
                              'type' => 'color_field_element_box',
                              'title' => 'Hintergrundfarbe',
                              'description' => 'Eine Hintergrundfarbe wählen',
                           ];
                     } 
                  if(in_array('region_3_custom',$options))
                     {  
                        $setup['region_3']['items']['region_3_custom'] = [    
                              'type' => 'select',
                              'title' => 'Benutzerdefiniert',
                           #   'description' => 'Benutzerdefinierte Einstellung (<a href="/themes/av_sub/doc/demo.html" target="_blank" title="Vorschau">Demo</a>)',
                           ];
                     }  
                       
               }
            return $setup;
         }
      /* *************************************************** */
      public static function get_backend_region_4_setup($options=[])
         {
            
         }
      public static function get_frontend_region_4_setup($options=[])
         {
            $setup = [];
            if(!empty($options))
               {
                  $setup['region_4'] = [
                        'title' => '4. Region',
                        'items' => [ 
                              /*   
                              # fields   
                              '' => [
                                 'type' => '',
                                 'title' => '',
                                 'default_value' => '',
                                 'description' => '',
                                 ],
                              */
                           ],
                     ];
                  if(in_array('region_4_align_self',$options))
                     {
                        $setup['region_4']['items']['region_4_align_self'] = [
                              'type' => 'select',
                              'title' => 'Region ausrichten (Vertikal)',
                           ];
                     } 
                  if(in_array('region_4_justify_content',$options))
                     {
                        $setup['region_4']['items']['region_4_justify_content'] = [
                              'type' => 'select',
                              'title' => 'Inhalt ausrichten (Horizontal)',
                              'description' => '',
                           ];
                     } 
                  if(in_array('region_4_align_content',$options))
                     {
                        $setup['region_4']['items']['region_4_align_content'] = [
                              'type' => 'select',
                              'title' => 'Inhalt ausrichten (Vertikal)',
                              'description' => '',
                           ];
                     } 
                  if(in_array('region_4_background_color',$options))
                     {
                        $setup['region_4']['items']['region_4_background_color'] = [
                              'type' => 'color_field_element_box',
                              'title' => 'Hintergrundfarbe',
                              'description' => 'Eine Hintergrundfarbe wählen',
                           ];
                     } 
                  if(in_array('region_4_custom',$options))
                     {  
                        $setup['region_4']['items']['region_4_custom'] = [    
                              'type' => 'select',
                              'title' => 'Benutzerdefiniert',
                           #   'description' => 'Benutzerdefinierte Einstellung (<a href="/themes/av_sub/doc/demo.html" target="_blank" title="Vorschau">Demo</a>)',
                           ];
                     }  
               }
            return $setup;
         }
      /* *************************************************** */
      public static function get_backend_footer_setup($options=[])
         {
            
         }
      public static function get_frontend_footer_setup($options=[])
         {
            $setup = [];
            if(!empty($options))
               {
                  $setup['footer'] = [
                        'title' => 'Fußbereich',
                        'items' => [ 
                              /*   
                              # fields   
                              '' => [
                                 'type' => '',
                                 'title' => '',
                                 'default_value' => '',
                                 'description' => '',
                                 ],
                              */
                           ],
                     ];
                  if(in_array('footer_align_self',$options))
                     {
                        $setup['footer']['items']['footer_align_self'] = [
                              'type' => 'select',
                              'title' => 'Region ausrichten (Vertikal)',
                           ];
                     } 
                  if(in_array('footer_justify_content',$options))
                     {
                        $setup['footer']['items']['footer_justify_content'] = [
                              'type' => 'select',
                              'title' => 'Inhalt ausrichten (Horizontal)',
                              'description' => '',
                           ];
                     } 
                  if(in_array('footer_align_content',$options))
                     {
                        $setup['footer']['items']['footer_align_content'] = [
                              'type' => 'select',
                              'title' => 'Inhalt ausrichten (Vertikal)',
                              'description' => '',
                           ];
                     } 
                  if(in_array('footer_background_color',$options))
                     {
                        $setup['footer']['items']['footer_background_color'] = [
                              'type' => 'color_field_element_box',
                              'title' => 'Hintergrundfarbe',
                              'description' => 'Eine Hintergrundfarbe wählen',
                           ];
                     } 
                  if(in_array('footer_custom',$options))
                     {  
                        $setup['footer']['items']['footer_custom'] = [    
                              'type' => 'select',
                              'title' => 'Benutzerdefiniert',
                          #    'description' => 'Benutzerdefinierte Einstellung (<a href="/themes/av_sub/doc/demo.html" target="_blank" title="Vorschau">Demo</a>)',
                           ];
                     }  
               }
            return $setup;
         }
      /* *************************************************** */
   }
