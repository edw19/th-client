import React from "react";
import Error, { mostrarError } from "../Alertas/Error";
import Exito, { mostrarExito } from "../Alertas/Exito";
import { withRouter } from "react-router-dom";
import { VERIFICAR_PASSWORD } from "../../mutation";
import { ACTUALIZAR_USUARIO } from "../../mutation";
import { useMutation } from "@apollo/react-hooks";
import { Link } from "react-router-dom";

function Editar(props) {
  const { id, nombre, rol, correo } = props.location.state.usuario;
  const { id: idAdmin } = props.location.state;
  const [verificarPassword] = useMutation(VERIFICAR_PASSWORD);
  const [actualizarUsuario] = useMutation(ACTUALIZAR_USUARIO);
  const estadoInicial = {
    nombre: nombre,
    rol: rol,
    nuevoPassword: "",
    correo: correo,
  };
  const [nuevoUsuario, guardarNuevoUsuario] = React.useState(estadoInicial);
  const [password, guardarPassword] = React.useState(null);
  const [contraseñaValida, guardarContraseñaValida] = React.useState(false);

  const confirmarContraseña = async (e) => {
    e.preventDefault();
    if (!password) return mostrarError("No has ingresado ninguna contraseña");

    const { data } = await verificarPassword({
      variables: { id: idAdmin ? idAdmin : id, password },
    });
    if (!data.verificarPassword) {
      guardarContraseñaValida(data.verificarPassword);
      return mostrarError("Contraseña Incorrecta");
    }
    guardarContraseñaValida(data.verificarPassword);
    return mostrarExito("Contraseña Correcta");
  };

  const actualizarUsuarioFuncion = async (e) => {
    e.preventDefault();
    if (nuevoUsuario.nombre === "" || nuevoUsuario.usuario === "")
      return mostrarError("no puedes dejar en blanco el usuario y nombre");

    const { data } = await actualizarUsuario({
      variables: {
        input: {
          id,
          nombre: nuevoUsuario.nombre,
          rol: nuevoUsuario.rol,
          correo: !nuevoUsuario.correo
            ? correo
            : nuevoUsuario.correo.includes("@upec.edu.ec")
            ? nuevoUsuario.correo
            : nuevoUsuario.correo + "@upec.edu.ec",
          nuevoPassword: nuevoUsuario.nuevoPassword,
        },
      },
    });
    mostrarExito(data.actualizarUsuario);
    setTimeout(() => {
      props.history.push("configuracion-usuarios");
    }, 1200);
  };

  return (
    <div className="ml-3">
      <div className="row">
        <div className="col-5">
          <h2>Actualizar Usuario</h2>
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
      <div className="row">
        {contraseñaValida ? (
          <form onSubmit={actualizarUsuarioFuncion} className="col-9">
            <div className="row">
              <div className="col-6">
                <input
                  type="text"
                  name="nombre"
                  onChange={(e) =>
                    guardarNuevoUsuario({
                      ...nuevoUsuario,
                      [e.target.name]: e.target.value,
                    })
                  }
                  value={nuevoUsuario.nombre}
                  className="mt-2 form-control"
                />
                <input
                  type="password"
                  name="nuevoPassword"
                  onChange={(e) =>
                    guardarNuevoUsuario({
                      ...nuevoUsuario,
                      [e.target.name]: e.target.value,
                    })
                  }
                  value={nuevoUsuario.nuevoPassword}
                  placeholder="Nueva contraseña"
                  className="mt-2 form-control"
                />
              </div>
            </div>
            {idAdmin && (
              <>
                <div className="col-6 mt-3 input-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    name="correo"
                    onChange={(e) =>
                      guardarNuevoUsuario({
                        ...nuevoUsuario,
                        [e.target.name]: e.target.value,
                      })
                    }
                    defaultValue={
                      correo ? correo.replace("@upec.edu.ec", "") : null
                    }
                    placeholder="Ingresa tu correo institucional"
                    aria-label="Recipient's username"
                    aria-describedby="basic-addon2"
                  />
                  <div className="input-group-append">
                    <span className="input-group-text" id="basic-addon2">
                      @upec.edu.ec
                    </span>
                  </div>
                </div>
              </>
            )}
            <div className="row">
              <div className="col-2 text-center">
                <button
                  type="submit"
                  className=" mt-4 btn btn-outline-success btn-block btn-lg-primary"
                >
                  Actualizar
                </button>
              </div>
            </div>
          </form>
        ) : (
          <div className="col-6">
            <form onSubmit={(e) => confirmarContraseña(e)}>
              <input
                type="password"
                className="mt-3 form-control"
                onChange={(e) => guardarPassword(e.target.value)}
                placeholder="Para editar los datos de Usuario ingresa tu contraseña"
              />
              <div className="d-flex flex-row-reverse">
                <button type="submit" className="mt-3 btn btn-outline-primary">
                  Confirmar
                </button>
              </div>
            </form>
          </div>
        )}
        <div className="col-3">
          <Exito />
          <Error />
        </div>
      </div>
    </div>
  );
}

export default withRouter(Editar);
