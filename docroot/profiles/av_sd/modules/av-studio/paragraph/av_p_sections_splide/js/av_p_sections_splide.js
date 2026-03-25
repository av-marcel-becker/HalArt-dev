document.addEventListener('DOMContentLoaded', function() {
    var elms = document.getElementsByClassName('splide');
    
    for (var i = 0; i < elms.length; i++) {
        var splideElement = elms[i];
        
        var splide = new Splide(splideElement, {
            type: 'loop',
            drag: true,
            snap: true,
            direction: 'ltr',
            paginationDirection: 'ltr',
            wheel: false,
            perPage: 4,
            perMove: 4,
            gap: 0,
            breakpoints: {
                1200: { perPage: 4, perMove: 4, gap: 0 },
                992: { perPage: 2, perMove: 2, gap: 0 },
                768: { perPage: 2, perMove: 2, gap: 0 },
                576: { perPage: 1, perMove: 1, gap: 0 }
            }
        });

        splide.mount();

        // ResizeObserver erstellen: Er wacht über die Größe des Sliders
        const resizeObserver = new ResizeObserver(entries => {
            for (let entry of entries) {
                // Falls die Breite > 0 ist, Refresh auslösen
                if (entry.contentRect.width > 0) {
                    splide.refresh();
                }
            }
        });

        // Den Observer auf das Slider-Element ansetzen
        resizeObserver.observe(splideElement);
    }
});
/*
  document.addEventListener( 'DOMContentLoaded', function() {
    // var splide = new Splide( '.splide' );
    // splide.mount();
    var elms = document.getElementsByClassName( 'splide' );
    for ( var i = 0; i < elms.length; i++ ) {
        new Splide( elms[ i ], {  
            type     : 'loop',
            drag   : 'free', 
            snap   : true,
            direction: 'ltr',
            paginationDirection: 'ltr',
            wheel    : false,
            perPage    : 4,
            perMove: 4,
            gap        : 0,
            breakpoints: {
             1200: { perPage: 4, perMove: 4, gap: 0 }, 
             992 : { perPage: 2, perMove: 2, gap: 0 }, 
             768 : { perPage: 2, perMove: 2, gap: 0 },
             576 : { perPage: 1, perMove: 1, gap: 0 }
            } 
        } ).mount();
      }
  });
*/  
  
/*
(function ($) {
  $(document).ready(function() {
    var splideElement = document.querySelector('.splide');
    if (splideElement) {
      new Splide(splideElement, {
        arrows: true,
        perPage: 1,
        speed: 300,
        type: 'slide',
        lazyLoad: 'sequential',
        classes: {
          arrows: 'splide__arrows your-custom-arrows-class',
          arrow: 'splide__arrow your-custom-arrow-class',
          prev: 'splide__arrow--prev your-custom-prev-class',
          next: 'splide__arrow--next your-custom-next-class',
        },
      }).mount();
    }
  });
})(jQuery); 
*/