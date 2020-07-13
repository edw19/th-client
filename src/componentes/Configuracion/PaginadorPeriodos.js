import React, { useContext, useState, useEffect } from 'react';
import { periodoContext } from '../Context/PeriodoContext';

export default function PaginadorPeriodos({ totalPeriodos }) {
    const { paginador, actual, guardarActual } = useContext(periodoContext);
    const [paginas, guardarPaginas] = useState(0);
    useEffect(() => {
        const res = Math.ceil(Number(totalPeriodos / 4));
        if (isNaN(res)) {
            guardarPaginas(1)
        } else {
            guardarPaginas(res)
        }
    }, [totalPeriodos]);

    return (
        <>
            <hr />
            <div className="container">
                <div className="row">
                    <h5>Pág {actual} de {paginas}</h5>
                    <div className="col d-flex justify-content-center mb-2">
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
};