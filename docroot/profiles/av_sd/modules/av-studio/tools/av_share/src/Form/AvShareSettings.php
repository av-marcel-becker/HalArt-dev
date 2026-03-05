<?php
   namespace Drupal\av_share\Form;
   
   use Drupal\Core\Form\ConfigFormBase;
   use Drupal\Core\Form\FormStateInterface;
   
   use Drupal\Component\Utility\Html; 
      
   class AvShareSettings extends ConfigFormBase
      {
         const SETTINGS_SHARE = 'av_share.settings';      
                                  
         public function __construct()
            {
               
            } 
            
         public function getFormId()
            {
               return 'av_share_settings';
            }
            
         protected function getEditableConfigNames()
            {
               return [static::SETTINGS_SHARE,];
            }
            
         public function buildForm(array $form, FormStateInterface $form_state)
            {
               // load settings
               $config = $this->config(static::SETTINGS_SHARE);
               /* ------------------------------------------------------- */
               // set vertical tabs
               $form['advanced'] = [
                  '#type' => 'vertical_tabs',
                  '#title' => $this->t('Settings'),
                  '#title_display' => 'invisible',
                 ];
               $form['twitter'] = [
                    '#type' => 'details',
                    '#title' => $this->t('Twitter',[],['langcode' => 'de']),
                    '#group' => 'advanced',
                  ];
               $form['x'] = [
                    '#type' => 'details',
                    '#title' => $this->t('X',[],['langcode' => 'de']),
                    '#group' => 'advanced',
                  ];
               $form['facebook'] = [
                    '#type' => 'details',
                    '#title' => $this->t('Facebook',[],['langcode' => 'de']),
                    '#group' => 'advanced',
                  ];
               $form['whatsapp'] = [
                    '#type' => 'details',
                    '#title' => $this->t('WhatsApp',[],['langcode' => 'de']),
                    '#group' => 'advanced',
                  ];
               $form['pinterest'] = [
                    '#type' => 'details',
                    '#title' => $this->t('Pinterest',[],['langcode' => 'de']),
                    '#group' => 'advanced',
                  ];
               $form['linkedin'] = [
                    '#type' => 'details',
                    '#title' => $this->t('LinkedIn',[],['langcode' => 'de']),
                    '#group' => 'advanced',
                  ];
               $form['xing'] = [
                    '#type' => 'details',
                    '#title' => $this->t('Xing',[],['langcode' => 'de']),
                    '#group' => 'advanced',
                  ];
               $form['telegram'] = [
                    '#type' => 'details',
                    '#title' => $this->t('Telegram',[],['langcode' => 'de']),
                    '#group' => 'advanced',
                  ];
               $form['instagram'] = [
                    '#type' => 'details',
                    '#title' => $this->t('Instagram',[],['langcode' => 'de']),
                    '#group' => 'advanced',
                  ];
               $form['youtube'] = [
                    '#type' => 'details',
                    '#title' => $this->t('YouTube',[],['langcode' => 'de']),
                    '#group' => 'advanced',
                  ];
               $form['print'] = [
                    '#type' => 'details',
                    '#title' => $this->t('Drucken',[],['langcode' => 'de']),
                    '#group' => 'advanced',
                  ];
               $form['mail'] = [
                    '#type' => 'details',
                    '#title' => $this->t('E-Mail',[],['langcode' => 'de']),
                    '#group' => 'advanced',
                  ];
               $form['link'] = [
                    '#type' => 'details',
                    '#title' => $this->t('Link (URL)',[],['langcode' => 'de']),
                    '#group' => 'advanced',
                  ];
               $form['favorite'] = [
                    '#type' => 'details',
                    '#title' => $this->t('Favorite',[],['langcode' => 'de']),
                    '#group' => 'advanced',
                  ];
               $form['popup'] = [
                    '#type' => 'details',
                    '#title' => $this->t('Popup (Einstellungen)',[],['langcode' => 'de']),
                    '#group' => 'advanced',
                  ];
               $form['menu'] = [
                    '#type' => 'details',
                    '#title' => $this->t('Menü (Einstellungen)',[],['langcode' => 'de']),
                    '#group' => 'advanced',
                  ];

               /* -------------------------------------------------------------- */
               /* twitter */
               // share               
               $form['twitter']['share_markup'] = [
                    '#type' => 'item',
                    #'#title' => $this->t('Teilen',[],['langcode' => 'de']),
                    '#markup' => '<h2>'.$this->t('Twitter - Teilen',[],['langcode' => 'de']).'</h2>',
                    #'#description' => $this->t('',[],['langcode' => 'de']),
                  ];               
               $form['twitter']['twitter_share_title'] = [
                     '#type' => 'textfield',
                     '#title' => $this->t('Titel',[],['langcode' => 'de']),
                     '#default_value' => $config->get('twitter_share_title'),
                     #'#description' => $this->t('',[],['langcode' => 'de']),
                  ];             
               $form['twitter']['twitter_share_icon'] = [
                     '#type' => 'textfield',
                     '#title' => $this->t('Icon',[],['langcode' => 'de']),
                     '#default_value' => $config->get('twitter_share_icon'),
                  ];   
               // profile               
               $form['twitter']['profile_markup'] = [
                    '#type' => 'item',
                    #'#title' => $this->t('Profil',[],['langcode' => 'de']),
                    '#markup' => '<h2>'.$this->t('Twitter - Profil',[],['langcode' => 'de']).'</h2>',
                    #'#description' => $this->t('',[],['langcode' => 'de']),
                  ];              
               $form['twitter']['twitter_profile_title'] = [
                     '#type' => 'textfield',
                     '#title' => $this->t('Titel',[],['langcode' => 'de']),
                     '#default_value' => $config->get('twitter_profile_title'),
                     #'#description' => $this->t('',[],['langcode' => 'de']),
                  ];             
               $form['twitter']['twitter_profile_icon'] = [
                     '#type' => 'textfield',
                     '#title' => $this->t('Icon',[],['langcode' => 'de']),
                     '#default_value' => $config->get('twitter_profile_icon'),
                  ];        
               $form['twitter']['twitter_profile_name'] = [
                     '#type' => 'textfield',
                     '#title' => $this->t('Name',[],['langcode' => 'de']),
                     '#default_value' => $config->get('twitter_profile_name'),
                  ];
               /* x */
               // share               
               $form['x']['share_markup'] = [
                    '#type' => 'item',
                    #'#title' => $this->t('Teilen',[],['langcode' => 'de']),
                    '#markup' => '<h2>'.$this->t('X - Teilen',[],['langcode' => 'de']).'</h2>',
                    #'#description' => $this->t('',[],['langcode' => 'de']),
                  ];               
               $form['x']['x_share_title'] = [
                     '#type' => 'textfield',
                     '#title' => $this->t('Titel',[],['langcode' => 'de']),
                     '#default_value' => $config->get('x_share_title'),
                     #'#description' => $this->t('',[],['langcode' => 'de']),
                  ];             
               $form['x']['x_share_icon'] = [
                     '#type' => 'textfield',
                     '#title' => $this->t('Icon',[],['langcode' => 'de']),
                     '#default_value' => $config->get('x_share_icon'),
                  ];   
               // profile               
               $form['x']['profile_markup'] = [
                    '#type' => 'item',
                    #'#title' => $this->t('Profil',[],['langcode' => 'de']),
                    '#markup' => '<h2>'.$this->t('X - Profil',[],['langcode' => 'de']).'</h2>',
                    #'#description' => $this->t('',[],['langcode' => 'de']),
                  ];              
               $form['x']['x_profile_title'] = [
                     '#type' => 'textfield',
                     '#title' => $this->t('Titel',[],['langcode' => 'de']),
                     '#default_value' => $config->get('x_profile_title'),
                     #'#description' => $this->t('',[],['langcode' => 'de']),
                  ];             
               $form['x']['x_profile_icon'] = [
                     '#type' => 'textfield',
                     '#title' => $this->t('Icon',[],['langcode' => 'de']),
                     '#default_value' => $config->get('x_profile_icon'),
                  ];        
               $form['x']['x_profile_name'] = [
                     '#type' => 'textfield',
                     '#title' => $this->t('Name',[],['langcode' => 'de']),
                     '#default_value' => $config->get('x_profile_name'),
                  ];
               /* -------------------------------------------------------------- */
               /* facebook */
               // share               
               $form['facebook']['share_markup'] = [
                    '#type' => 'item',
                    '#markup' => '<h2>'.$this->t('Facebook - Teilen',[],['langcode' => 'de']).'</h2>',
                  ];          
               $form['facebook']['facebook_share_title'] = [
                     '#type' => 'textfield',
                     '#title' => $this->t('Titel',[],['langcode' => 'de']),
                     '#default_value' => $config->get('facebook_share_title'),
                  ];             
               $form['facebook']['facebook_share_icon'] = [
                     '#type' => 'textfield',
                     '#title' => $this->t('Icon',[],['langcode' => 'de']),
                     '#default_value' => $config->get('facebook_share_icon'),
                  ];        
               $form['facebook']['facebook_share_app_id'] = [
                     '#type' => 'textfield',
                     '#title' => $this->t('App ID',[],['langcode' => 'de']),
                     '#default_value' => $config->get('facebook_share_app_id'),
                  ];  
               // profile               
               $form['facebook']['profile_markup'] = [
                    '#type' => 'item',
                    '#markup' => '<h2>'.$this->t('Facebook - Profil',[],['langcode' => 'de']).'</h2>',
                  ];  
               $form['facebook']['facebook_profile_title'] = [
                     '#type' => 'textfield',
                     '#title' => $this->t('Titel',[],['langcode' => 'de']),
                     '#default_value' => $config->get('facebook_profile_title'),
                  ];             
               $form['facebook']['facebook_profile_icon'] = [
                     '#type' => 'textfield',
                     '#title' => $this->t('Icon',[],['langcode' => 'de']),
                     '#default_value' => $config->get('facebook_profile_icon'),
                  ];          
               $form['facebook']['facebook_profile_name'] = [
                     '#type' => 'textfield',
                     '#title' => $this->t('Name',[],['langcode' => 'de']),
                     '#default_value' => $config->get('facebook_profile_name'),
                  ];        
               $form['facebook']['facebook_profile_app_id'] = [
                     '#type' => 'textfield',
                     '#title' => $this->t('App ID',[],['langcode' => 'de']),
                     '#default_value' => $config->get('facebook_profile_app_id'),
                  ];  
               /* -------------------------------------------------------------- */
               /* whatsapp */
               // share               
               $form['whatsapp']['share_markup'] = [
                    '#type' => 'item',
                    '#markup' => '<h2>'.$this->t('WhatsApp - Teilen',[],['langcode' => 'de']).'</h2>',
                  ];  
               $form['whatsapp']['whatsapp_share_title'] = [
                     '#type' => 'textfield',
                     '#title' => $this->t('Titel',[],['langcode' => 'de']),
                     '#default_value' => $config->get('whatsapp_share_title'),
                  ];           
               $form['whatsapp']['whatsapp_share_modified_title'] = [
                     '#type' => 'textfield',
                     '#title' => $this->t('Modifizierter Titel',[],['langcode' => 'de']),
                     '#default_value' => $config->get('whatsapp_share_modified_title'),
                  ];             
               $form['whatsapp']['whatsapp_share_icon'] = [
                     '#type' => 'textfield',
                     '#title' => $this->t('Icon',[],['langcode' => 'de']),
                     '#default_value' => $config->get('whatsapp_share_icon'),
                  ]; 
               // profile  
               /*               
               $form['whatsapp']['profile_markup'] = [
                    '#type' => 'item',
                    '#markup' => '<h2>'.$this->t('WhatsApp - Profil',[],['langcode' => 'de']).'</h2>',
                  ]; 
               $form['whatsapp']['whatsapp_profile_title'] = [
                     '#type' => 'textfield',
                     '#title' => $this->t('Titel',[],['langcode' => 'de']),
                     '#default_value' => $config->get('whatsapp_profile_title'),
                  ];             
               $form['whatsapp']['whatsapp_profile_icon'] = [
                     '#type' => 'textfield',
                     '#title' => $this->t('Icon',[],['langcode' => 'de']),
                     '#default_value' => $config->get('whatsapp_profile_icon'),
                  ];    
                  */
               /* -------------------------------------------------------------- */
               /* pinterest */
               // share               
               $form['pinterest']['share_markup'] = [
                    '#type' => 'item',
                    '#markup' => '<h2>'.$this->t('Pinterest - Teilen',[],['langcode' => 'de']).'</h2>',
                  ];
               $form['pinterest']['pinterest_share_title'] = [
                     '#type' => 'textfield',
                     '#title' => $this->t('Titel',[],['langcode' => 'de']),
                     '#default_value' => $config->get('pinterest_share_title'),
                  ];           
               $form['pinterest']['pinterest_share_icon'] = [
                     '#type' => 'textfield',
                     '#title' => $this->t('Icon',[],['langcode' => 'de']),
                     '#default_value' => $config->get('pinterest_share_icon'),
                  ]; 
               // profile               
               $form['pinterest']['profile_markup'] = [
                    '#type' => 'item',
                    '#markup' => '<h2>'.$this->t('Pinterest - Profil',[],['langcode' => 'de']).'</h2>',
                  ];
               $form['pinterest']['pinterest_profile_title'] = [
                     '#type' => 'textfield',
                     '#title' => $this->t('Titel',[],['langcode' => 'de']),
                     '#default_value' => $config->get('pinterest_profile_title'),
                  ];             
               $form['pinterest']['pinterest_profile_icon'] = [
                     '#type' => 'textfield',
                     '#title' => $this->t('Icon',[],['langcode' => 'de']),
                     '#default_value' => $config->get('pinterest_profile_icon'),
                  ]; 
               /* -------------------------------------------------------------- */
               /* linkedin */
               // share               
               $form['linkedin']['share_markup'] = [
                    '#type' => 'item',
                    '#markup' => '<h2>'.$this->t('LinkedIn - Teilen',[],['langcode' => 'de']).'</h2>',
                  ];
               $form['linkedin']['linkedin_share_title'] = [
                     '#type' => 'textfield',
                     '#title' => $this->t('Titel',[],['langcode' => 'de']),
                     '#default_value' => $config->get('linkedin_share_title'),
                  ];           
               $form['linkedin']['linkedin_share_icon'] = [
                     '#type' => 'textfield',
                     '#title' => $this->t('Icon',[],['langcode' => 'de']),
                     '#default_value' => $config->get('linkedin_share_icon'),
                  ]; 
               // profile               
               $form['linkedin']['profile_markup'] = [
                    '#type' => 'item',
                    '#markup' => '<h2>'.$this->t('LinkedIn - Profil',[],['langcode' => 'de']).'</h2>',
                  ];          
               $form['linkedin']['linkedin_profile_title'] = [
                     '#type' => 'textfield',
                     '#title' => $this->t('Titel',[],['langcode' => 'de']),
                     '#default_value' => $config->get('linkedin_profile_title'),
                  ];          
               $form['linkedin']['linkedin_profile_icon'] = [
                     '#type' => 'textfield',
                     '#title' => $this->t('Icon',[],['langcode' => 'de']),
                     '#default_value' => $config->get('linkedin_profile_icon'),
                  ];          
               $form['linkedin']['linkedin_profile_id'] = [
                     '#type' => 'textfield',
                     '#title' => $this->t('ID',[],['langcode' => 'de']),
                     '#default_value' => $config->get('linkedin_profile_id'),
                  ];  
               /* -------------------------------------------------------------- */
               /* xing */
               // share               
               $form['xing']['share_markup'] = [
                    '#type' => 'item',
                    '#markup' => '<h2>'.$this->t('Xing - Teilen',[],['langcode' => 'de']).'</h2>',
                  ];      
               $form['xing']['xing_share_title'] = [
                     '#type' => 'textfield',
                     '#title' => $this->t('Titel',[],['langcode' => 'de']),
                     '#default_value' => $config->get('xing_share_title'),
                  ];          
               $form['xing']['xing_share_icon'] = [
                     '#type' => 'textfield',
                     '#title' => $this->t('Icon',[],['langcode' => 'de']),
                     '#default_value' => $config->get('xing_share_icon'),
                  ];    
               // profile               
               $form['xing']['profile_markup'] = [
                    '#type' => 'item',
                    '#markup' => '<h2>'.$this->t('Xing - Profil',[],['langcode' => 'de']).'</h2>',
                  ];
               $form['xing']['xing_profile_title'] = [
                     '#type' => 'textfield',
                     '#title' => $this->t('Titel',[],['langcode' => 'de']),
                     '#default_value' => $config->get('xing_profile_title'),
                  ];             
               $form['xing']['xing_profile_icon'] = [
                     '#type' => 'textfield',
                     '#title' => $this->t('Icon',[],['langcode' => 'de']),
                     '#default_value' => $config->get('xing_profile_icon'),
                  ];          
               $form['xing']['xing_profile_name'] = [
                     '#type' => 'textfield',
                     '#title' => $this->t('Name',[],['langcode' => 'de']),
                     '#default_value' => $config->get('xing_profile_name'),
                  ];  
               /* -------------------------------------------------------------- */
               /* telegram */
               // share               
               $form['telegram']['share_markup'] = [
                    '#type' => 'item',
                    '#markup' => '<h2>'.$this->t('Telegram - Teilen',[],['langcode' => 'de']).'</h2>',
                  ];      
               $form['telegram']['telegram_share_title'] = [
                     '#type' => 'textfield',
                     '#title' => $this->t('Titel',[],['langcode' => 'de']),
                     '#default_value' => $config->get('telegram_share_title'),
                  ];          
               $form['telegram']['telegram_share_icon'] = [
                     '#type' => 'textfield',
                     '#title' => $this->t('Icon',[],['langcode' => 'de']),
                     '#default_value' => $config->get('telegram_share_icon'),
                  ];    
               // profile               
               $form['telegram']['profile_markup'] = [
                    '#type' => 'item',
                    '#markup' => '<h2>'.$this->t('Telegram - Profil',[],['langcode' => 'de']).'</h2>',
                  ];
               $form['telegram']['telegram_profile_title'] = [
                     '#type' => 'textfield',
                     '#title' => $this->t('Titel',[],['langcode' => 'de']),
                     '#default_value' => $config->get('telegram_profile_title'),
                  ];             
               $form['telegram']['telegram_profile_icon'] = [
                     '#type' => 'textfield',
                     '#title' => $this->t('Icon',[],['langcode' => 'de']),
                     '#default_value' => $config->get('telegram_profile_icon'),
                  ];          
               $form['telegram']['telegram_profile_name'] = [
                     '#type' => 'textfield',
                     '#title' => $this->t('Name',[],['langcode' => 'de']),
                     '#default_value' => $config->get('telegram_profile_name'),
                  ];  
               /* -------------------------------------------------------------- */
               /* instagram */
               // profile               
               $form['instagram']['profile_markup'] = [
                    '#type' => 'item',
                    '#markup' => '<h2>'.$this->t('Instagram - Profil',[],['langcode' => 'de']).'</h2>',
                  ];
               $form['instagram']['instagram_profile_title'] = [
                     '#type' => 'textfield',
                     '#title' => $this->t('Titel',[],['langcode' => 'de']),
                     '#default_value' => $config->get('instagram_profile_title'),
                  ];             
               $form['instagram']['instagram_profile_icon'] = [
                     '#type' => 'textfield',
                     '#title' => $this->t('Icon',[],['langcode' => 'de']),
                     '#default_value' => $config->get('instagram_profile_icon'),
                  ];          
               $form['instagram']['instagram_profile_name'] = [
                     '#type' => 'textfield',
                     '#title' => $this->t('Name',[],['langcode' => 'de']),
                     '#default_value' => $config->get('instagram_profile_name'),
                  ];  
               /* -------------------------------------------------------------- */
               /* youtube */
               // channel               
               $form['youtube']['channel_markup'] = [
                    '#type' => 'item',
                    '#markup' => '<h2>'.$this->t('YouTube - Kanal',[],['langcode' => 'de']).'</h2>',
                  ];        
               $form['youtube']['youtube_channel_title'] = [
                     '#type' => 'textfield',
                     '#title' => $this->t('Titel',[],['langcode' => 'de']),
                     '#default_value' => $config->get('youtube_channel_title'),
                  ];          
               $form['youtube']['youtube_channel_icon'] = [
                     '#type' => 'textfield',
                     '#title' => $this->t('Icon',[],['langcode' => 'de']),
                     '#default_value' => $config->get('youtube_channel_icon'),
                  ];          
               $form['youtube']['youtube_channel_id'] = [
                     '#type' => 'textfield',
                     '#title' => $this->t('ID',[],['langcode' => 'de']),
                     '#default_value' => $config->get('youtube_channel_id'),
                  ];  
               // video               
               $form['youtube']['video_markup'] = [
                    '#type' => 'item',
                    '#markup' => '<h2>'.$this->t('YouTube - Video',[],['langcode' => 'de']).'</h2>',
                  ];    
               $form['youtube']['youtube_video_title'] = [
                     '#type' => 'textfield',
                     '#title' => $this->t('Titel',[],['langcode' => 'de']),
                     '#default_value' => $config->get('youtube_video_title'),
                  ];          
               $form['youtube']['youtube_video_icon'] = [
                     '#type' => 'textfield',
                     '#title' => $this->t('Icon',[],['langcode' => 'de']),
                     '#default_value' => $config->get('youtube_video_icon'),
                  ];          
               $form['youtube']['youtube_video_id'] = [
                     '#type' => 'textfield',
                     '#title' => $this->t('ID',[],['langcode' => 'de']),
                     '#default_value' => $config->get('youtube_video_id'),
                  ];  
               /* -------------------------------------------------------------- */
               /* print */  
               // misc               
               $form['print']['misc_markup'] = [
                    '#type' => 'item',
                    '#markup' => '<h2>'.$this->t('Drucken',[],['langcode' => 'de']).'</h2>',
                  ];      
               $form['print']['print_misc_title'] = [
                     '#type' => 'textfield',
                     '#title' => $this->t('Titel',[],['langcode' => 'de']),
                     '#default_value' => $config->get('print_misc_title'),
                  ];          
               $form['print']['print_misc_icon'] = [
                     '#type' => 'textfield',
                     '#title' => $this->t('Icon',[],['langcode' => 'de']),
                     '#default_value' => $config->get('print_misc_icon'),
                  ]; 
               /* -------------------------------------------------------------- */
               /* mail */  
               // misc               
               $form['mail']['misc_markup'] = [
                    '#type' => 'item',
                    '#markup' => '<h2>'.$this->t('E-Mail',[],['langcode' => 'de']).'</h2>',
                  ];     
               $form['mail']['mail_misc_title'] = [
                     '#type' => 'textfield',
                     '#title' => $this->t('Titel',[],['langcode' => 'de']),
                     '#default_value' => $config->get('mail_misc_title'),
                  ];          
               $form['mail']['mail_misc_icon'] = [
                     '#type' => 'textfield',
                     '#title' => $this->t('Icon',[],['langcode' => 'de']),
                     '#default_value' => $config->get('mail_misc_icon'),
                  ];        
               $form['mail']['mail_misc_mail'] = [
                     '#type' => 'textfield',
                     '#title' => $this->t('E-Mail Adresse',[],['langcode' => 'de']),
                     '#default_value' => $config->get('mail_misc_mail'),
                     '#description' => $this->t('Mail leer lassen (Adresse none@none.de)',[],['langcode' => 'de']),
                  ];        
               $form['mail']['mail_misc_subject'] = [
                     '#type' => 'textfield',
                     '#title' => $this->t('Betreff',[],['langcode' => 'de']),
                     '#default_value' => $config->get('mail_misc_subject'),
                     '#description' => $this->t('Betreff',[],['langcode' => 'de']),
                  ];        
               #$form['mail']['mail_misc_body'] = [
               #      '#type' => 'textfield',
               #      '#title' => $this->t('Text',[],['langcode' => 'de']),
               #      '#default_value' => $config->get('mail_misc_body'),
               #      '#description' => $this->t('Kurztext',[],['langcode' => 'de']),
               #   ];   
               #$form['mail']['mail_misc_body'] = [
               #      '#type' => 'text_format',
               #      '#format' => 'plain_text',
               #      #'#format' => 'full_html',
               #      #'#format' => ($config->get('text.format'))?$config->get('text.format'):'plain_text',
               #      '#title' => $this->t('Text',[],['langcode' => 'de']),
               #      '#default_value' => $config->get('mail_misc_body'),
               #      #'#title' => $this->t('Text',[],['langcode' => 'de']),
               #      #'#default_value' => $config['OfferSearchPage']->get('text.value'),
               #      '#description' => $this->t('Kurztext',[],['langcode' => 'de']),
               #   ];  
               $form['mail']['mail_misc_body'] = [
                     '#type' => 'textarea',
                     '#title' => $this->t('Text',[],['langcode' => 'de']),
                     '#default_value' => $config->get('mail_misc_body'),
                     '#description' => $this->t('Kurztext',[],['langcode' => 'de']),
                  ];     
               $form['mail']['mail_misc_msg'] = [
                     '#type' => 'textfield',
                     '#title' => $this->t('Nachricht',[],['langcode' => 'de']),
                     '#default_value' => $config->get('mail_misc_msg'),
                     '#description' => $this->t('alert Message',[],['langcode' => 'de']),
                  ]; 
               /* -------------------------------------------------------------- */
               /* link */           
               $form['link']['misc_markup'] = [
                    '#type' => 'item',
                    '#markup' => '<h2>'.$this->t('Link (URL)',[],['langcode' => 'de']).'</h2>',
                  ];
               $form['link']['link_misc_title'] = [
                     '#type' => 'textfield',
                     '#title' => $this->t('Titel',[],['langcode' => 'de']),
                     '#default_value' => $config->get('link_misc_title'),
                  ];          
               $form['link']['link_misc_icon'] = [
                     '#type' => 'textfield',
                     '#title' => $this->t('Icon',[],['langcode' => 'de']),
                     '#default_value' => $config->get('link_misc_icon'),
                  ];        
               $form['link']['link_misc_copy'] = [
                     '#type' => 'textfield',
                     '#title' => $this->t('Kopie',[],['langcode' => 'de']),
                     '#default_value' => $config->get('link_misc_copy'),
                  ];        
               $form['link']['link_misc_close'] = [
                     '#type' => 'textfield',
                     '#title' => $this->t('Schließen',[],['langcode' => 'de']),
                     '#default_value' => $config->get('link_misc_close'),
                  ];          
               $form['link']['link_misc_msg'] = [
                     '#type' => 'textfield',
                     '#title' => $this->t('Nachricht',[],['langcode' => 'de']),
                     '#default_value' => $config->get('link_misc_msg'),
                  ]; 
               /* -------------------------------------------------------------- */
               /* favorite */           
               $form['favorite']['favorite_markup'] = [
                    '#type' => 'item',
                    '#markup' => '<h2>'.$this->t('Favorit',[],['langcode' => 'de']).'</h2>',
                  ];
               $form['favorite']['favorite_misc_title'] = [
                     '#type' => 'textfield',
                     '#title' => $this->t('Titel',[],['langcode' => 'de']),
                     '#default_value' => $config->get('favorite_misc_title'),
                  ];          
               $form['favorite']['favorite_misc_icon'] = [
                     '#type' => 'textfield',
                     '#title' => $this->t('Icon',[],['langcode' => 'de']),
                     '#default_value' => $config->get('favorite_misc_icon'),
                  ]; 
               /* -------------------------------------------------------------- */
               /* popup */           
               $form['popup']['popup_markup'] = [
                    '#type' => 'item',
                    '#markup' => '<h2>'.$this->t('Popup',[],['langcode' => 'de']).'</h2>',
                  ];
               $form['popup']['popup_width'] = [
                     '#type' => 'textfield',
                     '#title' => $this->t('Breite',[],['langcode' => 'de']),
                     '#default_value' => $config->get('popup_width'),
                  ];          
               $form['popup']['popup_height'] = [
                     '#type' => 'textfield',
                     '#title' => $this->t('Höhe',[],['langcode' => 'de']),
                     '#default_value' => $config->get('popup_height'),
                  ];    
               $form['popup']['popup_active'] = [
                     '#type' => 'checkbox',
                     '#title' => $this->t('Aktiv',[],['langcode' => 'de']),
                     '#default_value' => $config->get('popup_active'),
                     '#description' => $this->t('Popup: true oder neues Fenster: false (true|false)',[],['langcode' => 'de']),
                  ]; 
                  
               /* -------------------------------------------------------------- */
               /* menu */           
               $form['menu']['menu_markup'] = [
                    '#type' => 'item',
                    '#markup' => '<h2>'.$this->t('Menü',[],['langcode' => 'de']).'</h2>',
                  ];
               $form['menu']['menu_title'] = [
                     '#type' => 'textfield',
                     '#title' => $this->t('Titel',[],['langcode' => 'de']),
                     '#default_value' => $config->get('menu_title'),
                  ];          
               $form['menu']['menu_icon'] = [
                     '#type' => 'textfield',
                     '#title' => $this->t('Icon',[],['langcode' => 'de']),
                     '#default_value' => $config->get('menu_icon'),
                  ]; 
               #$form['menu']['menu_adjust_yn'] = [
               #      '#type' => 'textfield',
               #      '#title' => $this->t('Justieren - yn',[],['langcode' => 'de']),
               #      '#default_value' => $config->get('menu_adjust_yn'),
               #      '#description' => $this->t('Angaben in px ohne Einheit',[],['langcode' => 'de']),
               #   ]; 
               $form['menu']['menu_adjust_yn'] = [
                     '#type' => 'number',
                     '#title' => $this->t('Justieren - yn',[],['langcode' => 'de']),
                     '#default_value' => $config->get('menu_adjust_yn'),
                     '#description' => $this->t('Angaben in px ohne Einheit',[],['langcode' => 'de']),
                  ]; 
               #$form['menu']['menu_adjust_yp'] = [
               #      '#type' => 'textfield',
               #      '#title' => $this->t('Justieren - yp',[],['langcode' => 'de']),
               #      '#default_value' => $config->get('menu_adjust_yp'),
               #   ]; 
               $form['menu']['menu_adjust_yp'] = [
                     '#type' => 'number',
                     '#title' => $this->t('Justieren - yp',[],['langcode' => 'de']),
                     '#default_value' => $config->get('menu_adjust_yp'),
                  ]; 
               #$form['menu']['menu_adjust_xn'] = [
               #      '#type' => 'textfield',
               #      '#title' => $this->t('Justieren - xn',[],['langcode' => 'de']),
               #      '#default_value' => $config->get('menu_adjust_xn'),
               #   ];
               $form['menu']['menu_adjust_xn'] = [
                     '#type' => 'number',
                     '#title' => $this->t('Justieren - xn',[],['langcode' => 'de']),
                     '#default_value' => $config->get('menu_adjust_xn'),
                  ]; 
               #$form['menu']['menu_adjust_xp'] = [
               #      '#type' => 'textfield',
               #      '#title' => $this->t('Justieren - xp',[],['langcode' => 'de']),
               #      '#default_value' => $config->get('menu_adjust_xp'),
               #   ]; 
               $form['menu']['menu_adjust_xp'] = [
                     '#type' => 'number',
                     '#title' => $this->t('Justieren - xp',[],['langcode' => 'de']),
                     '#default_value' => $config->get('menu_adjust_xp'),
                  ]; 
               #$form['menu']['menu_overlap'] = [
               #      '#type' => 'textfield',
               #      '#title' => $this->t('Überlappen',[],['langcode' => 'de']),
               #      '#default_value' => $config->get('menu_overlap'),
               #      '#description' => $this->t('Menue Tooltip ueber oder im Button (true|false)',[],['langcode' => 'de']),
               #   ];
               $form['menu']['menu_overlap'] = [
                     '#type' => 'checkbox',
                     '#title' => $this->t('Überlappen',[],['langcode' => 'de']),
                     '#default_value' => $config->get('menu_overlap'),
                     '#description' => $this->t('Menue Tooltip ueber oder im Button (true|false)',[],['langcode' => 'de']),
                  ];  
               #$form['menu']['menu_direction_top'] = [
               #      '#type' => 'textfield',
               #      '#title' => $this->t('Ausrichtung oben',[],['langcode' => 'de']),
               #      '#default_value' => $config->get('menu_direction_top'),
               #      '#description' => $this->t('standard ausrichtung oben oder unten (true|false)',[],['langcode' => 'de']),
               #   ];  
               $form['menu']['menu_direction_top'] = [
                     '#type' => 'checkbox',
                     '#title' => $this->t('Ausrichtung oben',[],['langcode' => 'de']),
                     '#default_value' => $config->get('menu_direction_top'),
                     '#description' => $this->t('standard ausrichtung oben oder unten (true|false)',[],['langcode' => 'de']),
                  ]; 
               #$form['menu']['menu_direction_left'] = [
               #      '#type' => 'textfield',
               #      '#title' => $this->t('Ausrichtung links',[],['langcode' => 'de']),
               #      '#default_value' => $config->get('menu_direction_left'),
               #      '#description' => $this->t('standard ausrichtung links oder rechts (true|false)',[],['langcode' => 'de']),
               #   ];
               $form['menu']['menu_direction_left'] = [
                     '#type' => 'checkbox',
                     '#title' => $this->t('Ausrichtung links',[],['langcode' => 'de']),
                     '#default_value' => $config->get('menu_direction_left'),
                     '#description' => $this->t('standard ausrichtung links oder rechts (true|false)',[],['langcode' => 'de']),
                  ];  
               /* -------------------------------------------------------------- */  
               return parent::buildForm($form, $form_state);
            }
            
         public function submitForm(array &$form, FormStateInterface $form_state) 
            { 
               // load settings
               #$config = $this->config(static::SETTINGS_SHARE);
               #Drupal::configFactory()->getEditable('system.menu.devel')->delete();
               $this->configFactory->getEditable(static::SETTINGS_SHARE)->delete();
               #$values = $form_state->getValues();
               #$this->dump($values,'msg');
                                     
               $this->configFactory->getEditable(static::SETTINGS_SHARE)
               /* -------------------------------------------------------------- */
               /* twitter */
               // share        
                  ->set('twitter_share_title', $form_state->getValue('twitter_share_title'))
                  ->set('twitter_share_icon', $form_state->getValue('twitter_share_icon'))
               // profile            
                  ->set('twitter_profile_title', $form_state->getValue('twitter_profile_title'))
                  ->set('twitter_profile_icon', $form_state->getValue('twitter_profile_icon'))
                  ->set('twitter_profile_name', $form_state->getValue('twitter_profile_name')) 
               /* x */
               // share        
                  ->set('x_share_title', $form_state->getValue('x_share_title'))
                  ->set('x_share_icon', $form_state->getValue('x_share_icon'))
               // profile            
                  ->set('x_profile_title', $form_state->getValue('x_profile_title'))
                  ->set('x_profile_icon', $form_state->getValue('x_profile_icon'))
                  ->set('x_profile_name', $form_state->getValue('x_profile_name')) 
               /* -------------------------------------------------------------- */
               /* facebook */
               // share               
                  ->set('facebook_share_title', $form_state->getValue('facebook_share_title'))
                  ->set('facebook_share_icon', $form_state->getValue('facebook_share_icon'))
                  ->set('facebook_share_app_id', $form_state->getValue('facebook_share_app_id'))
               // profile            
                  ->set('facebook_profile_title', $form_state->getValue('facebook_profile_title'))
                  ->set('facebook_profile_icon', $form_state->getValue('facebook_profile_icon'))
                  ->set('facebook_profile_name', $form_state->getValue('facebook_profile_name'))
                  ->set('facebook_profile_app_id', $form_state->getValue('facebook_profile_app_id'))   
               /* -------------------------------------------------------------- */
               /* whatsapp */
               // share     
                  ->set('whatsapp_share_title', $form_state->getValue('whatsapp_share_title'))
                  ->set('whatsapp_share_modified_title', $form_state->getValue('whatsapp_share_modified_title'))
                  ->set('whatsapp_share_icon', $form_state->getValue('whatsapp_share_icon'))  
               // profile  
               #   ->set('whatsapp_profile_title', $form_state->getValue('whatsapp_profile_title'))
               #   ->set('whatsapp_profile_icon', $form_state->getValue('whatsapp_profile_icon'))
               /* -------------------------------------------------------------- */
               /* pinterest */
               // share    
                  ->set('pinterest_share_title', $form_state->getValue('pinterest_share_title'))
                  ->set('pinterest_share_icon', $form_state->getValue('pinterest_share_icon'))
               // profile  
                  ->set('pinterest_profile_title', $form_state->getValue('pinterest_profile_title'))
                  ->set('pinterest_profile_icon', $form_state->getValue('pinterest_profile_icon'))   
               /* -------------------------------------------------------------- */
               /* linkedin */
               // share    
                  ->set('linkedin_share_title', $form_state->getValue('linkedin_share_title'))
                  ->set('linkedin_share_icon', $form_state->getValue('linkedin_share_icon'))
               // profile  
                  ->set('linkedin_profile_title', $form_state->getValue('linkedin_profile_title'))
                  ->set('linkedin_profile_icon', $form_state->getValue('linkedin_profile_icon'))
                  ->set('linkedin_profile_id', $form_state->getValue('linkedin_profile_id'))       
               /* -------------------------------------------------------------- */
               /* xing */
               // share     
                  ->set('xing_share_title', $form_state->getValue('xing_share_title'))
                  ->set('xing_share_icon', $form_state->getValue('xing_share_icon'))  
               // profile 
                  ->set('xing_profile_title', $form_state->getValue('xing_profile_title'))
                  ->set('xing_profile_icon', $form_state->getValue('xing_profile_icon'))
                  ->set('xing_profile_name', $form_state->getValue('xing_profile_name'))  
               /* -------------------------------------------------------------- */
               /* telegram */
               // share     
                  ->set('telegram_share_title', $form_state->getValue('telegram_share_title'))
                  ->set('telegram_share_icon', $form_state->getValue('telegram_share_icon'))  
               // profile 
                  ->set('telegram_profile_title', $form_state->getValue('telegram_profile_title'))
                  ->set('telegram_profile_icon', $form_state->getValue('telegram_profile_icon'))
                  ->set('telegram_profile_name', $form_state->getValue('telegram_profile_name'))  
               /* -------------------------------------------------------------- */
               /* instagram */
               // profile   
                  ->set('instagram_profile_title', $form_state->getValue('instagram_profile_title'))
                  ->set('instagram_profile_icon', $form_state->getValue('instagram_profile_icon'))
                  ->set('instagram_profile_name', $form_state->getValue('instagram_profile_name'))  
               /* -------------------------------------------------------------- */
               /* youtube */
               // channel  
                  ->set('youtube_channel_title', $form_state->getValue('youtube_channel_title'))
                  ->set('youtube_channel_icon', $form_state->getValue('youtube_channel_icon'))
                  ->set('youtube_channel_id', $form_state->getValue('youtube_channel_id'))     
               // video   
                  ->set('youtube_video_title', $form_state->getValue('youtube_video_title'))
                  ->set('youtube_video_icon', $form_state->getValue('youtube_video_icon'))
                  ->set('youtube_video_id', $form_state->getValue('youtube_video_id'))     
               /* -------------------------------------------------------------- */
               /* print */  
               // misc   
                  ->set('print_misc_title', $form_state->getValue('print_misc_title'))
                  ->set('print_misc_icon', $form_state->getValue('print_misc_icon')) 
               /* -------------------------------------------------------------- */
               /* mail */  
               // misc    
                  ->set('mail_misc_title', $form_state->getValue('mail_misc_title'))
                  ->set('mail_misc_icon', $form_state->getValue('mail_misc_icon'))
                  ->set('mail_misc_mail', $form_state->getValue('mail_misc_mail'))
                  ->set('mail_misc_subject', $form_state->getValue('mail_misc_subject'))
                  ->set('mail_misc_body', $form_state->getValue('mail_misc_body'))
                  ->set('mail_misc_msg', $form_state->getValue('mail_misc_msg'))   
               /* -------------------------------------------------------------- */
               /* link */   
                  ->set('link_misc_title', $form_state->getValue('link_misc_title'))
                  ->set('link_misc_icon', $form_state->getValue('link_misc_icon'))
                  ->set('link_misc_copy', $form_state->getValue('link_misc_copy'))
                  ->set('link_misc_close', $form_state->getValue('link_misc_close'))
                  ->set('link_misc_msg', $form_state->getValue('link_misc_msg'))     
               /* -------------------------------------------------------------- */
               /* favorite */   
                  ->set('favorite_misc_title', $form_state->getValue('favorite_misc_title'))
                  ->set('favorite_misc_icon', $form_state->getValue('favorite_misc_icon')) 
               /* -------------------------------------------------------------- */
               /* popup */  
                  ->set('popup_width', $form_state->getValue('popup_width'))
                  ->set('popup_height', $form_state->getValue('popup_height'))  
                  ->set('popup_active', $form_state->getValue('popup_active'))  
               /* -------------------------------------------------------------- */
               /* menu */ 
                  ->set('menu_title', $form_state->getValue('menu_title'))
                  ->set('menu_icon', $form_state->getValue('menu_icon'))
                  ->set('menu_adjust_yn', $form_state->getValue('menu_adjust_yn'))
                  ->set('menu_adjust_yp', $form_state->getValue('menu_adjust_yp'))
                  ->set('menu_adjust_xn', $form_state->getValue('menu_adjust_xn'))
                  ->set('menu_adjust_xp', $form_state->getValue('menu_adjust_xp'))
                  ->set('menu_overlap', $form_state->getValue('menu_overlap'))
                  ->set('menu_direction_top', $form_state->getValue('menu_direction_top'))
                  ->set('menu_direction_left', $form_state->getValue('menu_direction_left'))                 
               /* -------------------------------------------------------------- */
               // (de) save
                  ->save();
               
               #$this->configFactory->getEditable(static::SETTINGS_SHARE)->delete();
               
               parent::submitForm($form, $form_state);
            }
         /* ########################################################################################### */
         // custom functions
      }