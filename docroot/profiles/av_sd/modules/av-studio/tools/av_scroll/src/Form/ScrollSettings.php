<?php
   namespace Drupal\av_scroll\Form;
   
   use Drupal\Core\Form\ConfigFormBase;
   use Drupal\Core\Form\FormStateInterface;
   
   use Drupal\Component\Utility\Html; 
      
   class ScrollSettings extends ConfigFormBase
      {
         const SETTINGS = 'av_scroll.settings';  
         const PRESET = [     
                  'top_icon' => '<i class="icon-minus fa-regular fa-chevron-up"></i>',
                  'top_threshold' => '500',
                  'top_show' => '1',
                  'bottom_icon' => '<i class="icon-plus fa-regular fa-chevron-down"></i>',
                  'bottom_threshold' => '500',
                  'bottom_show' => '0',
                  'target_icon' => '<i class="icon-plus fa-regular fa-chevron-down"></i>',  
                  'target_show' => '0',  
            ];         
                                  
         public function __construct()
            {
               
            } 
            
         public function getFormId()
            {
               return 'av_scroll_settings';
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
               $form['setup']['top_icon'] = [
                     '#type' => 'textfield',
                     '#title' => $this->t('Scroll to Top - ICON',[],['langcode' => 'de']),
                     '#default_value' => $config->get('top_icon'),
                     #'#description' => $this->t('',[],['langcode' => 'de']),
                  ];               
               $form['setup']['top_threshold'] = [
                     '#type' => 'textfield',
                     '#title' => $this->t('Scroll to Top - threshold',[],['langcode' => 'de']),
                     '#default_value' => $config->get('top_threshold'),
                  ];            
               $form['setup']['top_show'] = [
                     '#type' => 'checkbox',
                     '#title' => $this->t('Scroll to Top - show',[],['langcode' => 'de']),
                     '#default_value' => $config->get('top_show'),
                  ];             
               $form['setup']['bottom_icon'] = [
                     '#type' => 'textfield',
                     '#title' => $this->t('Scroll to Bottom - ICON',[],['langcode' => 'de']),
                     '#default_value' => $config->get('bottom_icon'),
                  ];        
               $form['setup']['bottom_threshold'] = [
                     '#type' => 'textfield',
                     '#title' => $this->t('Scroll to Bottom - threshold',[],['langcode' => 'de']),
                     '#default_value' => $config->get('bottom_threshold'),
                  ];     
               $form['setup']['bottom_show'] = [
                     '#type' => 'checkbox',
                     '#title' => $this->t('Scroll to Bottom - show',[],['langcode' => 'de']),
                     '#default_value' => $config->get('bottom_show'),
                  ];   
               $form['setup']['target_icon'] = [
                     '#type' => 'textfield',
                     '#title' => $this->t('Scroll to Target - ICON',[],['langcode' => 'de']),
                     '#default_value' => $config->get('target_icon'),
                  ]; 
               $form['setup']['target_show'] = [
                     '#type' => 'checkbox',
                     '#title' => $this->t('Scroll to Target - show',[],['langcode' => 'de']),
                     '#default_value' => $config->get('target_show'),
                  ]; 
               $form['setup']['description_markup'] = [
                    '#type' => 'item',
                    '#plain_text' => "
                                       <i class=\"fa-thin fa-arrow-down\"></i>\r\n
                                       <i class=\"fa-thin fa-arrow-up\"></i>\r\n
                                       <i class=\"fa-regular fa-chevron-down\"></i>\r\n
                                       <i class=\"fa-regular fa-chevron-up\"></i> \r\n           
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
                  ->set('top_icon', $form_state->getValue('top_icon')??static::PRESET['top_icon'])
                  ->set('top_threshold', $form_state->getValue('top_threshold')??static::PRESET['top_threshold'])
                  ->set('top_show', $form_state->getValue('top_show')??static::PRESET['top_show'])
                  ->set('bottom_icon', $form_state->getValue('bottom_icon')??static::PRESET['bottom_icon'])
                  ->set('bottom_threshold', $form_state->getValue('bottom_threshold')??static::PRESET['bottom_threshold'])
                  ->set('bottom_show', $form_state->getValue('bottom_show')??static::PRESET['bottom_show'])
                  ->set('target_icon', $form_state->getValue('target_icon')??static::PRESET['target_icon'])                 
                  ->set('target_show', $form_state->getValue('target_show')??static::PRESET['target_show'])                 
               /* -------------------------------------------------------------- */
               // (de) save
                  ->save();
               
               #$this->configFactory->getEditable(static::SETTINGS)->delete();
               
               parent::submitForm($form, $form_state);
            }
         /* ########################################################################################### */
         // custom functions
      }