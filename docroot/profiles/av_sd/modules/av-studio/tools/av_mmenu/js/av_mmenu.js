/*
 * mmenu
*/
 /* ********************************************************************************************* */
document.addEventListener(
      "DOMContentLoaded", () => {
            let login_link = '<a href="/user" class="js-header-login" rel="nofollow"><i class="fa-light fa-user-large"></i></a>';
            if(document.querySelector('body').classList.contains('user-logged-in'))
               {
                  login_link = '<a href="/user/logout" class="js-header-logout" rel="nofollow"><i class="fa-light fa-arrow-right-from-bracket"></i></a>';
               }
            
            var menu_first_check = document.getElementById("block-av-sub-mobile-main-menu");
            if(menu_first_check)
               {   
                  const menu_first = new Mmenu( "#block-av-sub-mobile-main-menu", 
                        {   
                              
                           "slidingSubmenus": false,
                           "navbar": false,
                           "offCanvas": 
                              {
                                 "use": true,
                                 "position": "right-front"
                              },
                           "theme": "light-contrast",
                           "iconbar": 
                              {
                                 "use": true,
                                 "top": 
                                    [
                                       '<a href="#mm-close" title="Menü" class="menu-first-close mb-32"><i class="fal fa-times"></i></a>'/* ,
                                       '<a href="/" class="js-header-home" rel="nofollow"><img width="155" height="72" src="/themes/av_sub/images/logo.svg" alt="Logo"></a>',
                                       '<a href="/suche" class="js-header-search" rel="nofollow"><i class="fa-light fa-magnifying-glass"></i></a>',
                                       '<a href="/veranstaltung/merkzettel" class="js-header-event-remember" rel="nofollow" title="Mein Merkzettel"><i class="fa-light fa-file-heart"></i></a>',
                                       '<a href="/veranstaltungsmelder" class="js-header-add-event" rel="nofollow" title="Veranstaltung melden"><i class="fa-light fa-calendar-plus"></i></a>' */
                                    ]/*,
                                 "bottom": 
                                    [
                                       login_link
                                    ]*/
                              }
                        }, 
                        {
                           // configuration
                           offCanvas: 
                              {
                                 clone: false,
                                 page: 
                                    {
                                       selector: ".dialog-off-canvas-main-canvas"
                                    }
                              }, 
                           language: 'de'
                        });
                     
                  document.querySelector('.menu-first-close').addEventListener('click', function()
                  /* document.querySelector('[href="#mm-close"]').addEventListener('click', function() */
                     {
                        menu_first.API.close();
                     }) 
                     
                  /* for anchor links - close after click */   
                  /*
                  var menuLinks = document.querySelectorAll("#block-av-sub-mobile-main-menu a");
                      menuLinks.forEach(function(menuLink) {
                          menuLink.addEventListener("click", function() {
                              *//* var api = document.querySelector("#my-menu").mmenu; 
                              api.close();*//*
                              menu_first.close();
                          });
                      });
                    */ 
                    
                           /*                        
                           hooks: 
                              {
                                 "openPanel:after": ( panel ) => 
                                    {
                                       console.log( "Started opening panel: " + panel.id );
                                    },
                                 "closePanel:after": ( panel ) => 
                                    {
                                       console.log( "Started opening panel: " + panel.id );
                                    }
                              },*/  
                     
/*                           
                           "navbars": [                         
                                       {
                                          "position": "top",
                                          "content": [
                                                '<div class="container-1200 flex pt-15 pb-40">' + 
                                                   '<div class="col-b12 text-center px-20 flex-as-center">' + 
                                                       '<img width="155" height="72" src="/themes/av_sub/images/logo.svg" alt="Logo">' + 
                                                   '</div>' +
                                                '</div>'
                                             ]
                                          "content": [
                                                '<div class="container-1200 flex pt-15 pb-40">' + 
                                                   '<div class="col-b6 text-left px-20 flex-as-center">' + 
                                                       '<img width="155" height="72" src="/themes/av_sub/images/logo.svg" alt="Logo">' + 
                                                   '</div>' +
                                                   '<div class="col-b6 text-right px-20 flex-as-center mm-lang-wrapper">' + 
                                                      '<a class="menu-first-close text-middle" href="#mm-close"><i class="fal fa-times"></i></a>' +
                                                   '</div>' +
                                                '</div>'
                                             ]
                                       }*//*,
                                       {
                                          "position": "bottom",
                                          "content": [
                                                '<div class="container-1200 flex">' + 
                                                   '<div class="col-b12 text-right px-20 py-20 flex-as-center">' + 
                                                      '' +
                                                      '' +
                                                   '</div>' +
                                                '</div>'
                                             ]
                                       },                          
                                    ], */
                     
                     
                     
                     
                     
                     
                     
                    /* 
                  const menu_first = new Mmenu("#block-b-mobile-menu", {
                     
                        // options 
                        "offCanvas": {
                              "position": "top",
                           },  
                        slidingSubmenus: false,                                 
                        extensions: [
                                        "fullscreen", 
                                       "position-top"
                                    ],
                        navbar: false,
                        navbars: [                         
                                    {
                                       "position": "top",
                                       "content": [
                                             '<div class="container-1200 flex pt-15 pb-40">' + 
                                                '<div class="col-b6 text-left px-20 flex-as-center">' + 
                                                    '<img width="155" height="72" src="/themes/av_sub/images/logo.svg" alt="Logo">' + 
                                                '</div>' +
                                                '<div class="col-b6 text-right px-20 flex-as-center mm-lang-wrapper">' + 
                                                   '<a class="menu-first-close text-middle" href="#mm-close"><i class="fal fa-times"></i></a>' +
                                                '</div>' +
                                             '</div>'
                                          ]
                                    },
                                    {
                                       "position": "bottom",
                                       "content": [
                                             '<div class="container-1200 flex">' + 
                                                '<div class="col-b12 text-right px-20 py-20 flex-as-center">' + 
                                                   '' +
                                                   '' +
                                                '</div>' +
                                             '</div>'
                                          ]
                                    },                           
                                 ]
                     }, 
                     {
                        // configuration
                        offCanvas: {
                                       pageSelector: ".dialog-off-canvas-main-canvas"
                                   },
                        language: 'de'
                     });
                     */
                  
                  /* close trigger                  
                  document.querySelector(".menu-first-close").addEventListener('click', function()
                     {
                        menu_first.API.close();
                     });*/ 
                    
               }
            else
               {
                  console.log("first menu missing.");
               }
         }
   );
 /* ********************************************************************************************* */

 /* ********************************************************************************************* */
document.addEventListener("DOMContentLoaded", function() 
   {
      var new_menu_items = [];

      /* */
      new_menu_items.push('<li class="mm-listitem append"><a href="/impressum">Impressum</a></li>');
      new_menu_items.push('<li class="mm-listitem append"><a href="/datenschutz" target="_blank"> Datenschutzerklärung</a></li>');
      new_menu_items.push('<li class="mm-listitem append"><a href="#cookie_einstellungen">Cookie-Einstellungen</a></li>');
      
      
      var menuList = document.querySelector("#block-av-sub-mobile-main-menu .mm-listview");
          menuList.insertAdjacentHTML("beforeend", new_menu_items.join(""));
      
      var newMenuItemsLinks = document.querySelectorAll("#block-av-sub-mobile-main-menu .mm-listview .mm-listitem.append a");
            for(var i = 0; i < newMenuItemsLinks.length; i++) 
               {
                  newMenuItemsLinks[i].classList.add("mm-listitem__text");
                  newMenuItemsLinks[i].classList.add("footer-menu-item");
               }
   });

 /* ********************************************************************************************* */
 /* ********************************************************************************************* */
 /* ********************************************************************************************* */
 /* ********************************************************************************************* */
 /* ********************************************************************************************* */
 /* ********************************************************************************************* */
 /* ********************************************************************************************* */
 /* ********************************************************************************************* */
 /*
 class AVMobileMenu extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });

    const style = document.createElement('style');
    style.textContent = `
      :host {
        position: relative;
        display: flex;
        align-items: center;
      }
      :host .burger {
        width: 50px;
      }

      :host .burger:before,
      :host .burger:after,
      :host .burger div {
        background: #fff;
        content: "";
        display: block;
        height: 6px;
        border-radius: 3px;
        margin: 7px 0;
        transition: 0.5s;
      }

      :host-context(body.mm-wrapper--opened) .burger:before {
        transform: translateY(12px) rotate(135deg);
      }

      :host-context(body.mm-wrapper--opened) .burger:after {
        transform: translateY(-12px) rotate(-135deg);
      }

      :host-context(body.mm-wrapper--opened) .burger div {
        transform: scale(0);
      }
    `;

    shadow.appendChild(style);
    shadow.innerHTML += `
      
      <div class="burger"><div></div></div>
      <slot></slot>
    `;
  }
}

customElements.define('av-mobile-menu', AVMobileMenu);

*/









class AVMobileMenu extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });

    const style = document.createElement('style');
    style.textContent = `
      :host {
        position: relative;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        width: var(--burger-menu-width, 50px);
        height: auto;
        aspect-ratio: 1 / 1;
        background-image: var(--burger-menu-background-image, none);
        background-size: var(--burger-menu-background-size, unset);
        background-position: var(--burger-menu-background-position, unset);
        background-repeat: var(--burger-menu-background-repeat, unset);
      }
      :host .burger {
        box-sizing: border-box;
        width: 100%;
      }

      :host .burger:before,
      :host .burger:after,
      :host .burger div {
        background: var(--burger-menu-color, #fff);
        content: "";
        display: block;
        height: var(--burger-menu-bar-width, 6px);
        border-radius: var(--burger-menu-bar-border-radius, 3px);
        margin: var(--burger-menu-bar-margin, 7px 0);
        transition: 0.5s;
      }

      :host .burger:before {
        transform-origin: var(--burger-menu-bar-top-transform-origin, center);
        transform: var(--burger-menu-bar-top-transform, none);
      }

      :host .burger:after {
        transform-origin: var(--burger-menu-bar-bottom-transform-origin, center);
        transform: var(--burger-menu-bar-bottom-transform, none);
      }

      :host .burger div {
        transform-origin: var(--burger-menu-bar-center-transform-origin, center);
        transform: var(--burger-menu-bar-center-transform, none);
      }
/*
      .burger-opened:before {
        transform: translateY(12px) rotate(135deg);
      }

      .burger-opened:after {
        transform: translateY(-12px) rotate(-135deg);
      }

      .burger-opened div {
        transform: scale(0);
      }
      */

    `;

    shadow.appendChild(style);
    shadow.innerHTML += `
      <div part="burger" class="burger burger-closed"><div></div></div>
      <slot></slot>
    `;

    // Toggle burger class based on body class
    const bodyClass = document.body.classList;
    const burger = shadow.querySelector('.burger');

    const toggleBurger = () => {
      if (bodyClass.contains('mm-wrapper--opened')) {
        burger.classList.remove('burger-closed');
        burger.classList.add('burger-opened');
      } else {
        burger.classList.remove('burger-opened');
        burger.classList.add('burger-closed');
      }
    };

    // Initial toggle
    toggleBurger();

    // Listen for changes to body class
    const observer = new MutationObserver(toggleBurger);
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
  }
}

customElements.define('av-mobile-menu', AVMobileMenu);

