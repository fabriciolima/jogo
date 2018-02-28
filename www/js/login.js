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
	  var storage = window.localStorage;
	  storage.setItem('idCliente', user.uid);  
	  storage.setItem('nome', user.displayName);
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


function telaLogin(){
	document.addEventListener('deviceready', function(){
		var storage = window.localStorage;
		var idCliente = storage.getItem('idCliente');
		//loginGoogle();
		if(idCliente != null)
			window.location = "index2.html";
		else{
			loginGoogle();
		}
	});
};

//$('form').submit(function(){
//	var storage = window.localStorage;
//    var postData = $(this).serialize();
//    console.log('post:'+postData);
//    console.log("tel:"+$('#telefone').val());
//    console.log("nome:"+$('#nome').val());
//    const docCliente = db.doc("cliente/ninguem");
//	docCliente.set({
//		nome: $('#nome').val(),
//		telefone: $('#telefone').val()
//	}).then(function(){
//		console.log("salvo");
//		alert("id:"+);
//		
//		window.location = "index2.html";
//		})
//		.catch(function(erro){
//			console.log(erro);
//		});
//	return false;
//});


