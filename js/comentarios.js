// Recorrer los elementos y hacer que onchange ejecute una funcion para comprobar el valor de ese input
(function(){
    // formulario y elementos del formulario
   var formulario = document.formulario_registro,
       elementos = formulario.elements;
   // lista global de comentarios
   let comentarios = [];
   
   // Funcion que se ejecuta cuando el evento click es activado
   
   let validarInputs = function(){
       for (var i = 0; i < elementos.length; i++) {
           // Identificamos si el elemento es de tipo texto, email, password, radio o checkbox
           if (elementos[i].type == "text" || elementos[i].type == "email" || elementos[i].type == "password") {
               // Si es tipo texto, email o password vamos a comprobar que esten completados los input
               if (elementos[i].value.length == 0) {
                   console.log('El campo ' + elementos[i].name + ' esta incompleto');
                   elementos[i].className = elementos[i].className + " error";
                   return false;
               } else {
                   elementos[i].className = elementos[i].className.replace(" error", "");
               }
           }
       }
       return true;
   };

   var enviar = function(e){
        if (!validarInputs()) {
            console.log('Falto validar los Input');
            e.preventDefault();
        }else {
            console.log('Envia');
            e.preventDefault();
            let comentario = obtenerDatos();
            comentarios.push(comentario)
            localStorage.setItem("comentarios", JSON.stringify(comentarios))
            console.log(comentarios);
        }
    };

    // Agregar todos los campos al nuevo registro
function obtenerDatos() {
    // Obteniendo los valores de los campos
    let nombre = document.getElementById('nombre').value;
    let apellido = document.getElementById('apellido').value;
    let correo = document.getElementById('correo').value;
    let mensaje = document.getElementById('mensaje').value;
	

    // Crear el objeto de modelo
    let comentario = {}
    comentario.nombre = nombre
    comentario.apellido = apellido
    comentario.correo = correo
    comentario.mensaje = mensaje
	

    // Formas de imprimir
    //console.log(`El objeto automotor es: ${automotor}`);
    //console.log('El objeto automotor es:' + automotor);
    console.log('El objeto comentario es:', comentario);
    return comentario;
}

var focusInput = function(){
	this.parentElement.children[1].className = "label active";
	this.parentElement.children[0].className = this.parentElement.children[0].className.replace("error", "");
};

var blurInput = function(){
	if (this.value <= 0) {
		this.parentElement.children[1].className = "label";
		this.parentElement.children[0].className = this.parentElement.children[0].className + " error";
	}
};

// --- Eventos ---
formulario.addEventListener("submit", enviar);

for (var i = 0; i < elementos.length; i++) {
	if (elementos[i].type == "text" || elementos[i].type == "email" || elementos[i].type == "password") {
		elementos[i].addEventListener("focus", focusInput);
		elementos[i].addEventListener("blur", blurInput);
	}
}
}())