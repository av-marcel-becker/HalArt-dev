/* ToDo: check hand slide set active and update_extern_caption(); */
(function ($) 
   {      
      var settings = settings?settings:{};
          settings = {
                        autoplay: (settings.autoplay?settings.autoplay:false),
                        nav:      (settings.nav     ?settings.nav     :false)
                     };
      var prefix = 'av-';
      $(document).ready(function() 
         {   
            /* slide mechanism */
            $('.'+prefix+'slider').each(function(index, element)
               {
                  /* set current slider */
                  var slider = this;
                  var slider_length = $('> div', slider).length;
                                    
                  /* add weight to current slider items */
                  $('> div' ,slider).each(function(index, element)
                     {
                        $('> div' ,slider).data('weight',index);
                     });
                     
                  /* add active class to item */  
                  $('> div:first-child' ,slider).addClass('active');
                   update_extern_caption();
                  
                  /* wrap slider content in container */
                  $(slider).wrapInner('<div class="'+prefix+'slider-container"></div>');
                                       
                  /* add draggable to slider items */   
                  $('> div.'+prefix+'slider-container > div', slider).draggable(
                     {
                        axis: 'x',
                        stop: function(event, ui) 
                                 {
                                    if(slider_length > 1)
                                       {
                                          var stop = ui.position.left;
                                          var direction = (0 < stop) ? 'right':'left';
                                                                                                                    
                                          if(direction == 'right')
                                             {
                                                $(this).prev().css('left','0%');
                                                $(this).css('left','100%')
                                                $(this).next().css('left','100%');
                                             }
                                          else
                                             {
                                                $(this).prev().css('left','-100%');
                                                $(this).css('left','-100%');
                                                $(this).next().css('left','0%');
                                             }   
                                       }
                                    
                                 },
                        drag: function(event, ui) 
                                 {    
                                    if(slider_length > 1)
                                       {
                                          var drag = ui.position.left;
                                          var direction = (drag > 0)?'right':'left';
                                          
                                          if(slider_length >= 2)
                                             {
                                                if(direction == 'right')
                                                   {
                                                      if(!$(this).prev().length)
                                                         {
                                                            $('> div.'+prefix+'slider-container > div:last-child', slider)
                                                               .prependTo($(this).parent())
                                                               .css('left','-100%');
                                                         }  
                                                   }
                                                else
                                                   {
                                                      if(!$(this).next().length)
                                                         {
                                                            $('> div.'+prefix+'slider-container > div:first-child', slider)
                                                               .appendTo($(this).parent())
                                                               .css('left','100%');
                                                         }    
                                                   }                                    
                                             }
                                          
                                          $(this).prev().css('left', (-$('> div.'+prefix+'slider-container', slider).width() + drag) + 'px');
                                          $(this).next().css('left', ($('> div.'+prefix+'slider-container', slider).width() + drag) + 'px');   
                                       }
                                 },
                        cursor: 'pointer'
                     }); 
                     
                  /* animation prevent if only one image exists */
                  if(slider_length == 1)
                     {
                        $('> .'+prefix+'slider-container > div', slider).draggable('disable');
                        $('> .'+prefix+'slider-container > div', slider).css('cursor','auto');
                     }
                  else
                     {
                        $('> .'+prefix+'slider-container > div', slider).css('cursor');                        
                     }
                     
                  /* ############################################################################################ */
                  /* settings.nav */
                  if(settings.nav || $(slider).hasClass(prefix+'slider-nav'))
                     {
                        /* https://www.w3schools.com/charsets/ref_utf_dingbats.asp */
                        /* ❬ 10092 276C MEDIUM LEFT-POINTING ANGLE BRACKET ORNAMENT */
                        /* ❭ 10093 276D MEDIUM RIGHT-POINTING ANGLE BRACKET ORNAMENT */
                        var prev = '<div class="'+prefix+'slider-nav-prev">❬</div>';
                        var next = '<div class="'+prefix+'slider-nav-next">❭</div>'
                        var nav = prev + next
                        $(slider).append(nav);
                        $(slider).addClass('setup-nav');
                        
                        /* load next prev */
                        if(slider_length > 2)
                           {      
                              if(!$('.active',slider).prev().length)
                                 {
                                    $('> div.'+prefix+'slider-container > div:last-child', slider)
                                       .prependTo($('.active',slider).parent())
                                       .css('left','-100%');                                       
                                    $('.active',slider).css('left','0%');
                                 }  
                                 
                              if(!$('.active',slider).next().length)
                                 {
                                    $('> div.'+prefix+'slider-container > div:first-child', slider)
                                       .appendTo($('.active',slider).parent())
                                       .css('left','100%');                          
                                    $('.active',slider).css('left','0%');
                                 } 
                           }
                        /* click event */
                        if(slider_length > 1)
                           {
                              $('div.'+prefix+'slider-nav-prev', slider).on('click', function()
                                 {          
                                    
                                    if(slider_length > 2)
                                       {        
                                          $('.active',slider).prev().css('left','0%');
                                          $('.active',slider).css('left','100%')
                                          /* $('.active',slider).next().css('left','100%'); */
                                          $('.active',slider).toggleClass('active').prev().toggleClass('active');                                     
                                          if(!$('.active',slider).prev().length)
                                             {
                                                $('> div.'+prefix+'slider-container > div:last-child', slider)
                                                   .prependTo($('.active',slider).parent())
                                                   .css('left','-100%');                         
                                                $('.active',slider).css('left','0%');
                                             }                                             
                                          update_extern_caption();                                             
                                       } 
                                    else
                                       {
                                          if($('.active',slider).prev().length)
                                             {  
                                                $('.active',slider).prev().css('left','0%');
                                                $('.active',slider).css('left','100%')
                                                /* $('.active',slider).next().css('left','100%'); */
                                                $('.active',slider).toggleClass('active').prev().toggleClass('active');  
                                             }
                                          update_extern_caption();                                              
                                       }
                                 });
                              $('div.'+prefix+'slider-nav-next', slider).on('click', function()
                                 {      
                                    if(slider_length > 2)
                                       {                  
                                          /* $('.active',slider).prev().css('left','-100%'); */
                                          $('.active',slider).css('left','-100%');
                                          $('.active',slider).next().css('left','0%');
                                          $('.active',slider).toggleClass('active').next().toggleClass('active'); 
                                          if(!$('.active',slider).next().length)
                                             {
                                                $('> div.'+prefix+'slider-container > div:first-child', slider)
                                                   .appendTo($('.active',slider).parent())
                                                   .css('left','100%');                         
                                                $('.active',slider).css('left','0%');
                                             }
                                          update_extern_caption();  
                                       } 
                                    else
                                       {
                                          if($('.active',slider).next().length)
                                             {
                                                /* $('.active',slider).prev().css('left','-100%'); */
                                                $('.active',slider).css('left','-100%');
                                                $('.active',slider).next().css('left','0%');
                                                $('.active',slider).toggleClass('active').next().toggleClass('active'); 
                                             } 
                                          update_extern_caption();
                                       }
                                 });      
                           }                        
                     }
                  
                  if(settings.autoplay || $(slider).hasClass(prefix+'slider-autoplay'))
                     {
                        var autoplay_timer;
                        function play()
                           {
                              autoplay_timer = setTimeout(function() 
                                 {
                                    /* $('.active',slider).prev().css('left','-100%'); */
                                    $('.active',slider).css('left','-100%');
                                    $('.active',slider).next().css('left','0%');
                                    $('.active',slider).toggleClass('active').next().toggleClass('active');                       
                                    if(!$('.active',slider).next().length)
                                       {
                                          $('> div.'+prefix+'slider-container > div:first-child', slider)
                                             .appendTo($('.active',slider).parent())
                                             .css('left','100%');                         
                                          $('.active',slider).css('left','0%');
                                       } 
                                    update_extern_caption();
                                    play();
                                 }, 6000);      
                           }
                        play();
                        $(slider).on('mouseenter', function()
                           {
                              clearTimeout(autoplay_timer);
                           })
                        .on('mouseleave', function()
                           {
                              play();
                           });
                     } 
                  /* function update extern caption */
                  function update_extern_caption()
                     {
                        var ext_caption = $('.active .av-slider-background > .container > div > div > div > div', slider).html();
                        var current_panel = $('.active', slider).parents('.av-slider').siblings('.av-slider-extern-caption');
                        if(ext_caption)
                           {
                              current_panel.html(ext_caption);
                              current_panel.wrapInner('<div class="vip-box-turquoise p-3 d-block d-md-none"></div>');      
                           }
                        
                     }  
               });  
            
            /* css transition prevent on mousedown */
            $('.'+prefix+'slider > div.'+prefix+'slider-container > div').on('mousedown', function()
               {
                  $('.'+prefix+'slider > div.'+prefix+'slider-container > div').css(
                     {
                        'transition': 'none',
                        '-webkit-transition': 'none',
                        '-moz-transition': 'none',
                        '-o-transition': 'none',
                     });                           
               })            
            .on('mouseup', function()
               {
                  $('.'+prefix+'slider > div.'+prefix+'slider-container > div').css(
                     {
                        'transition': '',
                        '-webkit-transition': '',
                        '-moz-transition': '',
                        '-o-transition': '',
                     });  
               });          
         });
   })(jQuery);  