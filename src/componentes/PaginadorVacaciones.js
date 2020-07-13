import React, { useState, useEffect, useContext } from 'react';
import { vacacionesContext } from './Context/VacacionesContext';

export default function PaginadorVacaciones({ totalVacaciones, totalDiasDescontados }) {
    const { paginador } = useContext(vacacionesContext);
    const [paginas, guardarPaginas] = useState(0);
    const [actual, guardarActual] = useState(1);


    useEffect(() => {
        const res = Math.ceil(Number(totalVacaciones / 5));
        if (isNaN(res)) {
            guardarPaginas(1)
        } else {
            guardarPaginas(res)
        }
    }, [totalVacaciones]);

    return (
        <>
            <hr />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-6">
                        <p className="text-uppercase">Pág Actual: {actual} de {paginas} Págs </p>
                        <p className="text-uppercase">Vacaciones Solicitadas: {totalVacaciones}</p>
                        <p className="text-uppercase">Total Días Descontados: {totalDiasDescontados}</p>
                    </div>
                    <div className="col-6">
                        {
                            actual > 1 ?
                                <button
                                    onClick={() => { paginador("-"); guardarActual(actual - 1) }}
                                    className="btn btn-outline-info mr-5"
                                >&laquo; Anterior</button> : ''
                        }
                        {
                            paginas !== 1 ?
                                <button
                                    onClick={() => { paginador("+"); guardarActual(actual + 1) }}
                                    className="btn btn-outline-info ml-5"
                                    disabled={paginas === actual ? true : false}
                                >Siguiente &raquo;</button> : ''
                        }
                    </div>
                </div>
            </div>
        </>
    )
}
