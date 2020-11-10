import React from "react";
import Olvidar from "../materiales/olvidarPassword.svg";
import { useMutation } from "@apollo/react-hooks";
import { RECUPERAR_PASSWORD } from "../../mutation";
import Spinner from "../Spinner";
import { Link } from "react-router-dom";

function Recuperar() {
  document.title = "Recuperar Contraseña";
  const [correo, guardarCorreo] = React.useState("");
  const [recuperarPassword, { loading, data }] = useMutation(
    RECUPERAR_PASSWORD
  );
  const [error, guardarError] = React.useState(null);
  const enviarEmailFuncion = async (e) => {
    e.preventDefault();
    if (!correo) return;
    try {
      await recuperarPassword({
        variables: {
          correo,
        },
      });
    } catch (error) {
      guardarError(error.message.replace("GraphQL error:", ""));
    }
    guardarCorreo("");
  };

  return (
    <div className="abs-center row" style={{ backgroundColor: "#869cbf" }}>
      <div className="col d-flex justify-content-center">
        <form
          onSubmit={(e) => enviarEmailFuncion(e)}
          className="d-flex flex-column ml-5"
        >
          <p
            className="font-weight-light text-white"
            style={{ fontSize: "20px" }}
          >
            Para recuperar tu contraseña, Ingresa tu correo de registro.
          </p>
          <input
            value={correo}
            onChange={(e) => guardarCorreo(e.target.value)}
            className="form-control"
            type="email"
            placeholder="Correo electrónico"
          />
          <button className="mt-2 btn btn-outline-primary text-white">
            <i className="pi pi-envelope mr-2" />
            Enviar solicitud
          </button>
          <div className="d-flex flex-column">
            {loading && <Spinner />}
            {data && (
              <h6 className="mt-5 text-center">{data.recuperarPassword}</h6>
            )}
            {data && (
              <Link
                className="btn btn-success text-white mt-4 text-uppercase"
                to="/"
              >
                Inicia Sesión
              </Link>
            )}
            {error && <h4 className="mt-5 text-danger">X {error}</h4>}
          </div>
        </form>
      </div>
      <img src={Olvidar} className="col" alt="¿olvidaste tu contraseña?" />
    </div>
  );
}

export default Recuperar;
