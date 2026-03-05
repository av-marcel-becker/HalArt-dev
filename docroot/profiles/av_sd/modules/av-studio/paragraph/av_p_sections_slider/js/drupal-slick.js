/* https://www.drupal.org/docs/theming-drupal/adding-stylesheets-css-and-javascript-js-to-a-drupal-theme */
/*(function ($, Drupal, drupalSettings) 
   {

      'use strict';

      Drupal.behaviors.av_b_slider = {
         attach: function (context, settings) 
            {
         
                console.log(settings.fluffiness.cuddlySlider.foo);
            }
         };

   })(jQuery, Drupal, drupalSettings);
 */   
(function ($) 
   {
      $(document).ready(function()
         {
            /* https://kenwheeler.github.io/slick/ */
            $('.slick').slick(
               {
                  accessibility: true,
                  arrows: true,
                  dots: false,
                  draggable: true,
                  infinite: true,  
                  speed: 300,
                  slidesToShow: 1,
                  adaptiveHeight: true,
                  lazyLoad: 'ondemand', 
                  prevArrow: '<button type="button" class="slick-prev" title="Vorherige"><i class="fal fa-arrow-left"></i></button>',  
                  nextArrow: '<button type="button" class="slick-next" title="Nächste"><i class="fal fa-arrow-right"></i></button>'                           
               });
         });

   })(jQuery);