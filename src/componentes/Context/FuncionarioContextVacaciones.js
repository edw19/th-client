import React, { useState, createContext, useEffect } from 'react';
import { OBTENER_FUNCIONARIO } from '../../queries';
import { useLazyQuery } from '@apollo/react-hooks';
import { mostrarError } from '../Alertas/Error';
import { mostrarExito } from '../Alertas/Exito';


let funcionarioContextVacaciones = createContext();
let { Provider, Consumer } = funcionarioContextVacaciones;

function FuncionarioProviderVacaciones({ children }) {
    let [funcionario, guardarFuncionario] = useState({});
    const [obtenerFuncionario, { data, loading: loadingFuncionario }] = useLazyQuery(OBTENER_FUNCIONARIO, {
        pollInterval: 2000,
        onCompleted: () => {
            mostrarExito('Funcionario Encontrado')
            guardarFuncionario({ ...data.obtenerFuncionario })
        },
        onError: () => {
            guardarFuncionario({});
            mostrarError('Funcionario no existe');
        }
    });

    useEffect(() => {
        if (!data) return;
        guardarFuncionario({ ...data.obtenerFuncionario })
    }, [data])

    return (
        <Provider value={{ funcionario, guardarFuncionario, obtenerFuncionario, loadingFuncionario }}>
            {children}
        </Provider>
    )
}

export { FuncionarioProviderVacaciones, Consumer as FuncionarioConsumerVacaciones, funcionarioContextVacaciones }
