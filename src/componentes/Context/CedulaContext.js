import React, { useState, createContext } from 'react'

let cedulaContext = createContext()
let { Provider, Consumer } = cedulaContext

function CedulaProvider({ children }) {
    let [cedula, setCedula ] = useState('')

    function establecerCedula(cedula) {
        setCedula(cedula)
    }

    return (
        <Provider value={{cedula, establecerCedula}}>
            {children}
        </Provider>
    )
}

export { CedulaProvider, Consumer as CedulaConsumer, cedulaContext }