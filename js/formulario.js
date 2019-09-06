// Recorrer los elementos y hacer que onchange ejecute una funcion para comprobar el valor de ese input
(function(){
 // formulario y elementos del formulario
var formulario = document.formulario_registro,
	elementos = formulario.elements;
// lista global de registros
let registros = [];

// Funcion que se ejecuta cuando el evento click es activado

var validarInputs = function(){
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

	// Comprobando que las contraseñas coincidan
	if (elementos.pass.value !== elementos.pass2.value) {
		elementos.pass.value = "";
		elementos.pass2.value = "";
		elementos.pass.className = elementos.pass.className + " error";
		elementos.pass2.className = elementos.pass2.className + " error";
	} else {
		elementos.pass.className = elementos.pass.className.replace(" error", "");
		elementos.pass2.className = elementos.pass2.className.replace(" error", "");
	}

	return true;
};

var validarRadios = function(){
	var opciones = document.getElementsByName('sexo'),
		resultado = false;

	for (var i = 0; i < elementos.length; i++) {
		if(elementos[i].type == "radio" && elementos[i].name == "sexo"){
			// Recorremos los radio button
			for (var o = 0; o < opciones.length; o++) {
				if (opciones[o].checked) {
					resultado = true;
					break;
				}
			}

			if (resultado == false) {
				elementos[i].parentNode.className = elementos[i].parentNode.className + " error";
				console.log('El campo sexo esta incompleto');
				return false;
			} else {
				// Eliminamos la clase Error del radio button
				elementos[i].parentNode.className = elementos[i].parentNode.className.replace(" error", "");
				return true;
			}
		}
	}
};

var validarCheckbox = function(){
	var opciones = document.getElementsByName('terminos'),
		resultado = false;

	for (var i = 0; i < elementos.length; i++) {
		if(elementos[i].type == "checkbox"){
			for (var o = 0; o < opciones.length; o++) {
				if (opciones[o].checked) {
					resultado = true;
					break;
				}
			}

			if (resultado == false) {
				elementos[i].parentNode.className = elementos[i].parentNode.className + " error";
				console.log('El campo checkbox esta incompleto');
				return false;
			} else {
				// Eliminamos la clase Error del checkbox
				elementos[i].parentNode.className = elementos[i].parentNode.className.replace(" error", "");
				return true;
			}
		}
	}
};

var enviar = function(e){
	if (!validarInputs()) {
		console.log('Falto validar los Input');
		e.preventDefault();
	} else if (!validarRadios()) {
		console.log('Falto validar los Radio Button');
		e.preventDefault();
	} else if (!validarCheckbox()) {
		console.log('Falto validar Checkbox');
		e.preventDefault();
	} else {
		console.log('Envia');
		e.preventDefault();
		let registro = obtenerDatos();
		registros.push(registro)
        localStorage.setItem("lista_automotores", JSON.stringify(registros))
		console.log(registros);
	}
};

// Agregar todos los campos al nuevo registro
function obtenerDatos() {
    // Obteniendo los valores de los campos
    let nombre = document.getElementById('nombre').value;
    let apellido = document.getElementById('apellido').value;
    let usuario = document.getElementById('usuario').value;
    let correo = document.getElementById('correo').value;
    let pass = document.getElementById('pass').value;
    let pass2 = document.getElementById('pass2').value;
	let hombre = document.getElementById('hombre').value;
    let mujer = document.getElementById('mujer').value;
    let terminos = document.getElementById('hombre').value;
	

    // Crear el objeto de modelo
    let registro = {}
    registro.nombre = nombre
    registro.apellido = apellido
    registro.usuario = usuario
    registro.correo = correo
    registro.pass = pass
    registro.pass2 = pass2
	registro.hombre = hombre
    registro.mujer = mujer
    registro.terminos = terminos
	

    // Formas de imprimir
    //console.log(`El objeto automotor es: ${automotor}`);
    //console.log('El objeto automotor es:' + automotor);
    console.log('El objeto registro es:', registro);
    return registro
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

function inicioSesion(usuario, contrasena) {
	for (let i = 0; i < registros.length; i++) {
		
		if (usuario == registros[i].usuario) {
			if (contrasena == registros[i].usuario){
				alert('Has iniciado sesión correctamente');
				break;
			}else{
				alert('Usuario o contraseña incorrectos');
			}
		}
	}	
}

