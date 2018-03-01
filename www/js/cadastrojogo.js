
$('.foto').on('click', function() {

	navigator.camera.getPicture(onSuccess, onFail, { quality: 25,
	    destinationType: Camera.DestinationType.FILE_URL
	});
	
	function onSuccess(imageData) {
		var image = document.getElementById('previewfoto');
	    //image.src = "data:image/jpeg;base64," + imageData;
		image.src = imageData;
	    
	    var imagemoculta = document.getElementById('imagemoculta');
	    imagemoculta.value = imageData;
	    
		console.log(image);
		   
		console.log("ok1");
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


$('form').submit(function(){


	var storage = window.localStorage;
    var postData = $(this).serialize();
    idCliente = 1;//storage.getItem('idCliente');
    nomeJogo = $('#nome').val().normalize('NFD').replace(/[\u0300-\u036f]/g, "");
    
    idJogo=0;
    db.doc("jogo2/"+nomeJogo).get().then(function(doc){idJogo=doc.id})
    .catch(function(erro){
    	db.collection("jogo2").doc(nomejogo).set({nome: nomeJogo})
    	.then(function(doc){idJogo=doc.id});
    })

    console.log(idCliente);
    console.log($('#console').val());
    console.log($('#estado').val());
    console.log(idJogo + ','+nomeJogo);
    console.log($('#comentario').val());
    console.log($('#dinheiro').val());
    
    db.collection("jogotroca").add({
		console:$('#console').val(),
		estado:$('#estado').val(),
		idjogo:idJogo,//errado
		comentario:$('#comentario').val(),
		dinheiro:$('#dinheiro').val()}
    ).then(function(){console.log("salvo");})
		.catch(function(erro){console.log(erro);});
    
    console.log();
    
//    db.collection("plataforma")
//    	.add(
//    			{nome: "Playstation 1"})
//    			.then(function(){console.log("salvo");});
    
    
	
        

    return false;
});

function addMeuJogo(id,nome,estado){
	var db = getDB();
	console.log(jogo);
	db.transaction(function(transaction) {
		transaction.executeSql('insert or replace into jogoCliente(id, nomeJogo, estado) VALUES(?,?,?)',
				[id,nome,estado]);
	});
	
}


function clickfunc(object) {
	$("#valueId").empty();
	
	var valueId= "";
	var valueIdName= $("#valueEnter").val();
	if (valueIdName.length > 2) {
		alert("consultando: ");
	    var select = '%' + valueIdName+ '%';
	    myDB.transaction(function (transaction) {
	        transaction.executeSql('SELECT titulo FROM jogos WHERE NAME LIKE "' + valueIdName+ '";', [],
	            function (transaction, results) {
	                if (results != null && results.rows != null) {
	                    if (results.rows.length > 0) {
	                        for (var i = 0; i < results.rows.length; i++) {
	                            var code = results.rows.item(i).NAME;
	                            alert("resultado: "+code);
	                            valueId+= '<li data-filtertext="' + code + '"><a href="#">' + code + '</a></li>'
	                        }
	                        $("#valueId").append(valueId).selectmenu('refresh', true);
	                    } 
	                }
	            });
	    });
	}
	}


function autocompleta(){
	nomeJogo = $('#nome').val().normalize('NFD').replace(/[\u0300-\u036f]/g, "");
//	if($('#nome').val().length > 3)
	{
//		data = "";
//		db.collection("jogo").where("nome",">=",nomeJogo).limit(3).get().then(function (lista){
//			lista.forEach(function(doc){ 
//				console.log(doc.data());
//				if(data != "")
//					data = data+',"'+doc.data().nome+'":null';
//				else
//					data = '{"'+doc.data().nome+'":null';
//			});
//			data += "}";
//			
//			console.log(data);
//		});
//		$('#nome').autocomplete({
//			data:data,
//			limit: 3, // The max amount of results that can be shown at once. Default: Infinity.
//			onAutocomplete: function(val) {
//			}, minLength: 2, // The minimum length of the input for the autocomplete to start. Default: 1.
//		});
			
			

		};
		
//		var jogo = 	db.collection("jogo");
//		jogo.orderBy("nome").limit(3);
//		jogo.where("nome",">=",nomeJogo).get().then({ includeQueryMetadataChanges: true }, function(snapshot) {
//			console.log(snapshot)
//		snapshot.docChanges.forEach(function(change) {
//			console.log('change',change);
//			console.log(change.doc.data());
////			adicionaJogoTelaInicial(change.doc.data());
//			if (change.type === "added") {console.log("New city: ", change.doc.data());}
//			
//			var source = snapshot.metadata.fromCache ? "local cache" : "server";           
//			console.log("Data came from " + source);       });   
//		});;

	
	
}

function atualizaCadastro(){
	document.addEventListener('deviceready', function(){
		
//--------------------------------------------------------------------------------------------
		
//		$('#nome').autocomplete({
//			data: dataNome,
//			data: {
//		      "Apple": null,
//		      "Microsoft": null,
//		      "Google": 'https://placehold.it/250x250'
//		    },
			
//		    limit: 5, // The max amount of results that can be shown at once. Default: Infinity.
//		    onAutocomplete: function(val) {
//		      // Callback function when value is autcompleted.
//		    }, minLength: 2, // The minimum length of the input for the autocomplete to start. Default: 1.
//		  });

		
//-------------------------------------------------------------------------------------------		
		
		db.collection("plataforma")//.where("nome","==",nomeJogo)
		.get().then(function (lista){
			lista.forEach(function(doc) {
				var opcao = '<option value='+doc.id+'>'+doc.data().nome+'</option>';
				$('#console').append(opcao);
				$('#console').material_select();
	        });

		});


	});
	
	$('#console').material_select();
//-------------------------------------------------------------------------------------------
}

function mostrandoCadastro(){
	 atualizaCadastro();
	 $('#estado').material_select();
	 
	//document.addEventListener("deviceready",lerDBGPS,false);
	
	
}

