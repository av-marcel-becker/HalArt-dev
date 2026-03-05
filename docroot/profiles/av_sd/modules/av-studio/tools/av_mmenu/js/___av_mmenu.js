/*
 * mmenu
*/
 /* ********************************************************************************************* */
document.addEventListener(
      "DOMContentLoaded", () => {
            var menu_first_check = document.getElementById("block-b-mobile-menu");
            if(menu_first_check)
               {   
                  const menu_first = new Mmenu("#block-b-mobile-menu", {
                     
                        // options
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
                                                   '<img width="155" height="72" src="/themes/av_sub/images/svg/logo_hh.svg" alt="Logo">' +
                                                '</div>' +
                                                '<div class="col-b6 text-right px-20 flex-as-center mm-lang-wrapper">' + 
                                                   '<a class="mm-lang text-middle" href="/">DE</a>&nbsp;&nbsp;|&nbsp;&nbsp;<a class="mm-lang text-middle" href="/en">EN</a>&nbsp;&nbsp;&nbsp;' +
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
                                                   '<a class="btn hh text-middle mr-20" href="/hfs/startseite">Zu den Festspielen</a>' +
                                                   '<img  class="text-middle" width="155" height="72" src="/themes/av_sub/images/svg/logo_hfs.svg" alt="Logo">' +
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
                  
                  /* close trigger */                  
                  document.querySelector(".menu-first-close").addEventListener('click', function()
                     {
                        menu_first.API.close();
                     });
                  
            
               }
            else
               {
                  console.log("first menu missing.");
               }
            /* *********************************************** */  
            var menu_second_check = document.getElementById("block-b-mobile-menu-hfs");
            if(menu_second_check)
               {   
                  const menu_second = new Mmenu("#block-b-mobile-menu-hfs", {
                     
                        // options
                        slidingSubmenus: false,                                 
                        extensions: [
                                        "fullscreen", 
                                       "position-top"
                                    ],
                        navbar: false,
                        "navbars": [
                              {
                                 "position": "top",
                                 "content": [
                                             '<div class="container-1200 flex pt-15 pb-40">' + 
                                                '<div class="col-b6 text-left px-20 flex-as-center">' + 
                                                   '<img width="155" height="72" src="/themes/av_sub/images/svg/logo_hfs.svg" alt="Logo">' +
                                                '</div>' +
                                                '<div class="col-b6 text-right px-20 flex-as-center mm-lang-wrapper">' + 
                                                   '<a class="mm-lang text-middle" href="/hfs/startseite">DE</a>&nbsp;&nbsp;|&nbsp;&nbsp;<a class="mm-lang text-middle" href="/en/hfs/startseite">EN</a>&nbsp;&nbsp;&nbsp;' +
                                                   '<a class="menu-second-close text-middle" href="#mm-close"><i class="fal fa-times"></i></a>' +
                                                '</div>' +
                                             '</div>'
                                          ]
                              },
                              {
                                 "position": "bottom",
                                 "content": [
                                             '<div class="container-1200 flex">' + 
                                                '<div class="col-b12 text-right px-20 py-20 flex-as-center">' + 
                                                   '<a class="btn hfs text-middle mr-20" href="/">Zum Händelhaus</a>' +
                                                   '<img  class="text-middle" width="155" height="72" src="/themes/av_sub/images/svg/logo_hh.svg" alt="Logo">' +
                                                '</div>' +
                                             '</div>'
                                          ]
                              }
                           ]
                     }, 
                     {
                        // configuration
                        offCanvas: {
                                       pageSelector: ".dialog-off-canvas-main-canvas"
                                   },
                        language: 'de'
                     });
                     
                  /* close trigger */                  
                  document.querySelector(".menu-second-close").addEventListener('click', function()
                     {
                        menu_second.API.close();
                     });
               }
            else
               {
                  console.log("second menu missing.");
               }            
         }
   );
 /* ********************************************************************************************* */








/*
var menu_check = document.getElementById("block-b-mobile-menu-hh");
if(menu_check)
   {
      document.addEventListener(
            "DOMContentLoaded", () => {*/
                  /* new Mmenu("#block-sub-theme-main-menu-mobile", { 
                  new Mmenu("#block-b-mobile-menu-hh", {
                     
                        // options
                        slidingSubmenus: true,                                 
                        extensions: [*//* 
                                       "pagedim-black",
                                       "position-left"
                                      "position-back",
                                       "border-none",
                                       "pagedim-black"
                                       "popup",
                                        "fullscreen", 
                                       "position-top"
                                    ],
                        navbar: false*//*,
                             "iconbar": {
                                "use": true,
                                "top": [
                                   "<a href='/'><i class='fa fa-home'></i></a>",
                                   "<a href='/user'><i class='fa fa-user'></i></a>"
                                ],
                                "bottom": [
                                   "<a href='#/'><i class='fa fa-twitter'></i></a>",
                                   "<a href='#/'><i class='fa fa-facebook'></i></a>",
                                   "<a href='#/'><i class='fa fa-linkedin'></i></a>"
                                ]
                             },
                        navbars: [                             
                                    {
                                       "position": "top",
                                       "content": [ 'prev', 'close' ]
                                    }                              
                                 ]*//*,
                        autoHeight: false,
                        navbars: [
                                    {
                                       "position": "top",
                                       "type": "tabs",
                                       "content": [
                                                      
                                                      "<a href='#panel-menu'>Hauptmenü</a>",
                                                      "<a href='#panel-second-menu'>Sekundärmenü</a>"
                                                   ]
                                    },*//*
                                    {
                                       "position": "top",
                                       "content": [ 
                                                     "<div class='d-block pl-20 text-left'><img width='155' height='72' src='/themes/sub_theme/images/logo/blacktowild_Engagiert_in_Halle_Logo_reduziert_purple_RGB_SW.SVG' alt='Logo'></div>",
                                                     'prev', 'close'
                                                  ]
                                    },
                                    {
                                       "position": "top",
                                       "content": [ 'prev', 'close' ]
                                    },*/
                                    /*
                                    {
                                       "position": "bottom",
                                       "content": [
                                             "<div class='av_share two'>" + 
                                             "   <span></span>" +
                                             "   <a class='av_share_button' data-type='profile' data-button='facebook' title='Facebook Profil' data-original-title='Facebook Profil'><i class='fab fa-facebook-f'></i></a>" +
                                             "   <a class='av_share_button' data-type='profile' data-button='twitter' title='Twitter Profil' data-original-title='Twitter Profil'><i class='fab fa-twitter'></i></a>" + 
                                             "   <a class='av_share_button' data-type='profile' data-button='instagram' title='Instagram Profil' data-original-title='Instagram Profil'><i class='fab fa-instagram'></i></a>" +
                                             "   <span></span>" +                                        
                                             "</div>",
                                          ]
                                    },
                                    {
                                       "position": "bottom",
                                       "content": [
                                             "<a href='/favorite' title='Favoriten'><i class='fas fa-heart'></i><br>Favoriten</a>",
                                             "<a href='/user' title='Anmelden'><i class='fas fa-user-circle'></i><br>Anmelden</a>",
                                             "<a href='javascript:av_contrast()' title='Kontrast'><i class='fas fa-adjust'></i><br>Kontrast</a>",
                                             "<a href='javascript:av_font_size()' title='Textgröße'><i class='far fa-text-size'></i><br>Textgröße</a>"
                                          ]
                                    }
                                    
                                 ]
                     }, 
                     {
                        // configuration
                        offCanvas: {
                                       pageSelector: ".dialog-off-canvas-main-canvas"
                                   },
                        language: 'de'
                     });
               }
         );
 *//*  }
else
   {
      console.log("Vermutlich Hauptmenü leer.");
   }
var menu_account_check = document.getElementById("block-b-mobile-menu-hfs");
if(menu_account_check)
   {
      document.addEventListener(
            "DOMContentLoaded", () => {
                  new Mmenu("#block-b-mobile-menu-hfs", {
                        // options
                        slidingSubmenus: true,
                        extensions: [
                                       "fullscreen", 
                                       "position-top"*//*
                                       "pagedim-black",
                                       "position-left"
                                    ],
                        navbars: [                             
                                    {
                                       "position": "top",
                                       "content": [ 'prev', 'close' ]
                                    }                              
                                 ]
                     }, *//* 
                     {
                        // configuration
                        offCanvas: {
                                       pageSelector: ".dialog-off-canvas-main-canvas"
                                   },
                        language: 'de'
                     });
               }
         );       
   }

    *//*
 (function ($) 
   {
      $(document).ready(function() 
         {   
         
               var new_menu_items = [];
                new_menu_items.push("<div class='mt-20 px-10 py-20 av_share two flex flex-jc-between flex-ac-stretch flex-ai-stretch text-center'>" + 
                                       "   <span></span>" +
                                       "   <a class='av_share_button' data-type='profile' data-button='facebook' title='Facebook Profil' data-original-title='Facebook Profil'><i class='fab fa-facebook-f'></i></a>" +
                                       "   <a class='av_share_button' data-type='profile' data-button='twitter' title='Twitter Profil' data-original-title='Twitter Profil'><i class='fab fa-twitter'></i></a>" + 
                                       "   <a class='av_share_button' data-type='profile' data-button='instagram' title='Instagram Profil' data-original-title='Instagram Profil'><i class='fab fa-instagram'></i></a>" +
                                       "   <span></span>" +                                        
                                       "</div>");  
                new_menu_items.push("<div class='px-10 mb-20 flex flex-jc-between flex-ac-stretch flex-ai-stretch text-center'>" +
                                       "<a href='/favorite' title='Favoriten' class='d-block col-auto py-20'><i class='fas fa-heart'></i><br>Favoriten</a>" +
                                       "<a href='/registrierung' title='Anmelden' class='d-block col-auto py-20'><i class='fas fa-user-circle'></i><br>Anmelden</a>" +
                                       "<a href='javascript:av_contrast()' class='d-block col-auto py-20' title='Kontrast'><i class='fas fa-adjust'></i><br>Kontrast</a>" +
                                       "<a href='javascript:av_font_size()' class='d-block col-auto py-20' title='Textgröße'><i class='far fa-text-size'></i><br>Textgröße</a></div>");  
  
               $("#block-sub-theme-main-menu-mobile").find( ".mm-listview" ).after(new_menu_items); 
              
               var new_menu_items = [];
                new_menu_items.push('<li class="mm-listitem append"><a href="/datenschutz">Datenschutz</a></li>');  
                new_menu_items.push('<li class="mm-listitem append"><a href="/impressum">Impressum</a></li>');  
              
               $("#block-sub-theme-main-menu-mobile").find( ".mm-listview" ).append(new_menu_items); 
               $("#block-sub-theme-main-menu-mobile").find( ".mm-listview .mm-listitem.append a").addClass('mm-listitem__text');   
                */
                /*
               var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
               var is_iPad = navigator.userAgent.match(/iPad/i) != null;

               if(isSafari && !is_iPad)
                  {
                  $('#block-sub-theme-main-menu-mobile .mm-navbars_bottom:last-child').css('margin-bottom','4.5rem');
                  
                  }  
               if(is_iPad)
                  {
                  $('#block-sub-theme-main-menu-mobile .mm-navbars_bottom:last-child').css('margin-bottom','2rem');
                  
                  }  
                 
         });
   }(jQuery)); */
   
/*
 * mburger
*/
/*
			document.addEventListener('click', ( evnt ) => {
				var target = evnt.target;
				let xmpl = target.closest('.xmpl');
				if ( xmpl ) {
					let webcomponent = xmpl.querySelector( 'm-burger' );
					if ( webcomponent ) {
						if ( webcomponent.getAttribute( 'state' ) ) {
							webcomponent.removeAttribute( 'state' );
						} else {
							webcomponent.setAttribute( 'state', 'cross' );
						}
					} else {
						xmpl.classList.toggle( 'mm-wrapper_opened' );
					}
				}
			});
         */