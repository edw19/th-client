import React from "react";
import { PieChart, Pie, Cell, Legend } from "recharts";
import { PORCENTAJE_MF } from "../../queries";
import { useQuery } from "@apollo/react-hooks";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

function PorcentajeMF() {
  const { loading, data } = useQuery(PORCENTAJE_MF);

  if (loading) return "Cargando...";
  return (
<>
{ data ?

<PieChart width={400} height={348}>
      <Pie
        data={data ? data.porcentajeHombreMujeres : []}
        cx={200}
        cy={150}
        labelLine={false}
        label={renderCustomizedLabel}
        fill="#8884d8"
        dataKey="porcentaje"
        >
        {data.porcentajeHombreMujeres.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
      </Pie>
      <Legend
        content={() => (
          <ul className="ml-2">
            {" "}
            {data.porcentajeHombreMujeres.map((entry, index) => (
              <li
              key={index}
              type="square"
              style={{
                color: entry.genero === "Masculino" ? "#0088FE" : "#00C49F",
              }}
              >
                <p style={{ color: "black" }}>
                  {entry.genero} : {entry.value}
                </p>
              </li>
            ))}{" "}
          </ul>
        )}
        />
      )
    </PieChart>: null

}

</>
);
}

export default PorcentajeMF;
