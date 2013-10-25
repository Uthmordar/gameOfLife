// définition de la variable du setInterval de la lecture auto en global

var interval='';

var date= 0;

$(function(){


	//-----------------------------------------------------
	// ANIMATION SPECIFIQUE DE LA PAGE
	//-----------------------------------------------------

	// articles déroulants

	$('#infoGame p, #infoGame a, #rules p, #rules ul, #background p, #background ul').show();
	$('#infoGame .fleche, #rules .fleche, #background .fleche').on('click', function(){
		$(this).parent('div').find('p, a, ul').slideUp();
		$(this).hide();
		$('#infoGame h2, #rules h2, #background h2').on('click', function(){
			$(this).parent('div').find('p, a, ul').slideDown();
			$(this).prev('.fleche').show();
		});
	});

	// affichage de la barre de commande secondaire de la zone de rendu

	$('#hiddenControl form').hide();
	$('#hiddenControl').on('mouseover', function(){
		$(this).find('form').slideDown();
		$(this).on('mouseleave', function(){
			$(this).find('form').slideUp();
		});
	});

	//gestion des infobulles
	var infoB;

	$('.replicator').on('mouseenter', function(e){
		infoB=$('<span class="replicImg"><img src="./images/replicator.png" alt=""></span>').appendTo('#rules');
		var X=$('.replicator').position().left;
		var Y=($('.replicator').position().top)+20;
		infoB.css('top', Y+'px').css('left', X+'px').css('z-index', 100);

		$(this).on('mouseleave', function(e){
			infoB.remove();
		});
	});


	//--------------------------------------------------
	// INITIALISATION ET CONDITIONS DE DEPART
	//--------------------------------------------------


	// On initialise la zone d'affichage de notre grille modèle

	//création de la grille vide
	gol.init();
	//affichage
	gol.random.disp();
	//on donne les propriétés on click aux div de la grille
	gol.modif.init();


	//On initialise la zone de rendu WebGl de PIXI.js

	//Les dimensions des éléments et les calculs dépendent uniquement des width
	// et height CSS de #initialPattern.

	var rendX = ($('#initialPattern').width())*1.7;
	var rendY= ($('#initialPattern').height())*1.7;

	//test pour déterminer quel type de rendu utiliser (problème de rendu avec chrome qui efface le WebGL si celui-ci n'est plus dans la fenêtre).
	$('#generationPattern').css('width', rendX).css('height', rendY);

	if(navigator.userAgent.toLowerCase().indexOf('msie')!=-1){
		var renderer = new PIXI.CanvasRenderer(rendX, rendY);
		$('#generationPattern').css('background-color', 'black');
	}else if(navigator.userAgent.toLowerCase().indexOf('webkit')!=-1){
		var renderer=new PIXI.WebGLRenderer(rendX, rendY);
	}else{
		var renderer = new PIXI.WebGLRenderer(rendX, rendY);
	}

    $('#generationPattern').html(renderer.view);


    //--------------------------------------------------
    // ZONE DE GESTION DES ACTIONS INPUT
    //--------------------------------------------------


    // Si l'utilisateur modifie la grille on le notifie pour que le dessin soit réenregistré dans l'objet
    $('#initialPattern').on('click', function(e){
    	e.preventDefault();
    	gol.grille.ready=0;
    });

	// On initialise notre grille random modifiable lors d'un click sur le button associé
	$('#randbut').on('click', function(e){
		if($('#autoRun').attr('data-on')=='off'){
			e.preventDefault();
			gol.random.init();
			gol.random.disp();
			gol.grille.notEmpty=1;
			gol.grille.ready=0;

			gol.modif.init();
		}
	});

	// Gestion des modes de génération

	$('#mode, #mode2').on('click', function(){
		if($(this).val()=='Classique'){
			$('#mode, #mode2').val('HighLife');
			gol.grille.mode='HighLife';
			//détermination des conditions de vie et mort
			gol.grille.modeB=[3,6];
			gol.grille.modeS=[2,3];
		}else if($(this).val()=='HighLife'){
			$('#mode, #mode2').val('B1S12');
			gol.grille.mode='B1S12';
			gol.grille.modeB=[1];
			gol.grille.modeS=[1,2];
		}else{
			$('#mode, #mode2').val('Classique');
			gol.grille.mode='Classique';
			gol.grille.modeB=[3];
			gol.grille.modeS=[2,3];
		}
	});


	// On ajoute une fonction de nettoyage de la grille initiale à l'utilisateur

	$('#Clear').on('click', function(e){
		if($('#autoRun').attr('data-on')=='off'){
			e.preventDefault();
			gol.Clear.launch();
			gol.grille.ready=0;
		}
	});

	// Mise en place du localStorage

	//On met dans le local storage le pattern de notre dessin

	$('#saveInit').on('click', function(e){
		e.preventDefault();
		var table=$('.cell');
		var patStor=[];

		for(var i=0; i<table.length; i++){
			patStor.push($(table[i]).attr('data-phen'));
		}
		localStorage.setItem('pattern', JSON.stringify(patStor));
	});

	//On affiche l'étape de rendu en cours dans la zone de dessin

	$('#save').on('click', function(e){
		e.preventDefault();
		gol.update.launch();
		gol.random.disp();

		gol.modif.init();
	});

	//récupération dans le localStorage de l'éventuel pattern enregistré et affichage

	$('#load').on('click', function(e){
		e.preventDefault();
		if($('#autoRun').attr('data-on')=='off'){
			if(localStorage['pattern']!=null){
				$pattern=JSON.parse(localStorage.getItem('pattern'));
				gol.grille.ready=0;
				gol.grille.notEmpty=1;
				var table=$('.cell');
				for(var i=0; i<table.length; i++){
					$(table[i]).attr('data-phen', $pattern[i]);
				}
			}else{
				$('#load').after('<p class="errorRed">Pas de pattern en mémoire</p>');
			}
		}
	});


	// MISE EN PLACE DES FONCTIONS DE GENERATION DE LA ZONE DE RENDU


	//fonction pour aller directement à une étape voulue

	$('#goIte').on('click', function(e){
		e.preventDefault();

		var ite=$('#ite').val();

		if(gol.grille.notEmpty==1 && isNaN(ite)==false && $('#autoRun').attr('data-on')=='off'){
			gol.register.launch();
			gol.grille.grilleInit=gol.grille.grille;
			gol.grille.ready=1;
			gol.generation.iterations=0;

			//on effectue le nombre d'iteration voulue en passant à chaque fois les étapes
			//de rendu et d'affichage des itérations.
			for(var i=0; i<ite; i++){
				gol.generation.run();
				gol.grille.grille=gol.generation.grilleNewBorn;
				gol.generation.grillePrev=gol.generation.grilleNewBorn;
				gol.generation.grilleNewBorn=[];
				gol.generation.iterations=gol.generation.iterations+1;
			}
			gol.rendu.run(renderer);
			$('.iteration').html(gol.generation.iterations);
		}
	});

	// fonction de lecture automatique


	$('#autoRun, #autoRun2').on('click', function(e){
		e.preventDefault();

		// mise en mémoire du pattern initial modifié

		if(gol.grille.notEmpty==1 && gol.grille.ready==0){
			//on enregistre la zone de dessin et on déclare qu'une grille initiale est enregistrée
			gol.register.launch();
			gol.grille.grilleInit=gol.grille.grille;
			gol.grille.ready=1;
			gol.generation.iterations=0;

			// on affiche la grille initiale dans la zone de rendu WebGL
			gol.rendu.run(renderer);
			$('.iteration').html(gol.generation.iterations);
		}


		// récupération du paramètrage de vitesse


		if($('#speed').val()<0){
			var speed=1;
		}else{
			var speed=$('#speed').val();
		}

		
		// gestion du mode lecture/pause


		if($(this).attr('data-on')=='off'){
			$('#autoRun, #autoRun2').attr('data-on', 'on').val('Pause');
		}else{
			$('#autoRun, #autoRun2').attr('data-on', 'off').val('auto');
		}

		var on=$(this).attr('data-on');


		// generation des étapes du pattern enregistré 


		if(gol.grille.ready==1){
			if(on=='on'){
				// on lance la génération en boucle
				interval=setInterval(function(){
					date=new Date;
					console.log('deb', date.getMilliseconds());
					gol.generation.run();
					//date=new Date;
					//console.log(date.getMilliseconds());
					gol.grille.grille=gol.generation.grilleNewBorn;
					gol.generation.grillePrev=gol.generation.grilleNewBorn;
					gol.generation.grilleNewBorn=[];
					gol.rendu.run(renderer);
					gol.generation.iterations=gol.generation.iterations+1;
					$('.iteration').html(gol.generation.iterations);
					date=new Date;
					console.log(date.getMilliseconds());
				}, speed);
			}else{
				clearInterval(interval);
			}
		}
	});


	// fonction de lecture en mode slide by slide manuel


	$('#slideRun, #slideRun2').on('click', function(e){
		e.preventDefault();

		// enregistrement du pattern initial


		if(gol.grille.notEmpty==1 && gol.grille.ready==0){
			gol.register.launch();
			gol.grille.grilleInit=gol.grille.grille;
			gol.grille.ready=1;
			gol.generation.iterations=0;


			gol.rendu.run(renderer);
			$('.iteration').html(gol.generation.iterations);
		}


		// generation des étapes du pattern enregistré 


		if(gol.grille.ready==1){
			date=new Date;
			console.log(date.getMilliseconds());
			gol.generation.run();
			date=new Date;
			console.log(date.getMilliseconds());
			gol.grille.grille=gol.generation.grilleNewBorn;
			gol.generation.grillePrev=gol.generation.grilleNewBorn;
			gol.generation.grilleNewBorn=[];
			gol.rendu.run(renderer);
			gol.generation.iterations=gol.generation.iterations+1;
			$('.iteration').html(gol.generation.iterations);
		}
	});

	//réinitialise la zone d'affichage, on repart de la matrice initiale.
	$('#restart, #restart2').on('click', function(){
		gol.grille.grille=gol.grille.grilleInit;
		gol.generation.iterations=0;
		gol.grille.ready=1;
		if($('#autoRun').attr('data-on')=='off'){
			$('#slideRun').trigger('click');
		}
	});
});



//----------------------------------------------------------------------
//
// OBJET GAME OF LIFE
//
//---------------------------------------------------------------------


var gol=gol || {

	//lors de l'arrivée sur la page, génération de la grille vide

	init : function(){

		gol.grille.nbX = Math.round(($('#initialPattern').width())/10);

		gol.grille.nbY = Math.round(($('#initialPattern').height())/10);

		var line=[];
		var table=[];

		for(var i=0; i<gol.grille.nbX; i++){
			line.push('dead');
		}
		for(var j=0; j<gol.grille.nbY; j++){
			table.push(line);
		}

		gol.grille.grille = table;
	}
}

//caractéristiques spécifiques de la grille/environnement des cellules

gol.grille={
	grilleInit : [],

	grille : [],

	nbX : 0,

	nbY : 0,

	notEmpty : 0,

	ready : 0,

	mode:'Classique',

	modeB : [3],

	modeS : [2,3]
}

// GESTION DE LA GENERATION DE GRILLE ALEATOIRE

gol.random={

	// on initialise la grille remplie de manière aléatoire

	init: function(){
		//récupération des données entrées par l'utilisateur
		var popPercent = ($('#percentPop').val())/100;
		var phenPercent = ($('#percentPhen').val())/100;

		for(var i=0; i<gol.grille.nbY; i++){
			var table=[];
			for(var j=0; j<gol.grille.nbX; j++){
				var rand1=Math.random();
				var rand2=Math.random();
				var type='';
				//répartition entre cellule morte et vivante
				if(rand1 < popPercent){
					//répartition des vivantes entre phen1 et phen2
					if(rand2<phenPercent){
						type='phen1';
					}else{
						type='phen2';
					}
				}else{
					type='dead';
				}
				table.push(type);
			}
			gol.grille.grille[i]=table;
		}
	},


	// on transfère la grille générée dans notre zone de dessin


	disp: function(){
		var type='';
		//nettoayge de la zone de dessin
		$('#initialPattern').html('');
		//generation d'un nombre de div portant l'information du contenu des cases dans 
		//l'ordre de lecture correspondant à la forme de la grille
		for(var l=0; l<gol.grille.nbY; l++){
			for(var m=0; m<gol.grille.nbX; m++){
				type=gol.grille.grille[l][m];
				if(type.slice(0,5)=='phen1'){
					$('#initialPattern').append('<div class="cell" data-phen="phen1"></div>');
				}else if(type.slice(0,5)=='phen2'){
					$('#initialPattern').append('<div class="cell" data-phen="phen2"></div>');
				}else{
					$('#initialPattern').append('<div class="cell" data-phen="dead"></div>');
				}
			}
		}
	},
}

//mise à jour de la grille initiale en fonction de la grille actuelle de la zone de rendu

gol.update={

	launch: function(){
		var X = gol.grille.nbX;
		var Y = gol.grille.nbY;
		var grille=[];
		var type='';

		for(var i=0; i<Y; i++){
			var table=[];
			var tableComp=gol.grille.grille[i];
			for(var j=0; j<X; j++){
				if(tableComp[j].slice(0,5)=='phen1'){
					type='phen1';
				}else if(tableComp[j].slice(0,5)=='phen2'){
					type='phen2';
				}else{
					type='dead';
				}
				table.push(type);
			}
			grille[i]=table;
		}
		gol.grille.grilleInit=grille;
	},
}


//GESTION DE LA MODIFICATION DE NOS CELLULES PAR CLICK DANS LA ZONE DE DESSIN

gol.modif={

	// on initialise la possibilité de générer un pattern avec des click

	init: function(){
		$('.cell').on('click', function(){
			if($(this).attr('data-phen')=='dead'){
				$(this).attr('data-phen', 'phen1');
			}else if($(this).attr('data-phen')=='phen1'){
				$(this).attr('data-phen', 'phen2');
			}else{
				$(this).attr('data-phen', 'dead');
			}
			if(gol.grille.notEmpty==0){
				gol.grille.notEmpty=1;
			}
		});
	}
}


// NETTOYAGE DE LA ZONE DE DESSIN


gol.Clear={

	// on réinitialise la zone de dessin en déclarant toutes les div.cell en tant
	// que cellules mortes.

	launch : function(){
		var table=$('.cell');
		for(var i=0; i<table.length; i++){
			$(table[i]).attr('data-phen', 'dead');
		}
		gol.grille.notEmpty=0;
	}
}

// ENREGISTREMENT DU PATTERN DEFINI DANS LA ZONE DE DESSIN EN TANT QUE MATRICE

gol.register={

	// on enregistre notre dessin modifié pour le garder en mémoire et le générer 
	// dans la zone d'affichage
	launch : function(){
		var table=$('.cell');
		var table1=[];
		var X=gol.grille.nbX;
		var Y=gol.grille.nbY;

		for(var i=0; i<Y; i++){
			for(var j=0; j<X; j++){
				table1.push($(table[j+X*i]).attr('data-phen'));
			}
			gol.grille.grille[i]=table1;
			table1=[];
		}
	}
}


// GESTION DU RENDU DE NOTRE MATRICE DANS LA ZONE DE RENDERER PIXI.JS


gol.rendu={


	// affichage de notre grille dans la zone de rendu


	run: function(renderer){
		if(gol.grille.ready==1){
			// création de la scène et des textures de souches
			var stage = new PIXI.Stage;
    		var phen1Texture = PIXI.Texture.fromImage("./images/phen1XL.png");
    		var phen2Texture = PIXI.Texture.fromImage("./images/phen2XL.png");

  			var table = [];

  			function animate() {
       			renderer.render(stage);
    		}
    		
    		requestAnimFrame(animate);

    		//on parse notre grille dont le rendu doit être effectué

  			for(var i=0; i<gol.grille.nbY; i++){
  				table=gol.grille.grille[i];
  				for(var j=0; j<gol.grille.nbX; j++){
  					if(table[j].slice(0, 5)=='phen1'){
  						phen1 = new PIXI.Sprite(phen1Texture);
  						// on redimensionne en fonction de la différence de
  						//taille entre zone de pattern initial et zone de rendu
  						// pour garder les mêmes proportions
  						phen1.position.x=j*17;
  						phen1.position.y=i*17;

  						// on gère le vieillissement des cellules
  						if(table[j].length==5){
  							phen1.scale.x=0.5;
  							phen1.scale.y=0.5;
  							phen1.anchor.x=-0.6;
  							phen1.anchor.y=-0.6;
  						}else if(table[j].length==6){
  							phen1.scale.x=0.7;
  							phen1.scale.y=0.7;
  							phen1.anchor.x=-0.2;
  							phen1.anchor.y=-0.2;
  						}

  						stage.addChild(phen1);

  					}else if(table[j].slice(0, 5)=='phen2'){
  						phen2 = new PIXI.Sprite(phen2Texture);
  						phen2.position.x=j*17;
  						phen2.position.y=i*17;

  						if(table[j].length==5){
  							phen2.scale.x=0.5;
  							phen2.scale.y=0.5;
  							phen2.anchor.x=-0.6;
  							phen2.anchor.y=-0.6;
  						}else if(table[j].length==6){
  							phen2.scale.x=0.7;
  							phen2.scale.y=0.7;
  							phen2.anchor.x=-0.2;
  							phen2.anchor.y=-0.2;
  						}

  						stage.addChild(phen2);
  					}
  				}
  			}
		}else{
			$('#genError').html('<p class="errorRed">Pas de grille valide enregistrée</p>').slideDown().delay(5000).slideUp();
		}
	}
}


// GESTION DE LA PROLIFERATION DE NOS CELLULES LORS DE CHAQUE ETAPE


gol.generation={

	iterations : 0,

	//on garde la grille de l'étape précédente
	grillePrev : [],
	//on définit la grille à générer
	grilleNewBorn : [],

	run : function(){
		//on définit la grille qui doit évoluer et les variables de dimension
		gol.generation.grillePrev=gol.grille.grille;
		var X=gol.grille.nbX;
		var Y=gol.grille.nbY;

		//on définit la zone de lecture
		var linePrev=[];
		var line=[];
		var lineNex=[];

		//pré-définition des variables pour définir les nouvelles lignes
		var newLine = [];
		var voisin=0;
		var voisPhen1=0;
		var voisPhen2=0;
		var result='';

		var mat=[];

		//on parse notre grille
		for(var i=0; i<Y; i++){

			// gestion des lignes 0 et Y-1 (bords horizontaux)

			if(i==0){
				linePrev=gol.generation.grillePrev[Y-1];
				lineNex=gol.generation.grillePrev[i+1];
			}else if(i==(Y-1)){
				linePrev=gol.generation.grillePrev[i-1];
				lineNex=gol.generation.grillePrev[0];
			}else{
				linePrev=gol.generation.grillePrev[i-1];
				lineNex=gol.generation.grillePrev[i+1];
			}

			line=gol.generation.grillePrev[i];

			for(var j=0; j<X; j++){


				//gestion en fonction des colonnes 0 et X-1 (bords verticaux)

				if(j==0){
					//définition des coordonnées de parse en fonction de la position dans la grille
					mat=[X-1, j, j+1, X-1, j+1, X-1, j, j+1];
					for(var l=0; l<8; l++){
						//vérification des 3 voisins du dessus
						if(l<3){
							coor=linePrev[mat[l]].slice(0, 5);
							//on teste si le voisin est vivant ou mort
							if(coor!='dead'){
								voisin++;
								//si le voisin est vivant on notifie son phénotype
								if(coor=='phen1'){
									voisPhen1++;
								}else{
									voisPhen2++;
								}
							}
						//vérification des 2 voisins horizontaux
						}else if(l<5){
							coor=line[mat[l]].slice(0, 5);
							if(coor!='dead'){
								voisin++;
								if(coor=='phen1'){
									voisPhen1++;
								}else{
									voisPhen2++;
								}
							}
						//vérification des 3 voisins du dessous
						}else{
							coor=lineNex[mat[l]].slice(0, 5);
							if(coor!='dead'){
								voisin++;
								if(coor=='phen1'){
									voisPhen1++;
								}else{
									voisPhen2++;
								}
							}
						}
					}
				}else if(j==(X-1)){
					mat=[j-1, j, 0, j-1, 0, j-1, j, 0];
					for(var l=0; l<8; l++){
						if(l<3){
							coor=linePrev[mat[l]].slice(0, 5);
							if(coor!='dead'){
								voisin++;
								if(coor=='phen1'){
									voisPhen1++;
								}else{
									voisPhen2++;
								}
							}
						}else if(l<5){
							coor=line[mat[l]].slice(0, 5);
							if(coor!='dead'){
								voisin++;
								if(coor=='phen1'){
									voisPhen1++;
								}else{
									voisPhen2++;
								}
							}
						}else{
							coor=lineNex[mat[l]].slice(0, 5);
							if(coor!='dead'){
								voisin++;
								if(coor=='phen1'){
									voisPhen1++;
								}else{
									voisPhen2++;
								}
							}
						}
					}
				}else{
					mat=[j-1, j, j+1, j-1, j+1, j-1, j, j+1];
					for(var l=0; l<8; l++){
						if(l<3){
							coor=linePrev[mat[l]].slice(0, 5);
							if(coor!='dead'){
								voisin++;
								if(coor=='phen1'){
									voisPhen1++;
								}else{
									voisPhen2++;
								}
							}
						}else if(l<5){
							coor=line[mat[l]].slice(0, 5);
							if(coor!='dead'){
								voisin++;
								if(coor=='phen1'){
									voisPhen1++;
								}else{
									voisPhen2++;
								}
							}
						}else{
							coor=lineNex[mat[l]].slice(0, 5);
							if(coor!='dead'){
								voisin++;
								if(coor=='phen1'){
									voisPhen1++;
								}else{
									voisPhen2++;
								}
							}
						}
					}
				}


				// EN FONCTION DES CONDITIONS ENVIRONNEMENTALES DE CHAQUE CELLULE
				// ET SELON L'ALGORYHTME DE GAME OF LIFE CHOISI => EVOLUTION 


			/*	SYSTEME PRECEDENT POUR GENERATION CAS PAR CAS
				if(line[j]=='dead'){
					if(gol.grille.mode=='HighLife'){
						result=gol.generation.HighLifeB(voisin, voisPhen1, voisPhen2);
						newLine.push(result);
					}else if(gol.grille.mode=='B1S12'){
						result=gol.generation.B1S12B(voisin, voisPhen1, voisPhen2);
						newLine.push(result);
					}else{
						result=gol.generation.ClassiqueB(voisin, voisPhen1, voisPhen2);
						newLine.push(result);
					}
				}else{
					if(gol.grille.mode=='B1S12'){
						result=gol.generation.B1S12S(voisin, line[j]);
						newLine.push(result);
					}else{
						result=gol.generation.BXS23S(voisin, line[j]);
						newLine.push(result);
					}
				}*/


				//définition du nouvelle état de la cellule en fonction des règles de jeu de la vie
				//choisie et mise en mémoire de sa position


				newLine.push(gol.generation.CUSTOM(gol.grille.modeB, gol.grille.modeS, voisin, voisPhen1, voisPhen2, line[j]));
				voisin=0;
				voisPhen1=0;
				voisPhen2=0;
			}
			//définition des lignes de la nouvelle grille
			gol.generation.grilleNewBorn[i]=newLine;
			newLine=[];
		}
	},

	/*HighLifeB : function(voisin, voisPhen1, voisPhen2){
		if(voisin==3 || voisin==6){
			if(voisPhen1>voisPhen2){
				return 'phen1';
			}else{
				return 'phen2';
			}
		}else{
			return 'dead';
		}
	},

	B1S12B : function(voisin, voisPhen1, voisPhen2){
		if(voisin==1){
			if(voisPhen1>voisPhen2){
				return 'phen1';
			}else{
				return 'phen2';
			}
		}else{
			return 'dead';
		}
	},

	B1S12S : function(voisin, grow){
		if(voisin==1 || voisin==2){
			if(grow.length<7){
				return grow+'a';
			}else{
				return grow;
			}
		}else{
			return 'dead';
		}
	},

	ClassiqueB : function(voisin, voisPhen1, voisPhen2){
		if(voisin==3){
			if(voisPhen1>voisPhen2){
				return 'phen1';
			}else{
				return 'phen2';
			}
		}else{
			return 'dead';
		}
	},

	BXS23S : function(voisin, grow){
		if(voisin==2 || voisin==3){
			if(grow.length<7){
				return grow+'a';
			}else{
				return grow;
			}
		}else{
			return 'dead';
		}
	},*/


	//fonction de gestion de la vie et mort des cellules en fonction des règle de jeu
	//de la vie choisie


	CUSTOM : function(B, S, voisin, voisPhen1, voisPhen2, grow){
		var token=0;

		//Soit B un tableau contenant les nombres de voisins nécessaires à la naissance
		//Soit S un tableau contenant les nombres de voisins nécessaires à la survie
		//Soit grow l'information d'avancement en âge de la cellule

		if(grow=='dead'){
			//on vérifie si il y a assez de voisin pour la naissance
			for(var i=0; i<B.length; i++){
				if(voisin==B[i]){
					token=1;
					break;
				}
			}
			//définition du phénotype si naissance
			if(token==1){
				if(voisPhen1>voisPhen2){
					return 'phen1';
				}else{
					return 'phen2';
				}
			}else{
				return 'dead';
			}		
		}else{
			//on vérifie si les conditions de survie sont remplies
			for(var j=0; j<S.length; j++){
				if(voisin==S[j]){
					token=1;
					break;
				}
			}
			//avancement d'un cran dans l'échelle d'âge si survie
			if(token==1){
				if(grow.length<7){
					return grow+'a';
				}else{
					return grow;
				}
			}else{
				return 'dead';
			}
		}
	},
}