import React, { useState, useEffect } from 'react';

export default function PaginadorVacaciones({ paginador, totalContratos }) {
    const [paginas, guardarPaginas] = useState(0);
    const [actual, guardarActual] = useState(1);

    useEffect(() => {
        const res = Math.ceil(Number(totalContratos / 5));
        if (isNaN(res)) {
            guardarPaginas(1)
        } else {
            guardarPaginas(res)
        }
    }, [totalContratos]);
    return (
        <>
            <hr />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-6">
                        <p className="text-uppercase">Pág Actual: {actual} de {paginas} Págs </p>
                        <p className="text-uppercase">Total Documentos: {totalContratos}</p>
                    </div>
                    <div className="col-6">
                        {
                            actual > 1 ?
                                <button
                                    onClick={() => { paginador("-"); guardarActual(actual - 1) }}
                                    className="btn btn-outline-info mr-5"
                                >&laquo; Anterior</button> : null
                        }
                        {
                            paginas !== 1 ?
                                <button
                                    onClick={() => { paginador("+"); guardarActual(actual => actual + 1) }}
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
