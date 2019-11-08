const { Client } = require("pg");
const config = require("../config/main.config");
/**
 * Controlador para conectarse con la base de datos, aplicando patron SINGLETON
 */
class DatabaseController {
  constructor() {
    if (DatabaseController.instance) {
      return DatabaseController.instance;
    }

    this.miDb = new Client({
      user: config.USER_DB,
      host: config.HOST_DB,
      database: config.DATABASE,
      password: config.PASSWORD_DB,
      port: config.PORT_DB
    });
    this.conectarDB();
    DatabaseController.instance = this;
    return this;
  }

  getInstance() {
    return DatabaseController.instance;
  }

  conectarDB() {
    this.miDb
      .connect()
      .then(() => {
        console.log("Se ha conectado con la base de datos");
      })
      .catch(error => {
        console.log(error);

        console.log("ERROR al conectar con la base de datos");
      });
  }

  async ejecutarSql(query) {
    let respuesta = await this.miDb.query(query);
    return respuesta;
  }
}

module.exports = DatabaseController;
