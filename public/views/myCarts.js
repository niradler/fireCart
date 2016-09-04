firebase.database().ref('carts/').on('value', function(snapshot) {
  console.log(snapshot.val());
  snapshot.forEach(function(cartSnapshot) {//key, val
});
  });
