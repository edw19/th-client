import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import { DESCONTAR_PERMISOS } from '../../mutation'

function DescontarPermisos({ diasAFavor, horasAcumuladas,
    minutosAcumulados, totalPermisos, idFuncionario, periodoSeleccionado, mostrarError, mostrarExito }) {

    const [descontarPermisos] = useMutation(DESCONTAR_PERMISOS);

    const funcionDescontarPermisos = async () => {
        try {
            const { data } = await descontarPermisos({
                variables: {
                    funcionario: idFuncionario,
                    periodo: periodoSeleccionado.id,
                    diasAFavor,
                    horasAcumuladas,
                    minutosAcumulados,
                    dias: totalPermisos.totalDias,
                    horas: totalPermisos.totalHoras,
                    minutos: totalPermisos.totalMinutos
                }
            });
            mostrarExito(data.descontarPermisos)
        } catch (error) {
            mostrarError(error.message);
            throw error;
        }
    }

    return (
        <button
            disabled={totalPermisos.totalPermisos > 0 ? false : true}
            className="btn btn-outline-danger border text-decoration-none ml-1"
            onClick={() => funcionDescontarPermisos()}
        >
            Descontar
        </button>
    )
}

export default DescontarPermisos;
