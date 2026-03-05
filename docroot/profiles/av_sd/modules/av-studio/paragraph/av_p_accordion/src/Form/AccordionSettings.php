<?php
   namespace Drupal\av_p_accordion\Form;
   
   use Drupal\Core\Form\ConfigFormBase;
   use Drupal\Core\Form\FormStateInterface;
   
   use Drupal\Component\Utility\Html; 
      
   class AccordionSettings extends ConfigFormBase
      {
         const SETTINGS = 'av_p_accordion.settings';  
         const PRESET = [     
                  'plus_icon' => '<i class="icon-plus fa-regular fa-chevron-down"></i>',
                  'minus_icon' => '<i class="icon-minus fa-regular fa-chevron-up"></i>',
                  'direction_left' => true,  
            ];         
                                  
         public function __construct()
            {
               
            } 
            
         public function getFormId()
            {
               return 'av_p_accordion_settings';
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

               /* -------------------------------------------------------------- */
              
               // share                     
               $form['setup']['icon_plus_icon'] = [
                     '#type' => 'textfield',
                     '#title' => $this->t('ICON Akkordeon zu (+)',[],['langcode' => 'de']),
                     '#default_value' => $config->get('icon_plus_icon'),
                     #'#description' => $this->t('',[],['langcode' => 'de']),
                  ];             
               $form['setup']['icon_minus_icon'] = [
                     '#type' => 'textfield',
                     '#title' => $this->t('ICON Akkordeon offen (-)',[],['langcode' => 'de']),
                     '#default_value' => $config->get('icon_minus_icon'),
                  ];   
               $form['setup']['icon_direction_left'] = [
                     '#type' => 'checkbox',
                     '#title' => $this->t('Icon links',[],['langcode' => 'de']),
                     '#default_value' => $config->get('icon_direction_left'),
                     '#description' => $this->t('Position des ICONs',[],['langcode' => 'de']),
                  ]; 
               $form['setup']['description_markup'] = [
                    '#type' => 'item',
                    '#plain_text' => "
                                       <i class=\"icon-plus fa-solid fa-chevron-circle-right\"></i>\r\n
                                       <i class=\"icon-minus fa-solid fa-chevron-circle-down\"></i>\r\n
                                       <i class=\"icon-plus fa-thin fa-arrow-down\"></i>\r\n
                                       <i class=\"icon-minus fa-thin fa-arrow-up\"></i>\r\n
                                       <i class=\"icon-plus fa-regular fa-chevron-down\"></i>\r\n
                                       <i class=\"icon-minus fa-regular fa-chevron-up\"></i> \r\n
                                       <i class=\"icon-plus fa-solid fa-plus-circle\"></i> \r\n
                                       <i class=\"icon-minus fa-solid fa-minus-circle\"></i> \r\n
                                       <i class=\"icon-plus fa-light fa-plus\"></i> \r\n
                                       <i class=\"icon-minus fa-light fa-times\"></i>             
                                       ",
                  ];     
                  
               /* -------------------------------------------------------------- */  
               return parent::buildForm($form, $form_state);
            }
            
         public function submitForm(array &$form, FormStateInterface $form_state) 
            { 
               // load settings
               #$config = $this->config(static::SETTINGS);
               #Drupal::configFactory()->getEditable('system.menu.devel')->delete();
               $this->configFactory->getEditable(static::SETTINGS)->delete();
               #$values = $form_state->getValues();
               #$this->dump($values,'msg');
                                     
               $this->configFactory->getEditable(static::SETTINGS)
               /* -------------------------------------------------------------- */
               /* twitter */
               // share        
                  ->set('icon_plus_icon', $form_state->getValue('icon_plus_icon')??static::PRESET['icon_plus_icon'])
                  ->set('icon_minus_icon', $form_state->getValue('icon_minus_icon')??static::PRESET['icon_minus_icon'])
                  ->set('icon_direction_left', $form_state->getValue('icon_direction_left')??static::PRESET['icon_direction_left'])                 
               /* -------------------------------------------------------------- */
               // (de) save
                  ->save();
               
               #$this->configFactory->getEditable(static::SETTINGS)->delete();
               
               parent::submitForm($form, $form_state);
            }
         /* ########################################################################################### */
         // custom functions
      }