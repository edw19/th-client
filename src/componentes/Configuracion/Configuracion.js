import React, { useState, useContext } from 'react';
import { periodoContext } from '../Context/PeriodoContext';
import Periodos from './Periodos';
import { Calendar } from 'primereact/calendar';
import { CREAR_PERIODO } from '../../mutation';
import { useMutation } from '@apollo/react-hooks';
import Error, { mostrarError } from '../Alertas/Error';
import Exito, { mostrarExito } from '../Alertas/Exito';
import moment from 'moment';
import 'moment/locale/es';
import Spinner from '../Spinner';
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

export default function Configuracion() {

    const { periodos, loading } = useContext(periodoContext)
    const [nombre, guardarNombre] = useState('Período ');
    const [fecha, guardarFecha] = useState(null);
    const [crearPeriodo] = useMutation(CREAR_PERIODO);

    const rangoVacaciones = e => {
        guardarFecha(e.value);
        if (e.value[0] && nombre.length <= 8) {
            console.log(moment(e.value[0]).format('D'))
            guardarNombre(nombre => nombre + moment(e.value[0]).format('D') + " " + moment(e.value[0]).format('MMMM') + " " + moment(e.value[0]).format('YYYY'))
        }
        if (e.value[1]) {
            guardarNombre(nombre => nombre + " - " +  moment(e.value[1]).format('D') + " "  + moment(e.value[1]).format('MMMM') + " " + moment(e.value[1]).format('YYYY'))
        }

    };

    const crearPeriodoFuncion = async e => {
        e.preventDefault();
        if(fecha[0] === null || fecha[1] === null) return mostrarError("Seleccione un rango correcto para el periodo")
        try {
            const { data } = await crearPeriodo({
                variables: {
                    nombre: nombre.replace('Período ', ''),
                    fechaInicio: fecha[0],
                    fechaFinal: fecha[1]
                }
            });
            mostrarExito(data.crearPeriodo);
            guardarNombre('Periodo ');
            guardarFecha(null)
        } catch (error) {
            mostrarError(error)
        }
    }

    return (
        <div className="ml-5">
            <h2>Configuración Período</h2>
            <div className="row">
                <div className="col-9">
                    <div className="border pl-2 pr-2 pt-3 mt-4">
                        <form onSubmit={crearPeriodoFuncion} className="form-row">
                            <div className="ml-5 col-4 mb-2">
                                <h6>{nombre}</h6>
                            </div>
                            <div className="ml-2 form-group mb-2">
                                <Calendar
                                    placeholder="Seleccione aquí"
                                    dateFormat="dd/mm/yy"
                                    locale={es}
                                    value={fecha}
                                    onChange={rangoVacaciones}
                                    numberOfMonths={4}
                                    selectionMode="range"
                                    readOnlyInput={true}
                                />
                            </div>
                            <button disabled={!nombre || !fecha ? true : false} className="ml-2 btn btn-outline-success mb-2">Crear Período</button>
                        </form>
                        {
                            loading ? <Spinner /> :
                                <Periodos
                                    periodos={periodos}
                                />
                        }
                    </div>
                </div>
                <div className="col-3">
                    <Exito />
                    <Error />
                </div>
            </div>
        </div>
    )
}
