import React, { useState } from "react";
import { GuardarImagen } from "../Imagenes/GuardarImagen";
import MostrarImagen from "../Imagenes/MostrarImagenes";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { SelectButton } from "primereact/selectbutton";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { RadioButton } from "primereact/radiobutton";
import Error, { mostrarError } from "../Alertas/Error";
import Exito, { mostrarExito } from "../Alertas/Exito";
import { CREAR_FUNCIONARIO } from "../../mutation";
import { useMutation } from "@apollo/react-hooks";
import Noty from "noty";
import Titulos from "./Titulos";
import { Link } from "react-router-dom";

function NuevoFuncionario() {
  const estadoInicial = {
    cedula: "",
    nombre: "",
    segundoNombre: "",
    apellido: "",
    segundoApellido: "",
    nacionalidad: "",
    tipoVinculacion: "PERMANENTE",
    tipoFuncionario: "",
    fechaNacimiento: "",
    genero: "MASCULINO",
    tipoSangre: "",
    estadoCivil: "",
    discapacidadDetalles: "",
    fechaIngreso: "",
    fechaSalida: "",
  };

  const opcionesEstadoCivil = [
    "Soltero/a",
    "Casado/a",
    "Unión Libre",
    "Separado/a",
    "Divorciado/a",
    "Viudo/a",
  ];

  const opcionesTipoFuncionario = [
    "ADMINISTRATIVO",
    "DOCENTE",
    "CÓDIGO DE TRABAJO",
  ];

  const es = {
    firstDayOfWeek: 1,
    dayNames: [
      "domingo",
      "lunes",
      "martes",
      "miércoles",
      "jueves",
      "viernes",
      "sábado",
    ],
    dayNamesShort: ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"],
    dayNamesMin: ["D", "L", "M", "X", "J", "V", "S"],
    monthNames: [
      "enero",
      "febrero",
      "marzo",
      "abril",
      "mayo",
      "junio",
      "julio",
      "agosto",
      "septiembre",
      "octubre",
      "noviembre",
      "diciembre",
    ],
    monthNamesShort: [
      "ene",
      "feb",
      "mar",
      "abr",
      "may",
      "jun",
      "jul",
      "ago",
      "sep",
      "oct",
      "nov",
      "dic",
    ],
  };
  // mutations
  const [crearFuncionario] = useMutation(CREAR_FUNCIONARIO, {
    onError: () => {
      mostrarError("Funcionario ya existe.");
    },
    onCompleted: (data) => {
      mostrarExito(data.crearFuncionario);
      limpiarEstado();
    },
  });

  // state
  const [funcionario, setFuncionario] = useState(estadoInicial);
  let [titulo, setTitulo] = useState([]);
  const [diasAFavor, setDiasAFavor] = useState("");
  const [horas, setHoras] = useState("");
  const [minutos, setMinutos] = useState("");
  const [calculo, setCalculo] = useState("");
  const [discapacidad, setDiscapacidad] = useState(false);
  const [nombreImagen, setNombreImagen] = useState("");
  // funciones
  const manejarEstado = (e) => {
    setFuncionario({
      ...funcionario,
      [e.target.name]: e.target.value,
    });
  };

  const calculoDias = (dias) => {
    const res = parseFloat(dias);
    const diasNetos = Math.trunc(res);
    let horas;
    let minutos;
    const reciduo = parseInt(
      dias.toString().includes(".")
        ? dias.toString().replace(`${diasNetos}.`, "")
        : 0
    );

    if (reciduo > 9) {
      setCalculo("");
      return mostrarError("El decimal solo debe ser de una cifra");
    }
    if (isNaN(diasAFavor)) return;
    if (isNaN(reciduo)) return;

    if (reciduo === 1) {
      horas = 0;
      minutos = 48;
    }
    if (reciduo === 2) {
      horas = 1;
      minutos = 36;
    }
    if (reciduo === 3) {
      horas = 2;
      minutos = 24;
    }
    if (reciduo === 4) {
      horas = 3;
      minutos = 12;
    }
    if (reciduo === 5) {
      horas = 4;
      minutos = 0;
    }
    if (reciduo === 6) {
      horas = 4;
      minutos = 48;
    }
    if (reciduo === 7) {
      horas = 5;
      minutos = 36;
    }
    if (reciduo === 8) {
      horas = 6;
      minutos = 24;
    }
    if (reciduo === 9) {
      horas = 7;
      minutos = 12;
    }
    setCalculo(
      `${diasNetos > 0 ? diasNetos + " Días " : ""} ${
        horas > 0 ? horas + " Horas " : ""
      }${minutos > 0 ? minutos + " Minutos" : ""} `
    );
    setHoras(horas);
    setMinutos(minutos);
  };

  const validarCedula = () => {
    const { cedula } = funcionario;
    const noValido = cedula.length < 10;
    return noValido;
  };
  const manejarErrorCedula = (e) => {
    if (funcionario.cedula.length < 10) {
      mostrarError("El campo cédula debe ser de 10 dígitos");
    }
  };

  const validarFormulario = () => {
    const {
      cedula,
      nombre,
      segundoNombre,
      apellido,
      segundoApellido,
      nacionalidad,
      tipoVinculacion,
      tipoFuncionario,
      fechaNacimiento,
      genero,
      tipoSangre,
      estadoCivil,
      fechaIngreso,
      fechaSalida,
    } = funcionario;
    const noValido =
      !cedula ||
      !nombre ||
      !segundoNombre ||
      !apellido ||
      !segundoApellido ||
      !nacionalidad ||
      !tipoFuncionario ||
      !tipoVinculacion ||
      !fechaNacimiento ||
      !genero ||
      !tipoSangre ||
      !estadoCivil ||
      !fechaIngreso ||
      !fechaSalida ||
      !diasAFavor;
    return noValido;
  };

  const enviarFormulario = async (e) => {
    e.preventDefault();
    if (Object.keys(titulo).length === 0)
      return mostrarError("Al menos debes ingresar un titulo profesional");

    const res = titulo.filter((tit) => tit.principal === true);
    if (Object.keys(res).length === 0)
      return mostrarError(
        "Marca uno de los titulos profesionales como principal"
      );

    if (validarFormulario())
      return mostrarError("Llena todos los campos del formulario");
    const {
      cedula,
      nombre,
      segundoNombre,
      apellido,
      segundoApellido,
      nacionalidad,
      tipoVinculacion,
      tipoFuncionario,
      fechaNacimiento,
      genero,
      tipoSangre,
      estadoCivil,
      discapacidadDetalles,
      fechaIngreso,
      fechaSalida,
    } = funcionario;

    const input = {
      cedula,
      nombre,
      segundoNombre,
      apellido,
      segundoApellido,
      nacionalidad,
      tipoVinculacion,
      tipoFuncionario,
      fechaNacimiento: fechaNacimiento.toString(),
      tituloProfesional: titulo,
      genero,
      tipoSangre,
      estadoCivil,
      discapacidad,
      discapacidadDetalles,
      nombreImagen,
      diasAFavor: Math.trunc(diasAFavor),
      horasAcumuladas: horas,
      minutosAcumulados: minutos,
      fechaIngreso: fechaIngreso.toString(),
      fechaSalida: fechaSalida.toString(),
    };

    if (!nombreImagen) {
      new Promise((resolve, reject) => {
        let noti = new Noty({
          type: "info",
          layout: "center",
          text:
            "<div><h6>¿ Quieres guardar el nuevo funcionario sin Imagen ? </h6> <br /><p>Se recomienda guardar una imagen para un mejor reconocimiento del funcionario </p></div>",
          theme: "mint",
          timeout: false,
          modal: true,
          closeWith: ["button"],
          animation: {
            open: "animated bounceInDown",
            close: "animated bounceOutUp",
          },
          buttons: [
            Noty.button("SI", "btn btn-noti", function () {
              crearFuncionario({ variables: { input } });
              return resolve(noti.close());
            }),

            Noty.button("NO", "btn btn-error btn-noti-no", function () {
              noti.close();
              return reject(
                mostrarError("Ingresa una imagen para el nuevo funcionario.")
              );
            }),
          ],
        }).show();
      });
    }
    if (nombreImagen) return crearFuncionario({ variables: { input } });
  };

  const limpiarEstado = () => {
    setFuncionario({ ...estadoInicial });
    setNombreImagen("");
    setTitulo([]);
    setDiscapacidad(false);
    setMinutos("");
    setHoras("");
    setDiasAFavor("");
    setCalculo("");
  };

  const quitarTitulo = (i) => {
    setTitulo(titulo.filter((tit, index) => i !== index));
  };
  const hacerPrincipal = (i) => {
    let titulos = [...titulo];
    titulos.map((tit) => (tit.principal = false));
    titulos[i].principal = true;
    titulos.sort((a, b) => b.principal - a.principal);
    setTitulo([...titulos]);
  };

  return (
    <div className="ml-3">
      <div className="row">
        <div className="col-4">
          <h2>Nuevo Funcionario</h2>
        </div>
        <div className="col-2 text-center">
          <Link to="/dashboard/administrar-funcionarios">
            <li
              style={{ fontSize: "2em" }}
              className="pi pi-arrow-left mt-2"
            ></li>
          </Link>
        </div>
      </div>
      <div className="row">
        <div className="col-6">
          <form onSubmit={enviarFormulario}>
            <div className="row mb-4 mt-4">
              <div className="col mr-5">
                <span className="p-float-label">
                  <InputText
                    keyfilter="pint"
                    className="form-control"
                    value={funcionario.cedula}
                    onChange={manejarEstado}
                    onBlur={(e) => manejarErrorCedula(e)}
                    id="in"
                    name="cedula"
                    maxLength="10"
                    minLength="10"
                  />
                  <label htmlFor="in">Número de Cédula</label>
                </span>
              </div>
              <div className="col d-flex justify-content-center">
                <Dropdown
                  options={opcionesTipoFuncionario}
                  ariaLabel="JODER"
                  placeholder="Tipo Funcionario"
                  className="mr-5 "
                  style={{ width: "13em" }}
                  name="tipoFuncionario"
                  onChange={manejarEstado}
                  value={funcionario.tipoFuncionario}
                />
              </div>
            </div>
            <div className="row mb-4 mt-4">
              <div className="col">
                <Calendar
                  value={funcionario.fechaIngreso}
                  placeholder="Fecha de Ingreso"
                  locale={es}
                  yearRange="2010:2100"
                  dateFormat="dd/mm/yy"
                  showIcon={true}
                  name="fechaIngreso"
                  onChange={manejarEstado}
                  monthNavigator={true}
                  yearNavigator={true}
                />
              </div>
              <div className="col mr-5">
                <Calendar
                  value={funcionario.fechaSalida}
                  placeholder="Fecha de Salida"
                  locale={es}
                  yearRange="2010:2100"
                  dateFormat="dd/mm/yy"
                  showIcon={true}
                  name="fechaSalida"
                  onChange={manejarEstado}
                  monthNavigator={true}
                  yearNavigator={true}
                />
              </div>
            </div>
            <div className="row mb-4 mt-4">
              <div className="col">
                <span className="p-float-label">
                  <InputText
                    disabled={validarCedula()}
                    className="form-control"
                    maxLength="25"
                    name="nombre"
                    onChange={manejarEstado}
                    value={funcionario.nombre}
                  />
                  <label htmlFor="in">Primer Nombre</label>
                </span>
              </div>
              <div className="col mr-5">
                <span className="p-float-label">
                  <InputText
                    disabled={validarCedula()}
                    className="form-control"
                    maxLength="25"
                    name="segundoNombre"
                    onChange={manejarEstado}
                    value={funcionario.segundoNombre}
                  />
                  <label htmlFor="in">Segundo Nombre</label>
                </span>
              </div>
            </div>
            <div className="row mb-4 mt-4">
              <div className="col">
                <span className="p-float-label">
                  <InputText
                    disabled={validarCedula()}
                    className="form-control"
                    maxLength="25"
                    name="apellido"
                    onChange={manejarEstado}
                    value={funcionario.apellido}
                  />
                  <label htmlFor="in">Primer Apellido</label>
                </span>
              </div>
              <div className="col mr-5">
                <span className="p-float-label">
                  <InputText
                    disabled={validarCedula()}
                    className="form-control"
                    maxLength="25"
                    name="segundoApellido"
                    onChange={manejarEstado}
                    value={funcionario.segundoApellido}
                  />
                  <label htmlFor="in">Segundo Apellido</label>
                </span>
              </div>
            </div>
            <div className="row mt-4 mb-4">
              <div className="col">
                <span className="p-float-label">
                  <InputText
                    disabled={validarCedula()}
                    className="form-control"
                    maxLength="25"
                    name="nacionalidad"
                    onChange={manejarEstado}
                    value={funcionario.nacionalidad}
                  />
                  <label htmlFor="in">Nacionalidad</label>
                </span>
              </div>
              <div className="col mr-5">
                <SelectButton
                  options={[
                    { label: "OCASIONAL", value: "OCASIONAL" },
                    { label: "PERMANENTE", value: "PERMANENTE" },
                  ]}
                  name="tipoVinculacion"
                  onChange={manejarEstado}
                  value={funcionario.tipoVinculacion}
                />
              </div>
            </div>
            <div className="row mt-4 mb-4">
              <div className="col">
                <Calendar
                  value={funcionario.fechaNacimiento}
                  placeholder="Fecha de Nacimiento"
                  locale={es}
                  yearRange="1940:2000"
                  dateFormat="dd/mm/yy"
                  showIcon={true}
                  name="fechaNacimiento"
                  onChange={manejarEstado}
                  monthNavigator={true}
                  yearNavigator={true}
                />
              </div>
              <div className="col mr-5 d-flex flex-column">
                <Titulos setTitulo={setTitulo} />
              </div>
            </div>
            <div className="row mb-4">
              <div className="col">
                <SelectButton
                  options={[
                    { label: "MASCULINO", value: "MASCULINO" },
                    { label: "FEMENINO", value: "FEMENINO" },
                  ]}
                  name="genero"
                  onChange={manejarEstado}
                  value={funcionario.genero}
                />
              </div>
              <div className="col mr-5">
                <span className="p-float-label">
                  <InputText
                    disabled={validarCedula()}
                    className="form-control"
                    maxLength="25"
                    name="tipoSangre"
                    onChange={manejarEstado}
                    value={funcionario.tipoSangre}
                  />
                  <label htmlFor="in">Tipo de Sangre</label>
                </span>
              </div>
            </div>
            <div className="row mt-4 mb-4">
              <div className="col">
                <Dropdown
                  options={opcionesEstadoCivil}
                  ariaLabel="Test"
                  placeholder="Estado Civil"
                  style={{ width: "12em" }}
                  name="estadoCivil"
                  onChange={manejarEstado}
                  value={funcionario.estadoCivil}
                />
              </div>
              <div className="col mr-5">
                <span className="p-float-label">
                  <InputTextarea
                    className="form-control"
                    maxLength="100"
                    autoResize={true}
                    tooltip="Describe aquí el su discapacidad"
                    disabled={!discapacidad}
                    name="discapacidadDetalles"
                    onChange={manejarEstado}
                    value={funcionario.discapacidadDetalles}
                  />
                  <label htmlFor="in">Discapacidad</label>
                </span>
              </div>
            </div>
            <div className="row mt-6 mb-4">
              <div className="col">
                <p className="font-weight-light">Discapacidad</p>
                <RadioButton
                  inputId="rb1"
                  name="city"
                  value="New York"
                  onChange={() => setDiscapacidad(true)}
                  checked={discapacidad}
                />
                <label htmlFor="rb1" className="p-radiobutton-label pr-5">
                  Si
                </label>
                <RadioButton
                  inputId="rb2"
                  name="city"
                  value="New York"
                  onChange={() => setDiscapacidad(false)}
                  checked={discapacidad ? false : true}
                />
                <label htmlFor="rb2" className="p-radiobutton-label">
                  No
                </label>
              </div>
              <div className="col mr-5">
                <input
                  type="text"
                  step="0.1"
                  min="0.1"
                  maxLength="4"
                  // value={isNaN(diasAFavor) ? "0" : diasAFavor}
                  value={diasAFavor}
                  onChange={(e) => {
                    setDiasAFavor(e.target.value);
                    calculoDias(e.target.value);
                  }}
                  className="form-control"
                  placeholder="Días a favor"
                />
                <p className="text-center mt-4 font-weight-bold">{calculo}</p>
              </div>
            </div>
            <div className="row mt-4 mb-4">
              <div className="col"></div>
              <div className="col mr-5">
                <button
                  type="submit"
                  className="btn btn-outline-success btn-lg btn-block"
                  disabled={validarFormulario()}
                >
                  <i className="pi pi-save" /> Guardar Funcionario
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className="col-2">
          {nombreImagen ? (
            <MostrarImagen />
          ) : (
            <GuardarImagen
              cedula={funcionario.cedula}
              setNombreImagen={setNombreImagen}
            />
          )}

          {Object.keys(titulo).length > 0 && (
            <ul>
              <h6 className="mt-2">Títulos Profesionales</h6>
              {titulo.map((tit, index) => (
                <li key={tit + index}>
                  <span
                    onClick={() => hacerPrincipal(index)}
                    style={{
                      color: tit.principal ? "green" : "#000",
                      cursor: "pointer",
                    }}
                  >
                    {tit.nombre}
                  </span>
                  <span
                    style={{
                      color: "red",
                      cursor: "pointer",
                      marginLeft: "10px",
                    }}
                    onClick={() => quitarTitulo(index)}
                    className="pi pi-trash"
                  />
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="col-4">
          <Error />
          <Exito />
        </div>
      </div>
    </div>
  );
}

export default NuevoFuncionario;
