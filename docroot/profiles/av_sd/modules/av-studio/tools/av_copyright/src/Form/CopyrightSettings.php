<?php
   namespace Drupal\av_copyright\Form;
   
   use Drupal\Core\Form\ConfigFormBase;
   use Drupal\Core\Form\FormStateInterface;
   
   use Drupal\Component\Utility\Html; 
      
   class CopyrightSettings extends ConfigFormBase
      {
         const SETTINGS = 'av_copyright.settings';         
                                  
         public function __construct()
            {
               
            } 
            
         public function getFormId()
            {
               return 'av_copyright_settings';
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
               $form['setup']['setup_show_copyright_icon'] = [
                     '#type' => 'checkbox',
                     '#title' => $this->t('Copyright ICON anzeigen',[],['langcode' => 'de']),
                     '#default_value' => $config->get('setup_show_copyright_icon'),
                  ];    
               $form['setup']['setup_year_right'] = [
                     '#type' => 'checkbox',
                     '#title' => $this->t('Jahr rechts',[],['langcode' => 'de']),
                     '#default_value' => $config->get('setup_year_right'),
                  ];   
               $form['setup']['setup_count_up_the_year'] = [
                     '#type' => 'checkbox',
                     '#title' => $this->t('Jahr hochzählen',[],['langcode' => 'de']),
                     '#default_value' => $config->get('setup_count_up_the_year'),
                  ];
               $form['setup']['setup_current_year'] = [
                     '#type' => 'textfield',
                     '#title' => $this->t('Aktuelles Jahr',[],['langcode' => 'de']),
                     '#default_value' => $config->get('setup_current_year'),
                     #'#description' => $this->t('',[],['langcode' => 'de']),
                  ];          
               $form['setup']['setup_text'] = [
                     '#type' => 'textfield',
                     '#title' => $this->t('Text',[],['langcode' => 'de']),
                     '#default_value' => $config->get('setup_text'),
                  ];    
               $form['setup']['setup_split_symbol'] = [
                     '#type' => 'textfield',
                     '#title' => $this->t('Trenner Symbol (zwischen Copyright und Links)',[],['langcode' => 'de']),
                     '#default_value' => $config->get('setup_split_symbol'),
                     #'#description' => $this->t('',[],['langcode' => 'de']),
                  ]; 
               $form['setup']['setup_split_symbol_link'] = [
                     '#type' => 'textfield',
                     '#title' => $this->t('Trenner Symbol für die Links',[],['langcode' => 'de']),
                     '#default_value' => $config->get('setup_split_symbol_link'),
                     #'#description' => $this->t('',[],['langcode' => 'de']),
                  ]; 
               $form['setup']['setup_items_count'] = [
                     '#type' => 'textfield',
                     '#title' => $this->t('Menge der Items',[],['langcode' => 'de']),
                     '#default_value' => $config->get('setup_items_count'),
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
                     $form['item_'.$x]['item_'.$x.'_a_href'] = [
                           '#type' => 'textfield',
                           '#title' => $this->t('Link: href',[],['langcode' => 'de']),
                           '#default_value' => $config->get('item_'.$x.'_a_href'),
                        ];  
                     $form['item_'.$x]['item_'.$x.'_a_title'] = [
                           '#type' => 'textfield',
                           '#title' => $this->t('Link: title',[],['langcode' => 'de']),
                           '#default_value' => $config->get('item_'.$x.'_a_title'),
                        ];  
                     $form['item_'.$x]['item_'.$x.'_a_label'] = [
                           '#type' => 'textfield',
                           '#title' => $this->t('Label',[],['langcode' => 'de']),
                           '#default_value' => $config->get('item_'.$x.'_a_label'),
                        ];     
                     $form['item_'.$x]['item_'.$x.'_a_target'] = [
                           '#type' => 'textfield',
                           '#title' => $this->t('Target',[],['langcode' => 'de']),
                           '#default_value' => $config->get('item_'.$x.'_a_target'),
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
               
                  ->set('setup_show_copyright_icon', $form_state->getValue('setup_show_copyright_icon'))
                  ->set('setup_year_right', $form_state->getValue('setup_year_right'))
                  ->set('setup_count_up_the_year', $form_state->getValue('setup_count_up_the_year'))
                  ->set('setup_current_year', $form_state->getValue('setup_current_year'))
                  ->set('setup_text', $form_state->getValue('setup_text'))
                  ->set('setup_items_count', $form_state->getValue('setup_items_count'))
                  ->set('setup_split_symbol', $form_state->getValue('setup_split_symbol'))
                  ->set('setup_split_symbol_link', $form_state->getValue('setup_split_symbol_link'));

               /* -------------------------------------------------------------- */
               /* items */               
               $items_count = $form_state->getValue('setup_items_count')??0;
               if($items_count > 0)
                  {
                     for($x=1; $x<=$items_count; $x++)
                        {
                           $config
                              ->set('item_'.$x.'_a_href', $form_state->getValue('item_'.$x.'_a_href'))
                              ->set('item_'.$x.'_a_title', $form_state->getValue('item_'.$x.'_a_title'))
                              ->set('item_'.$x.'_a_label', $form_state->getValue('item_'.$x.'_a_label'))
                              ->set('item_'.$x.'_a_target', $form_state->getValue('item_'.$x.'_a_target'));
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