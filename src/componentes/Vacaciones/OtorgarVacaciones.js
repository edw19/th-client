import React, { useState, useContext } from 'react';
import { withRouter } from 'react-router-dom';
import Cedula2 from '../Cedula2';
import Error, { mostrarError } from '../Alertas/Error';
import Exito, { mostrarExito } from '../Alertas/Exito';
import { funcionarioContext2 } from '../Context/FuncionarioContext2';
import { Calendar } from 'primereact/calendar';
import { periodoContext } from '../Context/PeriodoContext';
import { useMutation } from '@apollo/react-hooks';
import moment from 'moment';
import { GUARDAR_VACACION } from '../../mutation';
import 'moment/locale/es';
moment.locale('es');

let es = {
    firstDayOfWeek: 1,
    dayNames: ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"],
    dayNamesShort: ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"],
    dayNamesMin: ["D", "L", "M", "X", "J", "V", "S"],
    monthNames: ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"],
    monthNamesShort: ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"],
    today: 'Hoy',
    clear: 'Limpiar',
    dateFormat: 'dd/mm/yy',
    weekHeader: 'Sm'
};

export default withRouter(function OtorgarVacaciones(props) {

    const { funcionario } = useContext(funcionarioContext2);
    const { periodoSeleccionado } = useContext(periodoContext);
    const [diasSolicitados, guardarDiasSolicitados] = useState(0);
    const [fecha, guardarFecha] = useState(null);
    const [guardarVacacion] = useMutation(GUARDAR_VACACION);

    const guardarVacaciones = async e => {
        e.preventDefault();
        if (diasSolicitados > funcionario.diasAFavor) return mostrarError('Días de vacaciones es mayor a dás hábiles');
        if (diasSolicitados === 0) return mostrarError('Asigna el número de días de vacaciones');
        const { data } = await guardarVacacion({
            variables: {
                input: {
                    funcionario: funcionario.id,
                    periodo: periodoSeleccionado.id,
                    fechaSalida: fecha[0],
                    fechaEntrada: fecha[1],
                    diasSolicitados
                }
            }
        });
        guardarDiasSolicitados(0);
        guardarFecha(null);
        mostrarExito(data.guardarVacacion);
        props.history.push('/dashboard/administrar-vacaciones')
    }

    const rangoVacaciones = e => {
        const fechaInicial = moment(e.value[0]);
        const fechaFinal = moment(e.value[1]);
        guardarFecha(e.value);
        guardarDiasSolicitados(Number(fechaFinal.diff(fechaInicial, 'days') + 1));
    };

    return (
        <div className="ml-5">
            <h2>Otorgar Vacaciones</h2>
            <form onSubmit={guardarVacaciones} noValidate>
                <div className="row mt-4">
                    <div className="col-8">
                        <div className="row">
                            <Cedula2
                                mostrarError={mostrarError}
                                mostrarExito={mostrarExito}
                            />
                        </div>
                        {Object.keys(funcionario).length > 0 ?
                            <div className="row mt-3">
                                <div className="col-8">
                                    <div className="row mt-3">
                                        <div className="col">
                                            <strong className="text-uppercase"> Solicita {funcionario.genero === 'MASCULINO' ? 'EL' : 'LA'}  {funcionario.cargoFuncionario + ': '} </strong>
                                            <br />
                                            {funcionario.nombre}{' '}
                                            {funcionario.segundoNombre}{' '}
                                            {funcionario.apellido}{' '}
                                            {funcionario.segundoApellido}
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col mt-4 text-center">
                                            <h3>Días hábiles</h3>
                                        </div>
                                        <div className="col">
                                            <strong style={{ fontSize: 50 }}>{funcionario.diasAFavor}</strong>
                                            {funcionario.diasAFavor === 1 ? 'día' : 'días'}
                                        </div>
                                    </div>
                                    <div className="row mt-4">
                                        <div className="col">
                                            <p>Selecciona un período de vacaciones</p>
                                        </div>
                                        <div className="col">
                                            <Calendar placeholder="Click aquí" locale={es} value={fecha} onChange={rangoVacaciones} selectionMode="range" readOnlyInput={true} />
                                        </div>
                                    </div>
                                    <div className="row mt-3">
                                        <div className="col text-center">
                                            <h3>Días Solicitados</h3>
                                        </div>
                                        <div className="col">
                                            <strong style={{ fontSize: 50 }}>{diasSolicitados > 0 ? diasSolicitados : 0}</strong>
                                            {diasSolicitados === 1 ? 'día' : 'días'}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-4 text-left">
                                    {funcionario && <img src={`http://localhost:5000/imagenes/${funcionario.nombreImagen}`} width="200px" height="200px" alt={`${funcionario.nombre} ${funcionario.apellido}`} />}
                                </div>
                                <div className="col-6">
                                    <button type="submit" className="btn btn-outline-success btn-bg btn-block mt-5">
                                        Enviar
                                    </button>
                                </div>
                            </div> : null
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
