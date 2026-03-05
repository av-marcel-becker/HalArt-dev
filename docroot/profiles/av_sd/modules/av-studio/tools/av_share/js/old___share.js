/* config */            
var av_share_config = {'placeholder': {},     
                       'menu': {'direction': {},
                                'adjust': {}},
                       'loading': {},
                       'data': {}, 
                       'popup': {},                                   
                       'title': {},
                       'share': {'twitter': {},
                                 'facebook': {},
                                 'google_plus': {},
                                 'pinterest': {},
                                 'whatsapp': {
                                                'modified': {}
                                             },
                                 'xing': {},
                                 'linkedin': {},
                                 'youtube': {}},
                       'profile': {'twitter': {},
                                 'facebook': {},
                                 'google_plus': {},
                                 'pinterest': {},
                                 'instagram': {},
                                 'whatsapp': {},
                                 'youtube': {},
                                 'linkedin': {},
                                 'xing': {}}, 
                       'channel': {'youtube': {}},
                       'video': {'youtube': {}},
                       'misc': {'print': {},
                                'mail': {},   
                                'mail_custom[0]': {}, 
                                'mail_custom[1]': {}, 
                                'mail_custom[2]': {},                                   
                                'link': {},
                                'favorite': {}}
                       };
(function ($) 
   {
      /*
      $(document).ready(function() 
         { 
         });      

         */
            /* loading */
            av_share_config.loading.icon = ''; 
            
            /* placeholder  */
            av_share_config.placeholder.title = 'Platzhalter Icon'; 
            av_share_config.placeholder.icon = '<svg class="av_share_placeholder" height="100%" width="100%" viewBox="0 0 64 64"><circle cx="32" cy="32" r="31" fill="red" /><text x="28" y="38" fill="white">?</text></svg>'; 
            
            /* menu */
            av_share_config.menu.title = 'Menü'; 
            av_share_config.menu.icon = '<svg class="av_share_placeholder" height="100%" width="100%" viewBox="0 0 64 64"><circle cx="32" cy="32" r="31" fill="green" /><text x="28" y="38" fill="white">+</text></svg>';        
            av_share_config.menu.adjust.yn = '5'; // Angaben in px ohne Einheit
            av_share_config.menu.adjust.yp = '0'; 
            av_share_config.menu.adjust.xn = '0';
            av_share_config.menu.adjust.xp = '0';
            av_share_config.menu.overlap = true; // Menue Tooltip ueber oder im Button            
            av_share_config.menu.direction.top = true; // standard ausrichtung oben oder unten
            av_share_config.menu.direction.left = false; // standard ausrichtung links oder rechts
            
            /* social - share */
            av_share_config.share.twitter.title = 'auf Twitter Teilen';
            av_share_config.share.twitter.icon = '';
            
            av_share_config.share.facebook.title = 'auf Facebook Teilen';
            av_share_config.share.facebook.icon = '';
            av_share_config.share.facebook.app_id = '';
            
            av_share_config.share.google_plus.title = 'auf Google + Teilen';
            av_share_config.share.google_plus.icon = '';
            av_share_config.share.google_plus.lang = 'de';
            
            av_share_config.share.pinterest.title = 'auf Pinterest Teilen';
            av_share_config.share.pinterest.icon = '';             
            
            av_share_config.share.whatsapp.title = 'auf Whatsapp Teilen'; 
            av_share_config.share.whatsapp.modified.title = '';
            av_share_config.share.whatsapp.icon = ''; 
            
            av_share_config.share.linkedin.title = 'auf Linkedin Teilen'; 
            av_share_config.share.linkedin.icon = '';
            
            av_share_config.share.xing.title = 'auf Xing Teilen'; 
            av_share_config.share.xing.icon = ''; 
            
            /* social - profile */
            av_share_config.profile.twitter.title = 'Twitter Profil';
            av_share_config.profile.twitter.icon = '';
            av_share_config.profile.twitter.name = '';
            
            av_share_config.profile.facebook.title = 'Facebook Profil';
            av_share_config.profile.facebook.icon = '';
            av_share_config.profile.facebook.name = '';
            av_share_config.profile.facebook.app_id = '';
            
            av_share_config.profile.google_plus.title = 'Google + Profil';
            av_share_config.profile.google_plus.icon = '';
            av_share_config.profile.google_plus.name = ''; // name bzw. id
            
            av_share_config.profile.pinterest.title = 'Pinterest Profil';
            av_share_config.profile.pinterest.icon = ''; 
            
            av_share_config.profile.instagram.title = 'Instagram Profil'; 
            av_share_config.profile.instagram.icon = '';  
            av_share_config.profile.instagram.name = '';  
            
            av_share_config.profile.whatsapp.title = 'Whatsapp Profil'; 
            av_share_config.profile.whatsapp.icon = '';  
            
            av_share_config.profile.linkedin.title = 'Linkedin Profil'; 
            av_share_config.profile.linkedin.icon = ''; 
            av_share_config.profile.linkedin.id = '';  
            
            av_share_config.profile.xing.title = 'Xing Profil'; 
            av_share_config.profile.xing.icon = ''; 
            av_share_config.profile.xing.name = ''; 
            
            /* social - channel */
            av_share_config.channel.youtube.title = 'Youtube Channel abbonieren';
            av_share_config.channel.youtube.icon = '';
            av_share_config.channel.youtube.id = '';
            
            /* social - video */
            av_share_config.video.youtube.title = 'Youtube Video';
            av_share_config.video.youtube.icon = '';
            av_share_config.video.youtube.id = '';
            
            /* misc */
            av_share_config.misc.print.title = 'Drucken'; 
            av_share_config.misc.print.icon = ''; 
            
            av_share_config.misc.mail.title = 'E-Mail versenden';  
            av_share_config.misc.mail.icon = '';          
            av_share_config.misc.mail.mail = ''; // Mail leer lassen (Adresse none@none.de)
            av_share_config.misc.mail.subject = 'Titel'; // Betreff
            av_share_config.misc.mail.body = 'Kurztext'; // Kurztext
            av_share_config.misc.mail.msg = 'Es öffnet sich in wenigen Augenblicken Ihr E-Mail Programm.'; // alert Message
            
            av_share_config.misc['mail_custom[0]'].title = av_share_config.misc.mail.title;  
            av_share_config.misc['mail_custom[0]'].icon = av_share_config.misc.mail.icon;          
            av_share_config.misc['mail_custom[0]'].mail = av_share_config.misc.mail.mail; // Mail leer lassen (Adresse none@none.de)
            av_share_config.misc['mail_custom[0]'].subject = av_share_config.misc.mail.subject; // Betreff
            av_share_config.misc['mail_custom[0]'].body = av_share_config.misc.mail.body; // Kurztext
            av_share_config.misc['mail_custom[0]'].msg = av_share_config.misc.mail.msg; // alert Message
            
            av_share_config.misc['mail_custom[1]'].title = av_share_config.misc.mail.title;  
            av_share_config.misc['mail_custom[1]'].icon = av_share_config.misc.mail.icon;          
            av_share_config.misc['mail_custom[1]'].mail = av_share_config.misc.mail.mail; // Mail leer lassen (Adresse none@none.de)
            av_share_config.misc['mail_custom[1]'].subject = av_share_config.misc.mail.subject; // Betreff
            av_share_config.misc['mail_custom[1]'].body = av_share_config.misc.mail.body; // Kurztext
            av_share_config.misc['mail_custom[1]'].msg = av_share_config.misc.mail.msg; // alert Message
            
            av_share_config.misc['mail_custom[2]'].title = av_share_config.misc.mail.title;  
            av_share_config.misc['mail_custom[2]'].icon = av_share_config.misc.mail.icon;          
            av_share_config.misc['mail_custom[2]'].mail = av_share_config.misc.mail.mail; // Mail leer lassen (Adresse none@none.de)
            av_share_config.misc['mail_custom[2]'].subject = av_share_config.misc.mail.subject; // Betreff
            av_share_config.misc['mail_custom[2]'].body = av_share_config.misc.mail.body; // Kurztext
            av_share_config.misc['mail_custom[2]'].msg = av_share_config.misc.mail.msg; // alert Message
            
            av_share_config.misc.link.title = 'URL kopieren';  
            av_share_config.misc.link.icon = ''; 
            av_share_config.misc.link.copy = 'Link kopieren'; 
            av_share_config.misc.link.close = 'Schließen'; 
            av_share_config.misc.link.msg = 'URL in der Zwischenablage gespeichert.'; 
            
            av_share_config.misc.favorite.title = 'Favorite'; 
            av_share_config.misc.favorite.icon = '';  
            
            /* Data */
            av_share_config.data.title = ''; // Share Titel
            av_share_config.data.description = ''; // Share Text / Beschreibung / Kurztext
            av_share_config.data.url = ''; // Eigene Website URL
            av_share_config.data.picture = ''; // thumb url
            
            /* popup settings */
            av_share_config.popup.width = '650';
            av_share_config.popup.height = '600';
            
            
            
            
            /* ******************************************************* */
            /* ******************************************************* */
            /* set icon and menu */
            $.fn.setup_av_button = function(config, add_class='')
               {
                  var types = ['share','profile','channel','video', 'misc'];
                  $.each(types, function (index, type) 
                     { 
                        /* share buttons */
                        $.each($('.av_share' + add_class + ' a.av_share_button[data-type="' + type + '"]'), function()
                           {      
                              var box = $(this)
                              if(box.has('img').length || box.has('svg').length || box.has('span').length || box.has('i').length)
                                 {
                                    // icon already exist
                                 }
                              else
                                 { 
                                    // add icon
                                    if(config[type][box.data('button')].icon.length)
                                       {box.prepend(config[type][box.data('button')].icon);}
                                    else                                   
                                       {box.prepend(config['placeholder'].icon);}                        
                                 }
                              var title = $(box);
                              var title_text = (config[type][box.data('button')].title)?config[type][box.data('button')].title:'no title';
                              if(title.attr('title'))
                                 {
                                    if(title.attr('title').lenth <= 0)
                                       {
                                          
                                          title.attr('title', title_text);
                                       }  
                                 }
                              else
                                 {
                                    title.attr('title',title_text);
                                 } 
                                 
                           });      
                        
                     });
                  
                  /* share menu */
                  $.each($('.av_share' + add_class + ' > div.av_share_menu'), function()
                     {      
                        var box = $(this)
                        if(box.has('> img').length || box.has('> svg').length || box.has('> span').length || box.has('> i').length)
                           {
                              // icon already exist
                              if(box.has('> img').length)
                                 {
                                    var box_img = $('> img', this);
                                    box_img.wrap('<a class="av_share_menu_button"></a>');
                                 }
                              else if(box.has('> svg').length)
                                 {
                                    var box_svg = $('> svg', this);
                                    box_svg.wrap('<a class="av_share_menu_button"></a>');
                                 }
                              else if(box.has('> span').length)
                                 {
                                    var box_svg = $('> span', this);
                                    box_svg.wrap('<a class="av_share_menu_button"></a>');
                                 }
                              else if(box.has('> i').length)
                                 {
                                    var box_svg = $('> i', this);
                                    box_svg.wrap('<a class="av_share_menu_button"></a>');
                                 }
                              
                           }
                        else
                           {
                              // add icon
                              if(config[box.data('button')].icon.length)
                                 {box.prepend('<a class="av_share_menu_button">' + config[box.data('button')].icon + '</a>');}
                              else                                   
                                 {box.prepend('<a class="av_share_menu_button">' + config['placeholder'].icon + '</a>');}
                           }
                     });
                  /* share Link - add overlay */
                  $.each($('.av_share' + add_class + ' a.av_share_button[data-button="link"]'), function()
                     {      
                        var pathname = window.location.pathname; // Returns path only
                        var url      = window.location.href;     // Returns full URL
                        var add_box = $(this).closest('.av_share');
                        $(add_box).append('<div class="av_share_link_overlay" style="display:none">'
                                       +    '<div class="av_share_link_overlay_msg">'
                                       +       '<input type="text" class="av_share_link_url" value="' + url + '">'
                                       +       '<button class="av_share_link_copy">' + av_share_config.misc.link.copy + '</button>'
                                       +       '<button class="av_share_link_close">' + av_share_config.misc.link.close + '</button>'
                                       +    '</div>'
                                       + '</div>');
                     });
                     
                  
                  /* move menu button */                         
                  $.each($('.av_share' + add_class + ' > div.av_share_menu > .av_share_menu_button'), function()
                     {      
                        var menu_button = $(this);
                        var menu_button_img = ($('img',this).length)?$('img',this):$('svg',this);
                        var button_height = menu_button_img.height();
                        var button_width = menu_button_img.width(); 
                        menu_button.parent().wrap('<div class="av_share_menu_box" style="position: relative; width: ' + button_width  + 'px; height: ' + button_height  + 'px;"></div>');
                        menu_button.prependTo(menu_button.parent().parent());                  
                        /* menu_button.unwrap(); */
                        /* var share_menu = $('+ div.av_share_menu', this);
                        share_menu.appendTo(menu_button); */
                     });                  
               }
           /* setup_av_button(av_share_config, '');
            setup_av_button(av_share_config, '.one');
            setup_av_button(av_share_config, '.two');*/

            /* ########################################################################### */

            /* Tooltip-Box */
            /* $('.av_share > .av_share_menu_button').mouseenter(function() */
            $('.av_share > .av_share_menu_box').mouseenter(function()
               {  
                  var space = 0;
                  var menu_box = $(' > .av_share_menu_button + .av_share_menu', this); 
                  var menu_button = $(' > .av_share_menu_button',this);
                  var window_height = $(window).innerHeight();
                  var window_width = $(window).innerWidth();
                  var position = menu_button.offset();
                  var button_height = menu_button.height();
                  var button_width = menu_button.width(); 
                  var position_top = position.top - $(window).scrollTop();                   
                  var position_left = position.left;                  
                  var position_right = window_width - position_left - button_width;
                  var position_bottom = window_height - position_top - button_height; 
                  var menu_width = menu_box.innerWidth();    
                  var menu_height = menu_box.innerHeight();
                  
                  var menu_width_total = menu_width + space;
                  var menu_height_total = menu_height + space;
                  
                  var yPos = 0;
                  var xPos = 0;
                  
                  var overlap = av_share_config.menu.overlap;
                  
                  
                  if(av_share_config.menu.direction.top)
                     {
                        if(position_top > menu_height_total)
                           {
                              menu_box.removeClass('av_share_menu_bottom').addClass('av_share_menu_top'); 
                              menu_width = menu_box.innerWidth();    
                              menu_height = menu_box.innerHeight();
                              yPos = -Math.abs(menu_height) + ((overlap)?button_height:0) - space - av_share_config.menu.adjust.yn;                             
                              menu_box.css('top', yPos + 'px');                                                         
                           }
                        else if(position_bottom > menu_height_total)
                           {
                              menu_box.removeClass('av_share_menu_top').addClass('av_share_menu_bottom'); 
                              menu_width = menu_box.innerWidth();    
                              menu_height = menu_box.innerHeight();
                              yPos = space + av_share_config.menu.adjust.yp - ((!overlap)?button_height:0);
                              menu_box.css('top', yPos + 'px');    
                                                         
                           }
                        else
                           {
                              menu_box.removeClass('av_share_menu_top av_share_menu_bottom');
                              menu_width = menu_box.innerWidth();    
                              menu_height = menu_box.innerHeight();
                              yPos = (-Math.abs(menu_height) + space) / 2;
                              menu_box.css('top', yPos + 'px');                               
                           }      
                     }
                  else
                     {
                        if(position_bottom > menu_height_total)
                           {
                              menu_box.removeClass('av_share_menu_top').addClass('av_share_menu_bottom');
                              menu_width = menu_box.innerWidth();    
                              menu_height = menu_box.innerHeight();
                              yPos = space + av_share_config.menu.adjust.yp - ((!overlap)?button_height:0);
                              menu_box.css('top', yPos + 'px');  
                              
                           }
                        else if(position_top > menu_height_total)
                           {
                              menu_box.removeClass('av_share_menu_bottom').addClass('av_share_menu_top'); 
                              menu_width = menu_box.innerWidth();    
                              menu_height = menu_box.innerHeight();
                              yPos = -Math.abs(menu_height) + ((overlap)?button_height:0) - space - av_share_config.menu.adjust.yn;                             
                              menu_box.css('top', yPos + 'px');
                           }
                        else
                           {
                              menu_box.removeClass('av_share_menu_top av_share_menu_bottom'); 
                              menu_width = menu_box.innerWidth();    
                              menu_height = menu_box.innerHeight();
                              yPos = (-Math.abs(menu_height) + space) / 2;
                              menu_box.css('top', yPos + 'px');   
                             
                           }      
   
                     }
                  
                  if(av_share_config.menu.direction.left)
                     {
                        if(position_left > menu_width_total)
                           {
                              menu_box.removeClass('av_share_menu_right').addClass('av_share_menu_left');
                              menu_width = menu_box.innerWidth();    
                              menu_height = menu_box.innerHeight();
                              xPos = -Math.abs(menu_width) + ((overlap)?button_width:0) - space - av_share_config.menu.adjust.xn;
                              menu_box.css('left', xPos + 'px');                               
                           }
                        else if(position_right > menu_width_total)
                           {
                              menu_box.removeClass('av_share_menu_left').addClass('av_share_menu_right'); 
                              menu_width = menu_box.innerWidth();    
                              menu_height = menu_box.innerHeight();
                              xPos =  ((!overlap)?button_width:0) + space + av_share_config.menu.adjust.xp;
                              menu_box.css('left', xPos + 'px');                              
                           }
                        else
                           {
                              menu_box.removeClass('av_share_menu_right av_share_menu_left'); 
                              menu_width = menu_box.innerWidth();    
                              menu_height = menu_box.innerHeight();
                              xPos = -((menu_width + space) / 2);
                              menu_box.css('left', yPos + 'px');                              
                           }      
                     }
                  else
                     {
                        if(position_right > menu_width_total)
                           {
                              menu_box.removeClass('av_share_menu_left').addClass('av_share_menu_right'); 
                              menu_width = menu_box.innerWidth();    
                              menu_height = menu_box.innerHeight();
                              xPos =  ((!overlap)?button_width:0) + space + av_share_config.menu.adjust.xp;
                              menu_box.css('left', xPos + 'px');                              
                           }
                        else if(position_left > menu_width_total)
                           { 
                              menu_box.removeClass('av_share_menu_right').addClass('av_share_menu_left'); 
                              menu_width = menu_box.innerWidth();    
                              menu_height = menu_box.innerHeight();
                              xPos = -Math.abs(menu_width) + ((overlap)?button_width:0) - space - av_share_config.menu.adjust.xn;
                              menu_box.css('left', xPos + 'px');                             
                           }
                        else
                           {
                              menu_box.removeClass('av_share_menu_right av_share_menu_left'); 
                              menu_width = menu_box.innerWidth();    
                              menu_height = menu_box.innerHeight();
                              xPos = -((menu_width + space) / 2);
                              menu_box.css('left', yPos + 'px');                              
                           }      
                     }   
                  
                  menu_box.css('display', 'inline-block');

                  
               }).mouseleave(function(e)
               {                 
                  tip = $(' > .av_share_menu_button + .av_share_menu', this);
                  tip.css({'display': 'none'}); 
               });
            $('.av_share > .av_share_menu').mouseenter(function(e)
               {                 
                  tip = $(this);
                  tip.css({'display': 'inline-block'}); 
               }).mouseleave(function(e)
               {                 
                  tip = $(this);
                  tip.css({'display': 'none'}); 
               });
            /* ******************************************************* */
            /* set click function */
            var av_share_popup_width = av_share_config.popup.width;
            var av_share_popup_height = av_share_config.popup.height;
            function av_share_popup_window(target_url, width=450, height=300)
               { 
                  window.open(target_url,'_blank','width=' + width + ',height=' + height + ',left='+(screen.availWidth/2-(width/2))+',top='+(screen.availHeight/2-(height/2))+'menubar=no,toolbar=no,resizable=yes,scrollbars=yes');return false;
               }
            /* print */
            $('.av_share a.av_share_button[data-button="print"]').click(function()
               {
                  window.print();
               });
            /* mail */
            $('.av_share a.av_share_button[data-button="mail"]').click(function()
               {
                  var mail = av_share_config.misc.mail.mail;
                  var subject = av_share_config.misc.mail.subject;
                  var body = av_share_config.misc.mail.body;                  
                  var msg = av_share_config.misc.mail.msg;
                  
                  window.location.href = 'mailto:' + mail 
                  + '?subject=' + encodeURIComponent(subject)
                  + '&body=' + encodeURIComponent(body);
                  /* alert(msg); */
               });
               
            /* mail_custom */
                  $('.av_share a.av_share_button[data-button="mail_custom[0]"]').click(function()
                     {
                        var mail = av_share_config.misc['mail_custom[0]'].mail;
                        var subject = av_share_config.misc['mail_custom[0]'].subject;
                        var body = av_share_config.misc['mail_custom[0]'].body;                  
                        var msg = av_share_config.misc['mail_custom[0]'].msg;
                        
                        window.location.href = 'mailto:' + mail 
                        + '?subject=' + encodeURIComponent(subject)
                        + '&body=' + encodeURIComponent(body);
                        /* alert(msg); */
                     });
                  $('.av_share a.av_share_button[data-button="mail_custom[1]"]').click(function()
                     {
                        var mail = av_share_config.misc['mail_custom[1]'].mail;
                        var subject = av_share_config.misc['mail_custom[1]'].subject;
                        var body = av_share_config.misc['mail_custom[1]'].body;                  
                        var msg = av_share_config.misc['mail_custom[1]'].msg;
                        
                        window.location.href = 'mailto:' + mail 
                        + '?subject=' + encodeURIComponent(subject)
                        + '&body=' + encodeURIComponent(body);
                        /* alert(msg); */
                     });
                  $('.av_share a.av_share_button[data-button="mail_custom[2]"]').click(function()
                     {
                        var mail = av_share_config.misc['mail_custom[2]'].mail;
                        var subject = av_share_config.misc['mail_custom[2]'].subject;
                        var body = av_share_config.misc['mail_custom[2]'].body;                  
                        var msg = av_share_config.misc['mail_custom[2]'].msg;
                        
                        window.location.href = 'mailto:' + mail 
                        + '?subject=' + encodeURIComponent(subject)
                        + '&body=' + encodeURIComponent(body);
                        /* alert(msg); */
                     });      
              
            
            /* link */
            $('.av_share a.av_share_button[data-button="link"]').click(function()
               {
                  var overlay_box = $(this).closest('.av_share');
                  /* overlay_box.css({'background-color':'yellow'});*/
                  $(' > .av_share_link_overlay', overlay_box).css({'display': 'block'});
                  
               });
            /* link - copy */
            $('.av_share button.av_share_link_copy').click(function()
               {
                  $('input[type="text"].av_share_link_url').select();
                  document.execCommand("copy");
                  alert(av_share_config.misc.link.msg);
               });
            /* link - close */
            $('.av_share button.av_share_link_close').click(function()
               {
                  $('.av_share > .av_share_link_overlay').css({'display': 'none'});                  
               });
               
            /* ******************************************************* */ 
            
            /* twitter - share */
            $('.av_share a.av_share_button[data-type="share"][data-button="twitter"]').click(function()
               {
                  var url = encodeURIComponent(av_share_config.data.url);
                  var title = encodeURIComponent(av_share_config.data.title);
                  var description = encodeURIComponent(av_share_config.data.description);
                  var dash = encodeURIComponent(' - ');
                  var space = encodeURIComponent(' ');
                  
                  var target = 'https://twitter.com/share?'
                               + '&url=' + url
                               + '&text=' + title/* + dash + description*/;
                               /*+ '&related=';*/
                  /* window.location.href = target; */
                  av_share_popup_window(target, av_share_popup_width, av_share_popup_height);
                  /*
                    url=https%3A%2F%2Fdev.twitter.com%2Fweb%2Ftweet-button&
                    via=twitterdev&
                    related=twitterapi%2Ctwitter&
                    hashtags=example%2Cdemo&
                    text=custom%20share%20text"*/
               }); 
            /* facebook - share */
            $('.av_share a.av_share_button[data-type="share"][data-button="facebook"]').click(function()
               {
                  var url = encodeURIComponent(av_share_config.data.url);
                  var title = encodeURIComponent(av_share_config.data.title);
                  var description = encodeURIComponent(av_share_config.data.description);
                  var picture = encodeURIComponent(av_share_config.data.picture);
                  var app_id = encodeURIComponent(av_share_config.share.facebook.app_id);
                  var target = 'https://www.facebook.com/sharer/sharer.php?'
                               + 'u=' + url;
                  /*
                  var target = 'http://www.facebook.com/dialog/feed?'
                               + '&app_id=' + app_id
                               + '&link=' + url
                               + '&name=' + title
                               + '&description=' + description
                               + '&picture=' + picture;                          
                 
                  */
                  av_share_popup_window(target, av_share_popup_width, av_share_popup_height);
                  /*
                  http://www.facebook.com/dialog/feed?  
                  app_id=123050457758183&  
                  link=http://developers.facebook.com/docs/reference/dialogs/&
                  picture=http://fbrell.com/f8.jpg&  
                  name=Facebook%20Dialogs&  
                  caption=Reference%20Documentation& 
                  description=Dialogs%20provide%20a%20simple,%20consistent%20interface%20for%20applications%20to%20interact%20with%20users.&
                  message=Facebook%20Dialogs%20are%20so%20easy!&
                  redirect_uri=http://www.example.com/response
                  */
                  /*
                  <meta property="og:title" content="title" />
                  <meta property="og:description" content="description" />
                  <meta property="og:image" content="thumbnail_image" />
                  */
                  /*
                  https://www.facebook.com/dialog/share?
                    app_id=145634995501895
                    &display=popup
                    &href=https%3A%2F%2Fdevelopers.facebook.com%2Fdocs%2F
                    &redirect_uri=https%3A%2F%2Fdevelopers.facebook.com%2Ftools%2Fexplorer
                    */
               }); 
            /* google_plus - share */
            $('.av_share a.av_share_button[data-type="share"][data-button="google_plus"]').click(function()
               {
                  var url = encodeURIComponent(av_share_config.data.url);                  
                  var title = encodeURIComponent(av_share_config.data.title);
                  var description = encodeURIComponent(av_share_config.data.description);
                  var lang = encodeURIComponent(av_share_config.share.google_plus.lang);
                  var dash = encodeURIComponent(' - ');
                  var space = encodeURIComponent(' ');
                  
                  var target = 'https://plus.google.com/share?'
                               + 'hl=' + lang
                               + '&url=' + url; /*  
                  var target = 'https://m.google.com/app/plus/x/?v=compose&'                                
                               + '&content=' + title + dash + description + space + url;    
                               */              
                  /* window.open(target,'_blank'); */
                  av_share_popup_window(target, av_share_popup_width, av_share_popup_height);
                  /*
                  https://plus.google.com/share?url=YOUR_URL_HERE&hl=de
                  */
                   /*
                  <meta property="og:title" content="title" />
                  <meta property="og:description" content="description" />
                  <meta property="og:image" content="thumbnail_image" />
                  */
               }); 
            /* pinterest - share */
            $('.av_share a.av_share_button[data-type="share"][data-button="pinterest"]').click(function()
               {
                  var url = encodeURIComponent(av_share_config.data.url);                  
                  var title = encodeURIComponent(av_share_config.data.title);
                  var description = encodeURIComponent(av_share_config.data.description);
                  var picture = encodeURIComponent(av_share_config.data.picture);
                  var target = 'http://pinterest.com/pin/create/button/?' + 
                               '&url=' + url + 
                               '&media=' + picture + 
                               '&description=' + title + 
                               '&url=' + url; 
                  av_share_popup_window(target, screen.availWidth, av_share_popup_height);
                  /*
                  http://pinterest.com/pin/create/button/?
                  url={URI-encoded URL of the page to pin}&
                  media={URI-encoded URL of the image to pin}&
                  description={optional URI-encoded description}
                  */
               });
            /* whatsapp - share */
            $('.av_share a.av_share_button[data-type="share"][data-button="whatsapp"]').click(function()
               {
                  if(av_share_config.share.whatsapp.modified.title.length == 0)
                     {
                        var url = encodeURIComponent(av_share_config.data.url);                  
                        var title = encodeURIComponent(av_share_config.data.title);
                        var description = encodeURIComponent(av_share_config.data.description);
                        var dash = encodeURIComponent(' - ');
                        var space = encodeURIComponent(' ');
                        
                        var target = 'whatsapp://send?' + 
                                     '&text=' + title + dash + description + space + url;  
                        av_share_popup_window(target, av_share_popup_width, av_share_popup_height);
                        /*
                        whatsapp://send?text=The text to share!
                        */      
                     }
                  else
                     {
                        var url = encodeURIComponent(av_share_config.data.url);                  
                        var title = encodeURIComponent(av_share_config.share.whatsapp.modified.title);
                        var space = encodeURIComponent(' ');
                        
                        var target = 'whatsapp://send?' + 
                                     '&text=' + title + space + url;  
                        av_share_popup_window(target, av_share_popup_width, av_share_popup_height);
                     }
               });
            /* linkedin - share */
            $('.av_share a.av_share_button[data-type="share"][data-button="linkedin"]').click(function()
               {
                  var url = encodeURIComponent(av_share_config.data.url);                
                  var title = encodeURIComponent(av_share_config.data.title);  
                  var description = encodeURIComponent(av_share_config.data.description);/*
                  var dash = encodeURIComponent(' - ');
                  var space = encodeURIComponent(' ');
                       */
                        var target = 'https://www.linkedin.com/shareArticle?' + 
                                     'url=' + url  + 
                                     '&title=' + title + 
                                     '&summary=' + description;  
                        av_share_popup_window(target, av_share_popup_width, av_share_popup_height);
                        /*
                           https://developer.linkedin.com/docs/share-on-linkedin
                           Parameter 	Description 	Max  Length 	Required
                           url 	The url-encoded URL of the page that you wish to share.
                              1024 	Yes
                           mini 	A required argument who's value must always be:  true 	4 	Yes
                           title 	The url-encoded title value that you wish you use.
                              200 	No
                           summary 	The url-encoded description that you wish you use. 	256 	No
                           source 	

                           The url-encoded source of the content (e.g. your website or application name)
                              200 	No
                        */
               });
            /* xing - share */
            $('.av_share a.av_share_button[data-type="share"][data-button="xing"]').click(function()
               {
                  var url = encodeURIComponent(av_share_config.data.url);    /*              
                  var title = encodeURIComponent(av_share_config.data.title);
                  var description = encodeURIComponent(av_share_config.data.description);
                  var dash = encodeURIComponent(' - ');
                  var space = encodeURIComponent(' ');
                        */
                        var target = 'https://www.xing.com/spi/shares/new?' + 
                                     'url=' + url;  
                        av_share_popup_window(target, av_share_popup_width, av_share_popup_height);
               });
               
            /* ******************************************************* */ 
            
            /* twitter - profile */
            $('.av_share a.av_share_button[data-type="profile"][data-button="twitter"]').click(function()
               {
                  var name = encodeURIComponent(av_share_config.profile.twitter.name);  
                  
                  var target = 'http://twitter.com/' + 
                               '' + name;  
                  av_share_popup_window(target, av_share_popup_width, av_share_popup_height);
                 
                  /*
                  
                  */
               });
            /* facebook - profile */
            $('.av_share a.av_share_button[data-type="profile"][data-button="facebook"]').click(function()
               {
                  var name = encodeURIComponent(av_share_config.profile.facebook.name);  
                  
                  var target = 'https://www.facebook.com/' + 
                               '' + name;  
                  av_share_popup_window(target, av_share_popup_width, av_share_popup_height);
                 
                  /*
                 https://www.facebook.com/haendelfestspielehalle/
                  */
               });
            /* google plus - profile */
            $('.av_share a.av_share_button[data-type="profile"][data-button="google_plus"]').click(function()
               {
                  var name = encodeURIComponent(av_share_config.profile.google_plus.name);  
                  
                  var target = 'https://plus.google.com/' + 
                               '' + name;  
                  av_share_popup_window(target, av_share_popup_width, av_share_popup_height);
                 
                  /*
                  https://plus.google.com/+golem
                  */
               });
            /* pinterest - profile */
            $('.av_share a.av_share_button[data-type="profile"][data-button="pinterest"]').click(function()
               {
                  var name = encodeURIComponent(av_share_config.profile.pinterest.name);  
                  
                  var target = 'https://twitter.com/' + 
                               '' + name;  
                  av_share_popup_window(target, av_share_popup_width, av_share_popup_height);
                 
                  /*
                  https://twitter.com/houstonchron
                  */
               });
            /* instagram - profile */
            $('.av_share a.av_share_button[data-type="profile"][data-button="instagram"]').click(function()
               {
                  var name = encodeURIComponent(av_share_config.profile.instagram.name);  
                  
                  var target = 'https://instagram.com/' + 
                               '' + name;  
                  av_share_popup_window(target, av_share_popup_width, av_share_popup_height);
                 
                  /*
                  https://instagram.com/[yourusername] 
                  */
               });
            /* linkedin - profile */
            $('.av_share a.av_share_button[data-type="profile"][data-button="linkedin"]').click(function()
               {
                  var id = encodeURIComponent(av_share_config.profile.linkedin.id);  
                  
                  var target = 'https://www.linkedin.com/company/' + 
                               '' + id;  
                  av_share_popup_window(target, av_share_popup_width, av_share_popup_height);
                 
               });
            /* xing - profile */
            $('.av_share a.av_share_button[data-type="profile"][data-button="xing"]').click(function()
               {
                  var name = encodeURIComponent(av_share_config.profile.xing.name);  
                  
                  var target = 'https://www.xing.com/companies/' + 
                               '' + name;  
                  av_share_popup_window(target, av_share_popup_width, av_share_popup_height);
                 
               });
            /* ******************************************************* */ 
            /* youtube - channel */
            $('.av_share a.av_share_button[data-type="channel"][data-button="youtube"]').click(function()
               {
                  var id = encodeURIComponent(av_share_config.channel.youtube.id);  
                  
                  var target = 'https://www.youtube.com/channel/' + 
                               '' + id;  
                  av_share_popup_window(target, av_share_popup_width, av_share_popup_height);
                 
                  /*
                  https://www.youtube.com/channel/UCvGh4HT9ySBoURt0zSpC0
                  */
               });
            
            /* ******************************************************* */ 
            /* youtube - video */
            $('.av_share a.av_share_button[data-type="video"][data-button="youtube"]').click(function()
               {
                  var id = encodeURIComponent(av_share_config.video.youtube.id);  
                  
                  var target = 'https://www.youtube.com/watch?' + 
                               'v=' + id;  
                  av_share_popup_window(target, av_share_popup_width, av_share_popup_height);
                 
               });
            
            /* ******************************************************* */     
              
           
   })(jQuery);