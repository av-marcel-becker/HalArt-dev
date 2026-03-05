/*
 * Misc
*/
/* html.html.twig */

(function ($) 
   {
      $(document).ready(function() 
         {    
            
            /* mmenu */  
            $("#block-main-menu-mobile").mmenu(
               {
                  // options
                  extensions: [
                                 "position-back",
                                 "position-top",
                                 "border-none",
                                 "fullscreen"
                              ],
                  autoHeight: true,
                  navbars: [
                                 {
                                    position: "top",
                                    content: [ "prev", "close" ]
                                 }/*,
                                 {
                                    position: "bottom",
                                    content: menu_second
                                 }*/
                           ]
               }, 
               {
                  // configuration
                  offCanvas: {
                                 pageSelector: ".dialog-off-canvas-main-canvas"
                             },
                  language: "de"
               }); 
               /*
               var new_menu_items = [];
               $('#block-benutzermenu [region="page_header_block_one"] > li').each(function(index, element)
                  {
                     console.log(element);
                     new_menu_items.push('<li class="mm-listitem append">' + $(this).html() + '</li>');                      
                  });   */
               /*                  
               $('#block-potsdam-2018-footer [region="footer_block_copyright"] > li').each(function(index, element)
                  {
                     console.log(element);
                     new_menu_items.push('<li class="mm-listitem append">' + $(this).html() + '</li>');
                  });   
               *//*
               $("#block-main-menu-mobile").find( ".mm-listview" ).append(new_menu_items); 
               $("#block-main-menu-mobile").find( ".mm-listview .mm-listitem.append a").addClass('mm-listitem__text');   
               */
                 
 
            /* start hyphenator */
            /* Hyphenator.run(); */            
            
         });
   }(jQuery));
   
