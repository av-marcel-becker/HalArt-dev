<?php
namespace Drupal\av_l_sections_system;

use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Layout\LayoutDefault;
use Drupal\Core\Plugin\PluginFormInterface;

use Drupal\av_l_default\Helper;
use Drupal\av_l_sections_system\OptionsSetup;

class SectionSystemSliderOptions extends LayoutDefault implements PluginFormInterface 
   {
      const LAYOUT_SETTINGS = 'av_l_sections_system.settings'; 
     
      public function defaultConfiguration() 
         {
            // load settings
            $config = \Drupal::config(static::LAYOUT_SETTINGS);
            // get colors
            $colors_with_class_array = [
                  'section' => Helper::get_color_with_class($config->get('default_section_background_color')),
               ];
            
            return parent::defaultConfiguration() + [
                  'default_settings' => $config->get() + ['colors_with_class_array' => $colors_with_class_array],
               ];
         }

      /**
       * {@inheritdoc}
      */
      public function buildConfigurationForm(array $form, FormStateInterface $form_state) 
         {
               
            // get form elements
            $config_name = static::LAYOUT_SETTINGS;
            $user_configuration = $this->getConfiguration();
            $elements = $this->get_setup();
            $form += Helper::get_frontend_form_elements($elements, $config_name, $user_configuration);
            
            return $form;
         }

      /**
       * {@inheritdoc}
      */
      public function validateConfigurationForm(array &$form, FormStateInterface $form_state) 
         {
            // any additional form validation that is required
         }

      /**
       * {@inheritdoc}
      */
      public function submitConfigurationForm(array &$form, FormStateInterface $form_state) 
         {
               $values = $form_state->getValues();
               unset($values['submit']);
               unset($values['op']);
               $setup = $this->get_setup();
               $settings = Helper::get_frontend_submit_form_elements($setup,$values);
                             
               foreach($settings as $key => $value) 
                  {
                     $this->configuration[$key] = $value;
                  }
          
         }
         /* ########################################################################################### */
         // custom functions

         public function get_setup()
            {
               return OptionsSetup::get_frontend_section_setup([
                           'section_background_color',
                           'section_id',
                           'section_custom',
                        ]);
            }

   }
