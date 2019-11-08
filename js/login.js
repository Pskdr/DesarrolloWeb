function login() {
  let url = "http://localhost:3000/login/";
  let usuario = document.getElementById("usuario").value;
  let password = document.getElementById("clave").value;
  let body = { usuario, password };
  axios.post(url, body).then(response => {
    let data = response.data;
    if (data.estado == true) {
      let informacion = data.informacion;
      sessionStorage.setItem("token", informacion);
      window.location = "tareas.html";
    }
  });
}
