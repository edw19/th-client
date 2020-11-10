import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { MAS_PERMISOS } from "../../queries";
import { BarChart, Bar, Cell, YAxis, CartesianGrid } from "recharts";
import { scaleOrdinal } from "d3-scale";
import { schemeCategory10 } from "d3-scale-chromatic";

const colors = scaleOrdinal(schemeCategory10).range();

const define = (masPermisos) => {
  const datos = [];
  masPermisos.forEach((per) => {
    per.funcionario.forEach((fun) => {
      datos.push({
        funcionario: fun.nombre + " " + fun.segundoNombre + " " + fun.apellido,
        permisos: per.permisos,
        tipoFuncionario: fun.tipoFuncionario,
      });
    });
  });
  return datos;
};

const getPath = (x, y, width, height) => `M${x},${y + height}
          C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3} ${
  x + width / 2
}, ${y}
          C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${
  y + height
} ${x + width}, ${y + height}
          Z`;

const TriangleBar = (props) => {
  const { fill, x, y, width, height } = props;

  return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
};

function MasPermisos() {
  const { data, loading, startPolling, stopPolling } = useQuery(MAS_PERMISOS);
  React.useEffect(() => {
    startPolling(500);
    return () => stopPolling();
  }, [startPolling, stopPolling]);

  if (loading) return "Cargando...";
  const datos = define(data.masPermisos);
  if (Object.keys(data.masPermisos).length === 0) return <h4>Sin Permisos</h4>;
  return (
    <div>
      <BarChart width={450} height={240} data={datos}>
        <CartesianGrid strokeDasharray="3 3" />
        <YAxis />
        <Bar
          dataKey="permisos"
          fill="#8884d8"
          shape={<TriangleBar />}
          label={{ position: "top" }}
        >
          {datos.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % 20]} />
          ))}
        </Bar>
      </BarChart>
      <ul>
        {datos.map((fun, index) => (
          <li
            key={`${index + "" + fun.permisos}`}
            style={{ listStyleType: "none" }}
          >
            <span style={{ color: colors[index % 20] }}>
              {fun.tipoFuncionario}
            </span>{" "}
            {fun.funcionario}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MasPermisos;
