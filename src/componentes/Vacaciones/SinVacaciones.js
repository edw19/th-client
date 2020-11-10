import React from "react";
import ImagenSinPermisos from "../materiales/sinPermisos.svg";

function SinVacaciones() {
  return (
    <div className="container mt-5">
      <img
        className="card-img-top"
        width="100%"
        height="300px"
        src={ImagenSinPermisos}
        alt="Funcionario sin vacaciones"
      />
      <div className="card-body">
        <h5 className="card-title">Funcionario sin Vacaciones</h5>
        <p className="card-text">
          Aún no has asignado ningún registro de vacación para este funcionario
        </p>
      </div>
    </div>
  );
}

export default SinVacaciones;
