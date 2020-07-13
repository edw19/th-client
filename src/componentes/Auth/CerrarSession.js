import React from 'react'
import { ApolloConsumer } from 'react-apollo'
import { navigate } from '@reach/router'
import Cookie from 'js-cookie'
import Autenticado from './Autenticado'

const URL = 'http://localhost:5000/logout'
const options = {
    method: 'post',
    credentials: 'include',
    headers: {
        'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
    }
}

const cerrarSessionUsuario = (cliente) => {
    fetch(URL, options)
    Cookie.remove('signedin')
    Autenticado.cerrarSesion()
    cliente.resetStore()
    navigate('/')
    window.location.reload(true)
}

const CerrarSession = () => {
    return (
        <ApolloConsumer>
            {
                cliente => {
                    return (
                        <button
                            onClick={() => cerrarSessionUsuario(cliente)}
                            className='btn btn-link'
                        >
                            <i className="pi pi-sign-out" style={{'fontSize': '2em'}}></i>
                        </button>
                    )
                }
            }
        </ApolloConsumer>
    )
}

export default CerrarSession;
