import React, { useState, useContext } from 'react';
import { funcionarioContratosContext } from '../Context/FuncionarioContratosContext';
import SubirContrato from './SubirContrato';
import Error, { mostrarError } from '../Alertas/Error';
import Exito, { mostrarExito } from '../Alertas/Exito';
import { RadioButton } from 'primereact/radiobutton';
import { periodoContext } from '../Context/PeriodoContext';
import { Calendar } from 'primereact/calendar';
import { useMutation } from '@apollo/react-hooks';
import { GUARDAR_CONTRATO } from '../../mutation';
import { withRouter } from 'react-router-dom';

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


function NuevoContrato(props) {
    const { funcionario } = useContext(funcionarioContratosContext);
    const { periodoSeleccionado } = useContext(periodoContext);
    const [guardarContrato, { loading }] = useMutation(GUARDAR_CONTRATO)
    const [nombramiento, guardarNombramiento] = useState(false);
    const [permanente, guardarPermanente] = useState(false);
    const [inicioActividades, guardarInicioActividades] = useState(null);
    const [archivo, guardarArchivo] = useState(null);
    const [archivosAceptado, guardarArchivosAceptado] = useState(true)


    const subirContratoSubmit = async e => {
        e.preventDefault();
        if (nombramiento === true && inicioActividades === null) return mostrarError('Selecciona la fecha de Inicio de actividades');
        if (!archivo) return mostrarError('Selecciona el archivo del documento');

        let input = {
            funcionario: funcionario.id,
            periodo: periodoSeleccionado.id,
            nombrePeriodo: periodoSeleccionado.nombre,
            nombreArchivo: archivo.name,
            archivo,
            tipoContrato: permanente ? 'PERMAMENTE' : 'OCASIONAL',
            contrato: nombramiento ? false : true,
            nombramiento: nombramiento ? true : false,
            fechaInicioActividades: nombramiento ? inicioActividades : ''
        }
        try {
            const { data } = await guardarContrato({
                variables: {
                    input
                }
            });
            mostrarExito(data.guardarContrato);
            guardarInicioActividades(null);;
            guardarArchivo(null);
            guardarArchivosAceptado(false);
            if(!loading){
                props.history.push('/dashboard/administrar-contratos')
            }

        } catch (error) {
            console.log(error)
            throw error;
        }
    }

    return (
        <div className="ml-5">
            <h2>Nuevo Documento</h2>
            <div className="row">
                <div className="col-9">
                    <div className="row">
                        <div className="col-6 text-left mt-3">
                            <form onSubmit={e => subirContratoSubmit(e)}>
                                {
                                    Object.keys(funcionario).length > 0 && (
                                        <div className="border p-5">
                                            <h5 className="font-weight-light">
                                                {funcionario.cargoFuncionario}
                                                <small>
                                                    {` ${funcionario.nombre} ${funcionario.segundoNombre} ${funcionario.apellido} ${funcionario.segundoApellido}`}
                                                </small>
                                                <img width="50px" height="50px" className="ml-5" src={`http://localhost:5000/imagenes/${funcionario.nombreImagen}`} alt={`${funcionario.nombreImagen}`} />
                                            </h5 >
                                            <h5 className="font-weight-light mt-2" >
                                                Periodo <small> {periodoSeleccionado.nombre}</small>
                                            </h5>
                                            <div className="mt-3">
                                                <h5 className="font-weight-light" >Es un</h5>
                                                <div className="d-flex justify-content-start mt-3">
                                                    <RadioButton
                                                        inputId="rb2"
                                                        name="city"
                                                        value="Permanente"
                                                        onChange={() => guardarNombramiento(false)}
                                                        checked={nombramiento ? false : true}
                                                    />
                                                    <label
                                                        htmlFor="rb2"
                                                        className="p-radiobutton-label pr-5"
                                                    >Contrato</label>
                                                    <RadioButton
                                                        inputId="rb1"
                                                        name="city"
                                                        value="Ocacional"
                                                        onChange={() => guardarNombramiento(true)}
                                                        checked={nombramiento}
                                                    />
                                                    <label
                                                        htmlFor="rb1"
                                                        className="p-radiobutton-label"
                                                    >Nombramiento</label>
                                                </div>
                                                {
                                                    nombramiento ?
                                                        <div className="mt-3">
                                                            <Calendar placeholder="Inicio Actividades" locale={es} value={inicioActividades} onChange={e => guardarInicioActividades(e.value)} readOnlyInput={true} />
                                                        </div> : null
                                                }
                                            </div>
                                            <div className="mt-3">
                                                <h5 className="font-weight-light" >Tipo de Contrato</h5>
                                                <div className="d-flex justify-content-start mt-3">
                                                    <RadioButton
                                                        inputId="rb3"
                                                        name="city"
                                                        value="Permanente"
                                                        onChange={() => guardarPermanente(false)}
                                                        checked={permanente ? false : true}
                                                    />
                                                    <label
                                                        htmlFor="rb3"
                                                        className="p-radiobutton-label pr-5"
                                                    >Ocacional</label>
                                                    <RadioButton
                                                        inputId="rb4"
                                                        name="city"
                                                        value="Ocacional"
                                                        onChange={() => guardarPermanente(true)}
                                                        checked={permanente}
                                                    />
                                                    <label
                                                        htmlFor="rb4"
                                                        className="p-radiobutton-label"
                                                    >Permanente</label>
                                                </div>
                                            </div>
                                            <div className="d-flex justify-content-end mt-5">
                                            <button type="submit" className="btn btn-outline-success btn-lg btn-block">{loading ? 'SUBIENDO....' : 'Subir'}</button>
                                            </div>
                                        </div>)
                                }
                            </form>
                        </div>
                        <div className="col-6 mt-3">
                            <SubirContrato
                                mostrarError={mostrarError}
                                mostrarExito={mostrarExito}
                                guardarArchivo={guardarArchivo}
                                guardarArchivosAceptado={guardarArchivosAceptado}
                                archivosAceptado={archivosAceptado}
                            />
                        </div>
                    </div>
                </div>
                <div className="col-3">
                    <Error />
                    <Exito />
                </div>
            </div>
        </div>
    )
}

export default withRouter(NuevoContrato);
