$(document).ready(function(){
  const welc = document.querySelector('.centeredWelcome');
  welc.classList.add('animated', 'fadeIn', 'tada');
  $('.welcome').click(function(){
    console.log("Clicked welcome.");
    welc.classList.remove('fadeIn');
    welc.classList.add('bounceOutLeft');
    welc.addEventListener('animationend', function(){
      welc.remove();
      $('.navbar').css({"display": ""});
      $('.navbar').fadeIn();
      $('.container-fluid').css({"display": ""});
      $('.container-fluid').fadeIn();
    })
  })
});
  