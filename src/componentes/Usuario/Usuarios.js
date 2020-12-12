import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { USUARIOS } from "../../queries";
import { CAMBIAR_ROL_USUARIO } from "../../mutation";
import { ELIMINAR_USUARIO } from "../../mutation";
import Spinner from "../Spinner";
import { ScrollPanel } from "primereact/scrollpanel";
import { mostrarExito } from "../Alertas/Exito";
import { VERIFICAR_PASSWORD } from "../../mutation";
import Noty from "noty";
import { mostrarError } from "../Alertas/Error";

function Usuarios({ id }) {
  const [verificarPassword] = useMutation(VERIFICAR_PASSWORD);
  const { loading, data, startPolling, stopPolling } = useQuery(USUARIOS);
  const [cambiarRolUsuario, { loading: loadingRol }] = useMutation(
    CAMBIAR_ROL_USUARIO
  );
  const [eliminarUsuario, { loading: loadingEliminar }] = useMutation(
    ELIMINAR_USUARIO
  );
  useEffect(() => {
    startPolling(500);
    return () => stopPolling();
  }, [startPolling, stopPolling]);

  if (loading) return <Spinner />;

  return (
    <div className="container mt-3">
      <h4 className="text-center">Usuarios Creados</h4>
      <ScrollPanel style={{ width: "100%", height: "500px" }}>
        <table className="table table-hover">
          <thead className="thead-dark text-center">
            <tr>
              <th scope="col">Nombre</th>
              <th scope="col">Rol de Usuario</th>
              <th scope="col">Correo</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {data.obtenerUsuarios.map((usuario) => (
              <tr key={usuario.id}>
                <td>{usuario.nombre}</td>
                <td>
                  {loadingRol ? (
                    <p style={{ color: "green" }}>Cambiando...</p>
                  ) : (
                    <>
                      {usuario.rol === "ADMINISTRADOR" ? (
                        usuario.rol
                      ) : (
                        <select
                          className="form-control"
                          value={usuario.rol}
                          onChange={async (e) => {
                            let event = e.target.value;
                            try {
                              await new Promise((resolve, reject) => {
                                let noti = new Noty({
                                  type: "info",
                                  layout: "center",
                                  text:
                                    "<div><h6>Ingresa tu contraseña</h6> <br /><input id='rolChange' className='ml-5 form-control' type='password' placeHolder='Contraseña' /></div>",
                                  theme: "mint",
                                  timeout: false,
                                  modal: true,
                                  closeWith: ["button"],
                                  animation: {
                                    open: "animated bounceInDown",
                                    close: "animated bounceOutUp",
                                  },
                                  buttons: [
                                    Noty.button(
                                      "Aceptar",
                                      "btn btn-noti",
                                      async () => {
                                        const password = document.getElementById(
                                          "rolChange"
                                        ).value;

                                        const {
                                          data,
                                        } = await verificarPassword({
                                          variables: { id, password },
                                        });

                                        if (data?.verificarPassword) {
                                          const {
                                            data,
                                          } = await cambiarRolUsuario({
                                            variables: {
                                              id: usuario.id,
                                              rol: event,
                                            },
                                          });

                                          mostrarExito(data.cambiarRolUsuario);
                                          return resolve(noti.close());
                                        } else {
                                          noti.close();
                                          mostrarError("Contraseña Incorrecta");
                                        }
                                      }
                                    ),

                                    Noty.button(
                                      "Cancelar",
                                      "btn btn-error btn-noti-no",
                                      function () {
                                        noti.close();
                                        throw reject("Cancelado");
                                      }
                                    ),
                                  ],
                                }).show();
                              });
                            } catch (error) {
                              console.log(error);
                            }
                          }}
                        >
                          <option value="PRIMARIO">PRIMARIO</option>
                          <option value="SECUNDARIO">SECUNDARIO</option>
                        </select>
                      )}
                    </>
                  )}
                </td>
                <td>{usuario.correo}</td>
                <td>
                  <Link
                    to={{
                      pathname: "/dashboard/editar-usuario",
                      state: { usuario, id },
                    }}
                    className="btn btn-outline-warning mr-2"
                  >
                    <li className="pi pi-pencil" />
                  </Link>
                  <button
                    className="btn btn-outline-danger"
                    disabled={usuario.rol === "ADMINISTRADOR" ? true : false}
                    onClick={async () => {
                      try {
                        await new Promise((resolve, reject) => {
                          let noti = new Noty({
                            type: "info",
                            layout: "center",
                            text:
                              "<div><h6>Ingresa tu contraseña</h6> <br /><input id='rolChange' className='ml-5 form-control' type='password' placeHolder='Contraseña' /></div>",
                            theme: "mint",
                            timeout: false,
                            modal: true,
                            closeWith: ["button"],
                            animation: {
                              open: "animated bounceInDown",
                              close: "animated bounceOutUp",
                            },
                            buttons: [
                              Noty.button(
                                "Aceptar",
                                "btn btn-noti",
                                async () => {
                                  const password = document.getElementById(
                                    "rolChange"
                                  ).value;

                                  const { data } = await verificarPassword({
                                    variables: { id, password },
                                  });

                                  if (data?.verificarPassword) {
                                    const { data } = await eliminarUsuario({
                                      variables: { id: usuario.id },
                                    });
                                    noti.close();
                                    mostrarExito(data.eliminarUsuario);
                                    return resolve("Eliminado correctamente");
                                  } else {
                                    mostrarError("Contraseña Incorrecta");
                                    noti.close();
                                    reject("Incorrecto");
                                  }
                                }
                              ),

                              Noty.button(
                                "Cancelar",
                                "btn btn-error btn-noti-no",
                                function () {
                                  noti.close();
                                  throw reject("Cancelado");
                                }
                              ),
                            ],
                          }).show();
                        });
                      } catch (error) {
                        console.log(error);
                      }
                    }}
                  >
                    {loadingEliminar ? (
                      "Eliminando..."
                    ) : (
                      <li className="pi pi-trash"></li>
                    )}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </ScrollPanel>
    </div>
  );
}

export default Usuarios;
