//VALIDACION
// Recorrer los elementos y hacer que onchange ejecute una funcion para comprobar el valor de ese input

 // formulario y elementos del formulario
var formulario = document.formulario_registro,
	elementos = formulario.elements;
// lista global de registros
let registros = [];

// Funcion que se ejecuta cuando el evento click es activado

function validarInputs(){
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

function validarRadios(){
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

function validarCheckbox(){
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

// var focusInput = function(){
// 	this.parentElement.children[1].className = "label active";
// 	this.parentElement.children[0].className = this.parentElement.children[0].className.replace("error", "");
// };

// var blurInput = function(){
// 	if (this.value <= 0) {
// 		this.parentElement.children[1].className = "label";
// 		this.parentElement.children[0].className = this.parentElement.children[0].className + " error";
// 	}
// };

// --- Eventos ---
formulario.addEventListener("submit", enviar);

// for (var i = 0; i < elementos.length; i++) {
// 	if (elementos[i].type == "text" || elementos[i].type == "email" || elementos[i].type == "password") {
// 		elementos[i].addEventListener("focus", focusInput);
// 		elementos[i].addEventListener("blur", blurInput);
// 	}
// }


// CRUD
let usuariosTemp = [];

//Obtener datos
function get() {
  let token = sessionStorage.getItem("token");
  let options = {};
  options.headers = { token };
  axios
    .get("http://localhost:3000/usuarios", options)
    .then(response => {
      let data = response.data;
      let usuarios = data.informacion;
      usuariosTemp = usuarios;
      let tbody = document.getElementById("tareas");
      tbody.innerHTML = "";
      for (let index = 0; index < tareas.length; index++) {
        let element = tareas[index];
        let row = "";
        row += "<tr>";
        row += "<td>" + element["id"] + "</td>";
        row += "<td>" + element["nombre"] + "</td>";
        row += "<td>" + element["apellido"] + "</td>";
        row += "<td>" + element["correo"] + "</td>";
        row += "<td>" + element["usuario"] + "</td>";
        row += "<td>" + element["pass"] + "</td>";
        row +=
          "<td><button onclick='modificar(" +
          element["id"] +
          ")'> Modificar </button> </td>";
        row +=
          "<td><button onclick='eliminar(" +
          element["id"] +
          ")'> Eliminar </button> </td>";
        row += "</tr>";
        tbody.innerHTML += row;
      }
    })
    .catch(error => {
      console.log(error.toString());
    });
}

function crearTarea(e) {
	let tarea = obtenerDatos();
	let token = sessionStorage.getItem("token");
	let options = {};
	options.headers = { token };

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
		axios
		.post("http://localhost:3000/tareas", tarea, options)
		.then(response => {
		console.log(response);
		limpiarDatos();
		get();
		})
		.catch(error => {
		console.log(error);
		});
	}  
}

function cargarDatos(element) {
  document.getElementById("id").value = element.id;
  document.getElementById("nombre").value = element.nombre;
  document.getElementById("descripcion").value = element.descripcion;
  document.getElementById("estado").value = element.estado;
  document.getElementById("fecha").value = new Date(element.fecha);
}

function limpiarDatos() {
  document.getElementById("id").value = "";
  document.getElementById("nombre").value = "";
  document.getElementById("descripcion").value = "";
  document.getElementById("estado").value = "";
  document.getElementById("fecha").value = "";
}

function modificar(id) {
  let usuario = usuariosTemp.find(x => x.id == id);
  cargarDatos(usuario);
}

function eliminar(id) {
  let token = sessionStorage.getItem("token");
  let options = {};
  options.headers = { token };
  axios
    .delete("http://localhost:3000/usuarios/" + id, options)
    .then(response => {
      console.log(response);
      limpiarDatos();
      get();
    })
    .catch(error => {
      console.log(error);
    });
}

function modificarGuardar() {
  let id = document.getElementById("id").value;
  let nuevoUsuario = obtenerDatos();
  let token = sessionStorage.getItem("token");
  let options = {};
  options.headers = { token };
  axios
    .put("http://localhost:3000/usuarios/" + id, nuevoUsuario, options)
    .then(response => {
      console.log(response);
      limpiarDatos();
      get();
    })
    .catch(error => {
      console.log(error);
    });
}

get()
