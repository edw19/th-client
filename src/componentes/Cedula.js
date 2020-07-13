import React, { useRef, useEffect } from 'react'
import { InputText } from 'primereact/inputtext'

export default function Cedula({ mostrarError, cedula, setCedula, obtenerFuncionario }) {
    const inputCedulaRef = useRef(null)
    useEffect(() => {
        inputCedulaRef.current.element.select();
    }, [])

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

    return (
        <div className="col-6">
            <span className="p-float-label">
                {/* <input ref={inputCedulaRef} type="text"/> */}
                <InputText
                    id="ino"
                    ref={inputCedulaRef}
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
                />
                <label htmlFor="ino">Ingrese el número de cédula del funcionario</label>
            </span>
        </div>
    )
}
