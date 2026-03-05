var av_share_settings = (function (Drupal, drupalSettings) 
   {
      /*console.log(drupalSettings)*/;
      /* console.log(drupalSettings.av_share); */
      /* console.log(settings); */
      const hasDrupalSettings = !!(drupalSettings && typeof drupalSettings === 'object');
      if (!hasDrupalSettings) {
         console.warn('[av_share] drupalSettings ist nicht gesetzt oder nicht zugreifbar.');
      }

      const hasAvShareSettings = !!(hasDrupalSettings && drupalSettings.av_share);
      const config = hasAvShareSettings ? drupalSettings.av_share : {};
      if (!hasAvShareSettings) {
         console.warn('[av_share] drupalSettings.av_share ist nicht gesetzt. Es werden Fallback-Werte verwendet.');
      }
      /* get data */
      const data_title = document.querySelector('meta[property="og:title"]')?document.querySelector('meta[property="og:title"]').getAttribute('content'):'';
      const data_description = document.querySelector('meta[property="og:description"]')?document.querySelector('meta[property="og:description"]').getAttribute('content'):'';
      const data_url = document.querySelector('meta[property="og:url"]')?document.querySelector('meta[property="og:url"]').getAttribute('content'):'';
      const data_picture = document.querySelector('meta[property="og:image"]')?document.querySelector('meta[property="og:image"]').getAttribute('content'):'';
      /* if (drupalSettings.av_share) {} */
      let share_settings = {
            data: {
                  title: data_title,
                  description: data_description,
                  url: data_url,
                  picture: data_picture,
               },
            popup: {
                  width: config.popup_width,
                  height: config.popup_height,
                  active: config.popup_active?true:false,
               },
            misc: {
                  mail: {
                        0: {
                              title: config.mail_misc_title,
                              subject: config.mail_misc_subject + data_title,
                              body: config.mail_misc_body + 'Ich habe ' + data_title + ' auf der Seite ' + data_url + ' entdeckt.',
                              msg: config.mail_misc_msg,
                              icon: config.mail_misc_icon,   
                              mail: config.mail_misc_mail,  // ? 
                           }
                     },
                  favorite: {
                        title: config.favorite_misc_title,
                        icon: config.favorite_misc_icon,
                     },
                  print: {
                        title: config.print_misc_title,
                        icon: config.print_misc_icon,
                     },
                  link: {
                        title: config.link_misc_title,
                        icon: config.link_misc_icon,
                        copy: config.link_misc_copy,
                        close: config.link_misc_close,
                        msg: config.link_misc_msg,
                     },
               },
            share: {
                  twitter: {
                        title: config.twitter_share_title,
                        icon: config.twitter_share_icon,
                     },
                  x: {
                        title: config.x_share_title,
                        icon: config.x_share_icon,
                     },
                  facebook: {
                        title: config.facebook_share_title,
                        icon: config.facebook_share_icon,
                        app_id: config.facebook_share_app_id,
                     },
                  pinterest: {
                        title: config.pinterest_share_title,
                        icon: config.pinterest_share_icon,
                     },
                  linkedin: {
                        title: config.linkedin_share_title,
                        icon: config.linkedin_share_icon,
                     },
                  xing: {
                        title: config.xing_share_title,
                        icon: config.xing_share_icon,
                     },
                  whatsapp: {
                        title: config.whatsapp_share_title,
                        modified: {
                              title: config.whatsapp_share_modified_title,
                           },
                        icon: config.whatsapp_share_icon,
                     },
                  telegram: {
                        title: config.telegram_share_title,
                        icon: config.telegram_share_icon,
                     },
               },
            profile: {
                  twitter: {
                        title: config.twitter_profile_title,
                        icon: config.twitter_profile_icon,
                        name: config.twitter_profile_name,
                     },
                  x: {
                        title: config.x_profile_title,
                        icon: config.x_profile_icon,
                        name: config.x_profile_name,
                     },
                  facebook: {
                        title: config.facebook_profile_title,
                        icon: config.facebook_profile_icon,
                        name: config.facebook_profile_name,
                        app_id: config.facebook_profile_app_id,
                     },
                  pinterest: {
                        title: config.pinterest_profile_title,
                        icon: config.pinterest_profile_icon,
                     },
                  linkedin: {
                        title: config.linkedin_profile_title,
                        icon: config.linkedin_profile_icon,
                        id: config.linkedin_profile_id,
                     },
                  xing: {
                        title: config.xing_profile_title,
                        icon: config.xing_profile_icon,
                        name: config.xing_profile_name,
                     },
                  instagram: {
                        title: config.instagram_profile_title,
                        icon: config.instagram_profile_icon,
                        name: config.instagram_profile_name,
                     },
                  telegram: {
                        title: config.telegram_profile_title,
                        icon: config.telegram_profile_icon,
                        name: config.telegram_profile_name,
                     },         
               },
            channel: {
                  youtube: {
                        title: config.youtube_channel_title,
                        icon: config.youtube_channel_icon,
                        id: config.youtube_channel_id,
                     },                               
               },
            video: {
                  youtube: {
                        title: config.youtube_video_title,
                        icon: config.youtube_video_icon,
                        id: config.youtube_video_id,
                     },
               },
            menu: {
                  title: config.menu_title,
                  icon: config.menu_icon,
                  adjust: {
                        yn: config.menu_adjust_yn, // Angaben in px ohne Einheit
                        yp: config.menu_adjust_yp,
                        xn: config.menu_adjust_xn,
                        xp: config.menu_adjust_xp,
                     },
                  overlap: config.menu_overlap?true:false, // Menue Tooltip ueber oder im Button  
                  direction: {
                        top: config.menu_direction_top?true:false, // standard ausrichtung oben oder unten
                        left: config.menu_direction_left?true:false, // standard ausrichtung links oder rechts
                     },
               }, 
         };
      
      /* setup */ 
      
      
      /*
      share_settings.misc['mail_custom[0]'].title = 'Hinweis zur Seite (E-Mail)';                   
      share_settings.misc['mail_custom[0]'].subject = 'Hinweis zur Seite - ' + share_settings.data.title;
      share_settings.misc['mail_custom[0]'].body =  'Ich habe folgenden Hinweis zu der nachfolgenden Seite: ' + '\r\n' + '\r\n' + '\r\n' + '\r\n' + share_settings.data.title + '\r\n' + share_settings.data.url; 
      share_settings.misc['mail_custom[0]'].msg = 'Es öffnet sich in wenigen Augenblicken Ihr E-Mail Programm.';
      share_settings.misc['mail_custom[0]'].icon = '<i class="far fa-comment"></i>'; 
      share_settings.misc['mail_custom[0]'].mail = 'test@test.test';
      
      share_settings.misc.print.title = 'Drucken'; 
      share_settings.misc.print.icon = '<i class="fas fa-print"></i>'; 
      */
      /* console.log(drupalSettings); */
      
      /* menu */    
                    
      Drupal.behaviors.av_share = {
            attach: function (context, settings) 
               {
                  /*
                  if (settings.av_share) {
                     console.log('Erfolg:', settings.av_share);
                   }
                   */
                  /* setup */   /*                  
                  document.addEventListener("DOMContentLoaded", () => 
                     {
                        const s = new share({
                              setup: {
                                    class: 'av-share'
                                 },
                              ... share_settings,
                           });
                     }); */
               }
         };
      return share_settings;
   })(Drupal, typeof drupalSettings !== 'undefined' ? drupalSettings : null);
   
   
/*
  "path": {
    "baseUrl": "/",
    "scriptPath": null,
    "pathPrefix": "",
    "currentPath": "node/29",
    "currentPathIsAdmin": false,
    "isFront": false,
    "currentLanguage": "de"
  },
  "av_share": {
    "twitter_share_title": "auf Twitter Teilen",
    "twitter_share_icon": "<i class=\"fab fa-twitter\"></i>",
    "twitter_profile_title": "Twitter Profil",
    "twitter_profile_icon": "<i class=\"fab fa-twitter\"></i>",
    "twitter_profile_name": "",
    "facebook_share_title": "auf Facebook Teilen",
    "facebook_share_icon": "<i class=\"fab fa-facebook-f\"></i>",
    "facebook_share_app_id": "",
    "facebook_profile_title": "Facebook Profil",
    "facebook_profile_icon": "<i class=\"fab fa-facebook-f\"></i>",
    "facebook_profile_name": "",
    "facebook_profile_app_id": "",
    "whatsapp_share_title": "auf Whatsapp Teilen",
    "whatsapp_share_modified_title": "",
    "whatsapp_share_icon": "<i class=\"fab fa-whatsapp\"></i>",
    "whatsapp_profile_title": "Whatsapp Profil",
    "whatsapp_profile_icon": "<i class=\"fab fa-whatsapp\"></i>",
    "pinterest_share_title": "auf Pinterest Teilen",
    "pinterest_share_icon": "",
    "pinterest_profile_title": "Pinterest Profil",
    "pinterest_profile_icon": "",
    "linkedin_share_title": "auf Linkedin Teilen",
    "linkedin_share_icon": "<i class=\"fab fa-linkedin-in\"></i>",
    "linkedin_profile_title": "Linkedin Profil",
    "linkedin_profile_icon": "<i class=\"fab fa-linkedin-in\"></i>",
    "linkedin_profile_id": "",
    "xing_share_title": "auf Xing Teilen",
    "xing_share_icon": "",
    "xing_profile_title": "Xing Profil",
    "xing_profile_icon": "",
    "xing_profile_name": "",
    "instagram_profile_title": "Instagram Profil",
    "instagram_profile_icon": "",
    "instagram_profile_name": "",
    "youtube_channel_title": "Youtube Channel abbonieren",
    "youtube_channel_icon": "",
    "youtube_channel_id": "",
    "youtube_video_title": "Youtube Video",
    "youtube_video_icon": "",
    "youtube_video_id": "",
    "print_misc_title": "Drucken",
    "print_misc_icon": "",
    "mail_misc_title": "E-Mail versenden",
    "mail_misc_icon": "<i class=\"far fa-envelope\"></i>",
    "mail_misc_mail": "",
    "mail_misc_subject": "",
    "mail_misc_body": "",
    "mail_misc_msg": "Es öffnet sich in wenigen Augenblicken Ihr E-Mail Programm.",
    "link_misc_title": "URL kopieren",
    "link_misc_icon": "",
    "link_misc_copy": "Link kopieren",
    "link_misc_close": "Schließen",
    "link_misc_msg": "URL in der Zwischenablage gespeichert.",
    "favorite_misc_title": "Favorite",
    "favorite_misc_icon": "",
    "popup_width": "650",
    "popup_height": "600",
    "popup_active": true,
    "menu_title": "Menü",
    "menu_icon": "",
    "menu_adjust_yn": "24",
    "menu_adjust_yp": "0",
    "menu_adjust_xn": "0",
    "menu_adjust_xp": "0",
    "menu_overlap": true,
    "menu_direction_top": 1,
    "menu_direction_left": false
*/
