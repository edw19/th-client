import React from 'react';
import CedulaContrato from '../Cedula/CedulaContratos';
import Error, { mostrarError } from '../Alertas/Error';
import Exito, { mostrarExito } from '../Alertas/Exito';
import { contratosContext } from '../Context/ContratosContext';
import { ELIMINAR_CONTRATO } from '../../mutation';
import { useMutation } from '@apollo/react-hooks';
import moment from 'moment';
import Spinner from '../Spinner';
import Paginador from './Paginador';
import Noty from 'noty';
import SinContratos from './SinContratos';
import { Link } from 'react-router-dom';
import { periodoContext } from '../Context/PeriodoContext';
import SinPeriodo from '../SinPeriodo'; 
import 'moment/locale/es';
moment.locale('es');

function AdministrarContratos() {
    const { periodoSeleccionado, loading: loadingPeriodo } = React.useContext(periodoContext)
    const { contratos, funcionario, paginador, totalContratos, loadingFuncionario, loadingContratos } = React.useContext(contratosContext)
    const [eliminarContrato, { loading: loadingEliminar }] = useMutation(ELIMINAR_CONTRATO);
    const eliminarContratoFuncion = (id, nombreArchivo) => {

        new Promise((resolve, reject) => {
            let noti = new Noty({
                type: 'info',
                layout: 'center',
                text: `<strong>¿ Quieres eliminar el registro del archivo y el documento ?</strong>`,
                theme: 'mint',
                modal: true,
                closeWith: ['button'],
                animation: {
                    open: 'animated bounceInDown',
                    close: 'animated bounceOutUp'
                },
                buttons: [
                    Noty.button('SI', 'btn btn-noti', async function () {
                        const { data } = await eliminarContrato({
                            variables: {
                                id,
                                nombreArchivo
                            }
                        });
                        mostrarExito(data.eliminarContrato);
                        return resolve(noti.close())
                    }),

                    Noty.button('NO', 'btn btn-error btn-noti-no', function () {
                        noti.close();
                        return reject(mostrarError('No se elimino ningun registro'))
                    })
                ]
            }).show()
        }).catch(error => {
            console.log(error)
        })
    }

    return (
        <div className="ml-5">
            <h2>Administrar Documentos</h2>
            <div className="row">
                {
                    loadingPeriodo ? <Spinner /> : periodoSeleccionado ?
                        <>
                            <div className="col-9">
                                <div className="row">
                                    <div className="col-6">
                                        <CedulaContrato
                                            mostrarError={mostrarError}
                                            mostrarExito={mostrarExito}
                                        />
                                    </div>
                                    <div className="col-12 mt-2">
                                    </div>
                                    <div className="col-12">
                                        {
                                            Object.keys(funcionario).length > 0 ?

                                                <div className="d-flex justify-content-between pb-2">
                                                    {
                                                        loadingFuncionario ? <Spinner /> : <>
                                                            <h6 className="mt-3">Documentos
                                                        {funcionario.genero === "MASCULINO" ? " del " : " de la "}
                                                                {funcionario.cargoFuncionario}
                                                                {` ${funcionario.nombre} ${funcionario.segundoNombre} ${funcionario.apellido} ${funcionario.segundoApellido}`}</h6>
                                                            <Link to="/dashboard/nuevo-contrato" className="btn btn-primary">Añadir +</Link>
                                                        </>
                                                    }
                                                </div>
                                                : null
                                        }

                                        <table className="table table-hover text-center">
                                            <thead className="thead-dark">
                                                <tr>
                                                    <th>Nombre archivo</th>
                                                    <th>Tipo</th>
                                                    <th>Período</th>
                                                    <th>Contrato</th>
                                                    <th>Nombramiento</th>
                                                    <th>Inicio de Actividades</th>
                                                    <th>Acciones</th>
                                                </tr>
                                            </thead>
                                            <tbody >
                                                {
                                                    loadingContratos && <tr>
                                                        <td colSpan="7">
                                                            <Spinner />
                                                        </td>
                                                    </tr>
                                                }
                                                {
                                                    Object.keys(funcionario).length > 0 ?
                                                        Object.keys(contratos).length > 0 ?
                                                            contratos.map(doc => (
                                                                <tr key={doc.id}>
                                                                    <td>{doc.nombreArchivo}</td>
                                                                    <td>{doc.tipoContrato}</td>
                                                                    <td>{doc.nombrePeriodo}</td>
                                                                    <td>{doc.contrato ? "Si" : "No"}</td>
                                                                    <td>{doc.nombramiento ? "Si" : "No"}</td>
                                                                    <td>{doc.fechaInicioActividades ? moment(doc.fechaInicioActividades).format('LL') : 'No es nombramiento'}</td>
                                                                    <td className="d-flex justify-content-beetween">
                                                                        <a href={`http://localhost:5000/contratos/${doc.nombreArchivo}`} className="text-decoration-none" target="_blank" rel="noopener noreferrer" >
                                                                            <li className="pi pi-eye mr-3" style={{ 'fontSize': '2em' }}></li>
                                                                        </a>
                                                                        <li onClick={() => eliminarContratoFuncion(doc.id, doc.nombreArchivo)} className="pi pi-trash mr-3" style={{ 'fontSize': '2em', color: 'red' }}>
                                                                            {loadingEliminar ? 'Eliminando..' : null}
                                                                        </li>
                                                                    </td>
                                                                </tr>
                                                            )) :
                                                            <tr>
                                                                <td colSpan="7"><SinContratos /></td>
                                                            </tr> : null
                                                }
                                            </tbody>
                                        </table>
                                        {
                                            Object.keys(contratos).length > 0 &&
                                            <div className="container">
                                                <Paginador
                                                    totalContratos={totalContratos}
                                                    paginador={paginador}
                                                />
                                            </div>
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="col-3">
                                <Error />
                                <Exito />
                                {
                                    Object.keys(funcionario).length > 0 & funcionario.nombreImagen !== null ?
                                    <>
                                        <img
                                            width="250px"
                                            height="250px"
                                            className="img-fluid rounded rounded-circle"
                                            src={`http://localhost:5000/imagenes/${funcionario.nombreImagen}`}
                                            alt={`${funcionario.nombre} ${funcionario.apellido}`}
                                        />
                                    </> : null
                                }
                            </div>
                        </> : <SinPeriodo />
                }
            </div>
        </div >
    )
}

export default AdministrarContratos
