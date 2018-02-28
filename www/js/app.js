
$('.collection')
    .on('click', '.collection-item', function(){
        var nomeProduto = this.firstChild.textContent;
        Materialize.toast(nomeProduto + ' adicionado', 1000);

        var $badge = $('.badge', this);
        if ($badge.length === 0) {
            $badge = $('<span class="badge brown-text">0</span>').appendTo(this);
        }

        $badge.text(parseInt($badge.text()) + 1);
    })
    .on('click', '.badge', function() {
        $(this).remove();
        return false;
    });




$('.botao-voltar').on('click', function() {
	 function BackKeyDown()
     {
		 e.preventDefault(); 
     }
    
});

$('.atualiza').on('click',function(){
                //mRefresh.refresh();   
        refresh();
                return false;
            });

$('.galeria').on('click', function() {

	navigator.camera.getPicture(onSuccess, onFail, { quality: 25,
	    destinationType: Camera.DestinationType.DATA_URL
	});
	
	function onSuccess(imageData) {
		var image = document.getElementById('myImage');
		
		//image.src = "data:image/jpeg;base64," + imageData;
	    console.log("ok2");
		$.post("http://localhost:8080/servlet-0.0.1-SNAPSHOT/json",
			    {
			        nome: "Subindo foto",
			        teste:"dfgdsfgsdfg",
			        foto: imageData
			    },
			    function(data, status){
			        alert("Data: " + data + "\nStatus: " + status);
			    });

	}

	function onFail(message) {
		alert('falha pq: ' + message);
	}
});





$('.teste').on('click',function() {
	
	var pictureSource;   // picture source
    var destinationType; // sets the format of returned value 

    // Wait for Cordova to connect with the device
    //
    document.addEventListener("deviceready",onDeviceReady,false);

    // Cordova is ready to be used!
    //
    function onDeviceReady() {
        pictureSource=navigator.camera.PictureSourceType;
        destinationType=navigator.camera.DestinationType;
    }

    // Called when a photo is successfully retrieved
    //
    function onPhotoDataSuccess(imageData) {
      // Uncomment to view the base64 encoded image data
      // console.log(imageData);

      // Get image handle
      //
      var smallImage = document.getElementById('smallImage');

      // Unhide image elements
      //
      smallImage.style.display = 'block';

      // Show the captured photo
      // The inline CSS rules are used to resize the image
      //
      smallImage.src = "data:image/jpeg;base64," + imageData;
    }

    // Called when a photo is successfully retrieved
    //
    function onPhotoURISuccess(imageURI) {
      // Uncomment to view the image file URI 
      // console.log(imageURI);

      // Get image handle
      //
      var largeImage = document.getElementById('largeImage');

      // Unhide image elements
      //
      largeImage.style.display = 'block';

      // Show the captured photo
      // The inline CSS rules are used to resize the image
      //
      largeImage.src = imageURI;
    }

    // A button will call this function
    //
    function capturePhoto() {
      // Take picture using device camera and retrieve image as base64-encoded string
      navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 50,
        destinationType: destinationType.DATA_URL });
    }

    // A button will call this function
    //
    function capturePhotoEdit() {
      // Take picture using device camera, allow edit, and retrieve image as base64-encoded string  
      navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 20, allowEdit: true,
        destinationType: destinationType.DATA_URL });
    }

    // A button will call this function
    //
    function getPhoto(source) {
      // Retrieve image file location from specified source
      navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 50, 
        destinationType: destinationType.FILE_URI,
        sourceType: source });
    }

    // Called if something bad happens.
    // 
    function onFail(message) {
      alert('Failed because: ' + message);
    }

});

$('.cadastro-jogo').on('click', function() {
	   window.location = "cadastroJogo.html";
    
});
//
//$.getJSON("http://localhost:8080/json/plataforma",
//		function(data) {
//			var items = [];
//			$.each(data,function(key, val) {
//				console.log('plataforma'+val.nome);
//				atualizaPlataformasDB(val);
//		});
//});


//$.getJSON(getJSON()+"/jogo",
//		function(data) {
//			
//			$.each(data,function(key, val) {
//				console.log('jogo:'+val.nome);
//				atualizaJogosDB(val);
//				adicionaJogoTelaInicial(val); 
//		});
//});


function adicionaJogoTelaInicial(data) {
	var items = [];
	items.push('<div class="col s12 m7">'
			+ '<h2 class="header">Horizontal Card</h2>'
			+ '<div class="card horizontal">'
			+ '<div class="card-image">'
			+ '	<img src="http://localhost:8080/servlet-0.0.1-SNAPSHOT/'
			//+ val.imagem
			+ '">'
			+ '</div>'
			+ '<div class="card-stacked">'
			+ '	<div class="card-content">'
			+ '		<p>'
			+ data.nome
			+ '</p>'
			+ '	</div>'
			+ '	<div class="card-action">'
			+ '		<a href="#">This is a link</a>'
			+ '	</div>'
			+ '</div>'
			+ '</div>' + '</div>');
	$('<ul/>', {'class' : 'my-new-list',
		html : items.join('')
	}).appendTo('#porperto');
//		}).appendTo('body');
};

function adicionaMeuJogoTelaInicial(data) {
	var items = [];
//	console.log(data);
	items.push('<div class="col s12 m7">'
			+ '<h2 class="header">Jogo perto</h2>'
			+ '<div class="card horizontal">'
			+ '<div class="card-image">'
//			+ '	<img src="img/plataforma50/2_50.PNG"> '
			+ '	<img src="'+ getImagemPlataforma(data.id)+ '">'
			+ '</div>'
			+ '<div class="card-stacked">'
			+ '	<div class="card-content">'
			+ '		<p>'
			+ '<h6>'+nomePlataforma(data.idPlataforma)+'</h6>'
			+ '<h5> '+nomePlataforma(data.idPlataforma)+'</h5>'
			+ data.id
			+ '</p>'
			+ '	</div>'
			+ '	<div class="card-action">'
			+ '		<a href="#">This is a link</a>'
			+ '	</div>'
			+ '</div>'
			+ '</div>' + '</div>');
	$('<ul/>', {'class' : 'my-new-list',
		html : items.join('')
	}).appendTo('#meusjogos');
//		}).appendTo('body');
};


function atualizaJogosDB(jogo){
	var myDB =getDB();

	myDB.transaction(function(transaction) {
		transaction.executeSql('insert or replace into jogos(id, nome) VALUES(?,?)',
				[jogo.id,
				jogo.nome]);
	});
	
}	



//-----------------------------------------------------------------------------------------------
//script para o infinite scroll
//var url = geiftJSON()+"/jogo";
var $currentPage = 0;
var $pageSize = 20;
var scrollStop = 0;
var $filter = 'today';

//Ajax call

function getMeusJogos(){
	document.addEventListener('deviceready', function(){
		$.ajax({
	              type: "GET",
	              url: getJSON()+"/meusjogos",
	              data: { 
	                  idCliente:9	                  
	              },
	              crossDomain: false,
	              cache: false,
	              dataType: "json",
	              success: function(data){
	            	  $.each(data,function(key, val) {
	      					//console.log('jogo2:'+val.id);
//	            		  //atualizaMeuJogoDB(data.content[cont]);
	      				  adicionaMeuJogoTelaInicial(val);
	            	  });
	                  
	              }
	          });
	});
}

//$.getJSON(getJSON()+"/meusjogos?idCliente=9",
//		function(data) {
//		console.log(data);
//			$.each(data,function(key, val) {
//				console.log('jogo:'+val.id);
////				atualizaJogosDB(val);
////				adicionaJogoTelaInicial(val); 
//		});
//});
//

$(document).scroll(function(e){
          if(scrollStop == 0){
              var scrollAmount = $(window).scrollTop();
              var documentHeight = $('body').height();
              var viewPortHeight = $(window).height();

              var a = viewPortHeight + scrollAmount;
              var b = documentHeight - a;

              if(b < 300) {
                  $currentPage = $currentPage + 1;
                  getJogosPorPerto();
              }
          }
      });

//      $('.filter').click(function(){
//          $filter = $(this).attr('id');
//          $('#grid-listing').empty();
//          $currentPage = 0;
//          scrollStop = 0;
//          getJogosPorPerto();
//      });

//getJogosPorPerto();
getMeusJogos();
getJogosPorPerto2();
function getJogosPorPerto2(){
	
}

function getImagemJogo(idJogo){
	
}

function getImagemPlataforma(id){

//	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fs) {
//
//	    console.log('file system open: ' + fs.name);
//	    fs.root.getFile("newPersistentFile.txt", { create: true, exclusive: false }, function (fileEntry) {
//
//	        console.log("fileEntry is file?" + fileEntry.isFile.toString());
//	        // fileEntry.name == 'someFile.txt'
//	        // fileEntry.fullPath == '/someFile.txt'
//	        writeFile(fileEntry, null);
//	    }, function(){console.log("111");});
//	}, function(){console.log("22222");});	

//	}, onErrorLoadFs);
//	window.resolveLocalFileSystemURI("img/plataforma50/15_50.JPG", function(){
//		console.log("existe");
//	}, function(){
//		console.log("nao existe");
//	});

	//return "img/plataforma50/15_50.JPG";
	return "img/jogo90/"+id + "_90.png";
}
function nomePlataforma(idPlataforma){
	retorno = "";
	document.addEventListener('deviceready', function(){
		var db=getDB();
		//console.log('console:'+idPlataforma);
		db.transaction(function(tx) {tx.executeSql('SELECT nome from plataforma where id = '+idPlataforma, [], function(tx, rs){
			retorno = '11'+ rs.rows.item(0).nome;
			//console.log('------'+retorno);
			
		},function(erro){
			console.log(erro.message);
		})
		});
	});
	return retorno;
	
}

getPlataforma(){
	db.collection("plataforma").get().then({ includeQueryMetadataChanges: true }, function(snapshot) {       
		snapshot.docChanges.forEach(function(change) {
			console.log('change',change);
			adicionaJogoTelaInicial(change.doc.data());
			if (change.type === "added") {console.log("New city: ", change.doc.data());}
			
			var source = snapshot.metadata.fromCache ? "local cache" : "server";           
			console.log("Data came from " + source);       });   
		});
}

function getJogos(){
	
//	db.collection("jogos").get().then(function (lista){
//			console.log("lista:"+lista);
//			lista.forEach(function(doc){ 
//				if(doc && doc.exists){
//					console.log(doc.data());
//					console.log(doc.data().nome);
//					adicionaJogoTelaInicial(doc.data());
//				}});});
	
		db.collection("jogos").get().then({ includeQueryMetadataChanges: true }, function(snapshot) {       
			snapshot.docChanges.forEach(function(change) {
				console.log('change',change);
				adicionaJogoTelaInicial(change.doc.data());
				if (change.type === "added") {console.log("New city: ", change.doc.data());}
				
				var source = snapshot.metadata.fromCache ? "local cache" : "server";           
				console.log("Data came from " + source);       });   
			});
	
}
	
getJogos();