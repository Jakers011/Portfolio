function animate_lightning(){
    anime({
    targets: '.line-drawing-demo .lines path',
    strokeDashoffset: [anime.setDashoffset, 0],
    easing: 'easeInOutCubic',
    duration: 18000,
    direction: 'alternate',
    loop: 2,
    });
}

animate_lightning();

setInterval(function(){
    animate_lightning()
}, 43000)

function change_text_size(){
    var w = document.documentElement.clientWidth;
    var h = document.documentElement.clientHeight;
    if(w < h){
        $(".intro").css("font-size", "8vw");
    }
    else{
        $(".intro").css("font-size", "8vh");
    }
}

//  CHANGE TEXT FOR H2

// Play/pause video on hover.
$(document).ready(function(){
    $(".video").on('mouseover', function(event){
        document.getElementById("video").play();
        //this.play();
    }).on('mouseout', function(event){
        document.getElementById("video").pause();
    })
})

// Get user promise.
$(document).on("click", function(){
    var clicked = $(".video").prop('muted', false);
})

// Resize text dynamically.
$(window).resize(function(){
    change_text_size()
})

window.onload = change_text_size;


// Hide divs on click
$(".video").click(function(){
    if ($(".bballbox").is(":hidden")){
        $(".bballbox").show();
        $(".description").hide();
        $(".vidbox1").addClass("col-sm-6");
    }
    else{
        $(".bballbox").hide();
        $(".vidbox1").removeClass("col-sm-6");
        $(".description").show();
    }
    
})

$(".textcourse").click(function(){
    if ($(".vidbox1").is(":hidden")){
        $(".vidbox1").show();
        $(".bballbox").addClass("col-sm-6");
        $(".course").css({'height':'75%'});
    }
    else{
        $(".vidbox1").hide();
        $(".bballbox").removeClass("col-sm-6");
        $(".course").css({'height':'150%'});
    }
    
})

var slideindex = 0;
carousel();

function carousel(){
  var i;
  var x = document.getElementsByClassName("slide");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  slideindex++;
  if (slideindex > x.length) {slideindex = 1}
  x[slideindex-1].style.display = "block";
  setTimeout(carousel, 2000); // Change image every 2 seconds
}