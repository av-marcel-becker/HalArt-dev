class av_advertisement
   {
      base_url = null;
      location = null;
      
      setup = 
         {
            convert_location: 
               {
                  42: // 57 = Veranstaltungs-Liste
                     {
                        target: '.teaser-wrapper .gt-teaser',
                        before: true,
                        class: ['ad-list-item'],
                     },
                  41: // 58 = Veranstaltungs-Detailseite
                     {
                        target: '.x',
                        before: false,
                        class: ['ad-default-item'],
                     },
                  40: // 59 = Startseite - Teaser (Platzhalter)
                     {
                        target: '.teaser-ads',
                        before: true,
                        class: ['ad-teaser-item'],
                     },
               },
            convert_position:
               {
                  5: 0, // static -> 1. position
                  6: 1, // static -> 2. position
                  7: 2, // static -> 3. position
                  8: 3, // static -> 4. position
                  9: 4, // static -> 5. position
                  10: 5, // static -> 6. position
                  11: 6, // static -> 7. position
                  12: 7, // static -> 8. position
                  13: 8, // static -> 9. position
                  14: 9, // static -> 10. position
                  15: 10, // static -> 11. position
                  16: 11, // static -> 12. position
                  17: 12, // static -> 13. position
                  18: 13, // static -> 14. position
                  19: 14, // static -> 15. position
                  20: 15, // static -> 16. position
                  21: 16, // static -> 17. position
                  22: 17, // static -> 18. position
                  23: 18, // static -> 19. position
                  24: 19, // static -> 20. position
                  25: 20, // static -> 21. position
                  26: 21, // static -> 22. position
                  27: 22, // static -> 23. position
                  28: 23, // static -> 24. position
                  29: 24, // static -> 25. position
                  30: 25, // static -> 26. position                  
                  31: 26, // static -> 27. position
                  32: 27, // static -> 28. position
                  33: 28, // static -> 29. position
                  34: 29, // static -> 30. position
                  35: 30, // static -> 31. position
               },
            convert_position_relative:
               {
                  37: '', // relative -> 1. first
                  39: '', // relative -> 2. last
                  38: '', // relative -> 3. middle
               }
         }
      constructor(location=null)
         {
            // this.base_url = window.location.href;
            // this.base_url = window.location.hostname;
            // window.location.protocol
            this.base_url = window.location.origin;
            this.location = location;
            this.render();
         }
      get_json(url, param=null)
         {
            let full_url = url;
            if(param!=null)
               {
                  full_url = url + '?' + new URLSearchParams(param);    
                  // console.log(full_url);                  
               }
            const request = new Request(full_url, {method: 'GET'});

            return fetch(request).then((response) => 
               {
                  if(response.status === 200) 
                     {
                        return response.json();
                     } 
                  else 
                     {
                        //throw new Error('Something went wrong on API server!');
                        return {};
                     }
               });
         }        
      get_data(location = this.location)
         {
            const url = this.base_url + '/ads' +  ((location)?'/'+location:'');
            return this.get_json(url);
         }
      static write_meta(item)
         {   
         /*
            const items = item.closest('picture').querySelectorAll('img, source');
                    
            for(const [key, value] of Object.entries(items)) 
               {
                  const img = new Image();     // use not () => 
                  const url = value.getAttribute('src')||value.getAttribute('srcset');
                  img.addEventListener("load", function() 
                     {
                        value.setAttribute('width', this.naturalWidth);
                        value.setAttribute('height', this.naturalHeight);
                     });
                  img.src = url;      
               }
               */
         }
      observeIframeChanges(iframe) 
         {
            /* ******************************************* */
            let observer = new MutationObserver(() => 
               {
                  this.adjustIframeSize(iframe);
               });

            let observerOptions = {
                  attributes: true,
                  childList: true,
                  subtree: true
               };

            observer.observe(iframe, observerOptions);
            
            /* ******************************************* */
            /* iframe.contentWindow.addEventListener('resize', () => */
            iframe.addEventListener('resize', () => 
               {
                  this.adjustIframeSize(iframe);
               });
            /* ******************************************* */
            /*
            let mediaQueryList = window.matchMedia("(min-width: 728px)");
                mediaQueryList.addEventListener('change', (event) => 
                  {
                     if(event.matches) 
                        {
                            this.adjustIframeSize(iframe);
                        }
                  });
                  */
            /* ******************************************* */
         }
      adjustIframeSize(iframe) 
         {
            let iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
            /*
            let contentHeight = Math.max(
                     iframeDocument.body.scrollHeight,
                     iframeDocument.documentElement.scrollHeight,
                     iframeDocument.body.offsetHeight,
                     iframeDocument.documentElement.offsetHeight,
                     iframeDocument.body.clientHeight,
                     iframeDocument.documentElement.clientHeight
                  );
            let contentWidth = Math.max(
                     iframeDocument.body.scrollWidth,
                     iframeDocument.documentElement.scrollWidth,
                     iframeDocument.body.offsetWidth,
                     iframeDocument.documentElement.offsetWidth,
                     iframeDocument.body.clientWidth,
                     iframeDocument.documentElement.clientWidth
                  );
            */
            let adElement = iframeDocument.querySelector('.ad');
            let contentWidth = adElement.offsetWidth;
            let contentHeight = adElement.offsetHeight;
            /*
            let contentWidth = parseInt(iframe.getAttribute('width'), 10);
            let contentHeight = parseInt(iframe.getAttribute('height'), 10);
            */
            let maxWidth = iframe.parentElement.parentElement.clientWidth;

            if(contentWidth > maxWidth) 
               {
                  let scaleFactor = maxWidth / contentWidth;
                  iframe.style.width = maxWidth + 'px';
                  iframe.style.height = Math.round(contentHeight * scaleFactor) + 'px';
               } 
            else 
               {
                  iframe.style.width = contentWidth + 'px';
                  iframe.style.height = contentHeight + 'px';
               }
         }
      render()
         {
            let data = this.get_data(this.location);
            let list_items = document.querySelectorAll(this.setup.convert_location[this.location].target);
            data.then((d) => 
               {
                  if(d && list_items)
                     {
                        const count = list_items.length;
                        for(let [key, value] of Object.entries(d))
                           {
                              const type_key = Object.keys(value.convert.type)[0];
                              const position_key = Object.keys(value.convert.position)[0];
                              let elm_position = 'afterend';
                              if(this.setup.convert_location[this.location].before)
                                 {elm_position = 'beforebegin';}
                              let position = this.setup.convert_position[position_key];
                              
                              if(typeof(position) == 'undefined')
                                 {
                                    switch(position_key)
                                       {
                                          case '37':
                                             position = 0;
                                          break;
                                          case '38':
                                             position = count - 1;
                                             elm_position = 'afterend';
                                          break;
                                          case '39':
                                             position = Math.floor(count / 2 - 1);
                                          break;
                                       }
                                 }
                              switch(type_key)
                                 {
                                    case '2': // iFrame    
                                       for(let [list_index, list_item] of Object.entries(list_items))
                                          {
                                             if(list_index == position)
                                                {
                                                    if(value.convert.iframe)
                                                      {
                                                         const container = document.createElement('div');  
                                                               container.classList.add('ad-iframe');                                                                 
                                                               container.classList.add(this.setup.convert_location[this.location].class);                                                                                                                               
                                                               list_item.insertAdjacentElement(elm_position, container);
                                                               if(value.convert.label)
                                                                  {
                                                                     const iframe_label = document.createElement('span');  
                                                                           iframe_label.classList.add('ad-label');                                                                     
                                                                           iframe_label.innerHTML = value.convert.label;  
                                                                           container.insertAdjacentElement('beforeend', iframe_label);      
                                                                  }
                                                               
                                                               
                                                               const iframe = document.createElement('iframe');    
                                                                     //iframe.setAttribute('allowfullscreen', '');   
                                                                     iframe.setAttribute('loading', 'lazy');   
                                                                     iframe.setAttribute('height', value.convert.iframe.height);   
                                                                     iframe.setAttribute('width', value.convert.iframe.width);   
                                                                     iframe.setAttribute('src', value.convert.iframe.url);   
                                                                     iframe.setAttribute('title', value.convert.iframe.title);   
                                                                     iframe.setAttribute('frameBorder', '0');  
                                                                     iframe.classList.add(value.convert.iframe.class);  
                                                                     container.insertAdjacentElement('beforeend', iframe);
                                                                     iframe.addEventListener('load', () => 
                                                                        {
                                                                           this.adjustIframeSize(iframe);
                                                                           this.observeIframeChanges(iframe);
                                                                           window.addEventListener('resize', () => 
                                                                              {
                                                                                 this.adjustIframeSize(iframe);
                                                                              });
                                                                        });
                                                      }
                                                }
                                          }
                                    break;
                                    case '1': // Banner                                      
                                       for(let [list_index, list_item] of Object.entries(list_items))
                                          {
                                             if(list_index == position)
                                                {
                                                   if(value.convert.banner)
                                                      {
                                                         const container = document.createElement('div');  
                                                               container.classList.add('ad-banner');                                                               
                                                               container.classList.add(this.setup.convert_location[this.location].class);    
                                                               list_item.insertAdjacentElement(elm_position, container);
                                                              
                                                               let banner_link;
                                                               if(value.convert.banner.link)
                                                                  {
                                                                     banner_link = document.createElement('a');  
                                                                           banner_link.setAttribute('href', value.convert.banner.link.url);   
                                                                           banner_link.setAttribute('target', '_blank');   
                                                                           banner_link.setAttribute('rel', 'nofollow noindex');   
                                                                           banner_link.setAttribute('title', (value.convert.label?value.convert.label+': ':'') + value.convert.banner.link.title);    
                                                                           container.insertAdjacentElement('beforeend', banner_link);
                                                                  }
                                                               else
                                                                  {
                                                                     banner_link = document.createElement('div');   
                                                                           container.insertAdjacentElement('beforeend', banner_link);
                                                                  }
                                                               
                                                                     
                                                                     if(value.convert.label)
                                                                        {
                                                                           const banner_label = document.createElement('span');  
                                                                                 banner_label.classList.add('ad-label');  
                                                                                 banner_label.innerHTML = value.convert.label;  
                                                                                 banner_link.insertAdjacentElement('beforeend', banner_label);
                                                                        } 
                                                                     const banner_picture = document.createElement('picture');  
                                                                           banner_link.insertAdjacentElement('beforeend', banner_picture);
                                                                           if(value.convert.banner.img[1200])
                                                                              {
                                                                                 const banner_source_bp1200 = document.createElement('source');  
                                                                                       banner_source_bp1200.setAttribute('media', '(min-width: 992px)');  
                                                                                       banner_source_bp1200.setAttribute('srcset', value.convert.banner.img[1200].url); 
                                                                                       banner_source_bp1200.setAttribute('type', value.convert.banner.img[1200].type);
                                                                                       // banner_source_bp1200.setAttribute('width', value.convert.banner.img[1200].width);
                                                                                       // banner_source_bp1200.setAttribute('height', value.convert.banner.img[1200].height);
                                                                                       banner_picture.insertAdjacentElement('beforeend', banner_source_bp1200);      
                                                                              }                                                                     
                                                                           if(value.convert.banner.img[992])
                                                                              {
                                                                                 const banner_source_bp992 = document.createElement('source');  
                                                                                       banner_source_bp992.setAttribute('media', '(min-width: 768px)');  
                                                                                       banner_source_bp992.setAttribute('srcset', value.convert.banner.img[992].url); 
                                                                                       banner_source_bp992.setAttribute('type', value.convert.banner.img[992].type);
                                                                                       // banner_source_bp992.setAttribute('width', value.convert.banner.img[992].width);
                                                                                       // banner_source_bp992.setAttribute('height', value.convert.banner.img[992].height);
                                                                                       banner_picture.insertAdjacentElement('beforeend', banner_source_bp992);
                                                                              }
                                                                           if(value.convert.banner.img[768])
                                                                              {
                                                                                 const banner_source_bp768 = document.createElement('source');  
                                                                                       banner_source_bp768.setAttribute('media', '(min-width: 576px)');  
                                                                                       banner_source_bp768.setAttribute('srcset', value.convert.banner.img[768].url); 
                                                                                       banner_source_bp768.setAttribute('type', value.convert.banner.img[768].type);
                                                                                       // banner_source_bp768.setAttribute('width', value.convert.banner.img[768].width);
                                                                                       // banner_source_bp768.setAttribute('height', value.convert.banner.img[768].height);
                                                                                       banner_picture.insertAdjacentElement('beforeend', banner_source_bp768);      
                                                                              }
                                                                           if(value.convert.banner.img[576])
                                                                              {
                                                                                 const banner_source_bp576 = document.createElement('source');  
                                                                                       banner_source_bp576.setAttribute('media', '(min-width: 0px)');  
                                                                                       banner_source_bp576.setAttribute('srcset', value.convert.banner.img[576].url); 
                                                                                       banner_source_bp576.setAttribute('type', value.convert.banner.img[576].type);
                                                                                       // banner_source_bp576.setAttribute('width', value.convert.banner.img[576].width);
                                                                                       // banner_source_bp576.setAttribute('height', value.convert.banner.img[576].height);
                                                                                       banner_picture.insertAdjacentElement('beforeend', banner_source_bp576);      
                                                                              }
                                                                           const banner_img = document.createElement('img');  
                                                                                 banner_img.setAttribute('src', value.convert.banner.img.default.url); 
                                                                                 banner_img.setAttribute('alt', value.convert.banner.img.alt);  
                                                                                 banner_img.setAttribute('title', value.convert.banner.img.title);  
                                                                                 banner_img.setAttribute('role', 'none presentation');  
                                                                                 banner_img.setAttribute('aria-hidden', 'true');              
                                                                                 banner_img.setAttribute('loading', 'lazy');  
                                                                                 banner_img.setAttribute('typeof', 'foaf:Image');  
                                                                                 banner_img.setAttribute('onload', 'av_advertisement.write_meta(this)'); 
                                                                                 // banner_img.setAttribute('width', value.convert.banner.img.default.width);
                                                                                 // banner_img.setAttribute('height', value.convert.banner.img.default.height);
                                                                                 banner_picture.insertAdjacentElement('beforeend', banner_img);                                                         
                                                      }

                                                }
                                          }
                                    break;                                    
                                    case '3': // teaser (banner)    
                                       for(let [list_index, list_item] of Object.entries(list_items))
                                          {
                                             if(list_index == position)
                                                {
                                                   if(value.convert.banner)
                                                      {
                                                         list_item.classList.add('flex');
                                                         list_item.classList.remove('d-none');
                                                         /* const container = document.createElement('div');  */
                                                         const container = list_item.querySelector('.inner-wrapper');  
                                                               container.classList.add('ad-teaser-banner');                                                               
                                                               container.classList.add(this.setup.convert_location[this.location].class);    
                                                               list_item.insertAdjacentElement('beforeend', container); /* elm_position */
                                                               
                                                               let teaser_link;
                                                               if(value.convert.banner.link)
                                                                  {
                                                                     teaser_link = document.createElement('a');  
                                                                           teaser_link.setAttribute('href', value.convert.banner.link.url);   
                                                                           teaser_link.setAttribute('target', '_blank');   
                                                                           teaser_link.setAttribute('rel', 'nofollow noindex');   
                                                                           teaser_link.setAttribute('title', (value.convert.label?value.convert.label+': ':'') + value.convert.banner.link.title);                                                                 
                                                                           teaser_link.classList.add('col-b12', 'flex');  
                                                                           container.insertAdjacentElement('beforeend', teaser_link);   
                                                                  }
                                                               else
                                                                  {
                                                                     teaser_link = document.createElement('div');   
                                                                           container.insertAdjacentElement('beforeend', teaser_link);  
                                                                  }
                                                               
                                                                     if(value.convert.label)
                                                                        {
                                                                           const teaser_label = document.createElement('span');  
                                                                                 teaser_label.classList.add('label');  /* add-label */
                                                                                 teaser_label.setAttribute('role', 'none presentation');  
                                                                                 teaser_label.setAttribute('aria-hidden', 'true'); 
                                                                                 teaser_label.innerHTML = value.convert.label;  
                                                                                 teaser_link.insertAdjacentElement('beforeend', teaser_label);
                                                                        } 
                                                                     const image_wrapper = document.createElement('div');  
                                                                           image_wrapper.classList.add('image-wrapper');
                                                                           teaser_link.insertAdjacentElement('beforeend', image_wrapper);
                                                                           
                                                                     const image_fullsize = document.createElement('div');                                                                       
                                                                           image_fullsize.classList.add('image-fullsize');
                                                                           image_wrapper.insertAdjacentElement('beforeend', image_fullsize);
                                                                     
                                                                     const teaser_picture = document.createElement('picture');  
                                                                           image_fullsize.insertAdjacentElement('beforeend', teaser_picture);
                                                                           if(value.convert.banner.img[1200])
                                                                              {
                                                                                 const teaser_source_bp1200 = document.createElement('source');  
                                                                                       teaser_source_bp1200.setAttribute('media', '(min-width: 992px)');  
                                                                                       teaser_source_bp1200.setAttribute('srcset', value.convert.banner.img[1200].url); 
                                                                                       teaser_source_bp1200.setAttribute('type', value.convert.banner.img[1200].type);
                                                                                       // teaser_source_bp1200.setAttribute('width', value.convert.banner.img[1200].width);
                                                                                       // teaser_source_bp1200.setAttribute('height', value.convert.banner.img[1200].height);
                                                                                       teaser_picture.insertAdjacentElement('beforeend', teaser_source_bp1200);      
                                                                              }                                                                     
                                                                           if(value.convert.banner.img[992])
                                                                              {
                                                                                 const teaser_source_bp992 = document.createElement('source');  
                                                                                       teaser_source_bp992.setAttribute('media', '(min-width: 768px)');  
                                                                                       teaser_source_bp992.setAttribute('srcset', value.convert.banner.img[992].url); 
                                                                                       teaser_source_bp992.setAttribute('type', value.convert.banner.img[992].type);
                                                                                       // teaser_source_bp992.setAttribute('width', value.convert.banner.img[992].width);
                                                                                       // teaser_source_bp992.setAttribute('height', value.convert.banner.img[992].height);
                                                                                       teaser_picture.insertAdjacentElement('beforeend', teaser_source_bp992);
                                                                              }
                                                                           if(value.convert.banner.img[768])
                                                                              {
                                                                                 const teaser_source_bp768 = document.createElement('source');  
                                                                                       teaser_source_bp768.setAttribute('media', '(min-width: 576px)');  
                                                                                       teaser_source_bp768.setAttribute('srcset', value.convert.banner.img[768].url); 
                                                                                       teaser_source_bp768.setAttribute('type', value.convert.banner.img[768].type);
                                                                                       // teaser_source_bp768.setAttribute('width', value.convert.banner.img[768].width);
                                                                                       // teaser_source_bp768.setAttribute('height', value.convert.banner.img[768].height);
                                                                                       teaser_picture.insertAdjacentElement('beforeend', teaser_source_bp768);      
                                                                              }
                                                                           if(value.convert.banner.img[576])
                                                                              {
                                                                                 const teaser_source_bp576 = document.createElement('source');  
                                                                                       teaser_source_bp576.setAttribute('media', '(min-width: 0px)');  
                                                                                       teaser_source_bp576.setAttribute('srcset', value.convert.banner.img[576].url); 
                                                                                       teaser_source_bp576.setAttribute('type', value.convert.banner.img[576].type);
                                                                                       // teaser_source_bp576.setAttribute('width', value.convert.banner.img[576].width);
                                                                                       // teaser_source_bp576.setAttribute('height', value.convert.banner.img[576].height);
                                                                                       teaser_picture.insertAdjacentElement('beforeend', teaser_source_bp576);      
                                                                              }
                                                                           
                                                                           const teaser_img = document.createElement('img');  
                                                                                 teaser_img.setAttribute('src', value.convert.banner.img.default.url); 
                                                                                 teaser_img.setAttribute('alt', value.convert.banner.img.alt);  
                                                                                 teaser_img.setAttribute('title', value.convert.banner.img.title);  
                                                                                 teaser_img.setAttribute('role', 'none presentation');  
                                                                                 teaser_img.setAttribute('aria-hidden', 'true');   
                                                                                 teaser_img.setAttribute('loading', 'lazy');  
                                                                                 teaser_img.setAttribute('typeof', 'foaf:Image');  
                                                                                 teaser_img.setAttribute('onload', 'av_advertisement.write_meta(this)');  
                                                                                 // teaser_img.setAttribute('width', value.convert.banner.img.default.width);
                                                                                 // teaser_img.setAttribute('height', value.convert.banner.img.default.height);
                                                                                 teaser_picture.insertAdjacentElement('beforeend', teaser_img);                                                         
                                                      }

                                                }
                                          }
                                    break;
                                 }
                           }
                     };      
               });
           
            return this;
         }  
   }
   /*
document.addEventListener("DOMContentLoaded", () => 
   {    
      // https://halle365.dev.21-4.av-studio.de/ads/57
      // 59 = Startseite
      // 58 = Veranstaltungs-Detailseite
      // 57 = Veranstaltungs-Liste
                                          // page, target, list=ture, single=false
      const av_ads = new av_advertisement('57');
   });
*/
