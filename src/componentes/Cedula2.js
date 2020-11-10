import React, { useContext, useState, useEffect, useRef } from "react";
import { InputText } from "primereact/inputtext";
import { funcionarioContext2 } from "./Context/FuncionarioContext2";

export default function Cedula2({ mostrarError, setGenerar }) {
  const inputCedula = useRef();
  const { obtenerFuncionario } = useContext(funcionarioContext2);
  const [cedula, guardarCedula] = useState("");

  useEffect(() => {
    inputCedula.current.element.select();
  }, []);

  useEffect(() => {
    if (cedula.length > 9) {
      obtenerFuncionario({ variables: { cedula } });
      return;
    }
  }, [cedula, obtenerFuncionario]);

  const validarCedula = () => {
    const noValida = cedula.length < 10;
    if (noValida) {
      mostrarError("Cédula del funcionario debe ser de 10 dígitos");
      return;
    }
  };

  const precionarInput = (e) => {
    if (e.keyCode === 13) {
      obtenerFuncionario({ variables: { cedula } });
    }
  };

  const cambioCedula = (e) => {
    setGenerar(false);
    guardarCedula(e.target.value);
  };

  return (
    <div className="col-6">
      <span className="p-float-label">
        <InputText
          id="ino"
          name="cedula"
          className="form-control mt-3"
          value={cedula}
          onChange={(e) => cambioCedula(e)}
          onKeyDown={precionarInput}
          onBlur={validarCedula}
          keyfilter="pint"
          maxLength="10"
          minLength="10"
          autoComplete="off"
          ref={inputCedula}
        />
        <label htmlFor="ino">Ingrese el número de cédula del funcionario</label>
      </span>
    </div>
  );
}
