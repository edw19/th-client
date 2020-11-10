import React, { useState, createContext, useEffect, useContext } from "react";
import { funcionarioContext2 } from "./FuncionarioContext2";
import { periodoContext } from "./PeriodoContext";
import { OBTENER_PERMISOS } from "../../queries";
import { TOTAL_PERMISOS } from "../../queries";
import { useLazyQuery } from "@apollo/react-hooks";

let permisosContext = createContext();
let { Provider, Consumer } = permisosContext;

function PermisosProvider({ children }) {
  const {
    funcionario: { id },
    guardarFuncionario,
    funcionario,
    loadingFuncionario,
  } = useContext(funcionarioContext2);
  const { periodoSeleccionado, loading } = useContext(periodoContext);

  let [limite] = useState(5);
  let [offset, setOffset] = useState(null);

  const [permisos, guardarPermisos] = useState([]);
  const [totalPermisos, guardarTotalPermisos] = useState({});
  const [obtenerPermisos, { data, fetchMore }] = useLazyQuery(
    OBTENER_PERMISOS,
    {
      pollInterval: 500,
    }
  );
  const [obtenerTotalPermisos, { data: totalPermisosData }] = useLazyQuery(
    TOTAL_PERMISOS,
    {
      pollInterval: 500,
    }
  );

  // la variable evaluador la utilizo en el componente Paginador para envaluar si incrementa o decrementa la consulta
  const paginador = (evaluador) => {
    let nuevoOff = offset;
    if (evaluador === "+") nuevoOff = offset + 5;
    if (evaluador === "-") nuevoOff = nuevoOff - 5;
    fetchMore({
      variables: { id, limite, offset: nuevoOff },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        setOffset(nuevoOff);
        return guardarPermisos([...fetchMoreResult.obtenerPermisos]);
      },
    });
  };

  useEffect(() => {
    if (!id) return;
    // console.log(periodoSeleccionado.id)
    let idPeriodo;
    if (!loading) {
      idPeriodo = periodoSeleccionado.id;
    }
    obtenerPermisos({
      variables: { id, idPeriodo, limite, offset },
    });
    obtenerTotalPermisos({
      variables: { id, idPeriodo },
    });
  }, [
    id,
    obtenerPermisos,
    obtenerTotalPermisos,
    limite,
    offset,
    loading,
    periodoSeleccionado,
  ]);

  useEffect(() => {
    if (data) {
      guardarPermisos([...data.obtenerPermisos]);
    }
    if (totalPermisosData) {
      guardarTotalPermisos({ ...totalPermisosData.totalPermisos });
    }
  }, [data, totalPermisosData]);
  return (
    <Provider
      value={{
        permisos,
        guardarPermisos,
        id,
        guardarFuncionario,
        totalPermisos,
        paginador,
        funcionario,
        loadingFuncionario,
      }}
    >
      {children}
    </Provider>
  );
}

export { PermisosProvider, Consumer as PermisosConsumer, permisosContext };
