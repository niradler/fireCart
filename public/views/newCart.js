function addCart(){
    var newCartForm = $('#newCartForm');
    var cartName = newCartForm[0][0].value;
    var newRef = firebase.database().ref('carts/').push();
    var cartDate = new Date();
    var user = getItem('loggedIn',1);
    newRef.set({
      'cartName':cartName,
      'createBy':user.uid,
      'createDate':cartDate.getTime(),
      'users':{}
    });
  $('#body').html('');
}
