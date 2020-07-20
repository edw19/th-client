import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MenuSuperior from './MenuSuperior';
import '../css/simple-sidebar.css';
import Logo from '../materiales/logo.svg'

function MenuIzquierdo() {
    let [clase, setClase] = useState("d-flex");
    const cambiarClase = () => {
        if (clase === "d-flex") {
            setClase("d-flex toggled");
        } else {
            setClase("d-flex");
        }
    }
    return (
        <div className={clase} id="wrapper">
            <div className="bg-light border-right" id="sidebar-wrapper">
                <div className="sidebar-heading text-center">
                    <h1 className="font-weight-light">UPEC</h1>
                    <img src={Logo} className="mt-5 mb-3 img-fluid" width="250px" height="250px" alt="logo talento humano, extracción de datos" />
                    <h6 className="font-weight-light" style={{fontSize: '18px'}}>Departamento de talento humano</h6>
                </div>
                <div className="sidenav list-group list-group-flush">
                    <Link to="/dashboard" className="list-group-item list-group-item-action bg-light"><i className="pi pi-chart-bar" style={{ fontSize: '2em' }}></i> Panel de Control</Link>
                    <Link to="/dashboard/administrar-permisos" className="list-group-item list-group-item-action bg-light"><i className="pi pi-ticket" style={{ fontSize: '2em' }}></i> Administrar Permisos</Link>
                    <Link to="/dashboard/administrar-vacaciones" className="list-group-item list-group-item-action bg-light"><i className="pi pi-calendar" style={{ fontSize: '2em' }}></i> Administrar Vacaciones</Link>
                    <Link to="/dashboard/administrar-contratos" className="list-group-item list-group-item-action bg-light"><i className="pi pi-file-pdf" style={{ fontSize: '2em' }}></i>Documentos</Link>
                    <Link to="/dashboard/administrar-funcionarios" className="list-group-item list-group-item-action bg-light"><i className="pi pi-user-minus" style={{ fontSize: '2em' }} ></i> Funcionarios</Link>
                    <Link to="/dashboard/configuracion-periodo" className="list-group-item list-group-item-action bg-light"><i className="pi pi-tags" style={{ fontSize: '2em' }}></i> Configuración Período</Link>
                    <Link to="/dashboard/configuracion-usuario" className="list-group-item list-group-item-action bg-light"><i className="pi pi-user" style={{ fontSize: '2em' }}></i> Administrador </Link>
                </div>
            </div>
            <MenuSuperior
                cambiarClase={cambiarClase}
            />
        </div>
    )
}

export default MenuIzquierdo