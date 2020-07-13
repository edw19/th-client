import React, { useState } from 'react'
import { GuardarImagen } from '../Imagenes/GuardarImagen'
import MostrarImagen from '../Imagenes/MostrarImagenes'
import { InputText } from 'primereact/inputtext'
import { InputTextarea } from 'primereact/inputtextarea'
import { SelectButton } from 'primereact/selectbutton'
import { Calendar } from 'primereact/calendar'
import { Dropdown } from 'primereact/dropdown'
import { RadioButton } from 'primereact/radiobutton'
import Error, { mostrarError } from '../Alertas/Error'
import Exito, { mostrarExito } from '../Alertas/Exito'
import { CREAR_FUNCIONARIO } from '../../mutation'
import { useMutation } from '@apollo/react-hooks'
import Noty from 'noty'

function NuevoFuncionario() {

    const estadoInicial = {
        cedula: '',
        nombre: '',
        segundoNombre: '',
        apellido: '',
        segundoApellido: '',
        nacionalidad: '',
        tipoVinculacion: 'PERMANENTE',
        tipoFuncionario: '',
        fechaNacimiento: '',
        tituloProfesional: '',
        genero: 'MASCULINO',
        tipoSangre: '',
        estadoCivil: '',
        discapacidadDetalles: ''
    }

    const opcionesEstadoCivil = [
        'Soltero/a',
        'Casado/a',
        'Unión Libre',
        'Separado/a',
        'Divorciado/a',
        'Viudo/a'
    ];

    const opcionesTipoFuncionario = [
        'ADMINISTRATIVO',
        'DOCENTE',
        'CÓDIGO LABORAL',
    ];

    const es = {
        firstDayOfWeek: 1,
        dayNames: ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"],
        dayNamesShort: ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"],
        dayNamesMin: ["D", "L", "M", "X", "J", "V", "S"],
        monthNames: ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"],
        monthNamesShort: ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"]
    };
    // mutations
    const [crearFuncionario] = useMutation(CREAR_FUNCIONARIO, {
        onError: () => {
            mostrarError('Funcionario ya existe.')
        },
        onCompleted: (data) => {
            mostrarExito(data.crearFuncionario)
            limpiarEstado()
        }
    });

    // state
    const [funcionario, setFuncionario] = useState(estadoInicial)
    const [discapacidad, setDiscapacidad] = useState(false)
    const [nombreImagen, setNombreImagen] = useState('')
    // funciones 
    const manejarEstado = e => {
        setFuncionario({
            ...funcionario,
            [e.target.name]: e.target.value
        })
    }


    const validarCedula = () => {
        const { cedula } = funcionario
        const noValido = cedula.length < 10
        return noValido
    }
    const manejarErrorCedula = e => {
        if (funcionario.cedula.length < 10) {
            mostrarError('El campo cédula debe ser de 10 dígitos')
        }
    }


    const validarFormulario = () => {
        const { cedula, nombre, segundoNombre, apellido, segundoApellido, nacionalidad, tipoVinculacion, tipoFuncionario, fechaNacimiento, tituloProfesional, genero, tipoSangre, estadoCivil } = funcionario
        const noValido =
            !cedula ||
            !nombre ||
            !segundoNombre ||
            !apellido ||
            !segundoApellido ||
            !nacionalidad ||
            !tipoFuncionario ||
            !tipoVinculacion ||
            !fechaNacimiento ||
            !tituloProfesional ||
            !genero ||
            !tipoSangre ||
            !estadoCivil 
        return noValido

    }

    const enviarFormulario = async (e) => {
        e.preventDefault()

        const { cedula, nombre, segundoNombre, apellido, segundoApellido, nacionalidad, tipoVinculacion, tipoFuncionario, fechaNacimiento, tituloProfesional, genero, tipoSangre, estadoCivil, discapacidadDetalles } = funcionario
        
        const diasAFavor = () => {
            if(tipoFuncionario === 'DOCENTE' && tipoVinculacion === 'OCASIONAL') return 10;
            if(tipoFuncionario === 'ADMINISTRATIVO') return 30;
            if(tipoFuncionario === 'DOCENTE') return 30;
            if(tipoFuncionario === 'CÓDIGO LABORAL') return 15
        }
        
        const input = {
            cedula,
            nombre,
            segundoNombre,
            apellido,
            segundoApellido,
            nacionalidad,
            tipoVinculacion,
            tipoFuncionario,
            fechaNacimiento: fechaNacimiento.toString(),
            tituloProfesional,
            genero,
            tipoSangre,
            estadoCivil,
            discapacidad,
            discapacidadDetalles,
            nombreImagen,
            diasAFavor: diasAFavor()
        }
        // console.log(input)

        if (!nombreImagen) {
            new Promise((resolve, reject) => {
                let noti = new Noty({
                    type: 'info',
                    layout: 'center',
                    text: '<strong>¿ Quieres guardar el nuevo funcionario sin Imagen ?</strong>',
                    theme: 'mint',
                    timeout: false,
                    modal: true,
                    closeWith: ['button'],
                    animation: {
                        open: 'animated bounceInDown',
                        close: 'animated bounceOutUp'
                    },
                    buttons: [
                        Noty.button('SI', 'btn btn-noti', function () {
                            crearFuncionario({ variables: { input } })
                            return resolve(noti.close())
                        }),

                        Noty.button('NO', 'btn btn-error btn-noti-no', function () {
                            noti.close()
                            return reject(mostrarError('Ingresa una imagen para el nuevo funcionario.'))
                        })
                    ]
                }).show()
            })
        }
        if (nombreImagen) return crearFuncionario({ variables: { input } })
    }


    const limpiarEstado = () => {
        setFuncionario({ ...estadoInicial })
        setNombreImagen('')
        setDiscapacidad(false)
    }

    return (
        <div className="ml-5">
            <h2>Nuevo Funcionario</h2>
            <div className="row">
                <div className="col-6">
                    <form onSubmit={enviarFormulario}>
                        <div className="row mb-4 mt-4">
                            <div className="col mr-5">
                                <span className="p-float-label">
                                    <InputText
                                        keyfilter='pint'
                                        className="form-control"
                                        value={funcionario.cedula}
                                        onChange={manejarEstado}
                                        onBlur={e => manejarErrorCedula(e)}
                                        id="in"
                                        name="cedula"
                                        maxLength="10"
                                        minLength="10"
                                    />
                                    <label htmlFor="in">Número de Cédula</label>
                                </span>
                            </div>
                            <div className="col d-flex justify-content-center">
                                <Dropdown
                                    options={opcionesTipoFuncionario}
                                    ariaLabel="JODER"
                                    placeholder="Tipo Funcionario"
                                    className="mr-5 "
                                    style={{ width: '12em' }}
                                    name="tipoFuncionario"
                                    onChange={manejarEstado}
                                    value={funcionario.tipoFuncionario}
                                />
                            </div>
                        </div>
                        <div className="row mb-4 mt-4">
                            <div className="col">
                                <span className="p-float-label">
                                    <InputText
                                        disabled={validarCedula()}
                                        className="form-control"
                                        maxLength="25"
                                        name="nombre"
                                        onChange={manejarEstado}
                                        value={funcionario.nombre}
                                    />
                                    <label htmlFor="in">Primer Nombre</label>
                                </span>
                            </div>
                            <div className="col mr-5">
                                <span className="p-float-label">
                                    <InputText
                                        disabled={validarCedula()}
                                        className="form-control"
                                        maxLength="25"
                                        name="segundoNombre"
                                        onChange={manejarEstado}
                                        value={funcionario.segundoNombre}
                                    />
                                    <label htmlFor="in">Segundo Nombre</label>
                                </span>
                            </div>
                        </div>
                        <div className="row mb-4 mt-4">
                            <div className="col">
                                <span className="p-float-label">
                                    <InputText
                                        disabled={validarCedula()}
                                        className="form-control"
                                        maxLength="25"
                                        name="apellido"
                                        onChange={manejarEstado}
                                        value={funcionario.apellido}
                                    />
                                    <label htmlFor="in">Primer Apellido</label>
                                </span>
                            </div>
                            <div className="col mr-5">
                                <span className="p-float-label">
                                    <InputText
                                        disabled={validarCedula()}
                                        className="form-control"
                                        maxLength="25"
                                        name="segundoApellido"
                                        onChange={manejarEstado}
                                        value={funcionario.segundoApellido}
                                    />
                                    <label htmlFor="in">Segundo Apellido</label>
                                </span>
                            </div>
                        </div>
                        <div className="row mt-4 mb-4">
                            <div className="col">
                                <span className="p-float-label">
                                    <InputText
                                        disabled={validarCedula()}
                                        className="form-control"
                                        maxLength="25"
                                        name="nacionalidad"
                                        onChange={manejarEstado}
                                        value={funcionario.nacionalidad}
                                    />
                                    <label htmlFor="in">Nacionalidad</label>
                                </span>
                            </div>
                            <div className="col mr-5">
                                <SelectButton
                                    options={[{ label: 'OCASIONAL', value: 'OCASIONAL' }, { label: 'PERMANENTE', value: 'PERMANENTE' }]}
                                    name="tipoVinculacion"
                                    onChange={manejarEstado}
                                    value={funcionario.tipoVinculacion}
                                />
                            </div>
                        </div>
                        <div className="row mt-4 mb-4">
                            <div className="col">
                                <Calendar
                                    value={funcionario.fechaNacimiento}
                                    placeholder="Fecha de Nacimiento"
                                    locale={es}
                                    yearRange="1940:2000"
                                    dateFormat="dd/mm/yy"
                                    showIcon={true}
                                    name="fechaNacimiento"
                                    onChange={manejarEstado}
                                    monthNavigator={true}
                                    yearNavigator={true}
                                />
                            </div>
                            <div className="col mr-5">
                                <span className="p-float-label">
                                    <InputTextarea
                                        disabled={validarCedula()}
                                        className="form-control"
                                        maxLength="100"
                                        autoResize={true}
                                        name="tituloProfesional"
                                        onChange={manejarEstado}
                                        value={funcionario.tituloProfesional}
                                    />
                                    <label htmlFor="in">Título Profesional</label>
                                </span>
                            </div>
                        </div>
                        <div className="row mt-4 mb-4">
                            <div className="col">
                                <SelectButton
                                    options={[{ label: 'MASCULINO', value: 'MASCULINO' }, { label: 'FEMENINO', value: 'FEMENINO' }]}
                                    name="genero"
                                    onChange={manejarEstado}
                                    value={funcionario.genero}
                                />
                            </div>
                            <div className="col mr-5">
                                <span className="p-float-label">
                                    <InputText
                                        disabled={validarCedula()}
                                        className="form-control"
                                        maxLength="25"
                                        name="tipoSangre"
                                        onChange={manejarEstado}
                                        value={funcionario.tipoSangre}
                                    />
                                    <label htmlFor="in">Tipo de Sangre</label>
                                </span>
                            </div>
                        </div>
                        <div className="row mt-4 mb-4">
                            <div className="col">
                                <Dropdown
                                    options={opcionesEstadoCivil}
                                    ariaLabel="Test"
                                    placeholder="Estado Civil"
                                    style={{ width: '12em' }}
                                    name="estadoCivil"
                                    onChange={manejarEstado}
                                    value={funcionario.estadoCivil}
                                />
                            </div>
                            <div className="col mr-5">
                                <span className="p-float-label">
                                    <InputTextarea
                                        className="form-control"
                                        maxLength="100"
                                        autoResize={true}
                                        tooltip="Describe aquí el su discapacidad"
                                        disabled={!discapacidad}
                                        name="discapacidadDetalles"
                                        onChange={manejarEstado}
                                        value={funcionario.discapacidadDetalles}
                                    />
                                    <label htmlFor="in">Discapacidad</label>
                                </span>
                            </div>
                        </div>
                        <div className="row mt-6 mb-4">
                            <div className="col">
                                <p className="font-weight-light">Discapacidad</p>
                                <RadioButton
                                    inputId="rb1"
                                    name="city"
                                    value="New York"
                                    onChange={() => setDiscapacidad(true)}
                                    checked={discapacidad}
                                />
                                <label
                                    htmlFor="rb1"
                                    className="p-radiobutton-label pr-5"
                                >Si</label>
                                <RadioButton
                                    inputId="rb2"
                                    name="city"
                                    value="New York"
                                    onChange={() => setDiscapacidad(false)}
                                    checked={discapacidad ? false : true}
                                />
                                <label
                                    htmlFor="rb2"
                                    className="p-radiobutton-label"
                                >No</label>
                            </div>
                        </div>
                        <div className="row mt-4 mb-4">
                            <div className="col">
                            </div>
                            <div className="col mt-4 mr-5">
                                <button
                                    type="submit"
                                    className="btn btn-outline-success btn-lg btn-block"
                                    disabled={validarFormulario()}
                                >Guardar Funcionario</button>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="col-2">
                    {
                        nombreImagen ? <MostrarImagen /> : <GuardarImagen
                            cedula={funcionario.cedula}
                            setNombreImagen={setNombreImagen}
                        />
                    }
                </div>
                <div className="col-4">
                    <Error />
                    <Exito />
                </div>
            </div>
        </div>
    )
}


export default NuevoFuncionario;