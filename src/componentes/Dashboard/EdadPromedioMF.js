import React from "react";
import { EDAD_PROMEDIO_MF } from "../../queries";
import { useQuery } from "@apollo/react-hooks";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import moment from "moment";

const edadPromedio = (fechas) => {
  const edades = [];
  fechas.fechas.forEach((fecha) => {
    const res = moment().diff(new Date(fecha.fecha), "years", false);
    edades.push(res);
  });
  return edades;
};

const promedio = (edades) => {
  let promedio = 0;
  edades.forEach((edad) => {
    promedio = promedio + edad;
  });
  return promedio / edades.length;
};

function EdadPromedioMF() {
  const { data, loading } = useQuery(EDAD_PROMEDIO_MF);

  if (loading) return "cargando ..";
  const edadesM = edadPromedio(data.edadPromedioMF[0]);
  const edadesF = edadPromedio(data.edadPromedioMF[1]);
  const promedioM = promedio(edadesM);
  const promedioF = promedio(edadesF);

  return (
    <div>
      <BarChart
        width={450}
        height={300}
        data={[
          { genero: "Masculino", Promedio: promedioM },
          { genero: "Femenino", Promedio: promedioF },
        ]}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="genero" />
        <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
        <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
        <Tooltip />
        <Legend />
        <Bar yAxisId="left" dataKey="Promedio" fill="#1255d8" />
      </BarChart>
    </div>
  );
}

export default EdadPromedioMF;
