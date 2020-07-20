import React, { useContext } from 'react'
import { Route, Switch } from 'react-router-dom'
import '../css/simple-sidebar.css';
import { periodoContext } from '../Context/PeriodoContext';

// importar componentes
import Dashboard from '../Dashboard/Dashboard'
import AdministrarPermisos from '../Permisos/AdministrarPermisos';
import NuevoPermiso from '../Permisos/NuevoPermiso';
import CerrarSession from '../Auth/CerrarSession'
import { RutasPrivadas } from '../Auth/RutasPrivadas'
import NuevoFuncionario from '../Funcionarios/NuevoFuncionario'
import AdministrarFuncionarios from '../Funcionarios/AdministrarFuncionarios'
import EditarFuncionario from '../Funcionarios/EditarFuncionario';
import AdministrarVacaiones from '../Vacaciones/AdministrarVacaciones';
import OtorgarVacaciones from '../Vacaciones/OtorgarVacaciones';
import Configuracion from '../Configuracion/Configuracion';
import moment from 'moment';
import 'moment/locale/es';
import DescontarPermisos from '../Permisos/DescontarPermisos';
import AdministrarContratos from '../Contratos/AdministrarContratos';
import NuevoContrato from '../Contratos/NuevoContrato';
import Usuario from '../Usuario/Usuario';
import Editar from '../Usuario/Editar';
moment.locale('es');

function MenuSuperior({ cambiarClase }) {
    const { loading, periodoSeleccionado } = useContext(periodoContext);

    return (
        <div id="page-content-wrapper">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <button className="btn btn-link" id="menu-toggle" onClick={cambiarClase} ><li className="pi pi-list" style={{ 'fontSize': '2em' }}></li></button>
                    </div>
                    <div>

                        {
                            loading ?
                                <div className="loader">Loading...</div> :
                                <div className="text-center">
                                    {
                                        periodoSeleccionado ? `Duración aproximada del período, ${moment(periodoSeleccionado.fechaFinal).diff(moment(periodoSeleccionado.fechaInicio), 'months') + 1} mes ` : null
                                    }
                                    <h6>{periodoSeleccionado && periodoSeleccionado.nombre}</h6>
                                </div>
                        }
                    </div>
                    <ul className="nav navbar-nav navbar-right">
                        <CerrarSession />
                    </ul>
                </div>
            </nav>
            <div className="container-main mt-3">
                <Switch>
                    <RutasPrivadas exact path="/dashboard" component={() => <Dashboard />} />
                    {/* permisos */}
                    <RutasPrivadas exact path="/dashboard/administrar-permisos" component={() => <AdministrarPermisos />} />
                    <RutasPrivadas exact path="/dashboard/nuevo-permiso" component={() => <NuevoPermiso />} />
                    <RutasPrivadas exact path="/dashboard/descontar-permisos" component={() => <DescontarPermisos />} />
                    {/* //funcionario */}
                    <RutasPrivadas exact path="/dashboard/administrar-funcionarios" component={() => <AdministrarFuncionarios />} />
                    <RutasPrivadas exact path="/dashboard/nuevo-funcionario" component={() => <NuevoFuncionario />} />
                    <RutasPrivadas exact path="/dashboard/editar-funcionario" component={() => <EditarFuncionario />} />
                    {/* Vacaciones */}
                    <RutasPrivadas exact path="/dashboard/administrar-vacaciones" component={() => <AdministrarVacaiones />} />
                    <RutasPrivadas exact path="/dashboard/otorgar-vacaciones" component={() => <OtorgarVacaciones />} />
                    <RutasPrivadas exact path="/dashboard/configuracion-periodo" component={() => <Configuracion />} />
                    {/* Contratos */}
                    <RutasPrivadas exact path="/dashboard/administrar-contratos" component={() => <AdministrarContratos />} />
                    <RutasPrivadas exact path="/dashboard/nuevo-contrato" component={() => <NuevoContrato />} />
                    {/* Usuario */}
                    <RutasPrivadas exact path="/dashboard/configuracion-usuario" component={() => <Usuario />} />
                    <RutasPrivadas exact path="/dashboard/editar-usuario" component={() => <Editar />} />
                    <Dashboard />
                    <Route path='*' render={() => "404 not found"} />
                </Switch>
            </div>
        </div>
    )
}

export default MenuSuperior;
