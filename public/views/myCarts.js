function initMyCart(){
    $('#cartList').html('');
    $('#addNewProd').html('');
    $('#prodList').html('');

}
function showCarts() {
    initMyCart();
    var data = '<ul class="list-group">';
    firebase.database().ref('carts/').once('value', function(dataSnapshot) {
        dataSnapshot.forEach(function(cartSnapshot) { //key, val
            data += '<li class="list-group-item"><a onclick="deleteCart(\'' + cartSnapshot.key + '\')"><i class="fa fa-close pull-xs-left" aria-hidden="true"></i></a>&nbsp' +
                '<a onclick="showCart(\'' + cartSnapshot.key + '\')">' + cartSnapshot.val().cartName + '</a> <a style="margin:auto;" class="btn btn-danger btn-sm pull-xs-right" onclick="showCart(\'' + cartSnapshot.key + '\')">Show Product</a></li>';
        });
        data += '</ul>';
        $('#cartList').html(data);
    });

}

function newCart() {
    initMyCart();
    $('#cartList').load('views/newCart.html');

}


function showAddProduct() {
    initMyCart();
    if(ccart)
    $('#cartList').load('views/addProduct.html');
}

function deleteCart(id) {
    var conf = confirm("Are you sure ?");
    if(!conf){return;}
    var path = 'carts/';
    var newRef = firebase.database().ref(path);
    newRef.child(id).remove();
    showCarts();
}
function showCart(id) {
    initMyCart();
    ccart = id;//<div class="card"><div class="card-block"><h4 class="card-title">
    var data = '<ul class="list-group">';
    firebase.database().ref('carts/' + id + '/products').once('value', function(dataSnapshot) {
        dataSnapshot.forEach(function(cartSnapshot) { //key, val
            if(cartSnapshot.val().prodName == undefined){return;}
            var utime = moment(cartSnapshot.val().createDate).format('YYYY-MM-DD');;
            var isbuy ="";
            var isbuyT=0;
            if(cartSnapshot.val().isBuy){isbuy ="list-group-item-success"; isBuyT=1;}
            data += '<li class="list-group-item '+ isbuy +'"><a onclick="deleteProduct(\'' + cartSnapshot.key + '\')"><i class="fa fa-close pull-xs-left" aria-hidden="true"></i></a>&nbsp' +
                '<span class=\"label bg-primary label-pill pull-xs-right\">' + cartSnapshot.val().amount + '</span><a onclick="markAsBuy(\'' + cartSnapshot.key +'\')">' + cartSnapshot.val().prodName +
                '<p class=""> <small class="text-muted">'+ utime +', '+ cartSnapshot.val().createBy +'</small></p></a></li>';
        });
        data += '</ul>';
        $('#prodList').html(data);
    });
}
function deleteProduct(id){
    var conf = confirm("Are you sure ?");
    if(!conf){return;}
    var path = 'carts/' + ccart + '/products/';
    var newRef = firebase.database().ref(path);
    newRef.child(id).remove();
    showCart(ccart);
}
function markAsBuy(id,state){
    var conf = confirm("Mark as Buy ?");
    if(!conf){return;}
    var path = 'carts/' + ccart + '/products/' +id + '/isBuy';
    var newRef = firebase.database().ref(path);
    newRef.transaction(function(isbuy) {
       // If /users/fred/rank has never been set, currentRank will be null.
      return !isbuy;
    });
    //newRef.child(id).update({ 'isBuy': state });
    showCart(ccart);
}
