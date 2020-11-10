import React, { useState, useEffect, useContext } from "react";
import { permisosContext } from "./Context/PermisosContext";

export default function Paginador({ totalPermisos }) {
  const { paginador } = useContext(permisosContext);
  const [paginas, guardarPaginas] = useState(0);
  const [actual, guardarActual] = useState(1);

  useEffect(() => {
    const res = Math.ceil(Number(totalPermisos.totalPermisos / 5));
    if (isNaN(res)) {
      guardarPaginas(1);
    } else {
      guardarPaginas(res);
    }
  }, [totalPermisos]);

  return (
    <>
      <hr />
      <div className="container-fluid">
        <div className="row">
          <div className="col-6">
            <p className="text-uppercase">
              Pág Actual: {actual} de {paginas} Págs{" "}
            </p>
            <p className="text-uppercase">
              Permisos Solicitados: {totalPermisos.totalPermisos}
            </p>
            <p className="text-uppercase">
              Tiempo Total en Horas:{" "}
              {`${
                !totalPermisos.totalHorasSin ? 0 : totalPermisos.totalHorasSin
              } Horas y ${
                !totalPermisos.totalMinutosSin
                  ? 0
                  : totalPermisos.totalMinutosSin
              } Minutos`}{" "}
            </p>
            <p className="text-uppercase">
              Tiempo Solicitado:{" "}
              {`${totalPermisos.totalDias} ${
                totalPermisos.totalDias > 1 || totalPermisos.totalDias === 0
                  ? `Días`
                  : `Día`
              }`}
              ,{" "}
              {`${totalPermisos.totalHoras} ${
                totalPermisos.totalHoras > 1 ? `Horas` : `Hora`
              }`}
              ,{" "}
              {`${totalPermisos.totalMinutos} ${
                totalPermisos.totalMinutos > 1 ? `Minutos` : `Minuto`
              }`}
            </p>
          </div>
          <div className="col-6">
            {actual > 1 ? (
              <button
                onClick={() => {
                  paginador("-");
                  guardarActual(actual - 1);
                }}
                className="btn btn-outline-info mr-5"
              >
                &laquo; Anterior
              </button>
            ) : (
              ""
            )}
            {paginas !== 1 ? (
              <button
                onClick={() => {
                  paginador("+");
                  guardarActual(actual + 1);
                }}
                className="btn btn-outline-info ml-5"
                disabled={paginas === actual ? true : false}
              >
                Siguiente &raquo;
              </button>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </>
  );
}
