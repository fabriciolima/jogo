function voltar(){
	history.go(-1);
}

function getDB(){
	if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|IEMobile)/)) {
		  return window.sqlitePlugin.openDatabase({name : "jogoDB.db",location : 'default',
			  androidDatabaseImplementation: 2});
		  //return window.openDatabase("jogoDB.db",'1','auto',1024*1024*100);
		} else {
		  return window.openDatabase("jogoDB.db",'1','auto',1024*1024*100);
		}
}

function getJSON(){
	if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|IEMobile)/)) {
		db.doc("config/servidor").get().then(function(doc){
			console.log("retornando remoto");
			return doc.data().ip;
		});
		
	}
	console.log("retornando localhost");
	return "http://localhost:8080/json";
}

$('.botao-voltar').on('click', function() {
	voltar();	
});