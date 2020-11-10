import React from "react";
import ImagenSinPermisos from "../materiales/sinPermisos.svg";

function SinContratos() {
  return (
    <div className="container mt-5">
      <img
        className="card-img-top"
        width="100%"
        height="300px"
        src={ImagenSinPermisos}
        alt="Funcionario sin contratos"
      />
      <div className="card-body">
        <h5 className="card-title">Funcionario sin documentos</h5>
        <p className="card-text">
          Aún no has almacenado ningún documento para este funcionario
        </p>
      </div>
    </div>
  );
}

export default SinContratos;
