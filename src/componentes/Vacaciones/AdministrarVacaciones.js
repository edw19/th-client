import React, { useContext } from "react";
import { Link } from "react-router-dom";
import CedulaVacaciones from "../Cedula/CedulaVacaciones";
import Error, { mostrarError } from "../Alertas/Error";
import Exito, { mostrarExito } from "../Alertas/Exito";
import { vacacionesContext } from "../Context/VacacionesContext";
import { ELIMINAR_VACACION } from "../../mutation";
import { ACTUALIZAR_ESTADO_VACACION } from "../../mutation";
import { ACTUALIZAR_DIAS_HABILES } from "../../mutation";
import { useMutation } from "@apollo/react-hooks";
import Spinner from "../Spinner";
import PaginadorVacaciones from "../PaginadorVacaciones";
import { periodoContext } from "../Context/PeriodoContext";
import SinVacaciones from "./SinVacaciones";
import GenerarReporteVacaciones from "./GenerarReporteVacaciones";
import Noty from "noty";
import moment from "moment";
import "moment/locale/es";
import SinPeriodo from "../SinPeriodo";
moment.locale("es");

export default function AdministrarVacaciones() {
  const {
    vacaciones,
    id,
    loading,
    totalVacaciones,
    totalDiasDescontados,
    funcionario,
  } = useContext(vacacionesContext);
  const { periodoSeleccionado, loading: loadingPeriodo } = useContext(
    periodoContext
  );
  const [generar, setGenerar] = React.useState(false);
  const [eliminarVacacion] = useMutation(ELIMINAR_VACACION);
  const [actualizarEstadoVacacion] = useMutation(ACTUALIZAR_ESTADO_VACACION);
  const [actualizarDiasHabiles] = useMutation(ACTUALIZAR_DIAS_HABILES);

  const eliminarVacacionFuncion = async (id) => {
    new Promise((resolve, reject) => {
      let noti = new Noty({
        type: "info",
        layout: "center",
        text: `<strong>¿Eliminar Vacación Asignada?</strong>`,
        theme: "mint",
        modal: true,
        closeWith: ["button"],
        animation: {
          open: "animated bounceInDown",
          close: "animated bounceOutUp",
        },
        buttons: [
          Noty.button("SI", "btn btn-noti", async function () {
            const { data } = await eliminarVacacion({
              variables: { id },
            });
            mostrarExito(data.eliminarVacacion);
            return resolve(noti.close());
          }),

          Noty.button("NO", "btn btn-error btn-noti-no", function () {
            noti.close();
            return reject(mostrarError("no se ha eliminado"));
          }),
        ],
      }).show();
    }).catch((error) => {
      console.log(error);
    });
  };

  const actualizarEstadoVacacionFuncion = async (
    id,
    idFuncionario,
    estado,
    dias
  ) => {
    if (estado) {
      await actualizarDiasHabiles({
        variables: {
          id: idFuncionario,
          dias,
          sumar: true,
        },
      });
    }
    if (!estado) {
      await actualizarDiasHabiles({
        variables: {
          id: idFuncionario,
          dias,
          sumar: false,
        },
      });
    }
    const { data } = await actualizarEstadoVacacion({
      variables: { id, estado },
    });
    mostrarExito(data.actualizarEstadoVacacion);
  };

  return (
    <div className="ml-3">
      <h2>Otorgar Vacaciones</h2>
      <div className="row">
        {loadingPeriodo ? (
          <Spinner />
        ) : periodoSeleccionado ? (
          <>
            <div className="col-9">
              <div className="row d-flex justify-content-between mt-3 mb-3">
                <div className="col ml-3">
                  <Link
                    to="/dashboard/conceder-vacaciones"
                    className="btn btn-outline-primary"
                  >
                    {" "}
                    <li className="pi pi-plus "></li> Conceder Vacaciones
                  </Link>
                  {!generar ? (
                    <button
                      onClick={() => {
                        setGenerar(true);
                        setTimeout(() => {
                          setGenerar(false);
                        }, 5000);
                      }}
                      className="btn btn-outline-success ml-3"
                      disabled={
                        Object.keys(vacaciones).length > 0 ? false : true
                      }
                    >
                      <li className="pi pi-file-pdf" /> Generar Reporte
                    </button>
                  ) : (
                    <GenerarReporteVacaciones
                      vacaciones={vacaciones}
                      totalVacaciones={totalVacaciones}
                      totalDiasDescontados={totalDiasDescontados}
                    />
                  )}
                </div>
                <div className="col">
                  <CedulaVacaciones
                    setGenerar={setGenerar}
                    mostrarError={mostrarError}
                    mostrarExito={mostrarExito}
                  />
                </div>
              </div>

              {Object.keys(funcionario).length > 0 && (
                <div className="mr-3 d-flex justify-content-between">
                  <h6>{funcionario.diasAFavor} Días disponibles</h6>
                  <h6>
                    Vacaciones
                    {funcionario.genero === "MASCULINO" ? " del " : " de la "}
                    {funcionario.tipoFuncionario === "CÓDIGO DE TRABAJO" &&
                    funcionario.genero === "MASCULINO"
                      ? "TRABAJADOR: "
                      : funcionario.tipoFuncionario === "CÓDIGO DE TRABAJO" &&
                        funcionario.genero === "FEMENINO"
                      ? "TRABAJADORA: "
                      : funcionario.tipoFuncionario === "ADMINISTRATIVO" &&
                        funcionario.genero === "FEMENINO"
                      ? "ADMINISTRATIVA: "
                      : funcionario.tipoFuncionario === "ADMINISTRATIVO" &&
                        funcionario.genero === "MASCULINO"
                      ? "ADMINISTRATIVO: "
                      : funcionario.tipoFuncionario + ": "}
                    {` ${funcionario.nombre} ${funcionario.segundoNombre} ${funcionario.apellido} ${funcionario.segundoApellido}`}
                  </h6>
                </div>
              )}

              <div className="table-response">
                <table className="table table-hover">
                  <thead className="thead-dark text-center">
                    <tr>
                      <th scope="col">Días Solicitados</th>
                      <th scope="col">Fecha de Salida</th>
                      <th scope="col">Fecha de entrada</th>
                      <th scope="col">Motivo</th>
                      <th scope="col">Estado</th>
                      <th scope="col">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="text-center">
                    {loading && (
                      <tr>
                        <td></td>
                        <td></td>
                        <td>
                          <Spinner />
                        </td>
                        <td></td>
                      </tr>
                    )}
                    {id ? (
                      Object.keys(vacaciones).length > 0 ? (
                        vacaciones.map((vacacion) => {
                          return (
                            <tr
                              key={vacacion.id}
                              style={{
                                backgroundColor: !vacacion.estado && "#fcc162",
                              }}
                            >
                              <td>{vacacion.diasSolicitados}</td>
                              <td>
                                {moment(vacacion.fechaSalida).format("LL")}
                              </td>
                              <td>
                                {moment(vacacion.fechaEntrada).format("LL")}
                              </td>
                              <td>{vacacion.motivo}</td>
                              <td>
                                <button
                                  onClick={() =>
                                    actualizarEstadoVacacionFuncion(
                                      vacacion.id,
                                      id,
                                      vacacion.estado,
                                      vacacion.diasSolicitados
                                    )
                                  }
                                  className="btn btn-outline-secondary"
                                >
                                  {" "}
                                  {vacacion.estado
                                    ? "Restar Días"
                                    : "Sumar Días"}
                                </button>
                              </td>
                              <td>
                                <button
                                  disabled={!vacacion.estado ? false : true}
                                  onClick={() =>
                                    eliminarVacacionFuncion(vacacion.id)
                                  }
                                  className="btn btn-outline-danger"
                                >
                                  {" "}
                                  Eliminar{" "}
                                </button>
                              </td>
                            </tr>
                          );
                        })
                      ) : (
                        <tr>
                          <td colSpan="6">
                            <SinVacaciones />
                          </td>
                        </tr>
                      )
                    ) : null}
                  </tbody>
                </table>
                {Object.keys(vacaciones).length > 0 && (
                  <PaginadorVacaciones
                    totalVacaciones={totalVacaciones}
                    totalDiasDescontados={totalDiasDescontados}
                  />
                )}
              </div>
            </div>
            <div className="col-3">
              <Error />
              <Exito />
              {funcionario.nombreImagen && (
                <img
                  width="250px"
                  height="250px"
                  className="img-fluid rounded rounded-circle"
                  src={`http://190.15.129.83:5000/imagenes/${funcionario.nombreImagen}`}
                  alt={`${funcionario.nombre} ${funcionario.apellido}`}
                />
              )}
            </div>
          </>
        ) : (
          <SinPeriodo />
        )}
      </div>
    </div>
  );
}
