(function($){
  $(function(){
    $('.sidenav').sidenav();
  }); // end of document ready
})(jQuery); // end of jQuery name space
 
document.addEventListener('deviceready', onDeviceReady, false);
 
function onDeviceReady() {
    // Cordova is now initialized. Have fun!
 
    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    //document.getElementById('deviceready').classList.add('ready');
}
(function($){
  $(function(){
 
    // s'executa quan s'acaba de carregar el document HTML sencer
    $('.tabs').tabs({"swipeable":true});
 
  }); // end of document ready
})(jQuery); // end of jQuery name space

$(function(){
  $('#link').on("click", function () {
    $('.tabs').tabs('select', 'test-swipe-1');
  });
  $('#link2').on("click", function () {
    $('.tabs').tabs('select', 'test-swipe-2');
  });
  $('#link3').on("click", function () {
    $('.tabs').tabs('select', 'test-swipe-3');
  });
$(function(){
    $('#passar').on("click", function () {
      $('.tabs').tabs('select', 'test-swipe-2');
    });
  }); // end of document ready
  
}); // end of document ready


