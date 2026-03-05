<?php
   namespace Drupal\av_l_default\Form;
   
   use Drupal\Core\Form\ConfigFormBase;
   use Drupal\Core\Form\FormStateInterface;

   class LayoutSettingsForm extends ConfigFormBase
      {
         const AV_L_DEFAULT_SETTINGS = 'av_l_default.settings';  
            
         public function __construct()
            {
               
            } 
            
         public function getFormId()
            {
               return 'av_l_default_settings';
            }
            
         protected function getEditableConfigNames()
            {
               return [static::AV_L_DEFAULT_SETTINGS,];
            }
            
         public function buildForm(array $form, FormStateInterface $form_state)
            {
               // load settings
               $config['av_l_default_settings'] = $this->config(static::AV_L_DEFAULT_SETTINGS);
               /* ------------------------------------------------------- */
               // set vertical tabs
               $form['advanced'] = [
                                    '#type' => 'vertical_tabs',
                                    '#title' => $this->t('Settings'),
                                    '#title_display' => 'invisible',
                                   ];

               return parent::buildForm($form, $form_state);
            }
            
         public function submitForm(array &$form, FormStateInterface $form_state) 
            {
               parent::submitForm($form, $form_state);
            }
         /* ########################################################################################### */
         // custom functions
      }