const express = require("express");
const router = express.Router();
const UsuariosController = require("../controllers/usuariosController");
const miUsuario = new UsuariosController();

router.get("/validar-token/", (request, response) => {
  try {
    let token = request.headers.token;

    let respuesta = {};
    respuesta.estado = true;
    respuesta.informacion = miUsuario.validarToken(token);
    respuesta.mensaje = "Token verificado";
    response.status(200).send(respuesta);
  } catch (error) {
    let respuesta = {};
    respuesta.estado = false;
    respuesta.informacion = error;
    respuesta.mensaje = "Token NO verificado";
    response.status(401).send(respuesta);
  }
});

router.get("/usuarios/", (request, response) => {
  miUsuario
    .obtenerUsuarios()
    .then(filas => {
      let respuesta = {};
      respuesta.estado = true;
      respuesta.informacion = filas;
      respuesta.mensaje = "Usuarios consultadas";
      response.status(200).send(respuesta);
    })
    .catch(error => {
      let respuesta = {};
      respuesta.estado = false;
      respuesta.informacion = error;
      respuesta.mensaje = "Error al consultar";
      response.status(400).send(respuesta);
    });
});

router.post("/usuarios/", (request, response) => {
  let usuario = request.body;
  miUsuario
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

router.delete("/usuarios/:id", (request, response) => {
  let id = request.params.id;
  miUsuario
    .eliminarUsuario(id)
    .then(() => {
      let respuesta = {};
      respuesta.estado = true;
      respuesta.informacion = {};
      respuesta.mensaje = "El usuario ha sido eliminado";
      response.status(200).send(respuesta);
    })
    .catch(error => {
      let respuesta = {};
      respuesta.estado = false;
      respuesta.informacion = {};
      respuesta.mensaje = "El usuario NO ha sido eliminado";
      response.status(400).send(respuesta);
    });
});

router.put("/usuarios/:id", (request, response) => {
  let id = request.params.id;
  let usuario = request.body;
  miUsuario
    .modificarUsuario(id, usuario)
    .then(function() {
      let respuesta = {};
      respuesta.estado = true;
      respuesta.informacion = {};
      respuesta.mensaje = "El usuario ha sido modificado";
      response.status(200).send(respuesta);
    })
    .catch(error => {
      let respuesta = {};
      respuesta.estado = false;
      respuesta.informacion = {};
      respuesta.mensaje = "El usuario NO ha sido modificado";
      response.status(400).send(respuesta);
    });
});

module.exports = router;
