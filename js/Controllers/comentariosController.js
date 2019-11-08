const DatabaseController = require("./databaseController");
/**
 * Controlador para los comentarios
 */
class Comentario {
    constructor() {
      this.dbController = new DatabaseController();
    }
  
    async obtenerComentario() {
      let query = "SELECT * FROM comentario";
      let respuesta = await this.miDb.query(query);
      return respuesta.rows;
    }
  
    async agregarComentario(comentario) {
      let query = `INSERT INTO comentario(nombre, apellido, correo, mensaje, json)
              VALUES ('${comentario.nombre}', '${comentario.apellido}', '${comentario.correo}', 
                  ${comentario.mensaje}, '${JSON.stringify(comentario)}');`;
      let respuesta = await this.miDb.query(query);
      return respuesta;
    }
  
    
    /**
     *
     * @param {*} id identificador del mensaje a modificar
     * @param {*} comentario el comentario completo a modificar 
     */
    async modificarComentario(id, comentario) {
      let query = `UPDATE comentario SET nombre='${comentario.nombre}', apellido='${comentario.apellido}',
       correo=${comentario.correo}, mensaje=${comentario.mensaje},json='${JSON.stringify(comentario)}'
       WHERE id=${id}`;
      let respuesta = await this.miDb.query(query);
      return respuesta;
    }
  
    /**
     *
     * @param {*} id identificador del mensaje a eliminar
     */
    async eliminarComentario(id) {
      let query = `DELETE FROM comentario WHERE id=${id}`;
      let respuesta = await this.miDb.query(query);
      return respuesta;
    }
  }
  
  module.exports = Comentario;