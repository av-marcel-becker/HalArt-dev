<?php
   namespace Drupal\av_header\Form;
   
   use Drupal\Core\Form\ConfigFormBase;
   use Drupal\Core\Form\FormStateInterface;
   
   use Drupal\Component\Utility\Html; 
      
   class AvHeaderSettings extends ConfigFormBase
      {
         const SETTINGS = 'av_header.settings';       
                                  
         public function __construct()
            {
               
            } 
            
         public function getFormId()
            {
               return 'av_header_settings';
            }
            
         protected function getEditableConfigNames()
            {
               return [static::SETTINGS,];
            }
            
         public function buildForm(array $form, FormStateInterface $form_state)
            {
               // load settings
               $config = $this->config(static::SETTINGS);
               /* ------------------------------------------------------- */
               // set vertical tabs
               $form['advanced'] = [
                  '#type' => 'vertical_tabs',
                  '#title' => $this->t('Settings'),
                  '#title_display' => 'invisible',
                 ];
               $form['setup'] = [
                    '#type' => 'details',
                    '#title' => $this->t('Setup',[],['langcode' => 'de']),
                    '#group' => 'advanced',
                  ];
               $items_count = $config->get('setup_items_count')??0;
               for($x=1; $x<=$items_count; $x++)
                  {
                     $form['item_'.$x] = [
                          '#type' => 'details',
                          '#title' => $this->t('item @count',['@count' => $x],['langcode' => 'de']),
                          '#group' => 'advanced',
                        ];                     
                  }
               /* -------------------------------------------------------------- */
               /* setup */
               $form['setup']['markup'] = [
                    '#type' => 'item',
                    #'#title' => $this->t('Teilen',[],['langcode' => 'de']),
                    '#markup' => '<h2>'.$this->t('Einstellungen',[],['langcode' => 'de']).'</h2>',
                    #'#description' => $this->t('',[],['langcode' => 'de']),
                  ];               
               $form['setup']['setup_items_active'] = [
                     '#type' => 'checkbox',
                     '#title' => $this->t('Sekundär Menü hinzufügen? (Items)',[],['langcode' => 'de']),
                     '#default_value' => $config->get('setup_items_active'),
                     #'#description' => $this->t('',[],['langcode' => 'de']),
                  ];           
               $form['setup']['setup_items_count'] = [
                     '#type' => 'textfield',
                     '#title' => $this->t('Menge der Items (Für Sekundäre Menü)',[],['langcode' => 'de']),
                     '#default_value' => $config->get('setup_items_count'),
                     #'#description' => $this->t('',[],['langcode' => 'de']),
                  ];          
               $form['setup']['setup_split_symbol_link'] = [
                     '#type' => 'textfield',
                     '#title' => $this->t('Trenner Link',[],['langcode' => 'de']),
                     '#default_value' => $config->get('setup_split_symbol_link'),
                     #'#description' => $this->t('',[],['langcode' => 'de']),
                  ];  
               $form['setup']['setup_height_mobile'] = [
                     '#type' => 'textfield',
                     '#title' => $this->t('Höhe - Mobile (nur Zahl)',[],['langcode' => 'de']),
                     '#default_value' => $config->get('setup_height_mobile'),
                     #'#description' => $this->t('',[],['langcode' => 'de']),
                  ];  
               $form['setup']['setup_height_desktop'] = [
                     '#type' => 'textfield',
                     '#title' => $this->t('Höhe - Desktop (nur Zahl)',[],['langcode' => 'de']),
                     '#default_value' => $config->get('setup_height_desktop'),
                     #'#description' => $this->t('',[],['langcode' => 'de']),
                  ]; 
               $form['setup']['setup_position_static'] = [
                     '#type' => 'checkbox',
                     '#title' => $this->t('Header Satisch?',[],['langcode' => 'de']),
                     '#default_value' => $config->get('setup_position_static'),
                     #'#description' => $this->t('',[],['langcode' => 'de']),
                  ];      
               $form['setup']['setup_background'] = [
                     '#type' => 'textfield',
                     '#title' => $this->t('CSS Hintergrund',[],['langcode' => 'de']),
                     '#default_value' => $config->get('setup_background'),
                     #'#description' => $this->t('',[],['langcode' => 'de']),
                  ];   
               $form['setup']['setup_border_bottom'] = [
                     '#type' => 'textfield',
                     '#title' => $this->t('CSS Unterer Rahmen',[],['langcode' => 'de']),
                     '#default_value' => $config->get('setup_border_bottom'),
                     #'#description' => $this->t('',[],['langcode' => 'de']),
                  ]; 
               $form['setup']['setup_shadow'] = [
                     '#type' => 'textfield',
                     '#title' => $this->t('CSS Schatten',[],['langcode' => 'de']),
                     '#default_value' => $config->get('setup_shadow'),
                     #'#description' => $this->t('',[],['langcode' => 'de']),
                  ];  
               /* -------------------------------------------------------------- */
               /* items */
               for($x=1; $x<=$items_count; $x++)
                  {         
                     $form['item_'.$x]['markup'] = [
                          '#type' => 'item',
                          '#markup' => '<h2>'.$this->t('item @count',['@count' => $x],['langcode' => 'de']).'</h2>',
                        ];  
                     $form['item_'.$x]['item_'.$x.'_active'] = [
                           '#type' => 'checkbox',
                           '#title' => $this->t('Link ist aktiv?',[],['langcode' => 'de']),
                           '#default_value' => $config->get('item_'.$x.'_active'),
                        ];  
                     $form['item_'.$x]['item_'.$x.'_av_accessibility'] = [
                           '#type' => 'checkbox',
                           '#title' => $this->t('Link ist av-accessibility?',[],['langcode' => 'de']),
                           '#default_value' => $config->get('item_'.$x.'_av_accessibility'),
                        ];  
                     $form['item_'.$x]['item_'.$x.'_av_accessibility_type'] = [
                           '#type' => 'textfield',
                           '#title' => $this->t('Accessibility Typ (focus, contrast, size)',[],['langcode' => 'de']),
                           '#default_value' => $config->get('item_'.$x.'_av_accessibility_type'),
                        ];  
                     $form['item_'.$x]['item_'.$x.'_av_accessibility_settings'] = [
                           '#type' => 'textfield',
                           '#title' => $this->t('Accessibility Settings ([18,20])',[],['langcode' => 'de']),
                           '#default_value' => $config->get('item_'.$x.'_av_accessibility_settings'),
                        ];  
                     $form['item_'.$x]['item_'.$x.'_icon'] = [
                           '#type' => 'textfield',
                           '#title' => $this->t('ICON (Hex ohne Backslash)',[],['langcode' => 'de']),
                           '#default_value' => $config->get('item_'.$x.'_icon'),
                        ]; 
                     $form['item_'.$x]['item_'.$x.'_label'] = [
                           '#type' => 'textfield',
                           '#title' => $this->t('Label',[],['langcode' => 'de']),
                           '#default_value' => $config->get('item_'.$x.'_label'),
                        ];    
                     $form['item_'.$x]['item_'.$x.'_a_title'] = [
                           '#type' => 'textfield',
                           '#title' => $this->t('Link: title',[],['langcode' => 'de']),
                           '#default_value' => $config->get('item_'.$x.'_a_title'),
                        ];    
                     $form['item_'.$x]['item_'.$x.'_a_href'] = [
                           '#type' => 'textfield',
                           '#title' => $this->t('Link: href',[],['langcode' => 'de']),
                           '#default_value' => $config->get('item_'.$x.'_a_href'),
                        ];   
                     $form['item_'.$x]['item_'.$x.'_a_target'] = [
                           '#type' => 'textfield',
                           '#title' => $this->t('Link: Ziel',[],['langcode' => 'de']),
                           '#default_value' => $config->get('item_'.$x.'_a_target'),
                        ];   
                     $form['item_'.$x]['item_'.$x.'_a_class'] = [
                           '#type' => 'textfield',
                           '#title' => $this->t('Link: Class',[],['langcode' => 'de']),
                           '#default_value' => $config->get('item_'.$x.'_a_class'),
                        ];                  
                  }
               /* -------------------------------------------------------------- */  
               return parent::buildForm($form, $form_state);
            }
            
         public function submitForm(array &$form, FormStateInterface $form_state) 
            { 
               // load settings
               $this->configFactory->getEditable(static::SETTINGS)->delete();
                                     
               $config = $this->configFactory->getEditable(static::SETTINGS)
               /* -------------------------------------------------------------- */
               /* setup */     
                  ->set('setup_items_count', $form_state->getValue('setup_items_count'))
                  ->set('setup_items_active', $form_state->getValue('setup_items_active'))
                  ->set('setup_split_symbol_link', $form_state->getValue('setup_split_symbol_link'))
                  ->set('setup_border_bottom', $form_state->getValue('setup_border_bottom'))
                  ->set('setup_background', $form_state->getValue('setup_background'))
                  ->set('setup_position_static', $form_state->getValue('setup_position_static'))
                  ->set('setup_height_desktop', $form_state->getValue('setup_height_desktop'))
                  ->set('setup_height_mobile', $form_state->getValue('setup_height_mobile'))
                  ->set('setup_shadow', $form_state->getValue('setup_shadow'));

               /* -------------------------------------------------------------- */
               /* items */               
               $items_count = $form_state->getValue('setup_items_count')??0;
               if($items_count > 0)
                  {
                     for($x=1; $x<=$items_count; $x++)
                        {
                           $config
                              ->set('item_'.$x.'_active', $form_state->getValue('item_'.$x.'_active'))
                              ->set('item_'.$x.'_av_accessibility', $form_state->getValue('item_'.$x.'_av_accessibility'))
                              ->set('item_'.$x.'_av_accessibility_type', $form_state->getValue('item_'.$x.'_av_accessibility_type'))
                              ->set('item_'.$x.'_av_accessibility_settings', $form_state->getValue('item_'.$x.'_av_accessibility_settings'))
                              ->set('item_'.$x.'_a_href', $form_state->getValue('item_'.$x.'_a_href'))
                              ->set('item_'.$x.'_a_title', $form_state->getValue('item_'.$x.'_a_title'))
                              ->set('item_'.$x.'_a_target', $form_state->getValue('item_'.$x.'_a_target'))
                              ->set('item_'.$x.'_a_class', $form_state->getValue('item_'.$x.'_a_class'))
                              ->set('item_'.$x.'_label', $form_state->getValue('item_'.$x.'_label'))
                              ->set('item_'.$x.'_icon', $form_state->getValue('item_'.$x.'_icon'));
                        }
                  }
               /* -------------------------------------------------------------- */
               // (de) save
               $config->save();
               
               #$this->configFactory->getEditable(static::SETTINGS)->delete();
               
               parent::submitForm($form, $form_state);
            }
         /* ########################################################################################### */
         // custom functions
      }