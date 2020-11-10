import React, { useState, useEffect, useContext, useRef } from "react";
import { InputText } from "primereact/inputtext";
import Error, { mostrarError } from "../Alertas/Error";
import Exito, { mostrarExito } from "../Alertas/Exito";
import Info, { mostrarInfo, messageClear } from "../Alertas/Info";
import { OBTENER_FUNCIONARIO } from "../../queries";
import { DESCONTAR_PERMISOS_MASIVO } from "../../mutation";
import { FILE_MASIVO } from "../../mutation";
import { useLazyQuery } from "@apollo/react-hooks";
import { useMutation } from "@apollo/react-hooks";
import Spinner from "../Spinner";
import { funcionarioContext } from "../Context/FuncionarioContext";
import { periodoContext } from "../Context/PeriodoContext";
import MostrarFuncionario from "./MostrarFuncionario";
import { Link } from "react-router-dom";
import SinPeriodo from "../SinPeriodo";
import MostrarFuncionarios from "./MostrarFuncionarios";

import DescontarMasivo from "./DescontarMasivo";
import LoadingExcel from "./LoadingExcel";

export default function AdministrarFuncionarios({ rol }) {
  const inputRef = useRef();
  const [nombreArchivo, setNombreArchivo] = useState("Subir archivo");
  const [fileMasivo, { loading: loadingExcelMasivo }] = useMutation(
    FILE_MASIVO,
    {
      onCompleted(data) {
        setNombreArchivo("Subir archivo");
        mostrarExito(data.fileMasivo);
      },
      onError(err) {
        setNombreArchivo("Subir archivo");
        mostrarError(err.message.replace("GraphQL error:", ""));
      },
    }
  );
  const [descontarPermisosMasivo, { loading: loadingMasivo }] = useMutation(
    DESCONTAR_PERMISOS_MASIVO
  );
  const { funcionario, guardarFuncionario } = useContext(funcionarioContext);
  const { periodoSeleccionado, loading: loadingPeriodo } = useContext(
    periodoContext
  );
  const [cedula, setCedula] = useState("");
  let [obtenerFuncionario, { loading, data }] = useLazyQuery(
    OBTENER_FUNCIONARIO,
    {
      pollInterval: 500,
      fetchPolicy: "no-cache",
      onError: (error) => {
        mostrarError(error.graphQLErrors[0].message);
      },
      onCompleted: () => {
        if (!data) return;
        guardarFuncionario({ ...data.obtenerFuncionario });
        mostrarExito("Funcionario Encontrado");
      },
    }
  );

  useEffect(() => {
    if (cedula.length > 9) {
      obtenerFuncionario({ variables: { cedula } });
      return;
    }
    if (cedula.length < 10) {
      // obtenerFuncionario({ variables: { cedula: "" } });
    }
  }, [cedula, obtenerFuncionario]);

  if (loading && loadingPeriodo) return <Spinner />;
  if (loadingMasivo)
    return (
      <>
        <Spinner />{" "}
        <h4 className="text-center">
          Descontando permisos de todos los funcionarios
        </h4>{" "}
      </>
    );

  if (loadingExcelMasivo) return <LoadingExcel />;
  console.log(loadingExcelMasivo);

  const validarCedula = () => {
    const noValida = cedula.length < 10;
    if (noValida) {
      mostrarError("Cédula del funcionario debe ser de 10 dígitos");
      return;
    }
    // obtenerFuncionario({ variables: { cedula } });
  };

  const precionarInput = (e) => {
    if (e.keyCode === 13 && cedula.length > 9) {
      obtenerFuncionario({ variables: { cedula } });
    }
  };

  if (!periodoSeleccionado)
    return (
      <div className="ml-5">
        <h2>Administrar Funcionarios</h2>
        <SinPeriodo />
      </div>
    );

  const handleFileSubmit = async (e) => {
    setNombreArchivo(e.target.files[0].name);
    try {
      await fileMasivo({
        variables: {
          file: e.target.files[0],
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="ml-3">
      <div className="row">
        <div className="col-8">
          <div className="row mr-1">
            <div className="col-6">
              <h2>Administrar Funcionarios</h2>
            </div>
            {!data ? (
              <div className="col-6">
                <div className="d-flex flex-row justify-content-end">
                  <div className="">
                    <label
                      htmlFor="filePicker"
                      className="btn mr-3"
                      style={{
                        background: "#007bff",
                        color: "white",
                      }}
                    >
                      <li className="pi pi-upload" /> {nombreArchivo}
                    </label>
                    <input
                      id="filePicker"
                      style={{ visibility: "hidden", width: 0, height: 0 }}
                      type={"file"}
                      accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                      onChange={handleFileSubmit}
                    />
                  </div>
                  <a
                    href="http://localhost:5000/formato"
                    onMouseEnter={() => {
                      mostrarInfo(
                        "Esta función le permite descargar el formato necesario para registrar funcionarios desde un archivo de excel"
                      );
                    }}
                    onMouseLeave={() => messageClear()}
                    className="btn btn-outline-primary mr-2"
                  >
                    <i className="pi pi-file-excel mt-1" />
                  </a>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-8">
          <div className="row">
            <div className="col-5 ml-3">
              <span className="p-float-label">
                <InputText
                  id="ino"
                  name="cedula"
                  className="form-control"
                  value={cedula}
                  onChange={(e) => {
                    setCedula(e.target.value);
                  }}
                  onKeyDown={precionarInput}
                  onBlur={validarCedula}
                  keyfilter="pint"
                  maxLength="10"
                  minLength="10"
                  autoComplete="off"
                  ref={inputRef}
                />
                <label htmlFor="ino">Número de cédula del funcionario</label>
              </span>
            </div>
            <div className="col d-flex justify-content-end mr-3">
              {data ? (
                <Link to="/dashboard/administrar-funcionarios">
                  <li
                    style={{ fontSize: "2em" }}
                    className="pi pi-arrow-left mt-1"
                  ></li>
                </Link>
              ) : null}
              {rol === "ADMINISTRADOR" && (
                <>
                  {data ? null : (
                    <DescontarMasivo
                      mostrarExito={mostrarExito}
                      mostrarError={mostrarError}
                      descontarPermisosMasivo={descontarPermisosMasivo}
                      periodoSeleccionado={periodoSeleccionado.id}
                      mostrarInfo={mostrarInfo}
                      messageClear={messageClear}
                    />
                  )}
                </>
              )}
              {rol === "PRIMARIO" && (
                <>
                  {data ? null : (
                    <DescontarMasivo
                      mostrarExito={mostrarExito}
                      mostrarError={mostrarError}
                      descontarPermisosMasivo={descontarPermisosMasivo}
                      periodoSeleccionado={periodoSeleccionado.id}
                    />
                  )}
                </>
              )}
              {data ? null : (
                <Link
                  to="/dashboard/nuevo-funcionario"
                  onClick={() => guardarFuncionario({})}
                  className="btn btn-outline-primary"
                >
                  <li className="pi pi-plus" /> Nuevo Funcionario
                </Link>
              )}
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="container-funcionario">
                {data ? (
                  <MostrarFuncionario
                    data={funcionario}
                    mostrarExito={mostrarExito}
                    mostrarError={mostrarError}
                    guardarFuncionario={guardarFuncionario}
                    setCedula={setCedula}
                  />
                ) : (
                  <MostrarFuncionarios
                    setCedula={setCedula}
                    obtenerFuncionario={obtenerFuncionario}
                    mostrarExito={mostrarExito}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="col-4">
          <Error />
          <Exito />
          <Info />
        </div>
      </div>
    </div>
  );
}
