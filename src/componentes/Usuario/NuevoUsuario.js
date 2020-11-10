import React, { useState } from "react";
import Error, { mostrarError } from "../Alertas/Error";
import Exito, { mostrarExito } from "../Alertas/Exito";
import { CREAR_USUARIO } from "../../mutation";
import { useMutation } from "@apollo/react-hooks";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";

function NuevoUsuario(props) {
  const [nombre, guardarNombre] = useState("");
  const [apellido, guardarApellido] = useState("");
  const [correo, guardarCorreo] = useState("");
  const [rol, guardarRol] = useState("");
  const [password, guardarPassword] = useState("");
  const [passwordRepit, guardarPasswordRepit] = useState("");

  const [crearUsuario, { loading }] = useMutation(CREAR_USUARIO);

  function validarFormulario() {
    if (!nombre || !apellido) {
      mostrarError("Nombre y Apellido de usuario requeridos");
      return false;
    }
    if (!correo.includes(".")) {
      mostrarError("Correo institucional no válido");
      return false;
    }
    if (correo.includes("@gmail.com") || correo.includes("@outlook.com")) {
      mostrarError(
        "Puedes registrar usuarios solo con un correo Institucional"
      );
      return false;
    }
    if (correo.includes("@upec.edu.ec") || correo.includes("@")) {
      mostrarError("Elimina el @upec.edu.ec del campo correo");
      return false;
    }
    if (!rol) {
      mostrarError("Selecciona un rol para este usuario");
      return false;
    }
    if (password !== passwordRepit) {
      mostrarError("Contraseña no coincide");
      return false;
    }
    return true;
  }

  const crearUsuarioFuncion = async (e) => {
    e.preventDefault();
    if (!validarFormulario()) return;
    try {
      const { data } = await crearUsuario({
        variables: {
          nombre: `${nombre} ${apellido}`,
          correo: correo + "@upec.edu.ec",
          rol,
          password,
        },
      });
      mostrarExito(data.crearUsuario);
      setTimeout(() => {
        props.history.push("/dashboard/configuracion-usuarios");
      }, 1500);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="ml-3">
      <div className="row mb-2">
        <div className="col-3">
          <h2>Nuevo Usuario</h2>
        </div>
        <div className="col-2 text-center">
          <Link to="/dashboard/configuracion-usuarios">
            <li
              style={{ fontSize: "2em" }}
              className="pi pi-arrow-left mt-2 mr-5"
            ></li>
          </Link>
        </div>
      </div>
      <form onSubmit={(e) => crearUsuarioFuncion(e)} className="row">
        <div className="col-8">
          <div className="row">
            <input
              className="form-control col mr-3"
              type="text"
              value={nombre}
              onChange={(e) => guardarNombre(e.target.value)}
              placeholder="Nombre del Usuario"
            />
            <input
              className="form-control col"
              type="text"
              value={apellido}
              onChange={(e) => guardarApellido(e.target.value)}
              placeholder="Apellido del Usuario"
            />
          </div>
          <div className="row input-group">
            <input
              type="text"
              className="col mt-3 form-control"
              value={correo}
              onChange={(e) => guardarCorreo(e.target.value)}
              placeholder="Ingresa tu correo institucional"
              aria-describedby="basic-addon2"
            />
            <div className="input-group-append">
              <span className="input-group-text mt-3" id="basic-addon2">
                @upec.edu.ec
              </span>
            </div>
          </div>
          <div className="row">
            <select
              className="form-control mt-3"
              value={rol}
              onChange={(e) => guardarRol(e.target.value)}
            >
              <option value="n/a" hidden>
                ROL DE USUARIO
              </option>
              <option value="PRIMARIO">PRIMARIO</option>
              <option value="SECUNDARIO">SECUNDARIO</option>
            </select>
          </div>
          <div className="row mt-3">
            <input
              className="col mr-3 form-control"
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => guardarPassword(e.target.value)}
            />
            <input
              className="col form-control"
              type="password"
              value={passwordRepit}
              onChange={(e) => guardarPasswordRepit(e.target.value)}
              placeholder="Repita la Contraseña"
            />
          </div>
          <div className="row mt-3">
            <button type="submit" className="col btn btn-outline-primary">
              {loading ? "Creando usuario..." : "Crear Usuario"}
            </button>
          </div>
        </div>
        <div className="col-4">
          <Error />
          <Exito />
        </div>
      </form>
    </div>
  );
}

export default withRouter(NuevoUsuario);
