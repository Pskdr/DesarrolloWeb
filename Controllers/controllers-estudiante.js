const jwt = require('jsonwebtoken')

class User {

    consultarSiExisteUsuario(informacion) {
        let usuario = informacion.usuario
        let password = informacion.password
        return usuario == "001" && password == "Admin345"
    }

    crearToken(informacion) {
        let options={expiresIn:30}
        return jwt.sign(informacion, "MIcLAVESecreta8965",options)
    }

    validarToken(token) {
        return jwt.verify(token, "MIcLAVESecreta8965")
    }


}

module.exports = User