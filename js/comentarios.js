// Recorrer los elementos y hacer que onchange ejecute una funcion para comprobar el valor de ese input

    // formulario y elementos del formulario
   var formulario = document.formulario_registro,
       elementos = formulario.elements;
   // lista global de comentarios
   let comentarios = [];
   
   // Funcion que se ejecuta cuando el evento click es activado
   function validarInputs (){
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


// --- Eventos ---
formulario.addEventListener("submit", enviar);

//CRUD
let comentariosTemp = [];

function crearComentario(e) {
	let comentario = obtenerDatos();
	let token = sessionStorage.getItem("token");
	let options = {};
    options.headers = { token };
    
    if (!validarInputs()) {
        console.log('Falto validar los Input');
        e.preventDefault();
    }else {
        console.log('Envia');
        e.preventDefault();
        axios
		.post("http://localhost:3000/comentarios", comentario, options)
		.then(response => {
		console.log(response);
		limpiarDatos();
		get();
		})
		.catch(error => {
		console.log(error);
		});
        console.log(comentarios);
    }
}

function cargarDatos(element) {
  document.getElementById("nombre").value = element.nombre;
  document.getElementById('apellido').value = element.apellido;
  document.getElementById('correo').value = element.correo;
  document.getElementById('mensaje').value = element.mensaje;
}

function limpiarDatos() {
  document.getElementById("nombre").value = "";
  document.getElementById('apellido').value = "";
  document.getElementById('mensaje').value = "";
  document.getElementById('correo').value = "";
}

function modificar(id) {
let comentario = comentariosTemp.find(x => x.id == id);
cargarDatos(comentario);
}

function eliminar(id) {
let token = sessionStorage.getItem("token");
let options = {};
options.headers = { token };
axios
  .delete("http://localhost:3000/comentarios/" + id, options)
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
let nuevoComentario= obtenerDatos();
let token = sessionStorage.getItem("token");
let options = {};
options.headers = { token };
axios
  .put("http://localhost:3000/comentarios/" + id, nuevoComentario, options)
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