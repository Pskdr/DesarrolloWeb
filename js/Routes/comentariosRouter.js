const express = require("express");
const router = express.Router();

const ComentariosController = require("../controllers/Controller");
const Comentarios1 = new ComentariosController();

// ENRUTADO DE TAREAS
router.get("/comentarios/", (request, response) => {
    Comentarios1
    .obtenerComentario()
    .then(filas => {
      let respuesta = {};
      respuesta.estado = true;
      respuesta.informacion = filas;
      respuesta.mensaje = "Comentarios consultados";
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

router.post("/comentarios/", (request, response) => {
  let comentario = request.body;
  Comentarios1
    .agregarComentario(comentario)
    .then(() => {
      let respuesta = {};
      respuesta.estado = true;
      respuesta.informacion = comentario;
      respuesta.mensaje = "El comentario ha sido agregado";
      response.status(200).send(respuesta);
    })
    .catch(error => {
      console.log(error);

      let respuesta = {};
      respuesta.estado = false;
      respuesta.informacion = error;
      respuesta.mensaje = "El comentario NO ha sido agregado";
      response.status(400).send(respuesta);
    });
});

router.delete("/comentarios/:id", (request, response) => {
  let id = request.params.id;
  Comentarios1
    .eliminarComentario(id)
    .then(() => {
      let respuesta = {};
      respuesta.estado = true;
      respuesta.informacion = {};
      respuesta.mensaje = "El comentario ha sido eliminado";
      response.status(200).send(respuesta);
    })
    .catch(error => {
      let respuesta = {};
      respuesta.estado = false;
      respuesta.informacion = {};
      respuesta.mensaje = "El comentario NO ha sido eliminado";
      response.status(400).send(respuesta);
    });
});

router.put("/comentarios/:id", (request, response) => {
  let id = request.params.id;
  let comentario = request.body;
  Comentarios1
    .modificarComentario(id, comentario)
    .then(function() {
      let respuesta = {};
      respuesta.estado = true;
      respuesta.informacion = {};
      respuesta.mensaje = "El comentario ha sido modificado";
      response.status(200).send(respuesta);
    })
    .catch(error => {
      console.log(error);
      let respuesta = {};
      respuesta.estado = false;
      respuesta.informacion = {};
      respuesta.mensaje = "El comentario NO ha sido modificado";
      response.status(400).send(respuesta);
    });
});

module.exports = router;