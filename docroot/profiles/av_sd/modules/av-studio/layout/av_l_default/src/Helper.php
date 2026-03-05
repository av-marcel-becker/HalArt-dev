<?php
   namespace Drupal\av_l_default;
      
   # use Drupal\media\Entity\Media;
   use Drupal\image\Entity\ImageStyle;
   
   class Helper
      {
         public static function get_backend_form_elements($elements, $config_name)
            {
               // load settings
               $config = \Drupal::config($config_name);
               // ----------------------------------------------------------------------------
               $form = [];
               foreach($elements as $vertical_tabs_key => $vertical_tabs_value)
                  {
                     $form[$vertical_tabs_key] = [
                                    '#type' => 'vertical_tabs',
                                    '#title' => t($vertical_tabs_value['title'],[],['langcode' => 'de']),
                                    '#title_display' => 'invisible',
                                   ];
                     foreach($vertical_tabs_value['items'] as $details_key => $details_value)
                        {
                           $form[$details_key] = [
                                   '#type' => 'details',
                                   '#title' => t($details_value['title'],[],['langcode' => 'de']),
                                   '#group' => $vertical_tabs_key,
                                 ];
                           foreach($details_value['items'] as $fieldset_key => $fieldset_value)
                              {
                                 $form[$details_key.'_'.$fieldset_key] = [
                                       '#type' => 'fieldset',
                                       '#title' => t($fieldset_value['title'],[],['langcode' => 'de']),
                                       '#group' => $details_key,
                                    ];
                                 if(isset($fieldset_value['description']))
                                    {
                                       $form[$details_key.'_'.$fieldset_key][$details_key.'_'.$fieldset_key.'_description'] = [
                                             '#type' => 'item',
                                             '#markup' => '<p>'.t($fieldset_value['description'],[],['langcode' => 'de']).'</p>',
                                             #'#group' => $details_key,
                                          ];      
                                    }
                                 
                                 foreach($fieldset_value['items'] as $field_key => $field_value)
                                    {
                                       $form[$details_key.'_'.$fieldset_key][$details_key.'_'.$field_key] = [
                                             '#type' => $field_value['type'],
                                          ];
                                       if(isset($field_value['title']))
                                          {
                                             $form[$details_key.'_'.$fieldset_key][$details_key.'_'.$field_key] += [
                                                   '#title' => t($field_value['title'],[],['langcode' => 'de']),
                                                ];      
                                          }  
                                       if(isset($field_value['value']))
                                          {
                                             $form[$details_key.'_'.$fieldset_key][$details_key.'_'.$field_key] += [
                                                   '#value' => ($config->get($details_key.'_'.$field_key))?$config->get($details_key.'_'.$field_key):$field_value['value'],
                                                ];
                                          }
                                       if(isset($field_value['default_value']) || $field_value['default_value'] == 0)
                                          {
                                             $form[$details_key.'_'.$fieldset_key][$details_key.'_'.$field_key] += [
                                                   '#default_value' => (!is_null($config->get($details_key.'_'.$field_key)))?$config->get($details_key.'_'.$field_key):$field_value['default_value'],
                                                ];
                                          }     
                                       if(isset($field_value['description']))
                                          {
                                             $form[$details_key.'_'.$fieldset_key][$details_key.'_'.$field_key] += [
                                                   '#description' => t($field_value['description'],[],['langcode' => 'de']),
                                                ];      
                                          }   
                                       if(isset($field_value['options']))
                                          {
                                             if($config->get($details_key.'_'.$field_key))
                                                {
                                                   $options = $config->get($details_key.'_'.$field_key);
                                                }
                                             $options = [];
                                             foreach($field_value['options'] as $options_key => $options_value)
                                                {
                                                   $options[$options_key] = t($options_value,[],['langcode' => 'de']);
                                                }
                                             $form[$details_key.'_'.$fieldset_key][$details_key.'_'.$field_key] += [
                                                   '#options' => $options,
                                                ];      
                                          }   
                                    }
                              }
                        }
                  }
               return $form;
            }
         
         public static function get_backend_submit_form_elements($elements, $values)
            {
               // load settings
               $settings = [];
               foreach($elements as $vertical_tabs_key => $vertical_tabs_value)
                  {
                     foreach($vertical_tabs_value['items'] as $details_key => $details_value)
                        {
                           foreach($details_value['items'] as $fieldset_key => $fieldset_value)
                              {
                                 foreach($fieldset_value['items'] as $field_key => $field_value)
                                    {
                                       $settings[$details_key.'_'.$field_key] = $values[$details_key.'_'.$field_key];
                                    }
                              }
                        }
                  }
               return $settings;
            }
         public static function get_frontend_form_elements($elements, $config_name, $user_configuration)
            {
               // load standard settings
               $admin_config = \Drupal::config($config_name);
               $form = [];
               
               foreach($elements as $fieldset_key => $fieldset_value)
                  {
                     if(!empty($fieldset_value['items']))
                        {
                           $form[$fieldset_key] = [
                                 '#type' => 'fieldset',
                                 '#title' => t($fieldset_value['title'],[],['langcode' => 'de']),
                              ];      
                        }
                     
                     if(!empty($fieldset_value['description']))
                        {
                           $form[$fieldset_key][$fieldset_key.'_description'] = [
                                 '#type' => 'item',
                                 '#markup' => '<p>'.t($fieldset_value['description'],[],['langcode' => 'de']).'</p>',
                              ];      
                        }
                     foreach($fieldset_value['items'] as $field_key => $field_value)
                        {
                           if($admin_config->get('active_'.$field_key))
                              {
                                 $form[$fieldset_key][$field_key] = [
                                       '#type' => $field_value['type'],
                                    ];
                                 if($field_value['title'])
                                    {
                                       $form[$fieldset_key][$field_key] += [
                                             '#title' => t($field_value['title'],[],['langcode' => 'de']),
                                          ];      
                                    }  
                                 if($field_value['type'] == 'hidden')
                                    {
                                       $form[$fieldset_key][$field_key] += [
                                             '#value' => ($config->get($details_key.'_'.$field_key))?$config->get($details_key.'_'.$field_key):$field_value['value'],
                                          ];
                                    }
                                 if($field_value['type'] == 'color_field_element_box')
                                    {
                                       $form[$fieldset_key][$field_key] += [
                                             '#default_value' => (isset($user_configuration[$field_key]) && !is_null($user_configuration[$field_key]))?$user_configuration[$field_key]:['color'=>$admin_config->get('preset_'.$field_key)],
                                          ];      
                                    } 
                                 if($field_value['type'] != 'hidden' && $field_value['type'] != 'color_field_element_box')
                                    {
                                       $form[$fieldset_key][$field_key] += [
                                             '#default_value' => (isset($user_configuration[$field_key]) && !is_null($user_configuration[$field_key]))?$user_configuration[$field_key]:$admin_config->get('preset_'.$field_key),
                                          ];
                                    }     
                                 if(!empty($field_value['description']))
                                    {
                                       $form[$fieldset_key][$field_key] += [
                                             '#description' => t($field_value['description'],[],['langcode' => 'de']),
                                          ];      
                                    } 
                                 if($field_value['type'] == 'radios' || 
                                    $field_value['type'] == 'select' ||
                                    $field_value['type'] == 'checkboxes')
                                    {
                                       if($admin_config->get('default_'.$field_key))
                                          {
                                             $default_options = self::get_options($admin_config->get('default_'.$field_key));
                                          }
                                       $options = [];
                                       foreach($default_options as $options_key => $options_value)
                                          {
                                             $options[$options_key] = t($options_value,[],['langcode' => 'de']);
                                          }
                                       $form[$fieldset_key][$field_key] += [
                                             '#options' => $options,
                                          ];
                                    } 
                                 if($field_value['type'] == 'color_field_element_box')
                                    {
                                       # https://www.drupal.org/project/color_field/issues/3060984  
                                       $colors_array = self::get_color($admin_config->get('default_'.$field_key));
                                       $form[$fieldset_key][$field_key] += [
                                             '#color_options' => ($colors_array)?$colors_array:NULL,
                                          ];      
                                    }  /*
                                 if($field_value['type'] == 'media_library')
                                    {
                                       # https://drupal.stackexchange.com/questions/267317/how-can-i-use-a-media-field-in-a-custom-form
                                       $form[$fieldset_key][$field_key] += [
                                             '#allowed_bundles' => [$admin_config->get('default_'.$field_key)],
                                          ];      
                                    }  
                                    */                                    
                              }
                           else
                              {
                                 $form[$fieldset_key][$field_key] = [
                                       '#type' => 'hidden',
                                       '#value' => (isset($user_configuration[$field_key]))?$user_configuration[$field_key]:$admin_config->get('preset_'.$field_key),
                                    ];
                                        
                              }
                           
                                       
                               
                        }
                  }
                  
               return $form;
            }
         
         public static function get_frontend_submit_form_elements($elements, $values)
            {
               // load settings
               $settings = [];
               foreach($elements as $fieldset_key => $fieldset_value)
                  {
                     foreach($fieldset_value['items'] as $field_key => $field_value)
                        {
                           switch($field_value['type'])
                              {
                                 case 'color_field_element_box':
                                    if((isset($values[$fieldset_key][$field_key]['settings'])))
                                       {
                                          $settings[$field_key] = $values[$fieldset_key][$field_key]['settings'];
                                       }                                    
                                 break;
                                 default:
                                    $settings[$field_key] = $values[$fieldset_key][$field_key];
                                 break;
                              }
                           
                        }
                  }
                      
               return $settings;
            }
         public static function get_options($setting)
            {
               $options = [];
               $options_array = explode(PHP_EOL, $setting);
               foreach($options_array as $value)
                  {
                     $tmp = explode('|', $value);
                     $options[trim($tmp[0])] = trim($tmp[1]);
                  }
               if(!empty($options))
                  {
                     return $options;
                  }
               else
                  {
                     return [];
                  }
            }
         public static function get_color_with_class($setting)
            {
               if($setting === null || empty($setting)) 
                  {
                     return false;
                  }
               $colors = [];
               $color_class_array = explode(PHP_EOL, $setting);
               foreach($color_class_array as $value)
                  {
                     $tmp = explode('|', $value);
                     $colors[trim($tmp[0])] = trim($tmp[1]);
                  }
               if(!empty($colors))
                  {
                     return $colors;
                  }
               else
                  {
                     return false;
                  }
            }
         public static function get_color($setting)
            {
               $colors = [];
               $color_class_array = explode(PHP_EOL, $setting);
               foreach($color_class_array as $value)
                  {
                     $tmp = explode('|', $value);
                     $colors[] = $tmp[0];
                  }
               if(!empty($colors))
                  {
                     return $colors;
                  }
               else
                  {
                     return false;
                  }
            }  
         /*
         public static function get_media_urls($media_id, $image_style=[])
            {
               $media = Media::load($image_id);
               # $media_url = ImageStyle::load('TYPE_OF_CROP')->buildUrl($media->image->entity->getFileUri());
               $variables['media_url'] =  $media_url;
               
               if($media = Media::load($media_id))
                  {
                     #$fid = $media->getSource()->getSourceFieldValue($media);
                     #$file = File::load($fid);
                     #$url = $file->url();
                     # dm_fp_panorama
                     #$media_url = ImageStyle::load('TYPE_OF_CROP')->buildUrl($media->image->entity->getFileUri());
                     if($media_file_uri = $media->field_m_fp_i_image->entity->getFileUri())
                        {
                           $media_url['0'] = ImageStyle::load($image_style['0'])->buildUrl($media_file_uri);
                           $media_url['576'] = ImageStyle::load($image_style['576'])->buildUrl($media_file_uri);
                           $media_url['768'] = ImageStyle::load($image_style['768'])->buildUrl($media_file_uri);
                           $media_url['992'] = ImageStyle::load($image_style['992'])->buildUrl($media_file_uri);      
                        }
                  }
               return $media_url;
            }     
         */            
      }