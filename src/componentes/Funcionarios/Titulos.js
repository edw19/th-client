import React from "react";
import { useState } from "react";

export default function Titulos({ setTitulo }) {
  const [tit, setTit] = useState("");
  return (
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
          setTitulo((titulo) => [
            ...titulo,
            { nombre: tit.toUpperCase(), principal: false },
          ]);
          setTit("");
        }}
      >
        <li className="pi pi-plus" />
      </button>
    </div>
  );
}
