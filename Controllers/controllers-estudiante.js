const jwt = require('jsonwebtoken')

class User {
    constructor() {
        this.miDb = new Client({
          user: "postgres",
          host: "localhost",
          database: "User",
          password: "admin",
          port: 1233
        });
        this.conexion()
          .then(() => {
            console.log("Conectado");
          })
          .catch(error => {
            console.log("ERROR al conectar con la base de datos");
          });
      }
    
    async conexion() {
        await this.miDb.connect();
    }
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