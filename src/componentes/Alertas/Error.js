import React from 'react'
import { Messages } from 'primereact/messages'

// si necesito pasar multiples errores pasarlos como 
// this.messages.show([
//     {severity:'info', summary:'Message 1', detail:'PrimeReact rocks'},
//     {severity:'info', summary:'Message 2', detail:'PrimeReact rocks'},
//     {severity:'info', summary:'Message 3', detail:'PrimeFaces rocks'}
// ]);
let messages;

export const mostrarError = (mensaje) =>  {
    messages.show({ severity: 'error', summary: 'Mensaje de Error:', detail: mensaje});
}

const Error = (mensaje) => {
    const error = mensaje ? <Messages ref={(el) => messages = el} /> : '';
    return (
        <div>
            {error}
        </div>
    )
}
export default Error;