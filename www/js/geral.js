//
//ImgCache.options.debug = true;
////increase allocated space on Chrome to 50MB, default was 10MB
//ImgCache.options.chromeQuota = 50*1024*1024;
////ImgCache.options.cordovaFilesystemRoot = cordova.file.dataDirectory;
//
//document.addEventListener('deviceready', function(){
//	ImgCache.init(function () {
//	
//		console.log('ImgCache init: success!');
//	
//	    // from within this function you're now able to call other ImgCache methods
//	    // or you can wait for the ImgCacheReady event
//	
//	}, function () {
//		console.log('ImgCache init: error! Check the log for errors');
//	});
//});

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
			//return doc.data().ip;
		});
		
	}
	console.log("retornando localhost");
	return "http://192.168.15.7:8080/json";
}

function gerURLplataforma90(id){
	return "www/img/plataforma50/"+id+"_50.png";
}

function gerURLplataforma(id){
	return "http://localhost:5000/"+id+".png";
}

function gerURLjogo90(id){
	return "http://localhost:5000/jogo90/"+id+"_90.png";
}

function gerURLjogo(id){
	return "http://localhost:5000/jogo/"+id+"_90.png";
}

$('.botao-voltar').on('click', function() {
	voltar();	
});