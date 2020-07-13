import React, { useState, createContext, useContext, useEffect } from 'react';
import { useLazyQuery } from '@apollo/react-hooks';
import { OBTENER_VACACIONES } from '../../queries';
import { funcionarioContextVacaciones } from './FuncionarioContextVacaciones';
import { periodoContext } from '../Context/PeriodoContext';

let vacacionesContext = createContext();
let { Provider, Consumer } = vacacionesContext;

export default function VacacionesProvider({ children }) {

    let [limite] = useState(5);
    let [offset, setOffset] = useState(null);

    const { funcionario, guardarFuncionario } = useContext(funcionarioContextVacaciones);
    const { periodoSeleccionado, loading: loadingPeriodo } = useContext(periodoContext);
    const [vacaciones, guardarVacaciones] = useState([]);
    const [totalVacaciones, guardarTotalVacaciones] = useState(null)
    const [totalDiasDescontados, guardarTotalDiasDescontados] = useState(null);
    const [obtenerVacaciones, { loading, data, fetchMore }] = useLazyQuery(OBTENER_VACACIONES, {
        pollInterval: 1000
    });

    const paginador = (evaluador) => {
        let nuevoOff = offset;
        if (evaluador === "+") nuevoOff = offset + 5;
        if (evaluador === "-") nuevoOff = (nuevoOff - 5);
        fetchMore({
            variables: { id: funcionario.id, limite, offset: nuevoOff },
            updateQuery: (prev, { fetchMoreResult }) => {
                if (!fetchMoreResult) return prev;
                setOffset(nuevoOff);
                return guardarVacaciones([...fetchMoreResult.obtenerVacaciones.vacaciones])
            }
        });
    };

    useEffect(() => {
        if (!funcionario.id) return;
        let idPeriodo;
        if (!loadingPeriodo) {
            idPeriodo = periodoSeleccionado.id
        }
        obtenerVacaciones({
            variables: { id: funcionario.id, idPeriodo, limite, offset }
        });
    }, [funcionario.id, obtenerVacaciones, limite, offset, loadingPeriodo, periodoSeleccionado]);

    useEffect(() => {
        if (data) {
            guardarVacaciones([...data.obtenerVacaciones.vacaciones])
            guardarTotalVacaciones(data.obtenerVacaciones.totalVacaciones)
            guardarTotalDiasDescontados(data.obtenerVacaciones.totalDiasDescontados)
        }
    }, [data])

    return (
        <Provider value={{ vacaciones, guardarFuncionario, guardarVacaciones, id: funcionario.id, funcionario, loading, paginador, totalVacaciones, totalDiasDescontados }}>
            {children}
        </Provider>
    )
};

export { VacacionesProvider, Consumer as VacacionesConsumer, vacacionesContext };

