
  var loggedIn = localStorage.getItem('loggedIn');
  $('body').on('click', '#addProduct', function () {
    if(loggedIn){
      $('#main').load('views/addProduct.html');
    }
  });
