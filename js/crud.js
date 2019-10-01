function editarBoton() {
    
}
function eliminarBoton() {
    
}
function mostrarBoton() {
    var index = true
    var contador = 0;
    var html = ``;
    while(index == true){
        try {
            
            var item = `usuario${contador++}`
            var usuario = localStorage.getItem(item)
             html += `<tr>
            <td> usuario numero ${contador}  </td>
            <td>${usuario}</td>
          </tr>`;
        } catch (error) {
            document.getElementById("contenido-agregar").innerHTML = html;
            console.log(error)
        }
    }
}

function agregarBoton() {
var html = `   
<center>
			

            <input name="txtUsuario" id="txtUsuario" required="required" type="text" placeholder="Usuario">
                <br>
                <input name="txtContrasena" id="txtContrasena" required="required" type="password" placeholder="contraseña">
                <br>
                <input name="txtNombre" id="txtNombre" required="required" type="text" placeholder="Nombre">
                <br>
                <input name="txtCorreo" id="txtCorreo" required="required" type="text" placeholder="Correo">
                <br>
                <div class="input-group radio" style="color:black">
						<input name="sexo" id="hombre" type="radio" value="Hombre">
						<label for="hombre">Hombre</label>
						<input name="sexo" id="mujer" type="radio" value="Mujer">
						<label for="mujer">Mujer</label>
                    </div>
                <br>
                <input id="btn-submit" type="submit" value="Enviar">
                <br>
                <input id="btn-submit" onclick="volver()" type="submit" value="Volver">
                </center>
`;
document.getElementById("contenedor-formulario").innerHTML = html;
}
function volver() {
    var html = `<div class="wrap">
    <form action="" class="formulario" name="formulario_registro" method="get">
        <div>
            
            <input type="submit" id="btn-Agregar" onclick="agregarBoton()" value="Agregar">
            <input type="submit" id="btn-Editar" onclick="buscador()" value="Editar/Eliminar">
            <input type="submit" id="btn-Mostrar" onclick="mostrarBoton()" value="Mostrar">
        </div>
    </form>
</div>`;
    document.getElementById("contenedor-formulario").innerHTML = html
}

function buscador() {
    var html = `
    <center>
    <input type="text" id="buscarElemento" placeholder="buscar elemento" value="elemento">
        <button type="submit" id="btn-Editar" onclick="buscador(editar)" style="color: blue">Editar</button>
        <button type="submit" id="btn-Eliminar" onclick="buscador("eliminar")" style="color: blue">Eliminar</button>
        <br>
         <input id="btn-submit" onclick="volver()" type="submit" value="Volver">	
    </center>
    `;
    document.getElementById("contenedor-formulario").innerHTML = html
}
function buscador(params) {
    if(params == "eliminar"){
        alert("Se ha eliminado correctamente")
    }else{
        try {
            var usuario = localStorage.getItem(document.getElementById("buscarElemento").value)
        } catch (error) {
            volver();
            alert("ingrese un usuario correcto")
        }
        
        

    }
}
function agregar() {
    

    
}