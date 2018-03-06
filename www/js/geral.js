  var teste="0";
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
	return "http://192.168.15.5:5000/"+id+".png";
}

function gerURLjogo90(id){
	return "http://192.168.15.5:5000/jogo90/"+id+"_90.png";
}

function gerURLjogo(id){
	return "http://192.168.15.5:5000/jogo/"+id+"_90.png";
}

$('.botao-voltar').on('click', function() {
	voltar();	
});


function distancia(location1, location2) {
	  var radius = 6371; // Earth's radius in kilometers
	  var latDelta = degreesToRadians(location2[0] - location1[0]);
	  var lonDelta = degreesToRadians(location2[1] - location1[1]);

	  var a = (Math.sin(latDelta / 2) * Math.sin(latDelta / 2)) +
	          (Math.cos(degreesToRadians(location1[0])) * Math.cos(degreesToRadians(location2[0])) *
	          Math.sin(lonDelta / 2) * Math.sin(lonDelta / 2));

	  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

	  return radius * c;
};

function degreesToRadians(degrees) {
	  return (degrees * Math.PI / 180);
	};
