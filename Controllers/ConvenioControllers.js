const { Client } = require("pg");

/**
 * Controlador para los requisitos
 */
class Requisito {
  constructor() {
    this.miDb = new Client({
      user: "postgres",
      host: "localhost",
      database: "Convenio",
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

  async obtenerRequisito() {
    let query = "SELECT * FROM requisito";
    let respuesta = await this.miDb.query(query);
    return respuesta.rows;
  }

  async agregarRequisito(requisito) {
    let query = `INSERT INTO public.requisito(
             id,nombre, descripcion, convenios, json)
            VALUES ('${requisito.nombre}', '${requisito.descripcion}', '${
      requisito.id
    }', 
                ${requisito.convenio}, '${JSON.stringify(requisito)}');`;
    let respuesta = await this.miDb.query(query);
    return respuesta;
  }

  async modificarRequisito(id, requisito) {
    let query = `UPDATE public.requisito
        SET  nombre='${requisito.nombre}', descripcion='${
      requisito.descripcion
    }', id='${requisito.id}',
         convenio=${requisito.convenio}, json='${JSON.stringify(requisito)}'
        WHERE id=${id}`;
    let respuesta = await this.miDb.query(query);
    return respuesta;
  }

  /**
   *
   * @param {*} id
   */
  async eliminarRequisito(id) {
    let query = `DELETE FROM requisitos WHERE id=${id}`;
    let respuesta = await this.miDb.query(query);
    return respuesta;
  }
}

module.exports = Requisito;