const express = require("express");
const router = express.Router();

const RequisitoController = require("../Controllers/ConvenioControllers.js/index.js");
const misRequisitos = new RequisitoController();

// ENRUTADO DE TAREAS
router.get("/requisito/", (request, response) => {
  misRequisitos
    .obtenerRequisito()
    .then(filas => {
      let respuesta = {};
      respuesta.estado = true;
      respuesta.informacion = filas;
      respuesta.mensaje = "convenios consultadas";
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

router.post("/requisito/", (request, response) => {
  let requisito = request.body;
  misRequisitos
    .agregarRequisito(requisito)
    .then(() => {
      let respuesta = {};
      respuesta.estado = true;
      respuesta.informacion = tarea;
      respuesta.mensaje = "Los requisitos han sido agregados";
      response.status(200).send(respuesta);
    })
    .catch(error => {
      console.log(error);

      let respuesta = {};
      respuesta.estado = false;
      respuesta.informacion = error;
      respuesta.mensaje = "La requisitos NO han sido agregados";
      response.status(400).send(respuesta);
    });
});

router.delete("/requisito/:id", (request, response) => {
  let id = request.params.id;
  misRequisitos
    .eliminarRequisito(id)
    .then(() => {
      let respuesta = {};
      respuesta.estado = true;
      respuesta.informacion = {};
      respuesta.mensaje = "Los requisitos han sido eliminados";
      response.status(200).send(respuesta);
    })
    .catch(error => {
      let respuesta = {};
      respuesta.estado = false;
      respuesta.informacion = {};
      respuesta.mensaje = "Los requisitos NO han sido eliminados";
      response.status(400).send(respuesta);
    });
});

router.put("/requisitos/:id", (request, response) => {
  let id = request.params.id;
  let requisito = request.body;
  misRequisitos
    .modificarRequisito(id, requisito)
    .then(function() {
      let respuesta = {};
      respuesta.estado = true;
      respuesta.informacion = {};
      respuesta.mensaje = "Los requisitos han sido modificados";
      response.status(200).send(respuesta);
    })
    .catch(error => {
      console.log(error);
      let respuesta = {};
      respuesta.estado = false;
      respuesta.informacion = {};
      respuesta.mensaje = "Los requisitos NO han sido modificados";
      response.status(400).send(respuesta);
    });
});

module.exports = router;