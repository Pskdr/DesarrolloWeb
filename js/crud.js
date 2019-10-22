let listaUsuarios = []; 

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
        <div class="wrap">
                    <form action="" class="formulario" name="formulario_registro" method="get">
                        <div>
                        <input type="text" id="nombre"  placeholder="Nombre">
                        <br>
                        <input type="text" id="apellido"  placeholder="apellido">
                        <br>
                        <input type="text" id="correo"  placeholder="correo">
                        <br>
                        <input type="text" id="usuario"  placeholder="usuario">
                        <br>
                        <input type="text" id="pass"  placeholder="contrasena">
                        <br>
                        <input type="text" id="pass2"  placeholder="contrasena2">
                        <br>
                        <input type="submit" id="btn-submit" onclick="agregar()" value="Enviar">
                        <br>
                        <input id="btn-submit" onclick="volver()" type="submit" value="Volver">
                        </div>
                    </form>
                </div>
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
    <input type="text" id="buscarElemento" placeholder="buscar elemento" placeholder="id">
        <button type="submit" id="btn-Editar" onclick="buscadorP("editar")" style="color: blue">Editar</button>
        <button type="submit" id="btn-Eliminar" onclick="buscadorP("eliminar")" style="color: blue">Eliminar</button>
        <br>
         <input id="btn-submit" onclick="volver()" type="submit" value="Volver">	
    </center>
    `;
    document.getElementById("contenedor-formulario").innerHTML = html
}
function buscarExistencia() {
    
}
function buscadorP(params) {

    if(!(contarUsuarios() == 0)){

        if(params == "eliminar"){
            localStorage.
            
            alert("Se ha eliminado correctamente")
        }else{
            
            
            
    
        }
    }else{
        alert("no hay usuarios")
        volver()
    }
    
}
function buscadorUsuario(correo) {
        var usuario
        var contador = 0;
        var index = true;
        while(index){
            try {
                usuario = JSON.parse(localStorage.getItem(`usuario${contador}`))
                contador++
                if(usuario.correo == correo){
                    return contador;
                }
                
            } catch (error) {
                index = false
                return contador-1;
            }
            
        }
        
    
}
function agregar() {
    if(!(document.getElementById("nombre").value == "" || document.getElementById("apellido").value == "" || document.getElementById("usuario").value == "" || document.getElementById("correo").value == "" || document.getElementById("pass").value == "" || document.getElementById("pass2").value == "")){
        if(validarPrevia(document.getElementById("correo").value)){
            if (document.getElementById("pass").value != document.getElementById("pass2").value) {
                alert("las contraseñas no son iguales")
            } else {
                var usuario = {
                    nombre : document.getElementById("nombre").value,
                    apellido : document.getElementById("apellido").value,
                    usuario : document.getElementById("usuario").value,
                    correo : document.getElementById("correo").value,
                    pass : document.getElementById("pass").value
                }
                //guardar en local sotrage 'stringify' es una casteo de objeto a JSON AL REVÉS, SERÍA JSON.parse(elobjetotipojson)
                listaUsuarios.push(usuario)
                localStorage.setItem(`listaUsuarios`,JSON.stringify(listaUsuarios))
            }var usuario = {
                nombre : document.getElementById("nombre").value,
                apellido : document.getElementById("apellido").value,
                usuario : document.getElementById("usuario").value,
                correo : document.getElementById("correo").value,
                pass : document.getElementById("pass").value
            }
            //guardar en local sotrage 'stringify' es una casteo de objeto a JSON AL REVÉS, SERÍA JSON.parse(elobjetotipojson)
            listaUsuarios.push(usuario)
            localStorage.setItem(`listaUsuarios`,JSON.stringify(listaUsuarios))
            

        }else{
            alert("ese correo ya existe pai")
        }

    }else{
        alert("Por favor, llene todos los campos")
    }
            

}
function contarUsuarios() {
    var contador = 0;
    var index = true;
    while(index){
        try {
            localStorage.getItem(`usuario${contador}`)
            contador++
        } catch (error) {
            index = false
            return contador
        }
        
    }
    return contador;
}

function mostrarUsuarios(){
    if(contadorUsuarios() == 0){
        alert("No se encuentran usuarios para mostrar")
    }else{
        var contador =0;
        var usuarios = []
        while(index){
            try {
                usuarios [contador] = json.parse(localStorage.getItem(`usuario${contador}`))
                contador++
            } catch (error) {
                index = false
                return contador
            }
            
        }
    }


}
function validarPrevia(correo) {
    // esto es para verificar que no se repita el correo 
    if(contarUsuarios()==0){
        return true;
    }else{
        var contador =0;
       var index = true;
        while(index){
            try {
                if(json.parse(localStorage.getItem(`usuario${contador}`)).correo == correo){
                    return false
                    
                }
                contador++
            } catch (error) {
                index = false
                return true
            }
            
        }
    }
    
}

