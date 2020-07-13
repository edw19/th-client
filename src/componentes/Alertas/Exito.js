import React from 'react'
import { Messages } from 'primereact/messages'

let messages
export const mostrarExito  = (mensaje) =>  {
    messages.show({ severity: 'success', summary: 'Correcto:', detail: mensaje});
}

const Error = (mensaje) => {
    const error = mensaje ? <Messages ref={(el) => messages = el} /> : ''

    return (
        <div>
            {error}
        </div>
    )
}
export default Error