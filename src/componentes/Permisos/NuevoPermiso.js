import React, { useState, useEffect, useContext } from 'react'
import Error, { mostrarError } from '../Alertas/Error'
import Exito, { mostrarExito } from '../Alertas/Exito'
import { OBTENER_FUNCIONARIO } from '../../queries'
import { useLazyQuery, useMutation } from '@apollo/react-hooks'
import { CREAR_PERMISO } from '../../mutation'
import { Calendar } from 'primereact/calendar';
import { withRouter } from 'react-router-dom'
import { Spinner } from 'primereact/spinner';
import Cedula from '../Cedula'
import { funcionarioContext2} from '../Context/FuncionarioContext2';
import { periodoContext } from '../Context/PeriodoContext';
import moment from 'moment'
import 'moment/locale/es'
moment.locale('es')

export default withRouter(function NuevoPermiso(props) {
    const { funcionario: FuncionarioEnNuevoPermisos, guardarFuncionario } = useContext(funcionarioContext2);
    const [cedula, setCedula] = useState(FuncionarioEnNuevoPermisos.cedula ? FuncionarioEnNuevoPermisos.cedula : '')
    const { periodoSeleccionado } = useContext(periodoContext);
    const [motivo, setMotivo] = useState('')
    const [horaSalida, setHoraSalida] = useState(new Date())
    const [horasPermiso, setHorasPermiso] = useState(0)
    const [minutosPermiso, setMinutosPermiso] = useState(0)
    const [horaEntrada, setHoraEntrada] = useState(new Date())
    let [funcionario, setFuncionario] = useState(null)
    let [obtenerFuncionario, { loading, data }] = useLazyQuery(OBTENER_FUNCIONARIO, {
        onError: (error) => {
            setFuncionario(null);
            mostrarError(error.graphQLErrors[0].message.toString());
        },
        onCompleted: () => {
            mostrarExito('Se ha Encontrado al Funcionario')
            setFuncionario({ ...data })

        },
        pollInterval: 500
    });
    const [crearPermiso] = useMutation(CREAR_PERMISO, {
        onError: error => {
            mostrarError(error.graphQLErrors[0].message);
        },
        onCompleted: data => {
            mostrarExito(data.crearPermiso);
            limpiarEstado();
            guardarFuncionario({...funcionario.obtenerFuncionario})
            props.history.push('/dashboard/administrar-permisos');

        }
    })

    useEffect(() => {
        if (horasPermiso === 0 || minutosPermiso === 0) setHoraEntrada(horaSalida)
        setHoraEntrada(moment(horaSalida).add(horasPermiso, 'hours').add(minutosPermiso, 'minutes').format('HH:mm'))
    }, [horasPermiso, horaSalida, minutosPermiso]);


    const limpiarEstado = () => {
        setCedula('')
        setMotivo('')
        setHoraSalida(new Date())
        setHorasPermiso(0)
        setMinutosPermiso(0)
        setHoraEntrada(null)    
        setFuncionario(null)
    }

    const validaformulario = () => {
        const noValido = !cedula || !motivo || !horaSalida;
        return noValido;
    }


    const guardarPermiso = e => {
        e.preventDefault();
        if (!horasPermiso && !minutosPermiso) return mostrarError('Debes Asignar un tiempo de permiso al funcionario')
        let input = {
            funcionario: funcionario.obtenerFuncionario.id,
            periodo: periodoSeleccionado.id,
            horaSalida: horaSalida.toString(),
            horasPermiso,
            minutosPermiso,
            motivo,
            estado: true
        }
        crearPermiso({
            variables: { input }
        })
    }
    if (loading) return <Spinner />
    return (
        <div className="ml-5">
            <h2>Nuevo Permiso </h2>
            <form onSubmit={guardarPermiso}>
                <div className="row mt-4">
                    <div className="col-8">
                        <div className="row">
                            <Cedula
                                mostrarError={mostrarError}
                                cedula={cedula}
                                setCedula={setCedula}
                                obtenerFuncionario={obtenerFuncionario}
                            />
                        </div>
                        {funcionario !== null ?
                            <div className="row mt-3">
                                <div className="col-8">
                                    <div className="row">
                                        <div className="col">
                                            <strong className="text-uppercase"> Solicita {funcionario.obtenerFuncionario.genero === 'MASCULINO' ? 'EL' : 'LA'}  {funcionario.obtenerFuncionario.cargoFuncionario + ': '} </strong>
                                            {funcionario.obtenerFuncionario.nombre}{' '}
                                            {funcionario.obtenerFuncionario.segundoNombre}{' '}
                                            {funcionario.obtenerFuncionario.apellido}{' '}
                                            {funcionario.obtenerFuncionario.segundoApellido}
                                        </div>
                                    </div>
                                    <div className="row mt-3 mb-3">
                                        <div className="col-9">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Motivo del permiso"
                                                value={motivo}
                                                onChange={e => setMotivo(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="row mt-3">
                                        <div className="col">
                                            <strong className="text-uppercase">Hora de Salida</strong>
                                            {<br />}
                                            <Calendar
                                                value={horaSalida}
                                                onChange={e => {
                                                    setHoraSalida(e.target.value)
                                                }}
                                                timeOnly={true}
                                                hourFormat="24"
                                            />
                                        </div>
                                        <div className="col">
                                            {<br />}
                                            <Spinner
                                                value={minutosPermiso}
                                                size={8}
                                                onChange={e => {
                                                    setMinutosPermiso(e.value);
                                                }}
                                                step={5}
                                                min={0}
                                                max={55}
                                            />
                                            <strong className="text-uppercase">{'  '}Minutos de Permiso</strong>
                                            {<br />}
                                            <Spinner
                                                value={horasPermiso}
                                                size={8}
                                                onChange={e => {
                                                    setHorasPermiso(e.value);
                                                }}
                                                min={0}
                                                max={8}
                                            />
                                            <strong className="text-uppercase">{'  '}Horas de Permiso</strong>
                                        </div>
                                    </div>
                                    <div className="row mt-3">
                                        <div className="col">
                                            <strong className="text-uppercase">hora de Entrada: </strong>
                                            {horaEntrada}
                                        </div>
                                        <div className="col">
                                            <strong className="text-uppercase">Total horas de permiso: </strong>
                                            <p>
                                                {horasPermiso + ' horas y '}
                                                {minutosPermiso + ' minutos'}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-6">
                                            <input
                                                type="submit"
                                                value="Guardar Permiso"
                                                className="btn btn-outline-success"
                                                disabled={validaformulario()}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-4 text-left">
                                    {funcionario && <img src={`http://localhost:5000/imagenes/${funcionario.obtenerFuncionario.nombreImagen}`} width="200px" height="200px" alt={`${funcionario.obtenerFuncionario.nombre} ${funcionario.obtenerFuncionario.apellido}`} />}

                                </div>
                            </div> : ''
                        }
                    </div>
                    <div className="col-4">
                        <Exito />
                        <Error />
                    </div>
                </div>
            </form>
        </div>
    )
});
