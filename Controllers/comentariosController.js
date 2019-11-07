/**
 * Controlador para los comentarios
 */
class Comentario {
    constructor() {
      this.miDb = new Comentario({
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
  
    async obtenerComentario() {
      let query = "SELECT * FROM comentario";
      let respuesta = await this.miDb.query(query);
      return respuesta.rows;
    }
  
    async agregarComentario(comentario) {
      let query = `INSERT INTO comentario(nombre, apellido, correo, mensaje, json)
              VALUES ('${comentario.nombre}', '${comentario.apellido}', '${comentario.correo}', 
                  ${requisito.mensaje}, '${JSON.stringify(comentario)}');`;
      let respuesta = await this.miDb.query(query);
      return respuesta;
    }
  
    
    /**
     *
     * @param {*} id identificador del mensaje a modificar
     * @param {*} comentario el comentario completo a modificar 
     */
    async modificarComentario(id, comentario) {
      let query = `UPDATE comentario SET nombre='${comentario.nombre}', descripcion='${comentario.descripcion}',
       id='${comentario.id}', convenio=${comentario.convenio}, json='${JSON.stringify(comentario)}'
       WHERE id=${id}`;
      let respuesta = await this.miDb.query(query);
      return respuesta;
    }
  
    /**
     *
     * @param {*} id identificador del mensaje a eliminar
     */
    async eliminarRequisito(id) {
      let query = `DELETE FROM comentario WHERE id=${id}`;
      let respuesta = await this.miDb.query(query);
      return respuesta;
    }
  }
  
  module.exports = Comentario;