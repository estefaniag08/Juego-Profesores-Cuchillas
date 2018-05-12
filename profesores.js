// JavaScript Document

//var tamanoXLienzo = 700;
//var tamanoYLienzo = 500;
//var lienzoMin= 0;

var posX = 100;	//Posicion donde estará el estudiante
var posY = 100; 

var contexto, elCanvas, imagen;	
var arregloImgsId = ["imgFrente","imgAtras", "imgIzq", "imgDer"];	//Los id de las imagenes del estudiante,imagen;	//Diferentes imagenes del estudiante

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

function botones(event){	//Mueve el estudiante a traves del canvas
	"use strict";
	var aux;
	if(event.which===39){	//Si la tecla presionada es la flecha derecha
		posX=posX+10;
		aux=0;
	}
	if(event.which===37){	//Si la tecla presionada es la flecha izquierda
		posX=posX-10;
		aux=0;
	}
	if(event.which===38){	//Si la tecla presionada es la flecha arriba
		posY=posY-10;
		aux=1;
	}
	if(event.which===40){	//Si la tecla presionada es la flecha abajo
		posY=posY+10;
		aux=0;
	}
	actualizar(aux);
}





