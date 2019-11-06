const express = require("express");
const router = express.Router();
const User = require('../controllers/controller-estudiante')

router.post('/login/', (request, response) => {
    let body = request.body
    console.log(body);
    
    let miUsuario = new User()
    let existe = miUsuario.consultarSiExisteUsuario(body)
    let respuesta = {}
    respuesta.estado = false
    respuesta.informacion = {}
    if (existe) {
        let token=miUsuario.crearToken(body)
        respuesta.informacion.token=token
        respuesta.mensaje = "El usuario existe"
    } else {
        respuesta.mensaje = "El usuario NO existe"
    }
    response.status(200).send(respuesta)
})

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