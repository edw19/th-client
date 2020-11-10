import React, { createContext, useState, useEffect } from "react";
import { OBTENER_PERIODOS } from "../../queries";
import { useQuery } from "@apollo/react-hooks";
// import Spinner from "../Spinner";

let periodoContext = createContext();
let { Provider, Consumer } = periodoContext;

function PeriodoProvider({ children }) {
  // solo en el periodo que este vigente puedo insertar permisos y vacaciones
  let [limite] = useState(8);
  let [offset, setOffset] = useState(null);
  const [actual, guardarActual] = useState(1);
  const [periodoSeleccionado, guardarPeriodoSeleccionado] = useState(null);
  const [totalPeriodos, guardarTotalPeriodos] = useState(0);
  const [periodos, guardarPeriodos] = useState([]);
  const { loading, data, fetchMore } = useQuery(OBTENER_PERIODOS, {
    pollInterval: 500,
    variables: {
      limite,
      offset,
    },
  });

  const paginador = (evaluador) => {
    let nuevoOff = offset;
    if (evaluador === "+") nuevoOff = offset + 8;
    if (evaluador === "-") nuevoOff = nuevoOff - 8;
    fetchMore({
      variables: { limite, offset: nuevoOff },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        setOffset(nuevoOff);
        return guardarPeriodos([...fetchMoreResult.obtenerPeriodos.periodos]);
      },
    });
  };

  useEffect(() => {
    if (!data) return;
    guardarPeriodos([...data.obtenerPeriodos.periodos]);
    if (
      Object.keys(
        data.obtenerPeriodos.periodos.filter(
          (periodos) => periodos.vigente === true
        )
      ).length > 0
    ) {
      guardarPeriodoSeleccionado(
        ...data.obtenerPeriodos.periodos.filter(
          (periodos) => periodos.vigente === true
        )
      );
    }
    guardarTotalPeriodos(data.obtenerPeriodos.totalPeriodos);
  }, [data]);

  // if (loading)
  //   return (
  //     <div style={{ marginTop: 400 }} className="container text-center">
  //       <Spinner />
  //       <p style={{ fontSize: 20 }}>Cargando información ...</p>
  //     </div>
  //   );

  return (
    <Provider
      value={{
        periodos,
        totalPeriodos,
        loading,
        periodoSeleccionado,
        paginador,
        actual,
        guardarActual,
        setOffset,
        // refetch,
      }}
    >
      {children}
    </Provider>
  );
}

export { PeriodoProvider, Consumer as PeriodoConsumer, periodoContext };
