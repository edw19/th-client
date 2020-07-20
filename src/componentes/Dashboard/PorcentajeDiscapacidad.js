import React from "react";
import { PORCENTAJE_FUNCIONARIO_DISCAPACIDAD } from "../../queries";
import { useQuery } from "@apollo/react-hooks";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

function PorcentajeDiscapacidad() {
  const { loading, data } = useQuery(PORCENTAJE_FUNCIONARIO_DISCAPACIDAD);
  if (loading) return "Cargando...";

  return (
    <AreaChart
      width={400}
      height={380}
      data={data.porcentajeFuncionarioDiscapacidad}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="total" />
      <YAxis />
      <Tooltip />
      <Area type="monotone" dataKey="porcentaje" stroke="#8884d8" fill="#8884d8" />
    </AreaChart>
  );
}

export default PorcentajeDiscapacidad;
