function animate_lightning(){
    anime({
    targets: '.line-drawing-demo .lines path',
    strokeDashoffset: [anime.setDashoffset, 0],
    easing: 'easeInQuint',
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

$(window).resize(function(){
    change_text_size()
})

window.onload = change_text_size;
