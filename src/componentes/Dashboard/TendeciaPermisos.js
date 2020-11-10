import React from "react";
import { TENDENCIA_PERMISOS } from "../../queries";
import { useQuery } from "@apollo/react-hooks";
import moment from "moment";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from "recharts";

function TendeciaPermisos() {
  const { loading, data, startPolling, stopPolling } = useQuery(
    TENDENCIA_PERMISOS
  );
  React.useEffect(() => {
    startPolling(500);
    return () => stopPolling();
  }, [startPolling, stopPolling]);

  if (loading) return "Cargando...";
  if (Object.keys(data.tendenciaPermisos).length === 0)
    return <h4>Sin información</h4>;
  const dias = [];

  function obtenerDias() {
    data.tendenciaPermisos.map((fecha) =>
      dias.push(moment(new Date(fecha)).format("dddd").toString())
    );
  }

  const datos = () => {
    let diasDatos = [
      { dia: "Lunes", value: 0 },
      { dia: "Martes", value: 0 },
      { dia: "Miércoles", value: 0 },
      { dia: "Jueves", value: 0 },
      { dia: "Viernes", value: 0 },
    ];
    dias.forEach((dia) => {
      if (dia === "lunes") {
        diasDatos[0].value += 1;
      }
      if (dia === "martes") {
        diasDatos[1].value += 1;
      }
      if (dia === "miércoles") {
        diasDatos[2].value += 1;
      }
      if (dia === "jueves") {
        diasDatos[3].value += 1;
      }
      if (dia === "viernes") {
        diasDatos[4].value += 1;
      }
    });
    return diasDatos;
  };
  obtenerDias();

  return (
    <RadarChart width={450} height={380} data={datos()}>
      <PolarGrid />
      <PolarAngleAxis dataKey="dia" />
      <PolarRadiusAxis />
      <Radar
        dataKey="value"
        stroke="#8884d8"
        fill="#8884d8"
        fillOpacity={0.6}
      />
    </RadarChart>
  );
}

export default TendeciaPermisos;
