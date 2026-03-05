<?php
namespace Drupal\av_l_sections;

use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Layout\LayoutDefault;
use Drupal\Core\Plugin\PluginFormInterface;

use Drupal\av_l_default\Helper;
use Drupal\av_l_sections\OptionsSetup;

class SectionGalleryOptions extends LayoutDefault implements PluginFormInterface 
   {
      const LAYOUT_SETTINGS = 'av_l_sections.settings'; 
     
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
                           'section_expansion',
                           'section_spacing',
                           'section_header',
                           'section_footer',
                           'section_background_color',
                           'section_id',
                           'section_align_items',
                           'section_gap',
                           'section_custom',
                        ]) +
                      OptionsSetup::get_frontend_header_setup([
                           'header_background_color',
                           'header_align_self',
                           'header_justify_content',
                           'header_align_content',
                           'header_custom',
                        ]) +                  
                      OptionsSetup::get_frontend_footer_setup([
                           'footer_background_color',
                           'footer_align_self',
                           'footer_justify_content',
                           'footer_align_content',
                           'footer_custom',
                        ]);
            }

   }
