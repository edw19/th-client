import React from 'react';
import { funcionarioContratosContext } from './FuncionarioContratosContext';

import { OBTENER_CONTRATOS } from '../../queries';
import { useLazyQuery } from '@apollo/react-hooks';


let contratosContext = React.createContext();
let { Provider, Consumer } = contratosContext;

function ContratosProvider({ children }) {
    let [limite] = React.useState(5);
    let [offset, setOffset] = React.useState(null);
    const [contratos, guardarContratos] = React.useState([]);
    const [totalContratos, guardarTotalContratos] = React.useState(null)
    const { funcionario, loadingFuncionario } = React.useContext(funcionarioContratosContext);

    const [obtenerContratos, { data, loading: loadingContratos, fetchMore }] = useLazyQuery(OBTENER_CONTRATOS, {
        pollInterval: 2000
    });

    React.useEffect(() => {
        if (!funcionario) return;
        obtenerContratosFuncion();

        function obtenerContratosFuncion() {
            if (funcionario.id) {
                obtenerContratos({
                    variables: {
                        funcionario: funcionario.id,
                        limite,
                        offset
                    }
                })
            }
        }
    }, [funcionario, obtenerContratos, limite, offset]);

    React.useEffect(() => {
        if (data) {
            guardarContratos([...data.obtenerContratos.contratos])
            guardarTotalContratos(data.obtenerContratos.totalContratos)
        }
    }, [data]);

    const paginador = (evaluador) => {
        let nuevoOff = offset;
        if (evaluador === "+") nuevoOff = offset + 5;
        if (evaluador === "-") nuevoOff = (nuevoOff - 5);
        fetchMore({
            variables: { id: funcionario.id, limite, offset: nuevoOff },
            updateQuery: (prev, { fetchMoreResult }) => {
                if (!fetchMoreResult) return prev;
                setOffset(nuevoOff);
                return guardarContratos([...fetchMoreResult.obtenerContratos.contratos])
            }
        });
    };

    return (
        <Provider value={{ contratos, paginador, totalContratos, funcionario, loadingFuncionario, loadingContratos }}>
            {children}
        </Provider>
    )
};

export { ContratosProvider, Consumer as ContratosConsumer, contratosContext };