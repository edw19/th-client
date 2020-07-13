import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import CedulaVacaciones from '../Cedula/CedulaVacaciones';
import Error, { mostrarError } from '../Alertas/Error';
import Exito, { mostrarExito } from '../Alertas/Exito';
import { vacacionesContext } from '../Context/VacacionesContext';
import { ELIMINAR_VACACION } from '../../mutation';
import { ACTUALIZAR_ESTADO_VACACION } from '../../mutation';
import { ACTUALIZAR_DIAS_HABILES } from '../../mutation';
import { useMutation } from '@apollo/react-hooks';
import Spinner from '../Spinner';
import PaginadorVacaciones from '../PaginadorVacaciones'
import { periodoContext } from '../Context/PeriodoContext';
import SinVacaciones from './SinVacaciones';
import Noty from 'noty';
import moment from 'moment';
import 'moment/locale/es';
import SinPeriodo from '../SinPeriodo';
moment.locale('es');

export default function AdministrarVacaciones() {

    const { vacaciones, id, loading, totalVacaciones, totalDiasDescontados, funcionario } = useContext(vacacionesContext);
    const { periodoSeleccionado, loading: loadingPeriodo } = useContext(periodoContext)
    const [eliminarVacacion] = useMutation(ELIMINAR_VACACION);
    const [actualizarEstadoVacacion] = useMutation(ACTUALIZAR_ESTADO_VACACION);
    const [actualizarDiasHabiles] = useMutation(ACTUALIZAR_DIAS_HABILES);


    const eliminarVacacionFuncion = async id => {
        new Promise((resolve, reject) => {
            let noti = new Noty({
                type: 'info',
                layout: 'center',
                text: `<strong>¿Eliminar Vacación Asignada?</strong>`,
                theme: 'mint',
                modal: true,
                closeWith: ['button'],
                animation: {
                    open: 'animated bounceInDown',
                    close: 'animated bounceOutUp'
                },
                buttons: [
                    Noty.button('SI', 'btn btn-noti', async function () {
                        const { data } = await eliminarVacacion({
                            variables: { id }
                        });
                        mostrarExito(data.eliminarVacacion);
                        return resolve(noti.close())
                    }),

                    Noty.button('NO', 'btn btn-error btn-noti-no', function () {
                        noti.close();
                        return reject(mostrarError('no se ha eliminado'))
                    })
                ]
            }).show()
        }).catch((error) => {
            console.log(error)
        })
    };

    const actualizarEstadoVacacionFuncion = async (id, idFuncionario, estado, dias) => {
        if (estado) {
            await actualizarDiasHabiles({
                variables: {
                    id: idFuncionario,
                    dias,
                    sumar: true
                }
            });
        }
        if (!estado) {
            await actualizarDiasHabiles({
                variables: {
                    id: idFuncionario,
                    dias,
                    sumar: false
                }
            });
        }
        const { data } = await actualizarEstadoVacacion({ variables: { id, estado } });

        mostrarExito(data.actualizarEstadoVacacion);
    }

    return (
        <div className="ml-5">
            <h2>Administrar Vacaciones</h2>
            <div className="row">
                {
                    loadingPeriodo ? <Spinner /> : periodoSeleccionado ?
                        <>
                            <div className="col-9">
                                <div className="row mt-3 mb-3">
                                    <div className="col d-flex justify-content-start ml-3">
                                        <Link to='/dashboard/otorgar-vacaciones' className="btn btn-link border text-decoration-none ">Otorgar Vacaciones</Link>
                                    </div>
                                    <div className="col">

                                        <CedulaVacaciones
                                            mostrarError={mostrarError}
                                            mostrarExito={mostrarExito}
                                        />
                                    </div>
                                </div>

                                {
                                    Object.keys(funcionario).length > 0 &&
                                    <div className="mr-3 d-flex justify-content-between">
                                        <h6>{funcionario.diasAFavor} días a favor</h6>
                                        <h6>Vacaciones
                                                {funcionario.genero === "MASCULINO" ? " del " : " de la "}
                                            {funcionario.tipoFuncionario}
                                            {` ${funcionario.nombre} ${funcionario.segundoNombre} ${funcionario.apellido} ${funcionario.segundoApellido}`}</h6>
                                    </div>
                                }
                                <div className="table-response">
                                    <table className="table table-hover">
                                        <thead className="thead-dark text-center">
                                            <tr>
                                                <th scope="col">Días Solicitados</th>
                                                <th scope="col">Fecha de Salida</th>
                                                <th scope="col">Fecha de entrada</th>
                                                <th scope="col">Estado</th>
                                                <th scope="col">Acciones</th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-center">
                                            {loading && (
                                                <tr>
                                                    <td></td>
                                                    <td></td>
                                                    <td><Spinner /></td>
                                                    <td></td>
                                                </tr>
                                            )}
                                            {
                                                id ? Object.keys(vacaciones).length > 0 ?
                                                    vacaciones.map(vacacion => {
                                                        return (
                                                            <tr key={vacacion.id} style={{ backgroundColor: !vacacion.estado && '#fcc162' }}>
                                                                <td>{vacacion.diasSolicitados}</td>
                                                                <td>{moment(vacacion.fechaSalida).format('LL')}</td>
                                                                <td>{moment(vacacion.fechaEntrada).format('LL')}</td>
                                                                <td><button onClick={() => actualizarEstadoVacacionFuncion(vacacion.id, id, vacacion.estado, vacacion.diasSolicitados)} className="btn btn-outline-secondary"> {vacacion.estado ? 'Restar Días' : 'Sumar Días'}</button></td>
                                                                <td><button disabled={!vacacion.estado ? false : true} onClick={() => eliminarVacacionFuncion(vacacion.id)} className="btn btn-outline-danger"> Eliminar </button></td>
                                                            </tr>
                                                        )
                                                    }
                                                    ) : <tr>
                                                        <td colSpan="5">
                                                            <SinVacaciones />
                                                        </td>
                                                    </tr>
                                                    : null
                                            }
                                        </tbody>
                                    </table>
                                    {
                                        Object.keys(vacaciones).length > 0 &&
                                        <PaginadorVacaciones
                                            totalVacaciones={totalVacaciones}
                                            totalDiasDescontados={totalDiasDescontados}
                                        />
                                    }
                                </div>
                            </div>
                            <div className="col-3">
                                <Error />
                                <Exito />
                                {
                                    Object.keys(funcionario).length > 0 &&
                                    <img
                                        width="250px"
                                        height="250px"
                                        className="img-fluid rounded rounded-circle"
                                        src={`http://localhost:5000/imagenes/${funcionario.nombreImagen}`}
                                        alt={`${funcionario.nombre} ${funcionario.apellido}`}
                                    />
                                }
                            </div>
                        </> : <SinPeriodo />
                }
            </div>
        </div >
    )
};
