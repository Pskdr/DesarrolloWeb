/**
 * Validar token
 */
function validarToken() {
  let token = sessionStorage.getItem("token");
  let options = {};
  options.headers = { token };
  axios
    .get("http://localhost:3000/validar-token/", options)
    .then(response => {
      let data = response.data;
    })
    .catch(error => {
      window.location = "index.html";
    });
}

function salir() {
  sessionStorage.removeItem("token");
  window.location = "index.html";
}

validarToken();
