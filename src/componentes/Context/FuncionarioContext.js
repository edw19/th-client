import React, { useState, createContext } from 'react'

let funcionarioContext = createContext()
let { Provider, Consumer } = funcionarioContext


function FuncionarioProvider({ children }) {
    let [funcionario, guardarFuncionario] = useState({})

    return (
        <Provider value={{ funcionario, guardarFuncionario }}>
            {children}
        </Provider>
    )
}

export { FuncionarioProvider, Consumer as FuncionarioConsumer, funcionarioContext }
