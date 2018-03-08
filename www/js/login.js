//window.sqlitePlugin.deleteDatabase();
var provider = new firebase.auth.GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
firebase.auth().useDeviceLanguage();

provider.setCustomParameters({
	  'login_hint': 'user@example.com'
	});

function loginGoogle(){
	firebase.auth().signInWithPopup(provider).then(function(result) {
	  // This gives you a Google Access Token. You can use it to access the Google API.
	  var token = result.credential.accessToken;
	  // The signed-in user info.
	  var user = result.user;
	  console.log(user);
	  var local = window.localStorage;
	  //local.setItem('idCliente', user.uid);
	  alert(user.uid);
	  local.setItem('nome', user.displayName);
	}).catch(function(error) {
		console.log(error);

	  // Handle Errors here.
	  var errorCode = error.code;
	  var errorMessage = error.message;
	  // The email of the user's account used.
	  var email = error.email;
	  // The firebase.auth.AuthCredential type that was used.
	  var credential = error.credential;
	  // ...
	});
}

function loginFacebook(){
	firebase.auth().signInWithPopup(provider).then(function(result) {
	  // This gives you a Facebook Access Token. You can use it to access the Facebook API.
	  var token = result.credential.accessToken;
	  // The signed-in user info.
	  var user = result.user;
	  console.log(user);
	  alert(user.uid);
	}).catch(function(error) {
	  // Handle Errors here.
	  var errorCode = error.code;
	  var errorMessage = error.message;
	  // The email of the user's account used.
	  var email = error.email;
	  // The firebase.auth.AuthCredential type that was used.
	  var credential = error.credential;
	  // ...
	});
}

function telaLogin(){
	document.addEventListener('deviceready', function(){
		var local = window.localStorage;
		local.setItem('lat',0);
		local.setItem('idCliente',null);
		
		
		lat = local.getItem('lat');
		lon = local.getItem('lon');
		
		if(lat != null){
			
			//document.getElementById('localizacaoGPS').value = lon +" "+lat;
		}
		
	});
};

function salvaCliente(){
	var local = window.localStorage;
	lat = local.getItem('lat');
	
	if(local.getItem('idCliente')==null){
		Materialize.toast(Localization.for("facalogin"));
	}
	else
	if((lat == null) || (lat == 0)){
		Materialize.toast(Localization.for("escolherlocalizacao"));
	}
	else{
	
		var postData = $(this).serialize();
	    console.log('post:'+postData);
	    console.log("tel:"+$('#telefone').val());
	    console.log("nome:"+$('#nome').val());
//	    	window.location = "index2.html";
	}	
	return false;
	
};

