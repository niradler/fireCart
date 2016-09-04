$( document ).ready(function() {

resetPage();
var config = {
  apiKey: "AIzaSyA5eScxyJCqoO-_0u1KFzlB9OceO_i7wxY",
  authDomain: "stex.firebaseapp.com",
  databaseURL: "https://stex.firebaseio.com",
  storageBucket: "project-550069188122604628.appspot.com",
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
      data += "<div  class=\"card dyn\" id=\""+ cartSnapshot.key +"\"><div class=\"card-block\" >"+
      "<h3 class=\"card-title\"><i class=\"fa fa-cart-plus prefix\"></i>&nbspCart: "+ cartSnapshot.val().cartname +"<h6></h6></h3>"+
        "<ul class=\"list-group\">";
      if(isObject(cartSnapshot.val().pro)){
        var prod = cartSnapshot.val().pro;
        var key = Object.keys(prod);
        var plist = "";
        var co=0;
        for(k in prod){
          plist+="<li class=\"list-group-item\"><a src=\"" + key[co++] + "\" class=\"fa fa-remove\" id=\"rem\"></a><a id=\"chat\" src=\"" + key[co++] + "\">"+
           "<span class=\"label bg-primary label-pill pull-xs-right\">" + prod[k].amount + "</span>&nbsp" + prod[k].name + "</li></a>";
        }
      }
      data+=plist+"</ul></div></div>";
      });
      $('#prodList').html(data);
      $('.dyn').hide();
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
      var el = "#" + cartid;
      $(el).show();
    }
    else{
      toastr.warning('All fields required');
    }
    });

$('body').on('click', '#rem', function () {
  var path = 'carts/' + retrieveData("ccart") + '/pro';
    var newRef = firebase.database().ref(path);
    var key = $(this).attr('src');
    newRef.child(key).remove();
    var el = "#" + retrieveData("ccart");
    $(el).show();
  });
  $('body').on('click', '#chat', function () {
    var path = 'carts/' + retrieveData("ccart") + '/pro';
      var newRef = firebase.database().ref(path);
      var key = $(this).attr('src');
      newRef.child(key+"/chat").once('value').then(function(snapshot) {
        console.log(snapshot.val());
      });
      var el = "#" + retrieveData("ccart");
      $(el).show();
    });
  $('body').on('click', '#cc', function () {
      var ccart = $(this).attr('src');
      $('#form81').val(ccart);
      storeData("ccart",ccart);
      var d = "#" +ccart;
      $('.dyn').hide();
      $(d).show();
  });


  function isObject(val) {
      if (val === null) { return false;}
      return ( (typeof val === 'function') || (typeof val === 'object') );
  }
  function resetPage(){
    // $('#form81').val();
    $('#form82').val("");
    $('#form83').val("");
  //document.getElementById("prodForm").reset();
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
});

});
