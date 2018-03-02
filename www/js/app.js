
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
	nomejogo = "";
	db.doc("jogo/"+data.idjogo).get().then(function(doc){
		
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
				+ '<h6>'+doc.data().nome+'</h6>'
				+ '<h5> '+nomePlataforma(data.idPlataforma)+'</h5>'
				+ doc.data().nome
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
	});
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
		db.collection("jogotroca").where("idcliente","==","n4sC21hwIab3wFZiFcM9").get().then(function(lista){
			lista.forEach(function(doc) {
				adicionaMeuJogoTelaInicial(doc.data());				
			});
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
                  getJogosPorPerto(page);
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
google.maps.event.addDomListener(window, 'load', function(){
	navigator.geolocation.getCurrentPosition(cadastracliente, null, { timeout: 3000 });});
//function getJogosPorPerto(){}
//
function cadastracliente(position){
	var storage = window.localStorage;
	storage.setItem('lat',position.coords.latitude.toFixed(6));
	storage.setItem('lon',position.coords.longitude.toFixed(6));

	var lat=position.coords.latitude.toFixed(6);
    var long=position.coords.longitude.toFixed(6);
    
	    //if(lat != 0)
    dados={nome:lat,
    		telefone:"23423423",
    		localizacao: new firebase.firestore.GeoPoint(position.coords.latitude, position.coords.longitude)};
	    	
	    	db.collection("cliente").add(dados)
							.then(function(doc){
								console.log("salvo db");
								dados["localizacao"] = lat +' '+ long ;
								salvaClienteJSon(dados)})
							.catch(function(erro){console.log(erro);});
	
}

function salvaClienteJSon(dados){
	console.log("dados:",dados);
	$.post(getJSON()+"/cliente/add",dados,function(data, status)
		    {
				if(status=='success'){
					if(data=='erro')
						alert('Erro. Tente novamente mais tarde');
					else{
						console.log("Data: " + data);
					}
					
				}
				else
					console.log("Data: " + data + "\nStatus: " + status);
			});
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

function getPlataforma(){
	db.collection("plataforma").get().then({ includeQueryMetadataChanges: true }, function(snapshot) {       
		snapshot.docChanges.forEach(function(change) {
			console.log('change',change);
			adicionaJogoTelaInicial(change.doc.data());
			if (change.type === "added") {console.log("New city: ", change.doc.data());}
			
			var source = snapshot.metadata.fromCache ? "local cache" : "server";           
			console.log("Data came from " + source);       });   
		});
}

//		db.collection("jogos").get().then({ includeQueryMetadataChanges: true }, function(snapshot) {       
//			snapshot.docChanges.forEach(function(change) {
//				console.log('change',change);
//				adicionaJogoTelaInicial(change.doc.data());
//				if (change.type === "added") {console.log("New city: ", change.doc.data());}
//				
//				var source = snapshot.metadata.fromCache ? "local cache" : "server";           
//				console.log("Data came from " + source);       });   
//			});
	

	
//getJogos();