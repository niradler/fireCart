var config = {
  apiKey: '<your-api-key>',
  authDomain: 'localhost',
  databaseURL: 'stex.firebaseio.com',
  storageBucket: '<your-storage-bucket>'
};
firebase.initializeApp(config);

//read
/*
firebase.database().ref('carts/-KJp9LdQkEN1DtuCLjfP/pro').on('value', function(snapshot) {
console.log(snapshot.key);
  var data = snapshot.val();
  //var sfd = JSON.parse(snapshot);
  console.log(data);
  //document.getElementById("data").innerHTML = out;
});*/
function isObject(val) {
    if (val === null) { return false;}
    return ( (typeof val === 'function') || (typeof val === 'object') );
}
var data =""
firebase.database().ref('carts/').on('value', function(snapshot) {
  console.log(snapshot.val());
  snapshot.forEach(function(cartSnapshot) {
  //  console.log(cartSnapshot.key); // -KJ....
    //console.log(cartSnapshot.val());
    if(isObject(cartSnapshot.val().pro)){
      var prod = cartSnapshot.val().pro;
      var plist = "";
      for(k in prod){
        plist+= prod[k].name + ":" + prod[k].amount + " , ";
      }
      data+=cartSnapshot.key + " - " + cartSnapshot.val().cartname + " - " + plist + " <br> ";
    }
/*
  cartSnapshot.val().pro.forEach(function(proSnapshot) {
    data += proSnapshot.key + " <br> " + proSnapshot.val() + " <br> ";
  });
*/
//JSON.prase()
  });
  document.getElementById("data").innerHTML = data;
});

//write
  $(document).ready(function(){
    $("#send").click(function(){
        var msg = document.getElementById("msg").value;
        writeUserData(msg);
        function writeUserData(name) {
         firebase.database().ref('carts/').push({
          cartname: name
        });
      }
    });

    $("#add").click(function(){
        var msg = document.getElementById("pro").value;
        addData(msg,2);
        function addData(name,am) {
          var newRef = firebase.database().ref('carts/-KJp9LdQkEN1DtuCLjfP/pro').push();
          console.log(newRef.key);
          newRef.set({
            name:name,
            amount:am
          });
      }
    });

});
