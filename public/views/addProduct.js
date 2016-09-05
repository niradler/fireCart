

function addProduct(){
    var loggedIn = localStorage.getItem('loggedIn');
    var prodForm = $('#prodForm');
    var name = prodForm[0][0].value;
    var amount = prodForm[0][1].value;
    if(name.length <2){return;}
    var newRef = firebase.database().ref('carts/' +ccart + '/products').push();
    var cartDate = new Date();
    var user = getItem('loggedIn',1);
    newRef.set({
      'prodName':name,
      'amount':amount,
      'createBy':user.email,
      'isBuy':false,
      'createDate':cartDate.getTime(),
    });
    var itemKey = newRef.getKey();
    $('#cartList').html('');
    showCart(ccart);
}
