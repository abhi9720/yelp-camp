

const flash  = document.querySelector('.flash');
function myAlertTop(){
    $(".myAlert-top").show();
    setTimeout(function(){
      $(".myAlert-top").hide(); 
    }, 2000);
  }