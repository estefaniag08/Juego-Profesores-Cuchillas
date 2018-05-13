// JavaScript Document

var tamanoXLienzo = 1500;
var tamanoYLienzo = 500;
//var lienzoMin= 0;

var antImg = 0;	//Saber cual fue la ultima imagen utilizada, par adar continuidad a la animacion
var posX = 100;	//Posicion donde estará el estudiante
var posY = 100; 
var contexto, elCanvas, imagen;	
var arregloImgsId = ["img1F","img2F", "img3F", "img1A", "img2A", "img3A","img1I", "img2I", "img3I", "img1D", "img2D", "img3D",];	//Los id de las imagenes del estudiante	

$(document).ready(inicializar);	//Se inicia la ejecucion con la funcion inicializar
$(document).keydown(botones);	//Se tiene un event listener de teclado

function inicializar(){
	"use strict";
	elCanvas = $("#lienzo")[0];	//El lienzo de la pagina HTML
	contexto = elCanvas.getContext("2d");	//Contexto
	contexto.clearRect(0, 0, elCanvas.width, elCanvas.height);
	$("iniciarBoton").click(actualizar(0));
	
}	
function actualizar(numImagen){
	"use strict";
	contexto.clearRect(0, 0, elCanvas.width, elCanvas.height);
	imagen = document.getElementById(arregloImgsId[numImagen]);
	contexto.drawImage (imagen,posX,posY); //Dibuja la imagen	
}

function botones(event){	//Mueve el estudiante a traves del canvas y simula movimiento
	"use strict";
	
	if(event.which===39){	//Si la tecla presionada es la flecha derecha
		validarColisionPared("derecha");
		if (antImg===9){
			actualizar(10);
			antImg=10;
		} else if(antImg===10){
			actualizar(11);
			antImg=11;
		}else if(antImg===11){
			actualizar(9);
			antImg=9;
		} else if (antImg < 9){
			actualizar(11);
			antImg=11;
		}
		posX=posX+12;
	}
	if(event.which===37){	//Si la tecla presionada es la flecha izquierda
		validarColisionPared("izquierda");
		if (antImg===6){
			actualizar(7);
			antImg=7;
		} else if(antImg===7){
			actualizar(8);
			antImg=8;
		}else if(antImg===8){
			actualizar(6);
			antImg=6;
		} else if(antImg<6 || antImg>8){
			actualizar(7);
			antImg=7;
		}
		posX=posX-12;	
	}
	if(event.which===38){	//Si la tecla presionada es la flecha arriba
		validarColisionPared("arriba");
		if (antImg===3){
			actualizar(4);
			antImg=4;
		} else if(antImg===4){
			actualizar(5);
			antImg=5;
		}else if(antImg===5){
			actualizar(3);
			antImg=3;
		} else if(antImg<3 || antImg>5) {
			actualizar(5);
			antImg=5;
		}
		posY=posY-12;
	}
	if(event.which===40){	//Si la tecla presionada es la flecha abajo
		validarColisionPared("frente");
		if (antImg===0){
			actualizar(1);
			antImg=1;
		} else if(antImg===1){
			actualizar(2);
			antImg=2;
		}else if(antImg===2){
			actualizar(0);
			antImg=0;
		} else if (antImg >2){
			actualizar(1);
			antImg=1;
		}
		posY=posY+12;
	}	
}

function validarColisionPared(direccionE){	//Valida cuando el estdiante se sale del canvas, si lo hace, reinicia la posicion, para hacer parecer que vuelve al inicio
	"use strict";
	if(direccionE==="derecha"){
		if(posX-86>tamanoXLienzo){
			posX=0;
		}
		return posX;
	}
	if(direccionE==="izquierda"){
		if(posX+86<0){
			posX=1500;
		}
		return posX;
	}
	if(direccionE==="arriba"){
		if(posY+103<0){
			posY=500;
		}
		return posY;
	}
	if(direccionE==="frente"){
		if(posY-103>tamanoYLienzo){
			posY=0;
		}
		return posY;
	}
}



