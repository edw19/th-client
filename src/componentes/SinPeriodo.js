import React from 'react';
import ImagenSinPerdiodo from './materiales/sinPeriodo.svg';
import { Link } from 'react-router-dom';

function SinPeriodo() {
    return (
        <div className="container mt-5">
            <img className="card-img-top" width="100%" height="300px" src={ImagenSinPerdiodo} alt="selecciona un período" />
            <div className="card-body">
                <h5 className="card-title">Configuración Inicial</h5>
                <p className="card-text">Crea un período y seleccionalo como período vigente</p>
                <Link to="/dashboard/crear-periodo" className="btn btn-primary">Crear Período</Link>
            </div>
        </div>
    )
}

export default SinPeriodo
