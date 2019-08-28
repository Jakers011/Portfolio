var $grid = $('.grid').isotope({
  // options
  itemSelector: '.grid-item',
  percentPosition: true,
  masonry:{
    columnWidth: '.grid-sizer'
  }
});

$('.filter-button-group').on( 'click', 'button', function() {
  var filterValue = $(this).attr('data-filter');
  $grid.isotope({ filter: filterValue });
  console.log(filterValue);
});

$('.main-carousel').flickity({
  // options
  wrapAround:true
});

$('a[href^="#"]').on('click', function(event) {
    var target = $(this.getAttribute('href'));
    console.log(target);
    if( target.length ) {
        event.preventDefault();
        $('html, body').stop().animate({
            scrollTop: target.offset().top
        }, target.offset()).top;
    }
});