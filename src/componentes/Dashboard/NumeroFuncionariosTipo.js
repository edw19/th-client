import React from "react";
import { BarChart, XAxis, YAxis, Tooltip, Bar } from "recharts";
import { NUMERO_EMPLEADOS_POR_TIPO } from "../../queries";
import { useQuery } from "@apollo/react-hooks";

function NumeroFuncionariosTipo() {
  const { data, loading, startPolling, stopPolling } = useQuery(
    NUMERO_EMPLEADOS_POR_TIPO
  );

  React.useEffect(() => {
    startPolling(500);
    return () => stopPolling();
  }, [startPolling, stopPolling]);

  if (loading) return "Cargando...";
  return (
    <>
      {data.numeroEmpleadosPorTipo[0].valor === 0 &&
      data.numeroEmpleadosPorTipo[1].valor === 0 &&
      data.numeroEmpleadosPorTipo[2].valor === 0 ? (
        <h4>Sin información</h4>
      ) : (
        <BarChart
          width={450}
          height={348}
          data={data && data.numeroEmpleadosPorTipo}
        >
          {/* <CartesianGrid strokeDasharray="3 3" /> */}
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="valor" fill="#8884d8" />
        </BarChart>
      )}
    </>
  );
}

export default NumeroFuncionariosTipo;
