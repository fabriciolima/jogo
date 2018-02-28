
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
    postData += '&idCliente='+storage.getItem('idCliente');
    
    $('#idCliente').html(storage.getItem('idCliente'));
    
    console.log(postData);
    
    $.post(getJSON()+"/add",
    		postData,
		    function(data, status){
		        console.log("Data: " + data + "\nStatus: " + status);
		        addMeuJogo(data,
		        		$('#nome').val(),
		        		$('#estado').val());
		    });

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


function atualizaCadastro(){
	document.addEventListener('deviceready', function(){
		
		myDB = getDB();
//--------------------------------------------------------------------------------------------
		var dataNome ={
		      "Outros": null};
		myDB.transaction(function(tx) {
			tx.executeSql('SELECT nome from jogos', [], function(tx, rs){
				for(cont = 0; cont < rs.rows.length; cont++){
					//console.log(rs.rows.item(cont).nome);
					dataNome[rs.rows.item(cont).nome]=null;//rs.rows.item(cont).nome;
				}
	
			},function(erro){
				console.log(erro);
			});});
		
		$('#nome').autocomplete({
			data: dataNome,
//			data: {
//		      "Apple": null,
//		      "Microsoft": null,
//		      "Google": 'https://placehold.it/250x250'
//		    },
		    limit: 5, // The max amount of results that can be shown at once. Default: Infinity.
		    onAutocomplete: function(val) {
		      // Callback function when value is autcompleted.
		    }, minLength: 2, // The minimum length of the input for the autocomplete to start. Default: 1.
		  });

		
//-------------------------------------------------------------------------------------------		
		
		myDB.transaction(function(tx) {
			tx.executeSql('SELECT * from plataforma', [], function(tx, rs){
				//$('#console').material_select('destroy');
				$('#console').material_select();
				for(cont = 0; cont < rs.rows.length; cont++){
					//console.log(rs.rows.item(cont).nome)
					var opcao = '<option value='
						+rs.rows.item(cont).nome
						+'>'+rs.rows.item(cont).nome+'</option>';
					$('#console').append(opcao);
					$('#console').material_select();
				}

			},function(erro){
				console.log(erro);
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

