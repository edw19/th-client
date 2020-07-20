import React from "react";
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar } from "recharts";
import { NUMERO_EMPLEADOS_POR_TIPO } from "../../queries";
import { useQuery } from "@apollo/react-hooks";

function NumeroFuncionariosTipo() {
  const { data } = useQuery(NUMERO_EMPLEADOS_POR_TIPO);
  return (
    <div>
      <BarChart
        width={450}
        height={348}
        data={data && data.numeroEmpleadosPorTipo}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="numero" fill="#8884d8" />
      </BarChart>
    </div>
  );
}

export default NumeroFuncionariosTipo;
