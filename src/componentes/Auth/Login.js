import React, { useState } from "react";
import { AUTENTICAR_USUARIO } from "../../mutation/index";
import { useMutation } from "@apollo/react-hooks";
import Spinner from "../Spinner";
import { withRouter } from "react-router-dom";
import "../css/FormularioLogin.css";
import { Link } from "react-router-dom";
import Error, { mostrarError } from "../Alertas/Error";
import Autenticado from "./Autenticado";
import LoginImagen from "../materiales/loginImagen.svg";

const URL = "http://190.15.129.83:5000/login";

function Login(props) {
  const headers = (token) => {
    const options = {
      method: "post",
      credentials: "same-origin",
      headers: {
        "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
      },
      body: `token=${token}`,
    };

    fetch(URL, options)
      .then((response) => {
        if (!response.ok) {
          if (response.status === 404) {
            alert("Email not found, please retry");
          }
          if (response.status === 401) {
            alert("Email and password do not match, please retry");
          }
        }
        return response;
      })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          document.cookie = "signedin=true";
          return props.history.push("/dashboard");
        }
      });
  };
  const [type, setType] = useState("password");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [usuarioAutenticar, { loading }] = useMutation(AUTENTICAR_USUARIO, {
    variables: { email, password },
    onError: (error) => {
      const fin = error.message.length;
      const err = error.message.substr(14, fin);
      mostrarError(err);
    },
    onCompleted: (data) => {
      const token = data.autenticarUsuario.token;
      localStorage.setItem("th-token", token);
      headers(token);
      setEmail("");
      setPassword("");
      window.location.reload();
    },
  });
  if (loading) return <Spinner />;

  const validarFormulario = () => {
    const noValido = !email || !password;
    return noValido;
  };

  const iniciarSesion = async (e, usuarioAutenticar) => {
    e.preventDefault();
    Autenticado.inicioSesion();
    usuarioAutenticar();
  };

  function showPassword() {
    if (type === "password") {
      return setType("text");
    } else {
      setType("password");
    }
  }

  return (
    <div>
      <div className="abs-center" style={{ backgroundColor: "#869cbf" }}>
        <form
          onSubmit={(e) => iniciarSesion(e, usuarioAutenticar)}
          className="p-3 form"
        >
          <img
            src={LoginImagen}
            alt="login-secure"
            width="400px"
            height="220px"
          />
          <Error />
          <div className="form-group">
            <label
              htmlFor="email"
              className="font-weight-bold text-white"
              style={{ fontSize: "20px" }}
            >
              Correo Electrónico
            </label>
            <input
              type="email"
              name="usuario"
              value={email}
              className="form-control"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label
              htmlFor="password"
              className="font-weight-bold text-white"
              style={{ fontSize: "20px" }}
            >
              Contraseña
            </label>
            <div className="input-group">
              <input
                type={type}
                name="password"
                value={password}
                className="form-control"
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="input-group-append">
                <i
                  className={`input-group-text pi ${
                    type === "password" ? "pi-eye" : "pi-eye-slash"
                  }`}
                  style={{
                    backgroundColor: "#ffffff",
                    cursor: "pointer",
                    fontSize: 24,
                    color: "#869CBF",
                  }}
                  onClick={showPassword}
                ></i>
              </div>
            </div>
          </div>
          <Link to="/recuperar" className="text-white">
            ¿Has olvidado tu contraseña?
          </Link>
          <button
            type="submit"
            className="btn btn-primary float-right font-weight-bold text-white"
            disabled={loading || validarFormulario()}
          >
            <i className="pi pi-id-card mr-2" />
            Ingresar
          </button>
        </form>
      </div>
    </div>
  );
}

export default withRouter(Login);
