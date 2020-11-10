import React, { useState } from "react";
import { useCallback } from "react";

function TitulosEditar({ titulos, setTitulos }) {
  const [tit, setTit] = useState("");
  const quitarTitulo = (i) => {
    setTitulos(titulos.filter((tit, index) => i !== index));
  };

  const hacerPrincipal = useCallback(
    (i) => {
      titulos.map((tit) => (tit.principal = false));
      titulos[i].principal = true;
      titulos.sort((a, b) => b.principal - a.principal);
      setTitulos([...titulos]);
    },
    [titulos, setTitulos]
  );

  return (
    <>
      <div className="d-flex flex-row">
        <input
          type="text"
          placeholder="Título Profesional"
          value={tit}
          className="form-control"
          onChange={(e) => setTit(e.target.value)}
        />
        <button
          disabled={tit.length === 0 ? true : false}
          className="btn btn-outline-success"
          onClick={() => {
            if (tit === "") return;
            setTitulos((titulo) => [
              ...titulo,
              { nombre: tit.toUpperCase(), principal: false },
            ]);
            setTit("");
          }}
        >
          <li className="pi pi-plus" />
        </button>
      </div>
      <ul className="mt-3">
        {titulos.map((tit, index) => (
          <li key={tit + index}>
            <span
              onClick={() => hacerPrincipal(index)}
              style={{
                cursor: "pointer",
                textDecoration: "none",
                color: tit.principal ? "green" : "#000",
              }}
            >
              {tit.nombre}
            </span>
            <span
              style={{ color: "red", marginLeft: "10px", cursor: "pointer" }}
              onClick={() => quitarTitulo(index)}
              className="pi pi-trash"
            />
          </li>
        ))}
      </ul>
    </>
  );
}

export default TitulosEditar;
