const express = require("express");
const router = express.Router();

const UsuarioController = require("../controllers/usuariosController");
const usuarioController = new UsuarioController();

router.get("/index/", (request, response) => {
    response.status(200).send("");
});

router.get("/convenios/", (request, response) => {
    response.status(200).send("");
});

router.get("/documentos/", (request, response) => {
    response.status(200).send("");
});

router.get("/videos/", (request, response) => {
    response.status(200).send("");
});

router.post("/login/", (request, response) => {
    let body = request.body;
    let respuesta = {};
    usuarioController
      .login(body)
      .then(usuario => {
        let miToken = usuarioController.crearToken(usuario);
        respuesta.estado = true;
        respuesta.informacion = miToken;
        respuesta.mensaje = "Usuario identificado.";
        response.status(200).send(respuesta);
      })
      .catch(error => {
        console.log(error);
  
        respuesta.estado = false;
        respuesta.informacion = error;
        respuesta.mensaje = "Error al consultar el usuario";
        response.status(400).send(respuesta);
      });
  });

router.post("/registro/", (request, response) => {
    let usuario = request.body;
    usuarioController
      .agregarUsuario(usuario)
      .then(() => {
        let respuesta = {};
        respuesta.estado = true;
        respuesta.informacion = usuario;
        respuesta.mensaje = "El usuario ha sido agregado";
        response.status(200).send(respuesta);
      })
      .catch(error => {
        let respuesta = {};
        respuesta.estado = false;
        respuesta.informacion = error;
        respuesta.mensaje = "El usuario NO ha sido agregado";
        response.status(400).send(respuesta);
      });
  });


router.get('/valid/',(request, response)=>{
    try {
        let body = request.body
        let token=body.token
        let miUsuario = new User()
        let respuesta = {}
        respuesta.estado = true
        respuesta.informacion = miUsuario.validarToken(token)
       respuesta.mensaje="Token verificado"
        response.status(200).send(respuesta)
    } catch (error) {
        let respuesta = {}
        respuesta.estado = false
        respuesta.informacion = error
       respuesta.mensaje="Token NO verificado"
        response.status(400).send(respuesta)
    }

})

module.exports = router