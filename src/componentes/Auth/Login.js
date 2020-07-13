import React, { useState } from 'react'
import { AUTENTICAR_USUARIO } from '../../mutation/index'
import { useMutation } from '@apollo/react-hooks'
import Spinner from '../Spinner'
import { withRouter } from 'react-router-dom'
import '../css/FormularioLogin.css'
import Error, { mostrarError } from '../Alertas/Error'
import Autenticado from './Autenticado'

const URL = 'http://localhost:5000/login'

function Login(props) {
    const headers = (token) => {
        const options = {
            method: 'post',
            credentials: 'include',
            headers: {
                'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            body: `token=${token}`
        }

        fetch(URL, options)
            .then(response => {
                if (!response.ok) {
                    if (response.status === 404) {
                        alert('Email not found, please retry')
                    }
                    if (response.status === 401) {
                        alert('Email and password do not match, please retry')
                    }
                }
                return response
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    document.cookie = 'signedin=true'
                    return props.history.push('/dashboard')
                }
            })
    }
    const [usuario, setUsuario] = useState('')
    const [password, setPassword] = useState('')
    const [usuarioAutenticar, { loading }] = useMutation(AUTENTICAR_USUARIO,
        {
            variables: { usuario, password },
            onError: error => {
                const fin = error.message.length
                const err = error.message.substr(14, fin)
                mostrarError(err)
            },
            onCompleted: (data) => {
                const token = data.autenticarUsuario.token
                headers(token)
                setUsuario('')
                setPassword('')
                window.location.reload()
            }
        }

    )
    if (loading) return <Spinner />

    const validarFormulario = () => {
        const noValido = !usuario || !password;
        return noValido;
    }

    const iniciarSesion = async (e, usuarioAutenticar) => {
        e.preventDefault();
        Autenticado.inicioSesion();
        usuarioAutenticar();
    }


    return (
        <div className="container">
            <div className="abs-center">
                <form
                    onSubmit={e => iniciarSesion(e, usuarioAutenticar)}
                    className="border p-3 form"
                >
                    <h1 className="text-center">TH</h1>
                    <Error />
                    <div className="form-group">
                        <label htmlFor="email">Usuario</label>
                        <input
                            type="text"
                            autoComplete="off"
                            name="usuario"
                            value={usuario}
                            className="form-control"
                            onChange={e => setUsuario(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={password}
                            className="form-control"
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>
                    <button
                        type="submit"
                        className="btn btn-primary float-right "
                        disabled={loading || validarFormulario()}
                    >Ingresar</button>
                </form>
            </div>
        </div>
    )
}

export default withRouter(Login)