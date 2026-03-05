
class share {
   settings = {};
   main_class = null;
   full_class = null;
   encode_url = null;
   encode_title = null;
   encode_description = null;
   encode_dash = null;
   encode_space = null;
   mutationTimeout = null;

   constructor(settings = {}) {
      this.preset();
      this.set(settings);
      this.set_class();
      this.set_encode_data();
      if (this.settings.setup.auto_render) {
         this.init();
      }
   }

   init() {
      this.render(); // Initial render for elements present at load time.

      const observer = new MutationObserver((mutationsList) => {
         // Use a simple debounce to prevent the render function from firing too rapidly.
         if (this.mutationTimeout) {
            clearTimeout(this.mutationTimeout);
         }
         this.mutationTimeout = setTimeout(() => {
            // Re-run render to process any new elements.
            this.set_encode_data(); // Re-encode data in case URL has changed (for SPAs)
            this.render();
         }, 50);
      });

      observer.observe(document.body, {
         childList: true,
         subtree: true
      });
   }

   preset() {
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
            icon: '<svg class="' + this.main_class + '-placeholder" height="100%" width="100%" viewBox="0 0 64 64"><circle cx="32" cy="32" r="31" fill="red" /><text x="28" y="38" fill="white">?</text></svg>',
         },
         menu: {
            title: 'Menü',
            icon: '<svg class="' + this.main_class + '-placeholder" height="100%" width="100%" viewBox="0 0 64 64"><circle cx="32" cy="32" r="31" fill="green" /><text x="28" y="38" fill="white">+</text></svg>',
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
            },
            /*
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
   merge_deep(target, source, isMergingArrays = false) {

      // https://gist.github.com/ahtcx/0cd94e62691f539160b32ecda18af3d6?permalink_comment_id=3571894#gistcomment-3571894  
      target = ((obj) => {
         let cloneObj;
         try {
            cloneObj = JSON.parse(JSON.stringify(obj));
         } catch (err) {
            // If the stringify fails due to circular reference, the merge defaults
            //   to a less-safe assignment that may still mutate elements in the target.
            // You can change this part to throw an error for a truly safe deep merge.
            cloneObj = Object.assign({}, obj);
         }
         return cloneObj;
      })(target);

      const isObject = (obj) => obj && typeof obj === "object";

      if (!isObject(target) || !isObject(source))
         return source;

      Object.keys(source).forEach(key => {
         const targetValue = target[key];
         const sourceValue = source[key];

         // Keep preset defaults when incoming values are missing.
         if (sourceValue === undefined || sourceValue === null) {
            return;
         }

         if (Array.isArray(targetValue) && Array.isArray(sourceValue))
            if (isMergingArrays) {
               target[key] = targetValue.map((x, i) => sourceValue.length <= i ?
                  x :
                  this.merge_deep(x, sourceValue[i], isMergingArrays));
               if (sourceValue.length > targetValue.length)
                  target[key] = target[key].concat(sourceValue.slice(targetValue.length));
            } else {
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

   set(settings = {}) {
      this.settings = this.merge_deep(this.settings, settings);
      return this;
   }
   set_class() {
      this.main_class = this.settings.setup.class;
      this.full_class = this.settings.setup.class + (this.settings.setup.class_sufix ? '-' + this.settings.setup.class_sufix : '');
      return this;
   }
   render_button() {
      const context = this.settings.setup.select_item || document;
      const types = [
         'share',
         'profile',
         'channel',
         'video',
         'misc'
      ];
      for (const type of types) {
         const selector = 'a.' + this.main_class + '-button[data-type="' + type + '"]:not([data-share-rendered])';
         const items = context.querySelectorAll(selector);

         if (items) {
            for (const item of items) {
               const iconTypes = [
                  'img',
                  'svg',
                  'i',
                  'span'
               ];
               const hasIcon = iconTypes.some(tag => item.querySelector(tag));
               
               if (!hasIcon) {
                  // add icon
                  if (typeof this.settings[type][item.dataset.button].icon !== 'undefined') {
                     item.innerHTML = item.innerHTML + this.settings[type][item.dataset.button].icon;
                  } else {
                     if (this.settings?.[type]?.[item.dataset.button]?.[item.dataset.num]?.icon !== undefined) {
                        item.innerHTML = item.innerHTML + this.settings[type][item.dataset.button][item.dataset.num].icon;
                     } else {
                        item.innerHTML = item.innerHTML + this.settings.placeholder.icon;
                     }
                  }
               }
               
               const title_text =
                  this.settings?.[type]?.[item.dataset.button]?.title ??
                  this.settings?.[type]?.[item.dataset.button]?.[item.dataset.num]?.title ??
                  'no title';
               
               item.setAttribute('aria-label', title_text);
               
               if (item.getAttribute('title')) {
                  if (item.getAttribute('title').length <= 0) {
                     item.setAttribute('title', title_text);
                  }
               } else {
                  item.setAttribute('title', title_text);
               }
               item.dataset.shareRendered = 'true';
            }
         }
      }
   }
   render_menu() {
      const context = this.settings.setup.select_item || document;

      /* menu */
      const items = context.querySelectorAll('div.' + this.main_class + '-menu:not([data-share-menu-rendered])');
      if (items) {
         for (const item of items) {
            const icon = item.firstElementChild;
            const types = [
               'img',
               'svg',
               'i',
               'span'
            ];
            const menuTitle = this.settings.menu.title || 'Menü';
            if (icon && types.includes(icon.tagName.toLowerCase())) {
               // icon already exist
               let icon_html = icon.outerHTML;
               icon.outerHTML = '';
               item.insertAdjacentHTML('beforebegin', '<a tabindex="0" role="button" aria-label="' + menuTitle + '" title="' + menuTitle + '" class="' + this.main_class + '-menu-button">' + icon_html + '</a>');
            } else {
               // add icon
               let icon_html = '';
               const menuIcon = this.settings?.menu?.icon;
               if (typeof menuIcon === 'string' && menuIcon.length) {
                  icon_html = menuIcon;
               } else {
                  icon_html = this.settings.placeholder.icon;
               }
               item.insertAdjacentHTML('beforebegin', '<a tabindex="0" role="button" aria-label="' + menuTitle + '" title="' + menuTitle + '" class="' + this.main_class + '-menu-button">' + icon_html + '</a>');
            }
            item.dataset.shareMenuRendered = 'true';
         }
      }

      /* Tooltip-Box Events */
      const menus = context.querySelectorAll('.' + this.main_class + '-menu-button:not([data-share-menu-events])');
      if (menus.length != 0) {
         for (const menu of menus) {
            const toggleMenu = () => {
               const nextElement = menu.nextElementSibling;
               if (nextElement && nextElement.classList.contains(this.main_class + '-menu')) {
                  if (nextElement.style.display === "none" || nextElement.style.display === "") {
                     nextElement.style.display = "inline-flex";
                  } else {
                     nextElement.style.display = "none";
                  }
               }
            };
            menu.addEventListener('click', toggleMenu);
            menu.addEventListener('keydown', (event) => {
               if (event.key === 'Enter') {
                  toggleMenu();
               }
            });
            menu.dataset.shareMenuEvents = 'true';
         }
      }
   }
   popup_window(target_url) {
      const width = this.settings.popup.width;
      const height = this.settings.popup.height;
      window.open(target_url, '_blank', 'width=' + width + ',height=' + height + ',left=' + (screen.availWidth / 2 - (width / 2)) + ',top=' + (screen.availHeight / 2 - (height / 2)) + 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes');
      return this;
   }
   print() {
      const context = this.settings.setup.select_item || document;
      const items = context.querySelectorAll('a.' + this.main_class + '-button[data-button="print"]:not([data-share-events-processed])');
      if (items) {
         items.forEach(item => {
            if (!item.hasAttribute('tabindex')) {
               item.setAttribute('tabindex', '0');
            }
            item.addEventListener("click", (e) => {
               e.preventDefault();
               window.print();
            });
            item.addEventListener('keydown', (event) => {
               if (event.key === 'Enter') {
                  event.preventDefault();
                  window.print();
               }
            });
            item.dataset.shareEventsProcessed = 'true';
         });
      }
   }
   mail() {
      const context = this.settings.setup.select_item || document;
      const items = context.querySelectorAll('a.' + this.main_class + '-button[data-button="mail"]:not([data-share-events-processed])');
      if (items) {
         for (const item of items) {
            const num = item.dataset.num;
            const mail = this.settings?.misc?.mail?.[num]?.mail ?? '';
            const subject = this.settings?.misc?.mail?.[num]?.subject ?? 'no subject';
            const body = this.settings?.misc?.mail?.[num]?.body ?? 'no body';
            const msg = this.settings?.misc?.mail?.[num]?.msg ?? 'no message';
            const target = 'mailto:' + mail +
               '?subject=' + encodeURIComponent(subject) +
               '&body=' + encodeURIComponent(body);
            item.addEventListener("click", (event) => {
               window.location.href = target;
               event.preventDefault();
            });
            item.addEventListener('keydown', (event) => {
               if (event.key === 'Enter') {
                  window.location.href = target;
                  event.preventDefault();
               }
            });

            item.setAttribute('href', target);
            item.setAttribute('target', '_blank');
            item.dataset.shareEventsProcessed = 'true';
         }
      }

   }
   link() {
      const context = this.settings.setup.select_item || document;
      const items = context.querySelectorAll('a.' + this.main_class + '-button[data-button="link"]:not([data-share-events-processed])');
      if (items) {
         items.forEach(item => {
            var msg = this.settings.misc.link.msg;
            var url = this.settings.data.url;
            
            const copyLink = (event) => {
                event.preventDefault();
                navigator.clipboard.writeText(url).then(() => {
                    alert(msg);
                }, (err) => {
                    // console.error('Could not copy text: ', err);
                });
            };

            item.addEventListener("click", copyLink);
            item.addEventListener('keydown', (event) => {
               if (event.key === 'Enter') {
                  copyLink(event);
               }
            });
            item.dataset.shareEventsProcessed = 'true';
         });
      }
   }
   set_encode_data() {
      this.settings.data.url = this.settings.data.url || window.location.href;
      this.settings.data.title = this.settings.data.title || document.title;

      this.encode_url = encodeURIComponent(this.settings.data.url);
      this.encode_title = encodeURIComponent(this.settings.data.title);
      this.encode_description = encodeURIComponent(this.settings.data.description);
      this.encode_dash = encodeURIComponent(' - ');
      this.encode_space = encodeURIComponent(' ');
   }
   get_items(btn, type, num = null) {
      const context = this.settings.setup.select_item || document;
      let selector = `a.${this.main_class}-button[data-type="${type}"][data-button="${btn}"]:not([data-share-events-processed])`;
      if (num !== null) {
         selector += `[data-num="${num}"]`;
      }
      return context.querySelectorAll(selector);
   }
   add_click_popup(btn, type, num, target) {
      const items = this.get_items(btn, type, num);
      if (items) {
         items.forEach(item => {
            if (this.settings.popup.active) {
               const openPopup = (event) => {
                  event.preventDefault();
                  this.popup_window(target);
               };
               item.addEventListener("click", openPopup);
               item.addEventListener('keydown', (event) => {
                  if (event.key === 'Enter') {
                     openPopup(event);
                  }
               });
            }
            item.setAttribute('href', target);
            item.setAttribute('target', '_blank');
            item.setAttribute('rel', 'nofollow');
            item.dataset.shareEventsProcessed = 'true';
         });
      }
   }
   share_facebook() {
      const target = 'https://www.facebook.com/sharer/sharer.php?' +
         'u=' + this.encode_url;
      this.add_click_popup('facebook', 'share', null, target);
   }

   share_pinterest() {
      const target = 'http://pinterest.com/pin/create/button/?' +
         '&url=' + this.encode_url +
         '&media=' + this.encode_picture +
         '&description=' + this.encode_title;
      this.add_click_popup('pinterest', 'share', null, target);
   }

   share_whatsapp() {
      let target = '';
      const modifiedTitle = this.settings?.share?.whatsapp?.modified?.title;
      if (typeof modifiedTitle !== 'string' || modifiedTitle.length == 0) {
         target = 'whatsapp://send?' +
            '&text=' + this.encode_title +
            this.encode_dash +
            this.encode_description +
            this.encode_space +
            this.encode_url;
      } else {
         target = 'whatsapp://send?' +
            '&text=' + encodeURIComponent(modifiedTitle) +
            this.encode_space +
            this.encode_url;
      }
      this.add_click_popup('whatsapp', 'share', null, target);
   }

   share_linkedin() {
      const target = 'https://www.linkedin.com/shareArticle?' +
         'url=' + this.encode_url +
         '&title=' + this.encode_title +
         '&summary=' + this.encode_description;
      this.add_click_popup('linkedin', 'share', null, target);
   }

   share_xing() {
      const target = 'https://www.xing.com/spi/shares/new?' +
         'url=' + this.encode_url;
      this.add_click_popup('xing', 'share', null, target);
   }

   profile_facebook() {
      const name = encodeURIComponent(this.settings.profile.facebook.name);
      const target = 'https://www.facebook.com/' +
         '' + name;
      this.add_click_popup('facebook', 'profile', null, target);
   }

   profile_pinterest() {
      const name = encodeURIComponent(this.settings.profile.pinterest.name);
      const target = 'https://twitter.com/' +
         '' + name;
      this.add_click_popup('pinterest', 'profile', null, target);
   }

   profile_instagram() {
      const name = encodeURIComponent(this.settings.profile.instagram.name);
      const target = 'https://instagram.com/' +
         '' + name;
      this.add_click_popup('instagram', 'profile', null, target);
   }

   profile_linkedin() {
      const id = encodeURIComponent(this.settings.profile.linkedin.id);
      const target = 'https://www.linkedin.com/company/' +
         '' + id;
      this.add_click_popup('linkedin', 'profile', null, target);
   }

   profile_xing() {
      const name = encodeURIComponent(this.settings.profile.xing.name);
      const target = 'https://www.xing.com/companies/' +
         '' + name;
      this.add_click_popup('xing', 'profile', null, target);
   }

   channel_youtube() {
      const id = encodeURIComponent(this.settings.channel.youtube.id);
      const target = 'https://www.youtube.com/channel/' +
         '' + id;
      this.add_click_popup('youtube', 'channel', null, target);
   }

   video_youtube() {
      const id = encodeURIComponent(this.settings.video.youtube.id);
      const target = 'https://www.youtube.com/watch?' +
         'v=' + id;
      this.add_click_popup('youtube', 'video', null, target);
   }
   /* ************************************************************************************ */
   // Signal
   share_signal() {
      const phoneNumber = encodeURIComponent(this.settings.share.signal.phone_number);
      const target = 'https://signal.me/#p/' + phoneNumber + '?text=' + encodeURIComponent(this.settings.share.text);
      this.add_click_popup('signal', 'share', null, target);
   }

   // Telegram
   profile_telegram() {
      const name = encodeURIComponent(this.settings.profile.telegram.name);
      const target = 'https://t.me/' + name;
      this.add_click_popup('telegram', 'profile', null, target);
   }

   share_telegram() {
      const target = 'https://t.me/share/url?' +
         'url=' + this.encode_url +
         '&text=' + this.encode_title;
      this.add_click_popup('telegram', 'share', null, target);
   }

   // X (Twitter)
   profile_x() {
      const name = encodeURIComponent(this.settings.profile.twitter.name);
      const target = 'http://twitter.com/' + name;
      this.add_click_popup('x', 'profile', null, target);
   }

   share_x() {
      const target = 'https://twitter.com/share?' +
         '&url=' + this.encode_url +
         '&text=' + this.encode_title;
      this.add_click_popup('x', 'share', null, target);
   }
   profile_twitter() {
      const name = encodeURIComponent(this.settings.profile.twitter.name);
      const target = 'http://twitter.com/' +
         '' + name;
      this.add_click_popup('twitter', 'profile', null, target);
   }
   share_twitter() {
      const target = 'https://twitter.com/share?' +
         '&url=' + this.encode_url +
         '&text=' + this.encode_title;
      this.add_click_popup('twitter', 'share', null, target);
   }
   /* ************************************************************************************ */
   render() {
      this.render_menu();
      this.render_button();
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
document.addEventListener("DOMContentLoaded", () => {
   const s = new share({
      setup: {
         class: 'av-share'
      },
      // ... share_settings,
      ... (typeof av_share_settings !== 'undefined' ? av_share_settings : {})
   });
});
