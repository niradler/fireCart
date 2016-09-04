$(window).on("load", function() {
resetPage();
  var config = {
    apiKey: '<your-api-key>',
    authDomain: 'localhost',
    databaseURL: 'stex.firebaseio.com',
    storageBucket: '<your-storage-bucket>'
  };
  firebase.initializeApp(config);

  firebase.database().ref('carts/').on('value', function(snapshot) {
    console.log(snapshot.val());
    var data="";
    var clist="";
    var idlist=[];
    snapshot.forEach(function(cartSnapshot) {
      idlist.push(cartSnapshot.key);
      clist+="<a id=\"cc\" class=\"dropdown-item\" src=\""+ cartSnapshot.key +"\">"+ cartSnapshot.val().cartname +"</a>";
      data += "<div  class=\"card\"><div class=\"card-block\" id=\""+ cartSnapshot.key +"\">"+
      "<h3 class=\"card-title\"><i class=\"fa fa-cart-plus prefix\"></i>&nbspCart: "+ cartSnapshot.val().cartname +"<h6></h6></h3>"+
        "<ul class=\"list-group\">";
      if(isObject(cartSnapshot.val().pro)){
        var prod = cartSnapshot.val().pro;
        var key = Object.keys(prod);
        var plist = "";
        var co=0;
        for(k in prod){
          plist+="<li class=\"list-group-item\"><a src=\"" + key[co++] + "\" class=\"fa fa-remove\" id=\"rem\"></a>"+
           "<span class=\"label bg-primary label-pill pull-xs-right\">" + prod[k].amount + "</span>&nbsp" + prod[k].name + "</li>";
        }
      }
      data+=plist+"</ul></div></div>";
      initCart(idlist);
      });
      $('#prodList').html(data);
      $('#prodList').hide();
      $('#cartList').html(clist);
    });

    $('body').on('click', '#send', function () {
      var cartid = $('#form81').val();
      var name = $('#form82').val();
      var am = $('#form83').val();
      if(cartid&&name&&am){
        resetPage();
      var path = 'carts/' + cartid + '/pro'
      var newRef = firebase.database().ref(path).push();
      newRef.set({
        name:name,
        amount:am
      });
    }
    else{
      toastr.warning('All fields required');
    }
    });

$('body').on('click', '#rem', function () {
    var newRef = firebase.database().ref('carts/-KJp9LdQkEN1DtuCLjfP/pro');
    var key = $(this).attr('src');
    newRef.child(key).remove();
  });

  $('body').on('click', '#cc', function () {
      var ccart = $(this).attr('src');
      storeData("ccart",ccart);
      var d = "#"+ccart;
      ('#prodList').show();
      var el = document.getElementById(d).classList.remove("show");
      console.log("js: " + el);
  });

  function initCart(idlist){
    for(k in idlist){
      var d= "#"+idlist[k];
    //  console.log(d);
      $(d).fadeOut();
    }
  }

  function isObject(val) {
      if (val === null) { return false;}
      return ( (typeof val === 'function') || (typeof val === 'object') );
  }
  function resetPage(){
  document.getElementById("prodForm").reset();
}
function storeData(ind , item){
  localStorage.setItem(ind, item);
}
// Store
function retrieveData(ind){
  return localStorage.getItem(ind);
}

$('.card').on('show.bs.dropdown', function () {
     $('.card').css( "overflow", "inherit" );
});

$('.card').on('hide.bs.dropdown', function () {
     $('.card').css( "overflow", "auto" );
})

});
