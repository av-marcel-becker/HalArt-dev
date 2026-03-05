class share
   {
      settings = {};
      main_class = null;
      full_class = null;
      encode_url = null;
      encode_title = null;
      encode_description = null;
      encode_dash = null;
      encode_space = null;
      
      constructor(settings={})
         {
            this.preset();
            this.set(settings);
            this.set_class();
            this.set_encode_data();
            if(this.settings.setup.auto_render)
               {
                  this.render();
               }
         }
      preset()
         {
            this.set({
                  setup: {
                        class: 'share',
                        class_sufix: '',
                        select_item: null,
                        auto_render: true,
                     },
                  loading: {
                        icon: '',
                     }, 
                  placeholder: {
                        title: 'Platzhalter Icon',
                        icon: '<svg class="'+this.main_class+'-placeholder" height="100%" width="100%" viewBox="0 0 64 64"><circle cx="32" cy="32" r="31" fill="red" /><text x="28" y="38" fill="white">?</text></svg>',
                     },
                  menu: {
                        title: 'Menü',
                        icon: '<svg class="'+this.main_class+'-placeholder" height="100%" width="100%" viewBox="0 0 64 64"><circle cx="32" cy="32" r="31" fill="green" /><text x="28" y="38" fill="white">+</text></svg>', 
                        adjust: { // Angaben in px ohne Einheit
                              yn: '5',
                              yp: '0',
                              xn: '0',
                              xp: '0',
                           },
                        overlap: true, // Menue Tooltip ueber oder im Button 
                    }, 
                  direction: {
                        top: true, // standard ausrichtung oben oder unten 
                        left: false, // standard ausrichtung links oder rechts  
                     },
                  share: {
                        twitter: {
                              title: 'auf Twitter Teilen',
                              icon: '',
                           },
                        x: {
                             title: 'auf X Teilen',
                             icon: '',
                           },
                        facebook: {
                              title: 'auf Facebook Teilen',
                              icon: '',
                              app_id: '',
                           },
                        pinterest: {
                              title: 'auf Pinterest Teilen',
                              icon: '',
                           },
                        whatsapp: {
                              title: 'auf Whatsapp Teilen',
                              modified: {
                                    title: '',
                                 },
                              icon: '',
                           },
                        linkedin: {
                              title: 'auf Linkedin Teilen',
                              icon: '',
                           },
                        xing: {
                              title: 'auf Xing Teilen',
                              icon: '',
                           },
                        telegram: {
                             title: 'auf Telegram Teilen',
                             icon: '',
                           },
                        signal: {
                             title: 'auf Signal Teilen',
                             icon: '',
                             phone_number: '',
                           },/*
                        bluesky: {
                             title: 'auf Bluesky Teilen',
                             icon: '',
                           }, */
                     },
                  profile: {
                        twitter: {
                              title: 'Twitter Profil',
                              icon: '',
                              name: '',
                           },
                        x: {
                              title: 'X Profil',
                              icon: '',
                              name: '',
                           },
                        facebook: {
                              title: 'Facebook Profil',
                              icon: '',
                              name: '',
                              app_id: '',
                           },
                        pinterest: {
                              title: 'Pinterest Profil',
                              icon: '',
                           },
                        instagram: {
                              title: 'Instagram Profil',
                              icon: '',
                              name: '',
                           },
                        linkedin: {
                              title: 'Linkedin Profil',
                              icon: '',
                              id: '',
                           },
                        xing: {
                              title: 'Xing Profil',
                              icon: '',
                              name: '',
                           },
                        telegram: {
                              title: 'Telegram Profil',
                              icon: '',
                              name: '',
                           },
                     },
                  channel: {
                        youtube: {
                              title: 'Youtube Channel abbonieren',
                              icon: '',
                              id: '',
                           },
                     },
                  video: {
                        youtube: {
                              title: 'Youtube Video',
                              icon: '',
                              id: '',
                           },
                     },
                  misc: {
                        print: {
                              title: 'Drucken',
                              icon: '',
                           },
                        mail: {
                              0: {
                                    title: 'E-Mail versenden',
                                    icon: '',
                                    mail: '', // Mail leer lassen (Adresse none@none.de)
                                    subject: 'Titel', // Betreff
                                    body: 'Kurztext', // Kurztext
                                    msg: 'Es öffnet sich in wenigen Augenblicken Ihr E-Mail Programm.', // alert Message                                 
                                 },
                              1: {
                                    title: 'E-Mail versenden',
                                    icon: '',
                                    mail: '', // Mail leer lassen (Adresse none@none.de)
                                    subject: 'Titel', // Betreff
                                    body: 'Kurztext', // Kurztext
                                    msg: 'Es öffnet sich in wenigen Augenblicken Ihr E-Mail Programm.', // alert Message                                 
                                 },
                              2: {
                                    title: 'E-Mail versenden',
                                    icon: '',
                                    mail: '', // Mail leer lassen (Adresse none@none.de)
                                    subject: 'Titel', // Betreff
                                    body: 'Kurztext', // Kurztext
                                    msg: 'Es öffnet sich in wenigen Augenblicken Ihr E-Mail Programm.', // alert Message                                 
                                 },
                           },   
                        link: {
                              title: 'URL kopieren',
                              icon: '',
                              copy: 'Link kopieren',
                              close: 'Schließen',
                              msg: 'URL in der Zwischenablage gespeichert.',
                           },  
                        favorite: {
                              title: 'Favorite',
                              icon: '',
                           },   
                     },
                  data: {
                        title: '', // Share Titel
                        description: '', // Share Text / Beschreibung / Kurztext
                        url: '', // Eigene Website URL
                        picture: '', // thumb url
                     },
                  popup: {
                        active: true,
                        width: '650',
                        height: '600',
                     },
               });
            return this;
         }
     
      // TODO: querySelector item broken after s.set({...})
      merge_deep(target, source, isMergingArrays = false)
         { 
               
            // https://gist.github.com/ahtcx/0cd94e62691f539160b32ecda18af3d6?permalink_comment_id=3571894#gistcomment-3571894  
            target = ((obj) => 
               {
                  let cloneObj;
                  try 
                     {
                        cloneObj = JSON.parse(JSON.stringify(obj));
                     } 
                  catch(err) 
                     {
                        // If the stringify fails due to circular reference, the merge defaults
                        //   to a less-safe assignment that may still mutate elements in the target.
                        // You can change this part to throw an error for a truly safe deep merge.
                        cloneObj = Object.assign({}, obj);
                     }
                  return cloneObj;
               })(target);

            const isObject = (obj) => obj && typeof obj === "object";

            if(!isObject(target) || !isObject(source))
               return source;

            Object.keys(source).forEach(key => 
               {
                  const targetValue = target[key];
                  const sourceValue = source[key];

                  if(Array.isArray(targetValue) && Array.isArray(sourceValue))
                     if(isMergingArrays) 
                        {
                           target[key] = targetValue.map((x, i) => sourceValue.length <= i
                                                                        ? x 
                                                                        : this.merge_deep(x, sourceValue[i], isMergingArrays));
                           if(sourceValue.length > targetValue.length)
                              target[key] = target[key].concat(sourceValue.slice(targetValue.length));
                        } 
                     else 
                        {
                           target[key] = targetValue.concat(sourceValue);
                        }
                  // https://stackoverflow.com/questions/384286/how-do-you-check-if-a-javascript-object-is-a-dom-object
                  //else if (isObject(targetValue) && isObject(sourceValue))
                  else if (isObject(targetValue) && isObject(sourceValue) && !(sourceValue instanceof Element || sourceValue instanceof HTMLDocument))
                     target[key] = this.merge_deep(Object.assign({}, targetValue), sourceValue, isMergingArrays);
                  else
                     target[key] = sourceValue;
               });

            return target;
           
         }  
         
      set(settings={})
         {
            /*
            this.settings = {
                           ... this.settings,
                           ... settings,
                        };*/
            this.settings = this.merge_deep(this.settings, settings);
            // this.merge_deep(this.settings, settings);
            // console.log(settings);
            // console.log(this.settings);
            return this;
         }
      set_class()
         {
            this.main_class = this.settings.setup.class;
            this.full_class = this.settings.setup.class+(this.settings.setup.class_sufix?'-'+this.settings.setup.class_sufix:'');
            return this;
         }
      render_button()
         {
            const select_item = this.settings.setup.select_item;
            const types = [
                  'share',
                  'profile',
                  'channel',
                  'video',
                  'misc'
               ];
            for(const type of types)
               {
                     
                  let items = null;
                  if(select_item != null)
                     {
                        items = select_item.querySelectorAll('a.' + this.main_class + '-button[data-type="' + type + '"]');
                     }
                  else
                     {
                        items = document.querySelectorAll('.'+this.full_class + ' a.' + this.main_class + '-button[data-type="' + type + '"]');
                     }
            
                  if(items)
                     {
                        for(const item of items)
                           {
                              const types = [
                                    'img',
                                    'svg',
                                    'i',
                                    'span'
                                 ];
                              const hasIcon = types.some(tag => item.querySelector(tag));   
                              //if(types.includes(item.tagName))
                              if(hasIcon)
                                 {
                                    // icon already exist
                                 }
                              else
                                 { 
                                    // add icon
                                    if(typeof this.settings[type][item.dataset.button].icon !== 'undefined')
                                       {  
                                          item.innerHTML = item.innerHTML + this.settings[type][item.dataset.button].icon;
                                       }
                                    else                                   
                                       { 
                                          // if(typeof this.settings[type][item.dataset.button][item.dataset.num].icon !== 'undefined')
                                          if (this.settings?.[type]?.[item.dataset.button]?.[item.dataset.num]?.icon !== undefined) 
                                             {   
                                                item.innerHTML = item.innerHTML + this.settings[type][item.dataset.button][item.dataset.num].icon;
                                             }
                                          else                                   
                                             { 
                                                item.innerHTML = item.innerHTML + this.settings.placeholder.icon;
                                             }                        
                                       }                        
                                 }
                              // const title_text = this.settings[type][item.dataset.button].title??this.settings[type][item.dataset.button][item.dataset.num].title??'no title';
                              const title_text = 
                                      this.settings?.[type]?.[item.dataset.button]?.title ??
                                      this.settings?.[type]?.[item.dataset.button]?.[item.dataset.num]?.title ??
                                      'no title';

                              if(item.getAttribute('title'))
                                 {
                                    if(item.getAttribute('title').lenth <= 0)
                                       {
                                          
                                          item.setAttribute('title', title_text);
                                       }  
                                 }
                              else
                                 {
                                    item.setAttribute('title',title_text);
                                 } 
                           }       
                     }
                  
               }
                 
         }
      render_menu()
         {
            const select_item = this.settings.setup.select_item;
            
            /* menu */
            let items = null;
            
            if(select_item != null)
               {
                  items = select_item.querySelectorAll('div.'+this.main_class+'-menu');
               }
            else
               {
                  items = document.querySelectorAll('.'+this.full_class + ' > div.'+this.main_class+'-menu');
               }
            
            if(items)
               {
                  for(const item of items)
                     {  
                        const icon = item.firstElementChild;
                        const types = [
                              'img',
                              'svg',
                              'i',
                              'span'
                           ];
                        if(types.includes(icon.tagName.toLowerCase()))
                           {
                              // icon already exist
                              let icon_html = icon.outerHTML;
                              icon.outerHTML = '';
                              item.insertAdjacentHTML('beforebegin', '<a tabindex="0" class="'+this.main_class+'-menu-button">'+icon_html+'</a>');
                           }
                        else
                           {
                              // add icon
                              let icon_html = '';
                              if(this.settings.menu.icon.length)
                                 {icon_html = this.settings.menu.icon;}
                              else                                   
                                 {icon_html = this.settings.placeholder.icon;}
                              // item.prepend('<a class="'+this.main_class+'-menu-button">' + icon_html + '</a>');
                              item.insertAdjacentHTML('beforebegin', '<a tabindex="0" class="'+this.main_class+'-menu-button">' + icon_html + '</a>');
                                
                                 /*
                                  https://stackoverflow.com/questions/22260836/innerhtml-prepend-text-instead-of-appending
                                 The four positions available are:

                                  "beforebegin" (directly before the current node)

                                  "afterbegin" (inside the current node, at the beginning)

                                  "beforeend" (inside the current node, at the end)

                                  "afterend" (directly after the current node)

                                 */
                           
                           }        
                     }        
               }
                
                
            /* share Link - add overlay */
            let link_items = null;
            if(select_item != null)
               {
                  link_items = select_item.querySelectorAll('a.'+this.main_class+'-button[data-button="link"]');
               }
            else
               {
                  link_items = document.querySelectorAll('.'+this.full_class + ' a.'+this.main_class+'-button[data-button="link"]');
               }
            if(link_items.length != 0)
               {
                  for(const link_item of link_items)
                     {                        
                        if (!link_item.hasAttribute('tabindex')) {
                            link_item.setAttribute('tabindex', '0');
                        }
                        var pathname = window.location.pathname; // Returns path only
                        var url      = window.location.href;     // Returns full URL
                        var add_box = link_item.closest('.'+this.main_class);
                        add_box.insertAdjacentHTML('beforeend', '<div class="'+this.main_class+'-link-overlay" style="display:none">'
                                                                  +    '<div class="'+this.main_class+'-link-overlay-msg">'
                                                                  +       '<input aria-label="URL" type="text" class="'+this.main_class+'-link-url" value="' + url + '">'
                                                                  +       '<button class="'+this.main_class+'-link-copy">' + this.settings.misc.link.copy + '</button>'
                                                                  +       '<button class="'+this.main_class+'-link-close">' + this.settings.misc.link.close + '</button>'
                                                                  +    '</div>'
                                                                  + '</div>');                        
                     }      
               }
            
                 
            /* Tooltip-Box */
            let menus = null;
            if(select_item != null)
               {
                  menus = select_item.querySelectorAll('.'+this.main_class+'-menu-button');
               }
            else
               {
                  menus = document.querySelectorAll('.'+this.full_class+' > .'+this.main_class+'-menu-button'); 
               }                  
            if(menus.length != 0)
               {
                  for(const menu of menus)
                     {
                        // console.log(menu);
                        menu.addEventListener('click', () => 
                           {  
                              if(menu.nextSibling.style.display === "none") 
                                 {menu.nextSibling.style.display = "inline-flex";}
                              else 
                                 {menu.nextSibling.style.display = "none";}
                           });
                           
                        // Add keydown event for Enter key
                        menu.addEventListener('keydown', (event) => 
                           {
                              if(event.key === 'Enter') 
                                 {                                
                                    if(menu.nextSibling.style.display === "none") 
                                       {menu.nextSibling.style.display = "inline-flex";}
                                    else 
                                       {menu.nextSibling.style.display = "none";}
                                 }
                           });
                     }      
               }   
         }
      popup_window(target_url)
         {
            const width = this.settings.popup.width;
            const height = this.settings.popup.height;
            window.open(target_url,'_blank','width=' + width + ',height=' + height + ',left='+(screen.availWidth/2-(width/2))+',top='+(screen.availHeight/2-(height/2))+'menubar=no,toolbar=no,resizable=yes,scrollbars=yes');
            //return false;
            return this; 
         }
      print()
         {
            const select_item = this.settings.setup.select_item;
            let item = null;
            if(select_item != null)
               {
                  item = select_item.querySelector('a.'+this.main_class+'-button[data-button="print"]'); 
               }
            else
               {
                  item = document.querySelector('.'+this.full_class+' a.'+this.main_class+'-button[data-button="print"]'); 
               } 
            if(item)
               {  
                  if (!item.hasAttribute('tabindex')) {
                      item.setAttribute('tabindex', '0');
                  }
                  item.addEventListener("click", () =>
                     {
                        window.print();
                     });  
                  // Add keydown event for Enter key
                  item.addEventListener('keydown', (event) => {
                      if (event.key === 'Enter') {
                         window.print();
                      }
                  });    
               }
         }
      mail()
         {
            const select_item = this.settings.setup.select_item;
            let items = null;
            if(select_item != null)
               {
                  items = select_item.querySelectorAll('a.'+this.main_class+'-button[data-button="mail"]');
               }
            else
               {
                  items = document.querySelectorAll('.'+this.full_class+' a.'+this.main_class+'-button[data-button="mail"]');
               } 
            if(items)
               {  
                  for(const item of items)
                     {  
                        const num = item.dataset.num;
                        // const mail = this.settings.misc.mail[num].mail;
                        const mail = this.settings?.misc?.mail?.[num]?.mail ?? '';
                        // const subject = this.settings.misc.mail[num].subject;
                        const subject = this.settings?.misc?.mail?.[num]?.subject ?? 'no subject';
                        // const body = this.settings.misc.mail[num].body;  
                        const body = this.settings?.misc?.mail?.[num]?.body ?? 'no body';                        
                        // const msg = this.settings.misc.mail[num].msg;
                        const msg = this.settings?.misc?.mail?.[num]?.msg ?? 'no message';
                        const target = 'mailto:' + mail 
                                       + '?subject=' + encodeURIComponent(subject)
                                       + '&body=' + encodeURIComponent(body);
                        item.addEventListener("click", () =>
                           {
                              window.location.href = target;
                              /* alert(msg); */
                              event.preventDefault();
                           });                  // Add keydown event for Enter key
                        item.addEventListener('keydown', (event) => {
                            if (event.key === 'Enter') {
                               
                                    window.location.href = target;
                                    /* alert(msg); */
                                    event.preventDefault();
                            }
                        });    
                           
                        item.setAttribute('href', target);
                        item.setAttribute('target', '_blank');
                     }
               }   
              
         }
      link()
         {
            const select_item = this.settings.setup.select_item;
            let item = null;
            if(select_item != null)
               {
                  item = select_item.querySelector('a.'+this.main_class+'-button[data-button="link"]');
               }
            else
               {
                  item = document.querySelector('.'+this.full_class+' a.'+this.main_class+'-button[data-button="link"]');
               } 
            // var main_class = this.main_class; 
            if(item)
               {  
                  // const main_container = item.closest('.'+main_class);
                  // var overlay_box = main_container.querySelector('.'+main_class+'-link-overlay');
                  var msg = this.settings.misc.link.msg;
                  // var url = window.location.href;
                  var url = this.settings.data.url;
                  //if(overlay_box)
                  //   {
                        item.addEventListener("click", () =>
                           {  
                              // overlay_box.style.display = 'block';
                              navigator.clipboard.writeText(url).then(() => 
                                 {
                                    // console.log('Async: Copying to clipboard was successful!');
                                 }, (err) => 
                                 {
                                    // console.error('Async: Could not copy text: ', err);
                                 });
                              alert(msg);
                           });                     
                        // Add keydown event for Enter key
                        item.addEventListener('keydown', (event) => {
                            if (event.key === 'Enter') {
                                    // overlay_box.style.display = 'block';
                                    navigator.clipboard.writeText(url).then(() => 
                                       {
                                          // console.log('Async: Copying to clipboard was successful!');
                                       }, (err) => 
                                       {
                                          // console.error('Async: Could not copy text: ', err);
                                       });
                                    alert(msg);
                            }
                  });   
                   //  }
                   /*
                  // link - copy 
                  var link_copy_button = overlay_box.querySelector('button.'+main_class+'-link-copy');
                  var link_copy_input = overlay_box.querySelector('input[type="text"].'+main_class+'-link-url');
                  
                  if(link_copy_button)
                     {
                        link_copy_button.addEventListener("click", () =>
                           {  
                              link_copy_input.select();
                              document.execCommand("copy");
                              alert(msg);
                           }); 
                     }     
                  // link - close 
                  var link_close_button = overlay_box.querySelector('button.'+main_class+'-link-close');
                  if(link_close_button)
                     {
                        link_close_button.addEventListener("click", () =>
                           {  
                              overlay_box.style.display = 'none';     
                           }); 
                     }   */      
               }
         }
      set_encode_data()
         {
            this.encode_url = encodeURIComponent(this.settings.data.url);
            this.encode_title = encodeURIComponent(this.settings.data.title);
            this.encode_description = encodeURIComponent(this.settings.data.description);
            this.encode_dash = encodeURIComponent(' - ');
            this.encode_space = encodeURIComponent(' ');
         }   
      get_item(btn,type, num=null)
         {
            
            const select_item = this.settings.setup.select_item;
            let items = null;
            if(select_item != null)
               {
                  if(num === null)
                     {return select_item.querySelector('a.'+this.main_class+'-button[data-type="'+type+'"][data-button="'+btn+'"]');}
                  else
                     {return select_item.querySelector('a.'+this.main_class+'-button[data-type="'+type+'"][data-button="'+btn+'"][data-num="'+num+'"]');}
               }
            else
               {
                  if(num === null)
                     {return document.querySelector('.'+this.full_class+' a.'+this.main_class+'-button[data-type="'+type+'"][data-button="'+btn+'"]');}
                  else
                     {return document.querySelector('.'+this.full_class+' a.'+this.main_class+'-button[data-type="'+type+'"][data-button="'+btn+'"][data-num="'+num+'"]');}
               } 
            
         }
      add_click_popup(btn, type, num, target)
         {
            const item = this.get_item(btn, type, num);
            if(item)
               {  
                  if(this.settings.popup.active)
                     {
                        item.addEventListener("click", (event) =>
                           {  
                              this.popup_window(target, this.settings.popup.width, this.settings.popup.height);
                              event.preventDefault();
                           });                   
                        // Add keydown event for Enter key
                        item.addEventListener('keydown', (event) => {
                            if (event.key === 'Enter') {
                              this.popup_window(target, this.settings.popup.width, this.settings.popup.height);
                              event.preventDefault();
                            }
                        });        
                     }
                  item.setAttribute('href', target);
                  item.setAttribute('target', '_blank');
                  item.setAttribute('rel', 'nofollow');
               }
         }
      share_facebook()
         {
            // const app_id = encodeURIComponent(this.settings.share.facebook.app_id);
            const target = 'https://www.facebook.com/sharer/sharer.php?'
                         + 'u=' + this.encode_url;
            this.add_click_popup('facebook', 'share', null, target);
                  /*
                  var target = 'http://www.facebook.com/dialog/feed?'
                               + '&app_id=' + app_id
                               + '&link=' + url
                               + '&name=' + title
                               + '&description=' + description
                               + '&picture=' + picture;                          
                 
                  */
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
         }

      share_pinterest()
         {
            const target = 'http://pinterest.com/pin/create/button/?' + 
                         '&url=' + this.encode_url + 
                         '&media=' + this.encode_picture + 
                         '&description=' + this.encode_title; 
            this.add_click_popup('pinterest', 'share', null, target);
                  /*
                  http://pinterest.com/pin/create/button/?
                  url={URI-encoded URL of the page to pin}&
                  media={URI-encoded URL of the image to pin}&
                  description={optional URI-encoded description}
                  */
         }
         
      share_whatsapp()
         {
            let target = '';
            if(this.settings.share.whatsapp.modified.title.length == 0)
               {
                  target = 'whatsapp://send?'
                               + '&text=' + this.encode_title 
                                          + this.encode_dash 
                                          + this.encode_description 
                                          + this.encode_space 
                                          + this.encode_url;  
               }
            else
               {
                  target = 'whatsapp://send?'
                               + '&text=' + encodeURIComponent(this.settings.share.whatsapp.modified.title);
                                          + this.encode_space 
                                          + this.encode_url;  
               }
            this.add_click_popup('whatsapp', 'share', null, target);
            
                  /*
                  whatsapp://send?text=The text to share!
                  */ 
         }
         
      share_linkedin()
         {
            const target = 'https://www.linkedin.com/shareArticle?' + 
                           'url=' + this.encode_url  + 
                           '&title=' + this.encode_title + 
                           '&summary=' + this.encode_description;  
            this.add_click_popup('linkedin', 'share', null, target);
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
         }
         
      share_xing()
         {
            const target = 'https://www.xing.com/spi/shares/new?' + 
                           'url=' + this.encode_url;  
            this.add_click_popup('xing', 'share', null, target);
         }         
         
      profile_facebook()
         {
            const name = encodeURIComponent(this.settings.profile.facebook.name);  
            const target = 'https://www.facebook.com/' + 
                           '' + name;  
            this.add_click_popup('facebook', 'profile', null, target); 
                 
                  /*
                  https://www.facebook.com/haendelfestspielehalle/
                  */
         }
         
      profile_pinterest()
         {
            const name = encodeURIComponent(this.settings.profile.pinterest.name);   
            const target = 'https://twitter.com/' + 
                           '' + name;  
            this.add_click_popup('pinterest', 'profile', null, target); 
                 
                  /*
                  https://twitter.com/houstonchron
                  */
         }
         
      profile_instagram()
         {    
            const name = encodeURIComponent(this.settings.profile.instagram.name);          
            const target = 'https://instagram.com/' + 
                           '' + name;  
            this.add_click_popup('instagram', 'profile', null, target);
                 
                  /*
                  https://instagram.com/[yourusername] 
                  */
         }
         
      profile_linkedin()
         {
            const id = encodeURIComponent(this.settings.profile.linkedin.id);  
            const target = 'https://www.linkedin.com/company/' + 
                               '' + id;  
            this.add_click_popup('linkedin', 'profile', null, target);
                 
         }
         
      profile_xing()
         {
            const name = encodeURIComponent(this.settings.profile.xing.name);  
            const target = 'https://www.xing.com/companies/' + 
                           '' + name;  
            this.add_click_popup('xing', 'profile', null, target);
         }
         
      channel_youtube()
         {
            const id = encodeURIComponent(this.settings.channel.youtube.id);  
            const target = 'https://www.youtube.com/channel/' + 
                           '' + id;  
            this.add_click_popup('youtube', 'channel', null, target);
                 
                  /*
                  https://www.youtube.com/channel/UCvGh4HT9ySBoURt0zSpC0
                  */
         }
         
      video_youtube()
         {
            const id = encodeURIComponent(this.settings.video.youtube.id);  
            const target = 'https://www.youtube.com/watch?' + 
                           'v=' + id;  
            this.add_click_popup('youtube', 'video', null, target);
                 
         }
      /* ************************************************************************************ */
      // Signal
      /*
      profile_signal() {
        const phoneNumber = encodeURIComponent(this.settings.profile.signal.phone_number);
        const target = 'https://signal.me/#p/' + phoneNumber;
        this.add_click_popup('signal', 'profile', null, target);
      }
      */
      share_signal() {
        const phoneNumber = encodeURIComponent(this.settings.share.signal.phone_number);
        const target = 'https://signal.me/#p/' + phoneNumber + '?text=' + encodeURIComponent(this.settings.share.text);
        this.add_click_popup('signal', 'share', null, target);
      }

      /*
      // Bluesky
      profile_bluesky() {
        const name = encodeURIComponent(this.settings.profile.bluesky.name);
        const target = 'https://bsky.app/profile/' + name;
        this.add_click_popup('bluesky', 'profile', null, target);
      }

      share_bluesky() {
        const target = 'https://bsky.app/share?'
                     + '&url=' + encodeURIComponent(this.settings.share.url)
                     + '&text=' + encodeURIComponent(this.settings.share.text);
        this.add_click_popup('bluesky', 'share', null, target);
      }
      */
      // Telegram
      profile_telegram() {
        const name = encodeURIComponent(this.settings.profile.telegram.name);
        const target = 'https://t.me/' + name;
        this.add_click_popup('telegram', 'profile', null, target);
      }

      share_telegram() {
        const target = 'https://t.me/share/url?'
                     + 'url=' + this.encode_url
                     + '&text=' + this.encode_title;
        this.add_click_popup('telegram', 'share', null, target);
      }

      // X (Twitter)
      profile_x() {
        const name = encodeURIComponent(this.settings.profile.twitter.name);
        const target = 'http://twitter.com/' + name;
        this.add_click_popup('x', 'profile', null, target);
      }

      share_x() {
        const target = 'https://twitter.com/share?'
                     + '&url=' + this.encode_url
                     + '&text=' + this.encode_title;
        this.add_click_popup('x', 'share', null, target);
      }    
      profile_twitter() {
            const name = encodeURIComponent(this.settings.profile.twitter.name);  
            const target = 'http://twitter.com/' + 
                           '' + name;  
            this.add_click_popup('twitter', 'profile', null, target);     
      } 
      share_twitter() {
            const target = 'https://twitter.com/share?'
                         + '&url=' + this.encode_url
                         + '&text=' + this.encode_title/* + dash + description*/;
            this.add_click_popup('twitter', 'share', null, target);
                               /*+ '&related=';*/
                  /* window.location.href = target; */
                  /*
                    url=https%3A%2F%2Fdev.twitter.com%2Fweb%2Ftweet-button&
                    via=twitterdev&
                    related=twitterapi%2Ctwitter&
                    hashtags=example%2Cdemo&
                    text=custom%20share%20text"*/   
              
      } 
      /* ************************************************************************************ */   
      render()
         {
            // render icons, container etc.
            this.render_menu();
            this.render_button();
            // add click event
            this.print();
            this.mail();
            this.link();
            this.share_twitter();
            this.share_x();
            this.share_facebook();
            this.share_pinterest();
            this.share_whatsapp();
            this.share_linkedin();
            this.share_xing();
            this.share_telegram();
            this.profile_twitter();
            this.profile_x();
            this.profile_facebook();
            this.profile_pinterest();
            this.profile_instagram();
            this.profile_linkedin();
            this.profile_xing();
            this.profile_telegram();
            this.channel_youtube();
            this.video_youtube();
            return this;
         }
   }
/* */
document.addEventListener("DOMContentLoaded", () => 
   {
      const s = new share({
            setup: {
                  class: 'av-share'
               },
            // ... share_settings,
            ... av_share_settings // from setup.js
         });
   });

   
   

   
   