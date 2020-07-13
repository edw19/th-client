import React from 'react';
import ImagenSinPermisos from '../materiales/sinPermisos.svg'

function SinPermisos() {
    return (
        <div className="container mt-5">
            <img className="card-img-top" width="100%" height="300px" src={ImagenSinPermisos} alt="selecciona un período" />
            <div className="card-body">
                <h5 className="card-title">Funcionario sin permisos en este período</h5>
                <p className="card-text">Genial este funcionario no ha solicitado permisos.</p>
                <p className="card-text">Demuestra compromiso y organización en sus actividades</p>
            </div>
        </div>
    )
}

export default SinPermisos
