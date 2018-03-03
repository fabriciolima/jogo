getMeusJogos();
//adicionaJogoInteressado();

function getMeusJogos(){
	document.addEventListener('deviceready', function(){
		db.collection("jogotroca")//.where("idcliente","==","BbpwjgiYmZbdI6Kz8UrY")
		.get().then(function(lista){
			console.log("lista",lista.size);
			lista.forEach(function(doc) {
				if(doc.exists){
					adicionaMeuJogoTelaInicial(doc.data());
				}else{
					console.log("doc nao existe");
				}
			});
		});		
	});
}


function adicionaMeuJogoTelaInicial(data) {
	var items = [];
	nomejogo = "";
	
	db.doc("jogo/"+data.idjogo).get().then(function(doc){
		console.log(doc.data().nome);
		
		items.push('<div class="col s12 m7">'
				+ '<h2 class="header">Jogo perto</h2>'
				+ '<div class="card horizontal">'
				+ '<div class="card-image">'
	//			+ '	<img src="img/plataforma50/2_50.PNG"> '
//				+ '	<img src="'+ getImagemPlataforma(data.id)+ '">'
				+ '</div>'
				+ '<div class="card-stacked">'
				+ '	<div class="card-content">'
				+ '		<p>'
				+ '<h6>'+doc.data().nome+'</h6>'
//				+ '<h5> '+nomePlataforma(data.idPlataforma)+'</h5>'
				+ doc.data().nome
				+ '</p>'
				+ '	</div>'
				+ '	<div class="card-action">'
				+'		  <p>'
				+'		    <input type="checkbox" id="test5" />'
			    +' <label for="test5">Proposta de troca</label>'
				+'	  </p>'
				+ '	</div>'
				+ '</div>'
				+ '</div>' + '</div>');
		$('<ul/>', {'class' : 'my-new-list',html : items.join('')}).appendTo('#meusjogos');
	//		}).appendTo('body');
	});
};


function adicionaJogoInteressado() {
	var items = [];
//	console.log(data);
	nomejogo = "";
	db.doc("jogo/10").get().then(function(doc){
		
		items.push('<div class="col s12 m7">'
				+ '<h2 class="header">Jogo perto</h2>'
				+ '<div class="card horizontal">'
				+ '<div class="card-image">'
	//			+ '	<img src="img/plataforma50/2_50.PNG"> '
				//+ '	<img src="'+ getImagemPlataforma(data.id)+ '">'
				+ '</div>'
				+ '<div class="card-stacked">'
				+ '	<div class="card-content">'
				+ '		<p>'
				+ '<h6>'+doc.data().nome+'</h6>'
//				+ '<h5> '+nomePlataforma(data.idPlataforma)+'</h5>'
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
		}).appendTo('#jogointeressado');
	//		}).appendTo('body');
	});
}