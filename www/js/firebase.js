//const firebase = require("firebase");
//Required for side-effects
//require("firebase/firestore");

// Initialize Firebase
  var config = {
    apiKey: "AIzaSyA9v3ZU8IJd5bMIW-qgi5s5lVkDuQsQ3Ew",
    authDomain: "jogos-usados.firebaseapp.com",
    databaseURL: "https://jogos-usados.firebaseio.com",
    projectId: "jogos-usados",
    storageBucket: "jogos-usados.appspot.com",
    messagingSenderId: "1082277080885"
  };
  firebase.initializeApp(config);
	var db = firebase.firestore();
	//.enablePersistence()
	//.then(function() {
	//    // Initialize Cloud Firestore through firebase
	//    var db = firebase.firestore();
	//})
	//.catch(function(err) {
	//    if (err.code == 'failed-precondition') {
	//        // Multiple tabs open, persistence can only be enabled
	//        // in one tab at a a time.
	//        // ...
	//    } else if (err.code == 'unimplemented') {
	//        // The current browser does not support all of the
	//        // features required to enable persistence
	//        // ...
	//    }
	//});
	
	const docCliente = db.doc("cliente/ninguem");
//	docCliente.set({
//		nome: "ninguem"
//	}).then(function(){console.log("salvo");})
//		.catch(function(erro){
//			console.log(erro);
//		});
	
	
	docCliente.get().then(function (doc){
		if(doc && doc.exists)
			console.log(doc.data());
	}).catch(function(erro){
		console.log(erro);
	});
	
	
	
//		snapshot.docChanges.forEach(function(change)
//	db.collection("clientes").equalTo("ninguem").get().then(function (lista){
//		console.log("tamanho:"+lista.size);
//		lista.forEach(function(doc){ 
//			if(doc && doc.exists)
//				console.log(doc.data());
//		});
//	}).catch(function(erro){
//		console.log(erro);
//	});
	// Stop listening to changes
//	unsubscribe();
	
//	db.collection("clientes").doc("alguem")
//    .onSnapshot(function(doc) {
//        console.log("alguem: ", doc && doc.data());
//    });
//	
//	docCliente.onSnapshot(function(doc){
//		console.log("doc: "+doc);
//			if(doc && doc.exists)
//				console.log("tempo real:",doc.data());
//		})
	
	
//	docCliente.on("value", function(snapshot) {
//		  console.log(snapshot.val());
//	}, function (errorObject) {
//	  console.log("The read failed: " + errorObject.code);
//	});
	
function getClientes(){
	db.collection("clientes").get().then(function (lista){
	console.log("lista:"+lista);
	lista.forEach(function(doc){ 
		if(doc && doc.exists){
			console.log(doc.data());
			console.log(doc.data().nome);
//			console.log("nome--"+doc.nome());
			adicionaJogoTelaInicial(doc.data());
		}
	});
	}).catch(function(erro){
		console.log(erro);
	});
}
	
getClientes();