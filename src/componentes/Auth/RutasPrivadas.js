import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import Autenticado from './Autenticado'

export const RutasPrivadas = ({
    component: Component,
    ...rest
}) => {
    return (
        <Route
            {...rest}
            render={props => {
                if (Autenticado.estaAutenticado()) {
                    return <Component {...props} />
                } else {
                    return (
                        <Redirect
                            to={{
                                pathname: "/",
                                state: {
                                    from: props.location
                                }
                            }}

                        />
                    )
                }
            }}
        />
    )
}
