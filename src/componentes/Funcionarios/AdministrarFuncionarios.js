import React, { useState, useContext, useRef } from 'react'
import { InputText } from 'primereact/inputtext'
import Error, { mostrarError } from '../Alertas/Error'
import Exito, { mostrarExito } from '../Alertas/Exito'
import { OBTENER_FUNCIONARIO } from '../../queries'
import { useLazyQuery } from '@apollo/react-hooks'
import Spinner from '../Spinner'
import { funcionarioContext } from '../Context/FuncionarioContext'
import { periodoContext } from '../Context/PeriodoContext';
import MostrarFuncionario from './MostrarFuncionario'
import { Link } from 'react-router-dom'
import SinPeriodo from '../SinPeriodo'


export default function AdministrarFuncionarios() {
    const inputRef = useRef();
    const { funcionario, guardarFuncionario } = useContext(funcionarioContext);
    const { periodoSeleccionado, loading: loadingPeriodo } = useContext(periodoContext)

    const [cedula, setCedula] = useState(funcionario.cedula ? funcionario.cedula : '')
    const [obtenerFuncionario, { loading, error, data }] = useLazyQuery(OBTENER_FUNCIONARIO, {
        pollInterval: 2000,
        onError: (error) => {
            mostrarError(error.graphQLErrors[0].message)
        },
        onCompleted: () => {
            guardarFuncionario({ ...data.obtenerFuncionario })
            mostrarExito('Funcionario Encontrado Correctamente')
        }
    });


    if (loading && loadingPeriodo) return <Spinner />

    const validarCedula = () => {
        const noValida = cedula.length < 10
        if (noValida) {
            mostrarError('Cédula del funcionario debe ser de 10 dígitos')
            return
        }
        obtenerFuncionario({ variables: { cedula } })
    }

    const precionarInput = e => {
        if (e.keyCode === 13) {
            obtenerFuncionario({ variables: { cedula } })
        }
    }


    if (!periodoSeleccionado) return (
        <div className="ml-5">
            <h2>Administrar Funcionarios</h2>
            <SinPeriodo />
        </div>
    )

    return (
        <div className="ml-5">
            <h2>Administrar Funcionarios</h2>
            <div className="row mt-4">
                <div className="col-8">
                    <div className="row">
                        <div className="col-5 ml-3">
                            <span className="p-float-label">
                                <InputText
                                    id="ino"
                                    name="cedula"
                                    className="form-control"
                                    value={cedula}
                                    onChange={(e) => setCedula(e.target.value)}
                                    onKeyDown={precionarInput}
                                    onBlur={validarCedula}
                                    keyfilter="pint"
                                    maxLength="10"
                                    minLength="10"
                                    autoComplete="off"
                                    ref={inputRef}
                                />
                                <label htmlFor="ino">Número de cédula del funcionario</label>
                            </span>
                        </div>
                        <div className="col d-flex justify-content-end mr-3">
                            <button to="/dashboard/nuevo-funcionario" onClick={() => { guardarFuncionario({}); setCedula('') }} className="btn btn-link border text-decoration-none mr-3" >Limpiar</button>
                            <Link to="/dashboard/nuevo-funcionario" onClick={() => guardarFuncionario({})} className="btn btn-link border text-decoration-none" >Nuevo Funcionario</Link>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <div className="container-funcionario">
                                {
                                    !error ?
                                        <MostrarFuncionario
                                            data={funcionario}
                                            mostrarExito={mostrarExito}
                                            mostrarError={mostrarError}
                                            guardarFuncionario={guardarFuncionario}
                                            setCedula={setCedula}
                                        /> : null
                                }
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-4">
                    <Error />
                    <Exito />
                </div>
            </div>
        </div >
    )
}
