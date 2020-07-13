import React from 'react'
import { Link } from 'react-router-dom'
import { ELIMINAR_FUNCIONARIO } from '../../mutation'
import { useMutation } from '@apollo/react-hooks'
import Noty from 'noty'
import moment from 'moment'
import 'moment/locale/es'
moment.locale('es')

export default function MostrarFuncionario({ data, mostrarExito, mostrarError, guardarFuncionario, setCedula }) {

    const [eliminarFuncionario] = useMutation(ELIMINAR_FUNCIONARIO, {
        onError: (error) => {
            mostrarError(error.graphQLErrors[0].message);
        },
        onCompleted: (data) => {
            mostrarExito(data.eliminarFuncionario);
        }
    })

    const eliminarFuncionarioFuncion = () => {
        new Promise((resolve, reject) => {
            let noti = new Noty({
                type: 'info',
                layout: 'center',
                text: `<strong>¿ Quieres eliminar el funcionario ${data.nombre} ${data.apellido} ?</strong>`,
                theme: 'mint',
                modal: true,
                closeWith: ['button'],
                animation: {
                    open: 'animated bounceInDown',
                    close: 'animated bounceOutUp'
                },
                buttons: [
                    Noty.button('SI', 'btn btn-noti', function () {
                        const { id } = data
                        eliminarFuncionario({ variables: { id } })
                        guardarFuncionario({})
                        setCedula('')
                        return resolve(noti.close())
                    }),

                    Noty.button('NO', 'btn btn-error btn-noti-no', function () {
                        noti.close()
                        return reject('Funcionario no se ha eliminado')
                    })
                ]
            }).show()
        }).catch(error => {
            mostrarExito(error)
        })
    }

    return (
        <>
            {
                data.cedula ? <>
                    <div className="row p-2">
                        <div className="col-6">
                            <div className="row">
                                <div className="col">
                                    <strong>Nombres: </strong>{data.nombre} {data.segundoNombre}
                                </div>
                            </div><hr />
                            <div className="row">
                                <div className="col">
                                    <strong>Apellidos: </strong>{data.apellido} {data.segundoApellido}
                                </div>
                            </div><hr />
                            <div className="row">
                                <div className="col">
                                    <strong>Nacionalidad: </strong>{data.nacionalidad}
                                </div>
                            </div><hr />
                            <div className="row">
                                <div className="col">
                                    <strong>Tipo de Vinculación: </strong>{data.tipoVinculacion}
                                </div>
                            </div><hr />
                            <div className="row">
                                <div className="col">
                                    <strong>Fecha de Nacimiento: </strong>{moment(new Date(data.fechaNacimiento)).format('LL')}
                                </div>
                            </div><hr />
                            <div className="row">
                                <div className="col">
                                    <strong>TituloProfesional: </strong>{data.tituloProfesional}
                                </div>
                            </div><hr />
                            <div className="row">
                                <div className="col">
                                    <strong>Género: </strong>{data.genero}
                                </div>
                            </div><hr />
                            <div className="row">
                                <div className="col">
                                    <strong>Tipo de Sangre: </strong>{data.tipoSangre}
                                </div>
                            </div><hr />
                            <div className="row">
                                <div className="col">
                                    <strong>Estado Civil: </strong>{data.estadoCivil}
                                </div>
                            </div><hr />
                            <div className="row">
                                <div className="col">
                                    <strong>Cargo del Funcionario: </strong>{data.tipoFuncionario}
                                </div>
                            </div><hr />
                            <div className="row">
                                <div className="col">
                                    <strong>Días a Favor: </strong>{data.diasAFavor}
                                </div>
                            </div><hr />
                            {
                                data.discapacidad ? <div className="row">
                                    <div className="col">
                                        <strong>Discapacidad del Funcionario: </strong>{data.discapacidadDetalles}
                                    </div>
                                </div> : null
                            }
                        </div>
                        <div className="col-6">
                            <div className="row">
                                {data.nombreImagen ?
                                    <div className="col">
                                        <h6 className="text-center"> Imagen Actual del funcionario</h6>
                                        <div className="d-flex justify-content-center">
                                            <img className="img-fluid rounded float-right mt-3" src={`http://localhost:5000/imagenes/${data.nombreImagen}`} width="250px" height="800px" alt="Imagen del funcionario" />
                                        </div>
                                    </div>: 
                                    <div className="col">
                                        <h6 className="text-center">Funcionario sin Imagen</h6>
                                        <div className="d-fex justify-content-center">
                                            <p>Debes editar la información del funcionario y agregar una imagenen</p>
                                        </div>
                                    </div>
                            }

                            </div>
                            <div className="row mt-5">
                                <div className="col">
                                    <h6 className="text-center">Opciones de funcionario</h6>
                                    <Link to="/dashboard/editar-funcionario" className="btn btn-outline-primary btn-lg btn-block">Editar Información</Link>
                                </div>
                            </div>
                            <div className="row mt-2">
                                <div className="col">
                                    <button className="btn btn-outline-danger btn-lg btn-block" onClick={eliminarFuncionarioFuncion} >Eliminar Funcionario</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>

                    : ''}
        </>

    )
}
