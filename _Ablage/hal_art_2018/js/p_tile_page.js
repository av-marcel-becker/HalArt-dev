(function ($) 
   {             
      $(document).ready(function() 
         {  
            /* settings */
            /*  var dim_x = 16*120,
                dim_y = 9*120; */
           var dim_x = $(window).width(),
                dim_y = $(window).height();
            var colors = [
                           'red',
                           'green',
                           'blue',
                           'yellow'
                         ];
            var points = [[0,0],[40,0],[100,0],
                          [0,60],[50,50],[100,40],
                          [0,100],[60,100],[100,100]]; /* image 60% */
            /* ************************************* */
            /* Assign the HTML, Body as a variable... */
            var $viewport = $('html, body');
            /* preset heading position */
            var padding_space_x = dim_x / 100 * 5; 
            var padding_space_y = dim_y / 100 * 15;
            var perspective_offset_text_x = dim_x / 100 * 10;
            var perspective_offset_text_y = dim_y / 100 * 10;
            var heading_position = [ 
                                    [
                                      padding_space_x,
                                      0 + padding_space_y  + perspective_offset_text_y
                                    ],
                                    [
                                      dim_x / 2 + padding_space_x,
                                      0 + padding_space_y
                                    ],
                                    [
                                      padding_space_x + perspective_offset_text_x,
                                     dim_y / 2 + padding_space_y + perspective_offset_text_y
                                    ],
                                    [
                                      dim_x / 2 + padding_space_x + perspective_offset_text_x,
                                      dim_y / 2 + padding_space_y
                                    ]
                                  ];
            /* preset text position */
            var text_text_y_offset = 30; /* text after heading */
            var text_position = [
                                   [heading_position[0][0],heading_position[0][1] + text_text_y_offset],
                                   [heading_position[1][0],heading_position[1][1] + text_text_y_offset],
                                   [heading_position[2][0],heading_position[2][1] + text_text_y_offset],
                                   [heading_position[3][0],heading_position[3][1] + text_text_y_offset]
                                ]
            var text_text_y_offset = 0;
            /* preset button position */
            var perspective_offset_default = 100 - 60;
            var button_offset_default = 9; /* space from center */
            var perspective_offset = [
                                       [dim_x / -perspective_offset_default,dim_y / perspective_offset_default],
                                       [dim_x / -perspective_offset_default,dim_y / -perspective_offset_default],
                                       [dim_x / perspective_offset_default,dim_y / perspective_offset_default],
                                       [dim_x / perspective_offset_default,dim_y / -perspective_offset_default]
                                     ];
            var text_x_offset = 25; /* + */
            var text_y_offset = 31; /* + */
            var button_x = 208;
            var button_y = 45;
            var button_x_offset = 16*button_offset_default;
            var button_y_offset = 9*button_offset_default;
            var button_position = [ /* button 208x45 */
                                    [
                                      /* (((position center) - button cener)) -+ offset) +- 10% */
                                       (((dim_x / 100 * points[4][0]) - (button_x / 2)) - button_x_offset) + (perspective_offset[0][0]),
                                       (((dim_y / 100 * points[4][1]) - (button_y / 2)) - button_y_offset) + (perspective_offset[0][1])
                                    ],
                                    [
                                       (((dim_x / 100 * points[4][0]) - (button_x / 2)) + button_x_offset) + (perspective_offset[1][0]),
                                       (((dim_y / 100 * points[4][1]) - (button_y / 2)) - button_y_offset) + (perspective_offset[1][1])
                                    ],
                                    [
                                       (((dim_x / 100 * points[4][0]) - (button_x / 2)) - button_x_offset) + (perspective_offset[2][0]),
                                       (((dim_y / 100 * points[4][1]) - (button_y / 2)) + button_y_offset) + (perspective_offset[2][1])
                                    ],
                                    [
                                       (((dim_x / 100 * points[4][0]) - (button_x / 2)) + button_x_offset) + (perspective_offset[3][0]),
                                       (((dim_y / 100 * points[4][1]) - (button_y / 2)) + button_y_offset) + (perspective_offset[3][1])
                                    ]
                                  ];
            /* preset shapes */
            var shapes = [
                           [
                              [dim_x / 100 * points[0][0],dim_y / 100 * points[0][1]],
                              [dim_x / 100 * points[1][0],dim_y / 100 * points[1][1]],
                              [dim_x / 100 * points[4][0],dim_y / 100 * points[4][1]],
                              [dim_x / 100 * points[3][0],dim_y / 100 * points[3][1]]
                           ],
                           [
                              [dim_x / 100 * points[1][0],dim_y / 100 * points[1][1]],
                              [dim_x / 100 * points[2][0],dim_y / 100 * points[2][1]],
                              [dim_x / 100 * points[5][0],dim_y / 100 * points[5][1]],
                              [dim_x / 100 * points[4][0],dim_y / 100 * points[4][1]]
                           ],
                           [
                              [dim_x / 100 * points[3][0],dim_y / 100 * points[3][1]],
                              [dim_x / 100 * points[4][0],dim_y / 100 * points[4][1]],
                              [dim_x / 100 * points[7][0],dim_y / 100 * points[7][1]],
                              [dim_x / 100 * points[6][0],dim_y / 100 * points[6][1]]
                           ],
                           [
                              [dim_x / 100 * points[4][0],dim_y / 100 * points[4][1]],
                              [dim_x / 100 * points[5][0],dim_y / 100 * points[5][1]],
                              [dim_x / 100 * points[8][0],dim_y / 100 * points[8][1]],
                              [dim_x / 100 * points[7][0],dim_y / 100 * points[7][1]]
                           ]                               
                         ];
            /* select page */
            $('.svg-four-box').each(function(index, value)
               {
                  var tile_page = this;
                  var full = $(tile_page).data('full');
                  var data_position = (typeof $(tile_page).data('position') != 'undefined')?$(tile_page).data('position'):'';
                  
                  /* set svg width and height */
                  $(tile_page).css(
                     {
                        width: dim_x,
                        height: dim_y
                     });
                  /* set viewBox dimension */
                  $(tile_page).attr('viewBox','0 0 ' + dim_x + ' ' + dim_y);
                  /* set pattern dimension */
                  if(full)
                     {
                        $('pattern', tile_page).attr(
                           {
                              width: dim_x,
                              height: dim_y
                           }); 
                        $('pattern image', tile_page).attr(
                           {
                              width: '100%',
                              height: '100%'
                           }); 
                     }
                  else
                     {
                        $('pattern', tile_page).attr(
                           {
                              width: dim_x / 2 + dim_x / 10,
                              height: dim_y / 2 + dim_y / 10
                           });      
                     }
                  
                  /* set tile position */
                  $('#img_' + index + '_2', tile_page).attr(
                     {
                        x: dim_x / 2 - dim_x / 10
                     });
                  $('#img_' + index + '_3', tile_page).attr(
                     {
                        y: dim_y / 2 - dim_y / 10
                     });
                  $('#img_' + index + '_4', tile_page).attr(
                     {
                        x: dim_x / 2 - dim_x / 10,
                        y: dim_y / 2 - dim_y / 10
                     });
                  if(full)
                     { 
                        /* if one tile set shapes */
                        var color = 'red';   
                        /* add background img */
                        var polygon = '<polygon id="polygon_' + color + '_2" fill="url(#img_0_1)" points="' +
                                                '0,0 ' + 
                                                dim_x + ',0 ' + 
                                                dim_x + ',' + dim_y + ' ' + 
                                                '0,' + dim_y +
                                                '" />';
                        $('.tile',tile_page).prepend(polygon);
                        if(data_position != '')
                           {
                               /* button position */
                              $('.tile .svg-button-rect',tile_page).attr({
                                                                  'x':button_position[data_position][0],
                                                                  'y':button_position[data_position][1]                                                               
                                                              });
                              $('.tile .svg-button-text',tile_page).attr({
                                                                  'x':button_position[data_position][0] + text_x_offset,
                                                                  'y':button_position[data_position][1] + text_y_offset
                                                               });
                              /* heading position */
                              $('.tile .svg-heading',tile_page).attr({
                                                                  'x':heading_position[data_position][0],
                                                                  'y':heading_position[data_position][1]                                                               
                                                              });
                              /* text position */                                
                              $('.tile .svg-text',tile_page).attr({
                                                                  'x':text_position[data_position][0],
                                                                  'y':text_position[data_position][1]
                                                               });
                              /* foreignobject (heading and text) */
                              $('.tile .svg-foreignobject',tile_page).attr({
                                                                  'x':heading_position[data_position][0],
                                                                  'y':heading_position[data_position][1],
                                                                  'width': (dim_x / 3),
                                                                  'height': (dim_y / 3)                                                              
                                                              });     
                           }
                        
                                                  
                      
                     }
                  else
                     {
                        /* if four tile set shapes */
                        $('.tile' ,tile_page).each(function(key, val)
                           {
                              var color = 'black';
                              switch(key)
                                 {
                                    case 0: 
                                       color = colors[0];
                                       /* color_2 = 'purple'; */
                                       color_2 = 'url(#img_' + index + '_1)';
                                    break;
                                    case 1:
                                       color = colors[1];
                                       /* color_2 = 'lime'; */
                                       color_2 = 'url(#img_' + index + '_2)';
                                    break;
                                    case 2:
                                       color = colors[2];
                                       /* color_2 = 'aqua'; */
                                       color_2 = 'url(#img_' + index + '_3)';
                                    break;
                                    case 3:
                                       color = colors[3];
                                       /* color_2 = 'orange'; */
                                       color_2 = 'url(#img_' + index + '_4)';
                                    break;
                                 }   
                              /* add hover color */                                 
                              polygon = '<polygon class="svg-hover-tile" fill="' + color + '" points="' +
                                                      shapes[key][0][0] + ',' + shapes[key][0][1] + ' ' + 
                                                      shapes[key][1][0] + ',' + shapes[key][1][1] + ' ' + 
                                                      shapes[key][2][0] + ',' + shapes[key][2][1] + ' ' + 
                                                      shapes[key][3][0] + ',' + shapes[key][3][1] +
                                                      '" />';
                              $(this).prepend(polygon);   
                              /* add background img */
                              var polygon = '<polygon class="svg-image-tile" fill="' + color_2 + '" points="' +
                                                      shapes[key][0][0] + ',' + shapes[key][0][1] + ' ' + 
                                                      shapes[key][1][0] + ',' + shapes[key][1][1] + ' ' + 
                                                      shapes[key][2][0] + ',' + shapes[key][2][1] + ' ' + 
                                                      shapes[key][3][0] + ',' + shapes[key][3][1] +
                                                      '" />';
                              $(this).prepend(polygon);
                              /* button position */
                              $('.svg-button-rect',this).attr({
                                                                  'x':button_position[key][0],
                                                                  'y':button_position[key][1]                                                               
                                                              });
                              $('.svg-button-text',this).attr({
                                                                  'x':button_position[key][0] + text_x_offset,
                                                                  'y':button_position[key][1] + text_y_offset
                                                               });
                              /* heading position */
                              $('.svg-heading',this).attr({
                                                                  'x':heading_position[key][0],
                                                                  'y':heading_position[key][1]                                                               
                                                              });
                              /* text position */                                
                              $('.svg-text',this).attr({
                                                                  'x':text_position[key][0],
                                                                  'y':text_position[key][1]
                                                               });
                              /* foreignobject (heading and text) */
                              $('.svg-foreignobject',this).attr({
                                                                  'x':heading_position[key][0],
                                                                  'y':heading_position[key][1],
                                                                  'width': (dim_x / 3),
                                                                  'height': (dim_y / 3)                                                              
                                                              });
                           });         
                     }
                  /* refresh trick svg */
                  $(this).html($(this).html());   
                  
                  /* onClick event */
                  $(this).each(function()
                     {
                        $('.tile', this).each(function(key, val)
                           {
                              $(this).on('click', function(event)
                                 {
                                    var blank = false;
                                    var target = $(this).data('url');
                                    if(target == '#next')
                                       {
                                          event.preventDefault();
                                          $viewport.animate({
                                                scrollTop: $(tile_page).next().offset().top
                                           }, 500);
                                           return false;
                                       }
                                    else
                                       {
                                          if(blank)
                                             {
                                                 window.open(target);
                                             }
                                          else
                                             {
                                                window.location = target;
                                             };      
                                       }
                                    
                                 });
                           });
                     });
               });
            /* ############################################################### */
            var lastScrollTop = 0;
            $('.svg-four-box').on('wheel', function(event)
               { 
                  if($viewport.is(':animated'))
                     {
                        /* wait */                        
                     }
                  else
                     {
                        // deltaY obviously records vertical scroll, deltaX and deltaZ exist too
                        if(event.originalEvent.deltaY < 0)
                           {
                              // wheeled up
                              if($(this).prev().length)
                                 {
                                    $viewport.animate(
                                       {
                                          scrollTop: $(this).prev().offset().top
                                        }, 500);       
                                 }
                               
                           }
                        else 
                           {
                              // wheeled down
                              if($(this).next().length)
                                 {
                                    $viewport.animate(
                                       {
                                          scrollTop: $(this).next().offset().top
                                        }, 500);         
                                 }
                                 else
                                 {
                                    $viewport.animate(
                                       {
                                          scrollTop: $(this).offset().top + $(this).height()
                                        }, 500);  
                                 }
                           }        
                     }
                                
               });
            /* ############################################################### */
            $('.tile-page.mobile a[href="#next"]').on('click', function(event)
               {
                  event.preventDefault();
                  $viewport.animate({
                        scrollTop: $(this).parents().parents().parents().next().offset().top
                   }, 500);
                   return false;
               });
            /* ############################################################### */
               
         });
   })(jQuery);  