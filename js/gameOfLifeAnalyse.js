$(function(){
	var rendX = ($('#graph').width());
	var rendY=($('#graph').height());

	//gestion Canvas ou WebGL en fonction du navigateur

	if(navigator.userAgent.toLowerCase().indexOf('msie')!=-1){
		var renderer = new PIXI.CanvasRenderer(rendX, rendY);
		$('#graph').css('background-color', 'black');
	}else if(navigator.userAgent.toLowerCase().indexOf('webkit')!=-1){
		var renderer = new PIXI.WebGLRenderer(940, 480);
	}else{
		var renderer = new PIXI.WebGLRenderer(rendX, rendY);
	}

	$('#graph').html(renderer.view);
	analyse.rendu.run(renderer);


	// création des échelles d'absisses et d'ordonnées du graphe.
	var ord=[10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130];
	var abs=[0, 2500, 5000, 10000, 15000, 20000, 25000, 30000];

	for(var i=0; i<(ord.length); i++){
		div='<div class="ord'+i+'">'+ord[i]+'</div>';
		$('#ord').append(div);
		$('#ord .ord'+i).css('bottom', (i*35)+'px');
	}

	for(var j=0; j<abs.length; j++){
		div='<div class="abs'+j+'">'+abs[j]+'</div>';
		$('#abs').append(div);
		$('#abs .abs'+j).css('left', ((abs[j]*2.9)/100)+18+'px');
	}
});

var analyse= analyse || {};

analyse.rendu={

	//coordonnées des points des courbes du graphe

	coor : [['graph1', 400, 1], ['graph1', 500, 1], ['graph1', 1000, 1.5], ['graph1', 2000, 4], ['graph1', 2500, 5],
	['graph1', 3000, 6], ['graph1', 4000, 8], ['graph1', 5000, 10], ['graph1', 6000, 11], ['graph1', 8000, 15.5], 
	['graph1', 10000, 17], ['graph1', 12500, 21], ['graph1', 15000, 25], ['graph1', 20000, 32],
	['graph1', 25000, 40], ['graph1', 30000, 50], ['graph2', 400, 2], ['graph2', 500, 2.5], ['graph2', 1000, 4], ['graph2', 2000, 8], ['graph2', 2500, 9],
	['graph2', 3000, 13], ['graph2', 4000, 15.5], ['graph2', 5000, 17], ['graph2', 6000, 21], ['graph2', 8000, 28], 
	['graph2', 10000, 35], ['graph2', 12500, 45], ['graph2', 15000, 55], ['graph2', 20000, 90],
	['graph2', 25000, 110], ['graph2', 30000, 130]],


	// affichage de notre graphe dans la zone de rendu


	run: function(renderer){
		// création de la scène et des puces du graphe
		var stage = new PIXI.Stage;
    	var graph1Texture = PIXI.Texture.fromImage("./images/phen1XL.png");
    	var graph2Texture = PIXI.Texture.fromImage("./images/phen2XL.png");
    	var tab=[];
    	var X=0;

  		function animate() {
       		renderer.render(stage);
    	}
    		
    	requestAnimFrame(animate);

  		for(var i=0; i<analyse.rendu.coor.length; i++){
  			tab=analyse.rendu.coor[i];
  			if(tab[0]=='graph1'){
  				graph1 = new PIXI.Sprite(graph1Texture);
  				graph1.position.x=(tab[1]*2.9)/100;
  				graph1.position.y=480-(tab[2]*3.6);

  				graph1.scale.x=0.4;
  				graph1.scale.y=0.4;

  				stage.addChild(graph1);

  			}else if(tab[0]=='graph2'){
  				graph2 = new PIXI.Sprite(graph2Texture);
  				graph2.position.x=(tab[1]*2.9)/100;
  				graph2.position.y=480-(tab[2]*3.6);

  				graph2.scale.x=0.4;
  				graph2.scale.y=0.4;

 				stage.addChild(graph2);
 			}
  		}

  		for(var j=0; j<320; j++){
  			graph3 = new PIXI.Sprite(graph2Texture);
  			X=j*2.9;
  			graph3.position.x=X;
  			//on ajoute un facteur 100 et 1.2 pour la corrélation d'échelle entre nb de cellules par rapport au coordonnées pure en pixel
  			graph3.position.y=480-(X*0.17*1.2);

  			graph3.scale.x=0.2;
  			graph3.scale.y=0.2;

  			stage.addChild(graph3);

  			graph4 = new PIXI.Sprite(graph2Texture);
  			if(j<155){
 				graph4.position.x=X;
  				//on ajoute un facteur 100 et 1.2 pour la corrélation d'échelle entre nb de cellules par rapport au coordonnées pure en pixel
  				graph4.position.y=480-(X*0.37*1.2);

	  			graph4.scale.x=0.2;
  				graph4.scale.y=0.2;
  			}else if(j>190){
  				graph4.position.x=X;
  				//on ajoute un facteur 100 et 1.2 pour la corrélation d'échelle entre nb de cellules par rapport au coordonnées pure en pixel
  				graph4.position.y=480-((X*0.41*1.2)+40);

  				graph4.scale.x=0.2;
  				graph4.scale.y=0.2;
  			}else{
  				graph4.position.x=X;
  				//on ajoute un facteur 100 et 1.2 pour la corrélation d'échelle entre nb de cellules par rapport au coordonnées pure en pixel
  				graph4.position.y=480-196-(1/(1+Math.exp(-0.05*(X-514))))*132;

  				graph4.scale.x=0.2;
  				graph4.scale.y=0.2;
  			}
  			stage.addChild(graph4);
  		}
	}
}