import React, { useState, useContext } from "react";
import Exito, { mostrarExito } from "../Alertas/Exito";
import Error, { mostrarError } from "../Alertas/Error";
import Info, { mostrarInfo, messageClear } from "../Alertas/Info";
import { useLazyQuery } from "@apollo/react-hooks";
import { OBTENER_SALDO_VACACIONES_PERMISOS_FUNCIONARIOS } from "../../queries";
import PdfDownload from "./PdfDownload";
import { periodoContext } from "../Context/PeriodoContext";

function Reportes() {
  const { periodoSeleccionado } = useContext(periodoContext);
  const [
    obtenerSaldoVacacionesPermisosFuncionario,
    { loading, data },
  ] = useLazyQuery(OBTENER_SALDO_VACACIONES_PERMISOS_FUNCIONARIOS, {
    onCompleted() {
      mostrarExito("Información recuperada con éxito");
    },
  });
  const [regimen, setRegimen] = useState("*");
  const [generar, setGenerar] = useState(false);

  React.useEffect(() => {
    setGenerar(false);
  }, [regimen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!regimen)
      return mostrarError(
        "Selecciona un tipo de funcionario para generar el reporte"
      );
    setGenerar(true);
    try {
      obtenerSaldoVacacionesPermisosFuncionario({
        variables: {
          periodo: periodoSeleccionado.id,
          tipoFuncionario: regimen,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="ml-3">
      <h2>Generar Reportes</h2>
      <div className="row">
        <div className="col-9">
          <form onSubmit={handleSubmit} className="mt-2 p-4 ">
            <div className="container mb-2">
              <span>Selecciona Tipo de Funcionario</span>
            </div>
            <div className="row border-top border-bottom pt-3 pb-5">
              <div className="col-3 ml-5">
                <input
                  id="administrativo"
                  name="tipo"
                  value="ADMINISTRATIVO"
                  type="radio"
                  style={{ width: "50px", height: "20px" }}
                  onChange={(e) => setRegimen(e.target.value)}
                />
                <label className="ml-3" htmlFor="administrativo">
                  ADMINISTRATIVOS
                </label>
                <br />
                <input
                  id="docente"
                  name="tipo"
                  value="DOCENTE"
                  type="radio"
                  style={{ width: "50px", height: "20px" }}
                  onChange={(e) => setRegimen(e.target.value)}
                />
                <label className="ml-3" htmlFor="docente">
                  DOCENTES
                </label>
                <br />
              </div>
              <div className="col-3 ml-5">
                <input
                  id="codigo"
                  name="tipo"
                  value="CÓDIGO DE TRABAJO"
                  style={{ width: "50px", height: "20px" }}
                  type="radio"
                  onChange={(e) => setRegimen(e.target.value)}
                />
                <label className="ml-3" htmlFor="codigo">
                  CÓDIGO DE TRABAJO
                </label>
                <br />
                <input
                  id="todos"
                  name="tipo"
                  value="*"
                  type="radio"
                  style={{ width: "50px", height: "20px" }}
                  onChange={(e) => setRegimen(e.target.value)}
                  defaultChecked={regimen}
                />
                <label className="ml-3" htmlFor="todos">
                  TODOS
                </label>
              </div>
              {generar ? (
                loading ? (
                  <div className="col-3 container pt-3">
                    <span className="text-primary text-center">
                      Obteniendo Información ...
                    </span>
                  </div>
                ) : (
                  <div className="col-3">
                    <div className="d-flex flex-column-reverse text-center">
                      <div className="mr-5">
                        <PdfDownload
                          funcionarios={
                            data?.obtenerSaldoVacionesPermisosFuncionarios
                          }
                          regimen={regimen}
                          periodoSeleccionado={periodoSeleccionado}
                        ></PdfDownload>
                      </div>
                      <p className="font">
                        Click para descargar documento generado
                      </p>
                    </div>
                  </div>
                )
              ) : (
                <button
                  type="submit"
                  onMouseEnter={() =>
                    mostrarInfo(
                      "Esta función le permite generar el reporte del tipo de funcionario que seleccione. Estos Datos dependen del período vigente"
                    )
                  }
                  onMouseLeave={() => messageClear()}
                  className="col-3 btn-outline-primary"
                  style={{ fontSize: 20 }}
                >
                  <li style={{ fontSize: "2em" }} className="pi pi-file-pdf" />
                  Generar
                </button>
              )}
            </div>
          </form>
        </div>
        <div className="col-3">
          <Exito />
          <Error />
          <Info />
        </div>
      </div>
    </div>
  );
}

export default Reportes;
