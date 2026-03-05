(function ($) 
   {       
      $(document).ready(function() 
         {  
            /* https://stackoverflow.com/questions/16325679/activate-css3-animation-when-the-content-scrolls-into-view */
            function viewport_data(elem) 
               {
                  var $elem = $(elem);

                  // Get the scroll position of the page.
                  /* var scrollElem = ((navigator.userAgent.toLowerCase().indexOf('webkit') != -1) ? 'body' : 'html'); */
                  /* var scrollElem = 'html, body'; */
                  if (navigator.userAgent.search("MSIE") >= 0) 
                     {
                         var scrollElem = 'html, body';
                     }
                  else if (navigator.userAgent.search("Chrome") >= 0) 
                     {
                         var scrollElem = 'html, body';
                     }
                  else if (navigator.userAgent.search("Firefox") >= 0) 
                     {
                         var scrollElem = 'html, body';
                     }
                  else if (navigator.userAgent.search("Safari") >= 0 && navigator.userAgent.search("Chrome") < 0) 
                     {
                         var scrollElem = 'body';
                     }
                  else if (navigator.userAgent.search("Opera") >= 0) 
                     {
                         var scrollElem = 'html, body';
                     }
                  var viewportTop = $(scrollElem).scrollTop();
                  var viewportBottom = viewportTop + $(window).height();

                  // Get the position of the element on the page.
                  var elemTop = Math.round( $elem.offset().top );
                  var elemBottom = elemTop + $elem.height();

                  return {
                            "view":((elemTop < viewportBottom) && (elemBottom > viewportTop)),
                            "elemTop":elemTop,
                            "viewportBottom":viewportBottom,
                            "elemBottom":elemBottom,
                            "viewportTop":viewportTop
                         };
               }

            // Check if it's time to start the animation.
            function checkAnimation() 
               {
                  $('.abc-container').each(function()
                     {
                        var $letter = $('.abc-letter', this);
                        var line = $(this).data('line');
                        var view_data = viewport_data($letter);
                        var container_width = $(this).width();
                        var container_height = $(this).height();
                        var vt = view_data.viewportTop;
                        var vb = view_data.viewportBottom;
                        var et = view_data.elemTop;
                        var eb = view_data.elemBottom
                        var cw = container_width;
                        
                        var letter_width = $letter.width();
                        if(line == 'odd')
                           {
                              if (view_data.view) 
                                 {
                                    $letter.addClass('start-odd');
                                    
                                    
                                    var current_math_pos = Math.round(cw / 100 * (((et - eb) - (vb - et)) / (et - eb) * 100) - cw);
                                    var current_pos_right = ((cw - current_math_pos) > 0?((cw - current_math_pos) > (cw - letter_width)?(cw - letter_width):(cw - current_math_pos)):0) / 2;
                                    var current_pos_top = -(-((et - eb)/4) - ((vb - et)/4));
                                    var current_scale_Math = (100 - Math.round(current_pos_right / cw * 100)) / 100;
                                    var current_scale = (current_scale_Math > 0)?current_scale_Math:0;
                                    var current_rotate = (Math.round(current_pos_right / -180 * 100)) - 20;
                                                         
                                    $letter.css(
                                       {
                                          /* "position": 'absolute', */
                                          "padding-bottom": "1rem",
                                          "top": (-250 + current_pos_top) + 'px',
                                          "right": current_pos_right + 'px',
                                          "transform": "rotate(" + current_rotate + "deg) scale(" + current_scale + ")",
                                          "-webkit-transform": "rotate(" + current_rotate + "deg) scale(" + current_scale + ")",
                                          "-moz-transform": "rotate(" + current_rotate + "deg) scale(" + current_scale + ")",
                                          "-o-transform": "rotate(" + current_rotate + "deg) scale(" + current_scale + ")",
                                          "-ms-transform": "rotate(" + current_rotate + "deg) scale(" + current_scale + ")"
                                       });
                                 } 
                              else 
                                 {
                                   $letter.removeClass('start-odd');
                                 }
                           }
                        else
                           {
                              if(view_data.view) 
                                 {
                                   $letter.addClass('start-even');
                                    var current_math_pos = Math.round(cw / 100 * (((et - eb) - (vb - et)) / (et - eb) * 100) - cw);
                                    var current_pos_left = ((cw - current_math_pos) > 0?((cw - current_math_pos) > (cw - letter_width)?(cw - letter_width):(cw - current_math_pos)):0) / 2;
                                    var current_pos_top = -(-((et - eb)/4) - ((vb - et)/4));
                                    var current_scale_Math = (100 - Math.round(current_pos_left / cw * 100)) / 100;
                                    var current_scale = (current_scale_Math > 0)?current_scale_Math:0;
                                    var current_rotate = (Math.round(current_pos_left / 180 * 100)) - 20;
                                    /*
                                    var current_math_pos = Math.round(cw / 100 * (((et - eb) - (vb - et)) / (et - eb) * 100) - cw);
                                    var current_pos_left = (cw - current_math_pos) > 0?((cw - current_math_pos) > (cw - letter_width)?(cw - letter_width):(cw - current_math_pos)):0;
                                    var current_pos_top = -(-((et - eb)/2) - ((vb - et)/2));
                                    var current_scale_Math = (100 - Math.round(current_pos_left / 360 * 100)) / 100;
                                    var current_scale = (current_scale_Math > 0)?current_scale_Math:0;
                                    var current_rotate = (Math.round(current_pos_right / 360 * 100)) - 380;
                                    */
                                    $letter.css(
                                       {
                                          /* "position": 'absolute', */
                                          "padding-bottom": "1rem",
                                          "top": (-250 + current_pos_top) + 'px',
                                          "left": current_pos_left + 'px',
                                          "transform": "rotate(" + current_rotate + "deg) scale(" + current_scale + ")",
                                          "-webkit-transform": "rotate(" + current_rotate + "deg) scale(" + current_scale + ")",
                                          "-moz-transform": "rotate(" + current_rotate + "deg) scale(" + current_scale + ")",
                                          "-o-transform": "rotate(" + current_rotate + "deg) scale(" + current_scale + ")",
                                          "-ms-transform": "rotate(" + current_rotate + "deg) scale(" + current_scale + ")"
                                       });
                                 } 
                              else 
                                 {
                                   $letter.removeClass('start-even');
                                 }                              
                           }                        
                     });
               }
               
            /* ABC word length font-size */    
            $('.abc-container').each(function()
               {
                  var $letter = $('.abc-letter', this);                
                  var word_length = $letter.text().trim().length;
                  if(word_length <= 2)
                     {
                        $letter.css('font-size','14rem');
                     }
                  else if(word_length <= 4)
                     {
                        $letter.css('font-size','10rem');
                     }
                  else if(word_length <= 6)
                     {
                        $letter.css('font-size','6rem');
                     }
                  else if(word_length <= 8)
                     {
                        $letter.css('font-size','4rem');
                     }
                  else
                     {
                        $letter.css('font-size','3rem');
                     }
               });
               
            // Capture scroll events
            $(window).scroll(function()
               {
                  checkAnimation();
               });            
         });
   })(jQuery);  