const { Client } = require("pg");

/**
 * Controlador para los Convenios
 */
class Convenio {
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

  async obtenerConvenio() {
    let query = "SELECT * FROM Convenio";
    let respuesta = await this.miDb.query(query);
    return respuesta.rows;
  }

  async agregarConvenio(Convenio) {
    let query = `INSERT INTO public.Convenio(
             id,nombre, descripcion, convenios, json)
            VALUES ('${Convenio.nombre}', '${Convenio.descripcion}', '${
      Convenio.id
    }', 
                ${Convenio.convenio}, '${JSON.stringify(Convenio)}');`;
    let respuesta = await this.miDb.query(query);
    return respuesta;
  }

  async modificarConvenio(id, Convenio) {
    let query = `UPDATE public.Convenio
        SET  nombre='${Convenio.nombre}', descripcion='${
      Convenio.descripcion
    }', id='${Convenio.id}',
         convenio=${Convenio.convenio}, json='${JSON.stringify(Convenio)}'
        WHERE id=${id}`;
    let respuesta = await this.miDb.query(query);
    return respuesta;
  }

  /**
   *
   * @param {*} id
   */
  async eliminarConvenio(id) {
    let query = `DELETE FROM Convenios WHERE id=${id}`;
    let respuesta = await this.miDb.query(query);
    return respuesta;
  }
}

module.exports = Convenio;