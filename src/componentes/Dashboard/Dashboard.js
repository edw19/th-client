import React from "react";
import NumeroFuncionariosTipo from "./NumeroFuncionariosTipo";
import PorcentajeMF from "./PorcentajeMF";
import EdadPromedioMF from "./EdadPromedioMF";
import MasPermisos from "./MasPermisos";
import TendeciaPermisos from "./TendeciaPermisos";
import PorcentajeDiscapacidad from "./PorcentajeDiscapacidad";

function Dashboard() {
  return (
    <div className="pl-2 border p-3">
      <div className="row">
        <div
          className="col"
          style={{
            height: "25em",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <p>Número de funcionarios por tipo</p>
          <NumeroFuncionariosTipo />
        </div>
        <div
          className="col"
          style={{
            height: "25em",
            display: "flex",
            overflow: "hidden",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <p> Porcentaje de funcionarios por género </p>
          <PorcentajeMF className="-mt-5" />
        </div>
        <div
          className="col"
          style={{
            height: "25em",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <p>Edad promerdio de hombre y promedio de mujeres</p>
          <EdadPromedioMF />
        </div>
        <div className="w-100"></div>
        <div
          className="col"
          style={{
            height: "25em",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <p>5 funcionarios con más permisos</p>
          <MasPermisos />
        </div>
        <div
          className="col"
          style={{
            height: "25em",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <p>Día de la semana en el cual se tiende a solicitar más permisos</p>
          <TendeciaPermisos />
        </div>
        <div
          className="col"
          style={{
            height: "25em",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <p>Número de funcionarios que padecen una discapacidad</p>
          <PorcentajeDiscapacidad />
        </div>
      </div>
    </div>
  );
}
export default Dashboard;
