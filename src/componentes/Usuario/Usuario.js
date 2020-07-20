import React from "react";
import { USUARIO_ACTUAL } from "../../queries";
import { useQuery } from "@apollo/react-hooks";
import { Link } from "react-router-dom";

function Usuario() {
  const { startPolling, stopPolling, loading, data } = useQuery(USUARIO_ACTUAL);

  React.useEffect(() => {
    startPolling(500);
    return () => stopPolling();
  }, [startPolling, stopPolling]);
  if (loading) return "Cargando...";
  return (
    <div className="ml-5">
      <div className="row">
        <div className="col-9">
          <h2>Configuración de Administrador</h2>
          <div className="row">
            <div className="col d-flex justify-content-center">
              <Link
                to={{
                  pathname: "/dashboard/editar-usuario",
                  state: data && data.obtenerUsuario,
                }}
                className="btn btn-outline-warning"
              >
                Actualizar Información
              </Link>
            </div>
          </div>
          <div className="row container mt-5">
            <div className="col">
              <h5>
                Nombre:{" "}
                <span className="font-weight-light">
                  {data.obtenerUsuario.nombre}
                </span>
              </h5>
              <h5>
                Usuario:{" "}
                <span className="font-weight-light">
                  {" "}
                  {data.obtenerUsuario.usuario}
                </span>
              </h5>
              <h5>
                Contraseña:{" "}
                <span className="font-weight-light"> *******************</span>
              </h5>
              {data.obtenerUsuario.correo ? (
                <h5>
                  Correo Institucional{" "}
                  <span className="font-weight-light">
                    {" "}
                    {data.obtenerUsuario.correo}
                  </span>
                </h5>
              ) : (
                <h5>
                  Correo: <br />
                  <span className="font-weight-light font-italic text-justify">
                    Puedes Editar la información de usuario para agregar un{" "}
                    <br />
                    correo de recuperación de cuenta
                  </span>
                </h5>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Usuario;
