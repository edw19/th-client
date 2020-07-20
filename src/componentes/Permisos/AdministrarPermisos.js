import React, { useContext } from "react";
import Cedula2 from "../Cedula2";
import { Link } from "react-router-dom";
import Error, { mostrarError } from "../Alertas/Error";
import Exito, { mostrarExito } from "../Alertas/Exito";
import Paginador from "../Paginador";
import { permisosContext } from "../Context/PermisosContext";
import { ELIMINAR_PERMISO } from "../../mutation";
import { ACTUALIZAR_ESTADO_PERMISO } from "../../mutation";
import { ACTUALIZAR_DIAS_HABILES } from "../../mutation";
import { useMutation } from "@apollo/react-hooks";
import { periodoContext } from "../Context/PeriodoContext";
import DescontarPermisos from "./DescontarPermisos";
import SinPeriodo from "../SinPeriodo";
import SinPermisos from "./SinPermisos";
import Noty from "noty";
import moment from "moment";
import "moment/locale/es";
import Spinner from "../Spinner";
moment.locale("es");

function AdministrarPermisos() {
  const {
    permisos,
    id: idFuncionario,
    totalPermisos,
    funcionario,
  } = useContext(permisosContext);
  const { periodoSeleccionado, loading } = useContext(periodoContext);
  const [eliminarPermiso] = useMutation(ELIMINAR_PERMISO);
  const [actualizarEstadoPermiso] = useMutation(ACTUALIZAR_ESTADO_PERMISO);
  const [actualizarDiasHabiles] = useMutation(ACTUALIZAR_DIAS_HABILES);

  const eliminarPermisoFuncion = (id) => {
    new Promise((resolve, reject) => {
      let noti = new Noty({
        type: "info",
        layout: "center",
        text: `<strong>¿ Quieres eliminar el permiso?</strong>`,
        theme: "mint",
        modal: true,
        closeWith: ["button"],
        animation: {
          open: "animated bounceInDown",
          close: "animated bounceOutUp",
        },
        buttons: [
          Noty.button("SI", "btn btn-noti", function () {
            eliminarPermiso({
              variables: { id },
            });
            mostrarExito("Permiso Eliminado");
            return resolve(noti.close());
          }),

          Noty.button("NO", "btn btn-error btn-noti-no", function () {
            noti.close();
            return reject(mostrarError("No se elimino el permiso"));
          }),
        ],
      }).show();
    }).catch((error) => {
      console.log(error);
    });
  };

  const cambiarEstadoPermiso = async (id, estado) => {
    const { totalDias } = totalPermisos;
    if (totalDias > 0) {
      if (estado) {
        await actualizarDiasHabiles({
          variables: {
            id: idFuncionario,
            dias: totalPermisos.totalDias,
            sumar: true,
          },
        });
      }
      if (!estado) {
        await actualizarDiasHabiles({
          variables: {
            id: idFuncionario,
            dias: totalPermisos.totalDias,
            sumar: false,
          },
        });
      }
    }

    const { data } = await actualizarEstadoPermiso({
      variables: {
        id,
        estado,
      },
    });
    mostrarExito(data.actualizarEstadoPermiso);
  };

  return (
    <div className="ml-5">
      <h2>Administrar Permisos</h2>
      <div className="row">
        {loading ? (
          <Spinner />
        ) : periodoSeleccionado ? (
          <>
            <div className="col-9">
              <div className="row mt-3 mb-3">
                <div className="col ml-3">
                  <Link
                    to="/dashboard/nuevo-permiso"
                    className="btn btn-link border text-decoration-none"
                  >
                    Nuevo Permiso
                  </Link>
                  {Object.keys(totalPermisos).length > 0 && (
                    <DescontarPermisos
                      diasAFavor={funcionario.diasAFavor}
                      horasAcumuladas={funcionario.horasAcumuladas}
                      minutosAcumulados={funcionario.minutosAcumulados}
                      totalPermisos={totalPermisos}
                      idFuncionario={idFuncionario}
                      periodoSeleccionado={periodoSeleccionado}
                      permisos={permisos}
                      mostrarError={mostrarError}
                      mostrarExito={mostrarExito}
                    />
                  )}
                </div>
                <Cedula2
                  mostrarError={mostrarError}
                  mostrarExito={mostrarExito}
                />
              </div>
              {Object.keys(funcionario).length > 0 && (
                <div className="mr-3 d-flex justify-content-between">
                  <h6>{funcionario.diasAFavor} días a favor</h6>
                  <h6>
                    Permisos
                    {funcionario.genero === "MASCULINO" ? " del " : " de la "}
                    {funcionario.tipoFuncionario}
                    {` ${funcionario.nombre} ${funcionario.segundoNombre} ${funcionario.apellido} ${funcionario.segundoApellido}`}
                  </h6>
                </div>
              )}
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead className="thead-dark text-center">
                    <tr>
                      <th scope="col">Fecha de Permiso</th>
                      <th scope="col">Hora de Salida</th>
                      <th scope="col">Total de Permiso</th>
                      <th scope="col">Motivo</th>
                      <th scope="col">Estado</th>
                      <th scope="col">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="text-center">
                    {idFuncionario ? (
                      Object.keys(permisos).length > 0 ? (
                        permisos.map((permiso) => {
                          return (
                            <tr
                              key={permiso.id}
                              style={{
                                backgroundColor: !permiso.estado && "#fcc162",
                              }}
                            >
                              <td>
                                {moment(new Date(permiso.horaSalida)).format(
                                  "LL"
                                )}
                              </td>
                              <td>
                                {moment(new Date(permiso.horaSalida)).format(
                                  "HH:mm"
                                )}
                              </td>
                              <td>
                                {permiso.horasPermiso +
                                  " h y " +
                                  permiso.minutosPermiso +
                                  " m "}{" "}
                              </td>
                              <td>{permiso.motivo}</td>
                              <td>
                                <button
                                  className="btn btn-outline-secondary"
                                  onClick={() =>
                                    cambiarEstadoPermiso(
                                      permiso.id,
                                      permiso.estado
                                    )
                                  }
                                >
                                  {permiso.estado
                                    ? "Contando permiso"
                                    : "Permiso Terminado"}
                                </button>
                              </td>
                              <td>
                                <button
                                  disabled={!permiso.estado ? false : true}
                                  onClick={() =>
                                    eliminarPermisoFuncion(permiso.id)
                                  }
                                  className="btn btn-outline-danger"
                                >
                                  Eliminar X
                                </button>
                              </td>
                            </tr>
                          );
                        })
                      ) : (
                        <tr>
                          <td colSpan="6">
                            <SinPermisos />
                          </td>
                        </tr>
                      )
                    ) : null}
                  </tbody>
                </table>
                {Object.keys(permisos).length > 0 && idFuncionario && (
                  <Paginador
                    totalPermisos={totalPermisos}
                    horasAcumuladas={funcionario.horasAcumuladas}
                    minutosAcumulados={funcionario.minutosAcumulados}
                  />
                )}
              </div>
            </div>
            <div className="col-3">
              <Error />
              <Exito />
              {Object.keys(funcionario).length > 0 & funcionario.nombreImagen !== null ? (
                <>
                  <img
                    width="250px"
                    height="250px"
                    className="img-fluid rounded rounded-circle"
                    src={`http://localhost:5000/imagenes/${funcionario.nombreImagen}`}
                    alt={`${funcionario.nombre} ${funcionario.apellido}`}
                  />
                  {funcionario.horasAcumuladas > 0 &&
                  funcionario.minutosAcumulados > 0 ? (
                    <>
                      <p className="text-uppercase text-left mt-2">
                        Funcionario tiene horas acumuladas del período anterior
                      </p>
                      <p>Horas Acumuladas: {funcionario.horasAcumuladas}</p>
                      <p>Minutos Acumulados: {funcionario.minutosAcumulados}</p>
                    </>
                  ) : null}
                </>
              ): null}
            </div>
          </>
        ) : (
          <SinPeriodo />
        )}
      </div>
    </div>
  );
}
export default AdministrarPermisos;
