import React from "react";
import ImagenSinPermisos from "../materiales/sinPermisos.svg";

function SinPermisos() {
  return (
    <div className="container mt-5">
      <img
        className="card-img-top"
        width="100%"
        height="300px"
        src={ImagenSinPermisos}
        alt="selecciona un período"
      />
      <div className="card-body">
        <h5 className="card-title">Funcionario sin permisos en este período</h5>
        <p className="card-text">Funcionario sin solicitudes de permisos.</p>
      </div>
    </div>
  );
}

export default SinPermisos;
