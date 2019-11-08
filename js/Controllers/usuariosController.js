const jwt = require("jsonwebtoken");
const DatabaseController = require("./databaseController");
const config = require("../config/main.config");
class User {
  constructor() {
    this.dbController = new DatabaseController();
  }

  async login(informacion) {
    let usuario = informacion.usuario;
    let password = informacion.password;

    let query = `SELECT * FROM usuarios where nombre_usuario='${usuario}' and clave=md5('${password}')`;
    let respuesta = await this.dbController.ejecutarSql(query);

    return respuesta.rows[0];
  }

  // consultarSiExisteUsuario(informacion) {
  //   let usuario = informacion.usuario
  //   let password = informacion.password
  //   return usuario == "001" && password == "Admin345"
  // }

  crearToken(informacion) {
    let options = { expiresIn: 30 };
    return jwt.sign(informacion, config.SECRET_KEY, options);
  }

  validarToken(token) {
    return jwt.verify(token, config.SECRET_KEY);
  }

  async obtenerUsuarios() {
    let query = "SELECT * FROM usuarios";
    let respuesta = await this.dbController.ejecutarSql(query);
    return respuesta.rows;
  }

  async agregarUsuario(usuario) {
    let query = `INSERT INTO public.usuarios(
        id, nombre, apellidos, nombre_usuario, clave, email, sexo)
        VALUES ('${usuario.id}', '${usuario.nombre}', '${usuario.apellidos}', '${usuario.nombre_usuario}', md5('${usuario.clave}'), '${usuario.email}', '${usuario.sexo}')`;
    let respuesta = await this.dbController.ejecutarSql(query);
    return respuesta;
  }

  async modificarUsuario(id, usuario) {
    let query = `UPDATE public.usuarios
  SET  nombre='${usuario.nombre}', apellidos='${usuario.apellidos}',  email='${usuario.email}', nombre_usuario='${usuario.nombre_usuario}',
  clave='${usuario.clave}'
	WHERE id='${usuario.id}'`;
    let respuesta = await this.dbController.ejecutarSql(query);
    return respuesta;
  }

  /**
   *
   * @param {*} id
   */
  async eliminarUsuario(id) {
    let query = `DELETE FROM usuarios WHERE id='${id}'`;
    let respuesta = await this.dbController.ejecutarSql(query);
    return respuesta;
  }
}

module.exports = User;
