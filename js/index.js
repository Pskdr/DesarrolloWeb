const express = require("express");
const cors = require("cors");
const app = express();

const rutasPublicas = require("./routes/publicoRouter");
const rutasComentarios = require("./routes/comentariosRouter");
const rutasUsuario = require("./routes/usuariosRouter");
const UsuarioController = require("./controllers/usuariosController");
const usuarioController = new UsuarioController();

// Recibir json por http methods (body-parser)
app.use(express.json());
app.use(cors());

//Rutas públicas
app.use("/", rutasPublicas);

// Middleware
app.use("/", (request, response, next) => {
  try {
    let token = request.headers.token;
    let informacionUsuario = usuarioController.validarToken(token);
    if (token && informacionUsuario) {
      next();
    } else {
      let respuesta = {};
      respuesta.estado = false;
      respuesta.informacion = "";
      respuesta.mensaje = "No autorizado, falta token..";
      response.status(401).send(respuesta);
    }
  } catch (error) {
    let respuesta = {};
    respuesta.estado = false;
    respuesta.informacion = "";
    respuesta.mensaje = "No autorizado, token no valido..";
    response.status(401).send(respuesta);
  }
});

app.use(rutasUsuario);
app.use(rutasComentarios);

//No encontró la ruta solicitada
app.use("/", (request, response) => {
  response.status(404).send("Not Found");
});

const port = 3000;
//Levantar el servidor, parametros (port, callback= funcion)
app.listen(port, () => {
  console.log("El api esta corriendo en el http://localhost:" + port);
});
