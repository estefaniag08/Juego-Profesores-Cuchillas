
var tamanoXLienzo = 1500;							//TamanoLienzo X
var tamanoYLienzo = 500;							//TamanoLienzo Y
var posX, posY;										//Posicion donde estará el estudiante  
var elCanvas;
var contexto;
var buffer;
var contextoBuffer;	
//Agregado por Edwin
var enemigosDerecha= [];
var posicionActDerecha=[];
var enemigosIzquierda= [];
var posicionActIzquierda=[];
var aliados;
var posicionActArriba;
var bonus=0;
var imagenDerecha= new Image();
var imagenIzquierda = new Image();
var imagenAliado= new Image();
//Termina Agregación

var est = new estudiante();							//Objeto del tipo estudiante
var vidaEst;
var jugando;
var antImg = 1;

$(document).ready(inicializar);						//Se inicia la ejecucion con la funcion inicializar
$(document).keydown(botones);						//Se tiene un event listener de teclado

function inicializar(){
	jugando = true;
	est.inicio();									//Inicializamos los valores del estudiante
	elCanvas = document.getElementById("lienzo");						//Canvas del documento html
	contexto = elCanvas.getContext("2d");			//Extrae  el contexto del canvas
	buffer = document.createElement("canvas");			//Se crea un nuevo elemento canvas en el documento
	//Agregado por Edwin
	posicionActArriba=(Math.floor(Math.random() * (elCanvas.height)-elCanvas.height));	
	aliados=(Math.floor(Math.random() * (elCanvas.width)));
	//Terminado agregación
	run();			//Inicia el algoritmo del juego
	$("iniciarBoton").click(function(){
		if(jugando===false){
			jugando = true;
			inicializar();
		}	
	});
	
}	
//Mueve el estudiante a traves del canvas
function botones(event){	
	est.validarImg(event.which);
	if(event.which===39 || event.which===68){	//Si la tecla presionada es la flecha derecha
		est.validarColisionPared("derecha");
		posX=posX+12;
	}
	if(event.which===37 || event.which===65){	//Si la tecla presionada es la flecha izquierda
		est.validarColisionPared("izquierda");
		posX=posX-12;	
	}
	if(event.which===38 || event.which===87){	//Si la tecla presionada es la flecha arriba
		est.validarColisionPared("arriba");
		posY=posY-12;
	}
	if(event.which===40 || event.which===83){	//Si la tecla presionada es la flecha abajo
		est.validarColisionPared("frente");
		posY=posY+12;
	}
	run();
}
//Clase del tipo estudiante
function estudiante(){
	//Los id de las imagenes del estudiante
	var arregloImgsId = ["img1F","img2F", "img3F", "img1A", "img2A", "img3A","img1I", "img2I", "img3I", "img1D", "img2D", "img3D"];	//Los id de las imagenes del estudiante
	var imagen;														//Saber cual fue la ultima imagen utilizada, para dar continuidad a la animacion
	var tamanoImagenXE = 86, tamanoImagenYE = 103; 								//Tamano de la imagen actual
	this.inicio = function(){
		posX=750;		//Inicializamos valores de posicion y vida
		posY=250;
		vidaEst=100;
	};
	//Dibuja el estudiante en la nueva posicion
	this.actualizar = function(ctx){
		ctx.clearRect(0, 0, elCanvas.width, elCanvas.height);
		this.imagen = document.getElementById(arregloImgsId[antImg]);
		ctx.drawImage(this.imagen,posX,posY); 										//Dibuja la imagen
	};
	//Valida cuando el estudiante se sale del canvas, si lo hace, reinicia la posicion, para hacer parecer que vuelve al inicio
	this.validarColisionPared = function(direccionE){	
		if(direccionE==="derecha"){
			if(posX-tamanoImagenXE>tamanoXLienzo){
				posX=-40;
			}
		}
		if(direccionE==="izquierda"){
			if(posX+tamanoImagenXE<0){
				posX=tamanoXLienzo;
			}
		}
		if(direccionE==="arriba"){
			if(posY+tamanoImagenYE<0){
				posY=tamanoYLienzo;
			}
		}
		if(direccionE==="frente"){
			if(posY-tamanoImagenYE>tamanoYLienzo){
				posY=-40;
			}
		}
	};
	//Valida cual imagen se pondrá para simular la animacion de movimiento del estudiante
	this.validarImg = function(tecla){		
		var imgFin;
		if(tecla===39 || tecla===68){		//Si la tecla presionada es la flecha derecha
			if (antImg===9){
				imgFin=10;
			}
			if(antImg===10){
				imgFin=11;
			}
			if(antImg===11){
				imgFin=9;
			}
			if (antImg < 9){
				imgFin=11;
			}
		}
		if(tecla===37 || tecla===65){		//Si la tecla presionada es la flecha izquierda
			if (antImg===6){
				imgFin=7;
			}
			if(antImg===7){
				imgFin=8;
			}
			if(antImg===8){
				imgFin=6;
			}
			if(antImg<6 || antImg>8){
				imgFin=7;
			}
		}
		if(tecla===38 || tecla===87){	//Si la tecla presionada es la flecha arriba
			if (antImg===3){
				imgFin=4;
			} 
			if(antImg===4){
				imgFin=5;
			}
			if(antImg===5){
				imgFin=3;
			}
			if(antImg<3 || antImg>5) {
				imgFin=5;
			}
		}
		if(tecla===40 || tecla===83){	//Si la tecla presionada es la flecha abajo
			if (antImg===0){
				imgFin=1;
			} 
			if(antImg===1){
				imgFin=2;
			}
			if(antImg===2){
				imgFin=0;
			}
			if (antImg >2){
				imgFin=1;
			}	
		}
		antImg=imgFin;
	};
}
//Clase del tipo profesor bueno
function profesorBueno(){
	var arregloImgProfB = ["imgPB1-I","imgPB1-D","imgPB2-A", "imgPB2-F"];//Imagenes de profesor bueno, que se pued emover de ariiba a abajo o de der a izq
	
}
//Clase del tipo profesor malo
function profesorMalo(){
	var arregloPMalo1 = ["imgPC1-I","imgPC1-D"];	//Profesor cuchilla que va de izq a der
	var arregloPMalo2 = ["imgPC2-A","imgPC2-F"];	//Profesor cuchilla que va de arriba a abajo
}
function run(){
	buffer.width = elCanvas.width;				//El buffer se pone del tamaño del canvas del documento html
	buffer.height = elCanvas.height;
	contextoBuffer = buffer.getContext("2d");	//El contexto del buffer es 2d
	if(jugando){
		contextoBuffer.clearRect(0,0,buffer.width,buffer.height);	//Hace un rectangulo dentro de un rectangulo de tamaño dado el cual limpia dibujos anteriormente hechos
		
		est.actualizar(contextoBuffer);	//Se dibuja el estudiante en el este contexto
		
		//Aca va lo de validar que colisionen o no con los profesores
		if(vidaEst<=0){
			jugando=false;
		}
		contexto.clearRect(0,0,elCanvas.width,elCanvas.height);	//Se limpia el rectangulo del contexto del canvas del html
		contexto.drawImage(buffer, 0, 0);						//Se dibuja lo que está en el buffer
		//Agregado por Edwin
		buscarImagenes();
		crearEnemigos();
		setInterval(moverPersonajes,10);
		//Terminado agregación
		//setInterval(run(),20);
	}
}



//Agregado por Edwin
function crearEnemigos(){
	for (var i = 0; i <= Math.floor(Math.random()*4) +1; i++) {
		enemigosDerecha.push(Math.floor(Math.random() * (elCanvas.height-200)));
		posicionActDerecha.push((-1)*Math.floor(Math.random() * (elCanvas.width)-100));	
	}

	for (var i = 0; i <= Math.floor(Math.random()*5) +1; i++) {
		enemigosIzquierda.push(Math.floor(Math.random() * (elCanvas.height-200)));
		posicionActIzquierda.push(Math.floor(Math.random() * (elCanvas.width)+elCanvas.width));	
	}
}		

function cambiarPincel(){
	contexto.fillStyle="#CCFFCC";
}

		
function buscarImagenes(){
	imagenIzquierda.src = "Imagen/ProfesoresMalos/PC1-I.png";
	imagenDerecha.src = "Imagen/ProfesoresMalos/PC1-D.png";	
	imagenAliado.src = "Imagen/ProfesoresBuenos/PB2-F.png";
}
		
function moverDerecha(){
	for (var i = 0; i < enemigosDerecha.length; i++) {
		contextoBuffer.drawImage(imagenDerecha,posicionActDerecha[i],enemigosDerecha[i],100,200);
		if(posicionActDerecha[i]>elCanvas.width-10){
			posicionActDerecha[i]=-90;
		}
		else{
			posicionActDerecha[i]=posicionActDerecha[i]+5;
		}	
	}
}

function moverIzquierda(){
	for (var i = 0; i < enemigosIzquierda.length; i++) {
		contextoBuffer.drawImage(imagenIzquierda,posicionActIzquierda[i],enemigosIzquierda[i],100,200);
		if(posicionActIzquierda[i]<-90){
			posicionActIzquierda[i]=elCanvas.width-10;
		}
		else{
			posicionActIzquierda[i]=posicionActIzquierda[i]-5;
		}	
	}
}

function moverAliado(){
	contextoBuffer.drawImage(imagenAliado,aliados,posicionActArriba,100,200);
	if(posicionActArriba>elCanvas.height-10){
		posicionActArriba=-190;
		aliados=(Math.floor(Math.random() * (elCanvas.width))-200);
	}
	else{
		posicionActArriba=posicionActArriba+3;
		bonus--;
	}
}
		
function moverPersonajes(){
	moverIzquierda();
	moverDerecha();
	if(bonus%10 == 0){
		moverAliado();
	} 
	bonus++;
}
//Termina Agregación

