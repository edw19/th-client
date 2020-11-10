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
  const { loading, data, startPolling, stopPolling } = useQuery(
    PORCENTAJE_FUNCIONARIO_DISCAPACIDAD
  );

  React.useEffect(() => {
    startPolling(500);
    return () => stopPolling();
  }, [startPolling, stopPolling]);

  if (loading) return "Cargando...";
  if (
    data.porcentajeFuncionarioDiscapacidad[0].porcentaje === null ||
    data.porcentajeFuncionarioDiscapacidad[0].porcentaje === 0
  )
    return <h4>Sin información</h4>;

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
      <Area
        type="monotone"
        dataKey="porcentaje"
        stroke="#8884d8"
        fill="#8884d8"
      />
    </AreaChart>
  );
}

export default PorcentajeDiscapacidad;
