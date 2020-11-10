import React from "react";
import { USUARIO_ACTUAL } from "../../queries";
import { useQuery } from "@apollo/react-hooks";
import { Link } from "react-router-dom";
import Error from "../Alertas/Error";
import Exito from "../Alertas/Exito";
import Usuarios from "./Usuarios";

function Usuario() {
  const { startPolling, stopPolling, loading, data } = useQuery(
    USUARIO_ACTUAL,
    { fetchPolicy: "no-cache" }
  );

  React.useEffect(() => {
    startPolling(500);
    return () => stopPolling();
  }, [startPolling, stopPolling]);

  if (loading) return "Cargando...";

  return (
    <div className="ml-3">
      <div className="row">
        <div className="col-9">
          <h2>Configuración de Usuarios</h2>
          <div className="row">
            <div className="col d-flex justify-content-end mr-4">
              {data.obtenerUsuario.rol === "ADMINISTRADOR" ? (
                <Link
                  to="/dashboard/crear-usuario"
                  className="btn btn-outline-primary mr-2"
                >
                  <i className="pi pi-plus" />
                  Nuevo Usuario
                </Link>
              ) : (
                <Link
                  to={{
                    pathname: "/dashboard/editar-usuario",
                    state: {
                      usuario: data?.obtenerUsuario,
                      idAdmin:
                        data?.obtenerUsuario?.usuario?.rol === "ADMINISTRADOR"
                          ? data?.obtenerUsuario.id
                          : null,
                    },
                  }}
                  className="btn btn-outline-warning mr-2"
                >
                  <li className="pi pi-pencil" />
                  Actualizar datos
                </Link>
              )}
            </div>
          </div>
          <div className="row container mt-2">
            <div className="col">
              <h5>
                Nombre:{" "}
                <span className="font-weight-light">
                  {data && data.obtenerUsuario.nombre}
                </span>
              </h5>
              <h5>
                Usuario:{" "}
                <span className="font-weight-light">
                  {" "}
                  {data && data.obtenerUsuario.rol}
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
          <div className="row">
            {data && data.obtenerUsuario.rol === "ADMINISTRADOR" ? (
              <Usuarios id={data?.obtenerUsuario.id} />
            ) : null}
          </div>
        </div>
        <div className="col-3">
          <Exito />
          <Error />
        </div>
      </div>
    </div>
  );
}

export default Usuario;
