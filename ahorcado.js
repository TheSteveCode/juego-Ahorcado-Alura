/* 
| Desarrollado por: Juan Esteban López C
| Tipo: Juego
| nombre: Juego del ahorcado 
| Año: 2022
| País: Colombia
*/

/* Este es un programa que implementa un juego del ahorcado.
contiene: Variables, funciones, ciclos, condicionales, etc.
Se ha editado la etiqueta canvas dandole las respectivas modificaciones.
*/

var hombre, l;

//Declara función ahorcado
var ahorcado = function (con) {
    this.contexto = con;
    this.maximo = 5;
    this.intentos = 0;
    this.vivo = true;

    // Dibujar empieza a armar el ahorcado
    this.dibujar();
}

ahorcado.prototype.dibujar = function () {
    var dibujo = this.contexto;

    //Dibujar poste
    dibujo.beginPath();
    dibujo.moveTo(150, 100);
    dibujo.lineTo(150, 50);
    dibujo.lineTo(400, 50);
    dibujo.lineTo(400, 350);
    dibujo.strokeStyle = "#000";
    dibujo.stroke();
    dibujo.closePath();


    if (this.intentos > 0) {

        //rostro
        dibujo.beginPath();
        dibujo.arc(150, 140, 40, 0, Math.PI * 2, false);
        dibujo.strokeStyle = "red";
        dibujo.lineWidth = 5;
        dibujo.stroke();
        dibujo.closePath();

        if (this.intentos > 1) {

            //torso
            dibujo.beginPath();
            dibujo.moveTo(150, 180);
            dibujo.lineTo(150, 250);
            dibujo.strokeStyle = "red";
            dibujo.lineWidth = 5;
            dibujo.stroke();
            dibujo.closePath();

            if (this.intentos > 2) {

                //brazos
                dibujo.beginPath();
                dibujo.moveTo(120, 220);
                dibujo.lineTo(150, 180);
                dibujo.lineTo(180, 220);
                dibujo.strokeStyle = "red";
                dibujo.lineWidth = 5;
                dibujo.stroke();
                dibujo.closePath();

                if (this.intentos > 3) {

                    //piernas
                    dibujo.beginPath();
                    dibujo.moveTo(120, 290);
                    dibujo.lineTo(150, 250);
                    dibujo.lineTo(180, 290);
                    dibujo.strokeStyle = "red";
                    dibujo.lineWidth = 5;
                    dibujo.stroke();
                    dibujo.closePath();

                    if (this.intentos > 4) {

                        //ojos muertos
                        dibujo.beginPath();
                        //ojo izquierdo
                        dibujo.moveTo(125, 120);
                        dibujo.lineTo(145, 145);
                        dibujo.moveTo(145, 120);
                        dibujo.lineTo(125, 145);

                        //ojo derecho
                        dibujo.moveTo(155, 120);
                        dibujo.lineTo(175, 145);
                        dibujo.moveTo(175, 120);
                        dibujo.lineTo(155, 145);

                        dibujo.strokeStyle = "blue";
                        dibujo.lineWidth = 5;
                        dibujo.stroke();
                        dibujo.closePath();
                    }

                }
            }
        }
    }
}
ahorcado.prototype.trazar = function() {
    this.intentos++;
    if(this.intentos >= this.maximo) {
        this.vivo = false;
        alert("¡Fin del juego!");
        
    }
    this.dibujar();
}

function crearTablero() {
    l = document.getElementById("letra");
    var b = document.getElementById("button");
    var canvas = document.getElementById("canvas");
    canvas.width = 1200;
    canvas.height = 800;
    canvas.style.backgroundColor = "orange";
    var contexto = canvas.getContext("2d");
    hombre = new ahorcado(contexto);
    
    //convertir la palabra secreta a mayus
    palabra = palabraSecreta().toLocaleUpperCase();
    
    //arreglo con n espacios de acuerdo al largo de la palabra
    espacio = new Array(palabra.length);
    
    //click en el botton de verificación
    b.addEventListener("click", agregarLetra);
    
    mostrarPista(espacio);
    //mostrarPista(palabra, espacio);
}


// Función que escoge una palabra aleatoria
const palabraSecreta = () => {

    var palabras = 
    ["tecnología", 
      "apartamento",
      "hospital",
      "sueños"];

let longitudArreglo = palabras.length;
let numeroAleatorio = Math.floor(Math.random() * longitudArreglo); //retorna un entero aleatorio de 0 a n

for (let i = 0; i < longitudArreglo; i++) {
  if (numeroAleatorio == i) {
      return palabras[i];
      }
  }
}

function agregarLetra() {
    
    var letra = l.value;
    l.value = "";
    
    mostrarPalabra(palabra, hombre, letra);
        

    
}

function mostrarPalabra(palabra, ahorcado, letra) {
    
    var encontrado = false;
    var p;
    letra = letra.toLocaleUpperCase();
    for (p in palabra) {
        if (letra == palabra[p]) {
            espacio[p] = letra;
            encontrado = true;
        }
    }
    
    mostrarPista(espacio);
    
    //Si no la encontre
    if (!encontrado) {
        ahorcado.trazar();
    }
    
    if(!ahorcado.vivo) {
        //mostrar la palabra entera al morir(tarea)
    }
    
}
function mostrarPista(espacio) {
    var pista = document.getElementById("pista");
    var texto = "";
    var i;
    var largo = espacio.length;
    
    for(i = 0; i<largo; i++) {
        if(espacio[i] != undefined) {
            texto = texto + espacio[i] + " ";
        }
        else {
            texto += "_ ";
        }
    }
    
    pista.innerText = texto;
}