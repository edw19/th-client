import React, { useState } from "react";
import CedulaContrato from "../Cedula/CedulaContratos";
import Error, { mostrarError } from "../Alertas/Error";
import Exito, { mostrarExito } from "../Alertas/Exito";
import Info, { mostrarInfo, messageClear } from "../Alertas/Info";
import { contratosContext } from "../Context/ContratosContext";
import { ELIMINAR_CONTRATO } from "../../mutation";
import { useMutation } from "@apollo/react-hooks";
import moment from "moment";
import Spinner from "../Spinner";
import Paginador from "./Paginador";
import Noty from "noty";
import SinContratos from "./SinContratos";
import { Link } from "react-router-dom";
import { periodoContext } from "../Context/PeriodoContext";
import SinPeriodo from "../SinPeriodo";
import download from "downloadjs";
import "moment/locale/es";
moment.locale("es");

function AdministrarContratos() {
  const [cargandoDocs, setCargandoDocs] = useState(false);
  const [cargandoDocsAll, setCargandoDocsAll] = useState(false);

  const { periodoSeleccionado, loading: loadingPeriodo } = React.useContext(
    periodoContext
  );
  const {
    contratos,
    funcionario,
    paginador,
    totalContratos,
    loadingFuncionario,
    loadingContratos,
  } = React.useContext(contratosContext);
  const [eliminarContrato, { loading: loadingEliminar }] = useMutation(
    ELIMINAR_CONTRATO
  );
  const eliminarContratoFuncion = (id, nombreArchivo) => {
    new Promise((resolve, reject) => {
      let noti = new Noty({
        type: "info",
        layout: "center",
        text: `<strong>¿ Quieres eliminar el registro del archivo y el documento ?</strong>`,
        theme: "mint",
        modal: true,
        closeWith: ["button"],
        animation: {
          open: "animated bounceInDown",
          close: "animated bounceOutUp",
        },
        buttons: [
          Noty.button("SI", "btn btn-noti", async function () {
            const { data } = await eliminarContrato({
              variables: {
                id,
                nombreArchivo,
              },
            });
            mostrarExito(data.eliminarContrato);
            return resolve(noti.close());
          }),

          Noty.button("NO", "btn btn-error btn-noti-no", function () {
            noti.close();
            return reject(mostrarError("No se elimino ningun registro"));
          }),
        ],
      }).show();
    }).catch((error) => {
      console.log(error);
    });
  };

  const handleDocs = async (e) => {
    setCargandoDocs(true);
    e.preventDefault();
    const url = `http://localhost:5000/contratos-funcionario/?funcionario=${funcionario.id}&periodo=${periodoSeleccionado.id}`;
    const doc = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "multipart/form-data",
        withCredentials: true,
      },
      responseType: "arraybuffer",
    });
    const blob = await doc.blob();
    download(blob, "contratos.zip", "application/zip");
    setCargandoDocs(false);
  };
  const handleDocsAll = async (e) => {
    setCargandoDocsAll(true);
    e.preventDefault();
    const url = `http://localhost:5000/todos-contratos/?funcionario=${funcionario.id}`;
    const doc = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "multipart/form-data",
        withCredentials: true,
      },
      responseType: "arraybuffer",
    });
    const blob = await doc.blob();
    download(blob, "todos-contratos.zip", "application/zip");
    setCargandoDocsAll(false);
  };

  const handleAllContratosPeriodo = async (e) => {
    setCargandoDocsAll(true);
    e.preventDefault();
    const url = `http://localhost:5000/todos-contratos-periodo/?periodo=${periodoSeleccionado.id}`;
    const doc = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "multipart/form-data",
        withCredentials: true,
      },
      responseType: "arraybuffer",
    });
    const blob = await doc.blob();
    download(blob, "todos-contratos-periodo.zip", "application/zip");
    setCargandoDocsAll(false);
  };

  return (
    <div className="ml-3">
      <h2>Administrar Documentos</h2>
      <div className="row">
        {loadingPeriodo ? (
          <Spinner />
        ) : periodoSeleccionado ? (
          <>
            <div className="col-9">
              <div className="row">
                <div className="col-6">
                  <CedulaContrato
                    mostrarError={mostrarError}
                    mostrarExito={mostrarExito}
                  />
                </div>
                {Object.keys(funcionario).length > 0 ? (
                  <div className="col-6">
                    <div className="d-flex justify-content-end">
                      <Link
                        to="/dashboard/nuevo-contrato"
                        className="btn btn-outline-primary mt-3"
                      >
                        <i className="pi pi-plus mr-2" />
                        Añadir
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div className="col-6">
                    <div className="d-flex justify-content-end">
                      {cargandoDocsAll ? (
                        <span className="mt-3" style={{ color: "green" }}>
                          Descargando Contratos...
                        </span>
                      ) : (
                        <Link
                          to="#!"
                          onClick={handleAllContratosPeriodo}
                          className="btn btn-outline-primary mt-3"
                          onMouseEnter={() => {
                            mostrarInfo(
                              "Esta función permite descargar todos los documentos almacenados del período seleccionado"
                            );
                          }}
                          onMouseLeave={() => messageClear()}
                        >
                          <li className="pi pi-download" />
                          <li className="pi pi-tags mr-2" />
                        </Link>
                      )}
                    </div>
                  </div>
                )}

                <div className="col-12 mt-2">
                  {Object.keys(funcionario).length > 0 ? (
                    <div className="d-flex justify-content-between pb-2">
                      {loadingFuncionario ? (
                        <Spinner />
                      ) : (
                        <>
                          <h6 className="mt-3">
                            Documentos
                            {funcionario.genero === "MASCULINO"
                              ? " del "
                              : " de la "}
                            {funcionario.tipoFuncionario ===
                              "CÓDIGO DE TRABAJO" &&
                            funcionario.genero === "MASCULINO"
                              ? "TRABAJADOR: "
                              : funcionario.tipoFuncionario ===
                                  "CÓDIGO DE TRABAJO" &&
                                funcionario.genero === "FEMENINO"
                              ? "TRABAJADORA: "
                              : funcionario.tipoFuncionario ===
                                  "ADMINISTRATIVO" &&
                                funcionario.genero === "FEMENINO"
                              ? "ADMINISTRATIVA: "
                              : funcionario.tipoFuncionario ===
                                  "ADMINISTRATIVO" &&
                                funcionario.genero === "MASCULINO"
                              ? "ADMINISTRATIVO: "
                              : funcionario.tipoFuncionario + ": "}
                            {` ${funcionario.nombre} ${funcionario.segundoNombre} ${funcionario.apellido} ${funcionario.segundoApellido}`}
                          </h6>
                          <div className="d-flex justify-content-end">
                            {Object.keys(funcionario).length > 0 && (
                              <>
                                {cargandoDocsAll ? (
                                  <span style={{ color: "green" }}>
                                    Descargando...
                                  </span>
                                ) : (
                                  <Link
                                    to="#!"
                                    onClick={handleDocsAll}
                                    className="btn btn-outline-primary mr-2"
                                    onMouseEnter={() =>
                                      mostrarInfo(
                                        "Esta función le permite descargar todos los documentos del funcionario existentes durante su vida laboral"
                                      )
                                    }
                                    onMouseLeave={() => messageClear()}
                                  >
                                    <i className="pi pi-download"></i>
                                    <i className="pi pi-calendar"></i>
                                  </Link>
                                )}
                              </>
                            )}

                            {Object.keys(funcionario).length > 0 && (
                              <>
                                {cargandoDocs ? (
                                  <span style={{ color: "green" }}>
                                    Descargando...
                                  </span>
                                ) : (
                                  <Link
                                    to="#!"
                                    onClick={handleDocs}
                                    className="btn btn-outline-primary"
                                    onMouseEnter={() =>
                                      mostrarInfo(
                                        "Esta función le permite descargar todos los documentos del funcionario del período seleccionado"
                                      )
                                    }
                                    onMouseLeave={() => messageClear()}
                                  >
                                    <i className="pi pi-download"></i>
                                    <i className="pi pi-tags"></i>
                                  </Link>
                                )}
                              </>
                            )}
                          </div>
                        </>
                      )}
                    </div>
                  ) : null}

                  <table className="table table-hover text-center">
                    <thead className="thead-dark">
                      <tr>
                        <th>Nombre archivo</th>
                        <th>Tipo</th>
                        <th>Período</th>
                        <th>Contrato</th>
                        <th>Nombramiento</th>
                        <th>Vigencia</th>
                        <th>Inicio de Actividades</th>
                        <th>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {loadingContratos && (
                        <tr>
                          <td colSpan="7">
                            <Spinner />
                          </td>
                        </tr>
                      )}
                      {Object.keys(funcionario).length > 0 ? (
                        Object.keys(contratos).length > 0 ? (
                          contratos.map((doc) => (
                            <tr key={doc.id}>
                              <td>{doc.nombreArchivo}</td>
                              <td>{doc.tipoContrato}</td>
                              <td>{doc.nombrePeriodo}</td>
                              <td>{doc.contrato ? "Si" : "No"}</td>
                              <td>{doc.nombramiento ? "Si" : "No"}</td>
                              <td>
                                {moment(doc.vigenciaIncio).format("L")}
                                <hr />
                                {moment(doc.vigenciaFinal).format("L")}
                              </td>
                              <td>
                                {doc.fechaInicioActividades
                                  ? moment(doc.fechaInicioActividades).format(
                                      "LL"
                                    )
                                  : "No es nombramiento"}
                              </td>
                              <td className="d-flex justify-content-beetween">
                                <a
                                  href={`http://localhost:5000/contratos/${doc.nombreArchivo}`}
                                  className="text-decoration-none"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <li
                                    className="pi pi-eye mr-3"
                                    style={{ fontSize: "2em" }}
                                  ></li>
                                </a>
                                <li
                                  onClick={() =>
                                    eliminarContratoFuncion(
                                      doc.id,
                                      doc.nombreArchivo
                                    )
                                  }
                                  className="pi pi-trash mr-3"
                                  style={{
                                    fontSize: "2em",
                                    color: "red",
                                    cursor: "pointer",
                                  }}
                                >
                                  {loadingEliminar ? "Eliminando.." : null}
                                </li>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="7">
                              <SinContratos />
                            </td>
                          </tr>
                        )
                      ) : null}
                    </tbody>
                  </table>
                  {Object.keys(contratos).length > 0 && (
                    <div className="container">
                      <Paginador
                        totalContratos={totalContratos}
                        paginador={paginador}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="col-3">
              <Error />
              <Exito />
              <Info />
              {funcionario.nombreImagen && (
                <>
                  <img
                    width="250px"
                    height="250px"
                    className="img-fluid rounded rounded-circle"
                    src={`http://localhost:5000/imagenes/${funcionario.nombreImagen}`}
                    alt={`${funcionario.nombre} ${funcionario.apellido}`}
                  />
                </>
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

export default AdministrarContratos;
