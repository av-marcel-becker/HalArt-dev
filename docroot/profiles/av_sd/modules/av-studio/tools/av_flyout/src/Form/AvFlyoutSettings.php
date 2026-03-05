<?php
   namespace Drupal\av_flyout\Form;
   
   use Drupal\Core\Form\ConfigFormBase;
   use Drupal\Core\Form\FormStateInterface;
   
   use Drupal\Component\Utility\Html; 
      
   class AvFlyoutSettings extends ConfigFormBase
      {
         const SETTINGS = 'av_flyout.settings';  
         const PRESET = [
               /* -------------------------------------------------------------- */
               /* setup */
                  'setup_items_count' => '3',
               /* -------------------------------------------------------------- */
               /* item 1 */       
                  'item_1_a_href' => '',
                  'item_1_a_title' => '',
                  'item_1_label' => '',
                  'item_1_icon' => '<i class="fab fa-facebook-f"></i>',        
               /* -------------------------------------------------------------- */
               /* item 2 */       
                  'item_1_a_href' => '',
                  'item_1_a_title' => '',
                  'item_1_label' => '',
                  'item_1_icon' => '<i class="fab fa-facebook-f"></i>',        
               /* -------------------------------------------------------------- */
               /* item 3 */       
                  'item_1_a_href' => '',
                  'item_1_a_title' => '',
                  'item_1_label' => '',
                  'item_1_icon' => '<i class="fab fa-facebook-f"></i>',                
               /* -------------------------------------------------------------- */
            ];         
                                  
         public function __construct()
            {
               
            } 
            
         public function getFormId()
            {
               return 'av_flyout_settings';
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
                     $form['item_'.$x]['item_'.$x.'_label'] = [
                           '#type' => 'textfield',
                           '#title' => $this->t('Label',[],['langcode' => 'de']),
                           '#default_value' => $config->get('item_'.$x.'_label'),
                        ];     
                     $form['item_'.$x]['item_'.$x.'_icon'] = [
                           '#type' => 'textfield',
                           '#title' => $this->t('ICON (Hex ohne Backslash)',[],['langcode' => 'de']),
                           '#default_value' => $config->get('item_'.$x.'_icon'),
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
                  ->set('setup_items_count', $form_state->getValue('setup_items_count'));

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