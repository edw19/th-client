import React, { useContext, useState } from 'react'
import { Redirect, withRouter } from 'react-router-dom';
import { funcionarioContext } from '../Context/FuncionarioContext'
import { GuardarImagen } from '../Imagenes/GuardarImagen'
import { InputText } from 'primereact/inputtext'
import { InputTextarea } from 'primereact/inputtextarea'
import { SelectButton } from 'primereact/selectbutton'
import { Calendar } from 'primereact/calendar'
import { Dropdown } from 'primereact/dropdown'
import { RadioButton } from 'primereact/radiobutton'
import Error, { mostrarError } from '../Alertas/Error'
import { ACTUALIZAR_FUNCIONARIO } from '../../mutation'
import { useMutation } from '@apollo/react-hooks'

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
}

let input;

export default withRouter(function EditarFuncionario(props) {
    const { funcionario, guardarFuncionario } = useContext(funcionarioContext)
    const [funcionarioActualizado, setFuncionarioActualizado] = useState({ ...funcionario })
    const [nombreImagenActualizada, setNombreImagen] = useState(funcionario.nombreImagen)
    const [discapacidad, setDiscapacidad] = useState(funcionario.discapacidad)

    const [actualizarFuncionario, { loading }] = useMutation(ACTUALIZAR_FUNCIONARIO, {
        onError: (error) => {
            console.log(error)
            // mostrarError(error.graphQLErrors[0].message)
        },
        onCompleted: () => {
            props.history.push('/dashboard/administrar-funcionarios')
        }
    })

    if (loading) return 'cargando...'

    const manejarEstado = e => {
        setFuncionarioActualizado({
            ...funcionarioActualizado,
            [e.target.name]: e.target.value
        })
    }

    const enviarFormulario = async e => {
        e.preventDefault()
        const { id, cedula, nombre, segundoNombre, apellido, segundoApellido, nacionalidad, tipoVinculacion, tipoFuncionario, fechaNacimiento, tituloProfesional, genero, tipoSangre, estadoCivil, discapacidadDetalles, diasAFavor } = funcionarioActualizado
        input = {
            id,
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
            nombreImagen: nombreImagenActualizada,
            diasAFavor: Number(diasAFavor)
        }
        console.log(input)
        try {
            guardarFuncionario(input)
            await actualizarFuncionario({
                variables: { input }
            })
        } catch (error) {
            console.log(error)
        }

    }

    const manejarErrorCedula = e => {
        if (funcionarioActualizado.cedula.length < 10) {
            mostrarError('El campo cédula debe ser de 10 dígitos')
        }
    }

    if (Object.keys(funcionario).length === 0) return <Redirect to="/dashboard/administrar-funcionarios" />

    return (
        <div className="ml-5">
            <h2>Editar Funcionario</h2>
            <div className="row">
                <div className="col-6">
                    <form onSubmit={enviarFormulario}>
                        <div className="row mb-4 mt-4">
                            <div className="col mr-5">
                                <span className="p-float-label">
                                    <InputText
                                        keyfilter='pint'
                                        className="form-control"
                                        value={funcionarioActualizado.cedula}
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
                                    value={funcionarioActualizado.tipoFuncionario}
                                />
                            </div>
                        </div>
                        <div className="row mb-4 mt-4">
                            <div className="col">
                                <span className="p-float-label">
                                    <InputText
                                        className="form-control"
                                        maxLength="25"
                                        name="nombre"
                                        onChange={manejarEstado}
                                        value={funcionarioActualizado.nombre}
                                    />
                                    <label htmlFor="in">Primer Nombre</label>
                                </span>
                            </div>
                            <div className="col mr-5">
                                <span className="p-float-label">
                                    <InputText
                                        className="form-control"
                                        maxLength="25"
                                        name="segundoNombre"
                                        onChange={manejarEstado}
                                        value={funcionarioActualizado.segundoNombre}
                                    />
                                    <label htmlFor="in">Segundo Nombre</label>
                                </span>
                            </div>
                        </div>
                        <div className="row mb-4 mt-4">
                            <div className="col">
                                <span className="p-float-label">
                                    <InputText
                                        className="form-control"
                                        maxLength="25"
                                        name="apellido"
                                        onChange={manejarEstado}
                                        value={funcionarioActualizado.apellido}
                                    />
                                    <label htmlFor="in">Primer Apellido</label>
                                </span>
                            </div>
                            <div className="col mr-5">
                                <span className="p-float-label">
                                    <InputText
                                        className="form-control"
                                        maxLength="25"
                                        name="segundoApellido"
                                        onChange={manejarEstado}
                                        value={funcionarioActualizado.segundoApellido}
                                    />
                                    <label htmlFor="in">Segundo Apellido</label>
                                </span>
                            </div>
                        </div>
                        <div className="row mt-4 mb-4">
                            <div className="col">
                                <span className="p-float-label">
                                    <InputText
                                        className="form-control"
                                        maxLength="25"
                                        name="nacionalidad"
                                        onChange={manejarEstado}
                                        value={funcionarioActualizado.nacionalidad}
                                    />
                                    <label htmlFor="in">Nacionalidad</label>
                                </span>
                            </div>
                            <div className="col mr-5">
                                <SelectButton
                                    options={[{ label: 'OCASIONAL', value: 'OCASIONAL' }, { label: 'PERMANENTE', value: 'PERMANENTE' }]}
                                    name="tipoVinculacion"
                                    onChange={manejarEstado}
                                    value={funcionarioActualizado.tipoVinculacion}
                                />
                            </div>
                        </div>
                        <div className="row mt-4 mb-4">
                            <div className="col">
                                <Calendar
                                    value={new Date(funcionarioActualizado.fechaNacimiento)}
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
                                    <InputText
                                        className="form-control"
                                        maxLength="25"
                                        name="tituloProfesional"
                                        onChange={manejarEstado}
                                        value={funcionarioActualizado.tituloProfesional}
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
                                    value={funcionarioActualizado.genero}
                                />
                            </div>
                            <div className="col mr-5">
                                <span className="p-float-label">
                                    <InputText
                                        className="form-control"
                                        maxLength="25"
                                        name="tipoSangre"
                                        onChange={manejarEstado}
                                        value={funcionarioActualizado.tipoSangre}
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
                                    value={funcionarioActualizado.estadoCivil}
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
                                        value={funcionarioActualizado.discapacidadDetalles}
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
                                    onChange={() => { setDiscapacidad(true); funcionarioActualizado.discapacidadDetalles = funcionario.discapacidadDetalles }}
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
                                    onChange={() => { setDiscapacidad(false); funcionarioActualizado.discapacidadDetalles = '' }}
                                    checked={!discapacidad}
                                />
                                <label
                                    htmlFor="rb2"
                                    className="p-radiobutton-label"
                                >No</label>
                            </div>
                            <div className="col mr-5">
                                <span className="p-float-label">
                                    <InputText
                                        className="form-control"
                                        name="diasAFavor"
                                        type="Number"
                                        min="0"
                                        max="60"
                                        onChange={manejarEstado}
                                        keyfilter="pint"
                                        value={funcionarioActualizado.diasAFavor}
                                    />
                                    <label htmlFor="in">Días a Favor</label>
                                </span>
                            </div>
                        </div>
                        <div className="row mt-4 mb-4">
                            <div className="col">
                            </div>
                            <div className="col mt-4 mr-5">
                                <button
                                    type="submit"
                                    className="btn btn-outline-success btn-lg btn-block"
                                >Actualizar Funcionario</button>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="col-2">

                    <GuardarImagen
                        cedula={funcionarioActualizado.cedula}
                        setNombreImagen={setNombreImagen}
                    />
                    <h6 className="text-center">Imagen Actual del Funcionario</h6>
                    <img
                        src={`http://localhost:5000/imagenes/${nombreImagenActualizada ? nombreImagenActualizada : funcionario.nombreImagen}`}
                        alt="Imagen del funcionario Actual"

                        width="200px"
                        height="200px"
                    />
                </div>
                <div className="col-4">
                    <Error />
                </div>
            </div>
        </div>
    )
})
