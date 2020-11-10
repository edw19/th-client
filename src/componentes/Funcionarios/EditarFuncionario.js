import React, { useContext, useState } from "react";
import { Redirect, withRouter } from "react-router-dom";
import { funcionarioContext } from "../Context/FuncionarioContext";
import { GuardarImagen } from "../Imagenes/GuardarImagen";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { SelectButton } from "primereact/selectbutton";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { RadioButton } from "primereact/radiobutton";
import { ScrollPanel } from "primereact/scrollpanel";
import Error, { mostrarError } from "../Alertas/Error";
import { ACTUALIZAR_FUNCIONARIO } from "../../mutation";
import { useMutation } from "@apollo/react-hooks";
import TitulosEditar from "./TitulosEditar";

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

let input;

export default withRouter(function EditarFuncionario(props) {
  const { funcionario, guardarFuncionario } = useContext(funcionarioContext);
  let [funcionarioActualizado, setFuncionarioActualizado] = useState({
    ...funcionario,
  });
  const [titulos, setTitulos] = useState(funcionario?.tituloProfesional);
  const [diasAFavor, setDiasAFavor] = useState(funcionario.diasAFavor);
  const [horas, setHoras] = useState(0);
  const [minutos, setMinutos] = useState(0);
  const [calculo, setCalculo] = useState("");
  const [nombreImagenActualizada, setNombreImagen] = useState(
    funcionario.nombreImagen
  );
  const [discapacidad, setDiscapacidad] = useState(funcionario.discapacidad);
  const [actualizarFuncionario, { loading }] = useMutation(
    ACTUALIZAR_FUNCIONARIO,
    {
      onError: (error) => {
        console.log(error);
        // mostrarError(error.graphQLErrors[0].message)
      },
      onCompleted: () => {
        props.history.push("/dashboard/administrar-funcionarios");
      },
    }
  );

  if (loading) return "cargando...";

  const manejarEstado = (e) => {
    setFuncionarioActualizado({
      ...funcionarioActualizado,
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
    setDiasAFavor(diasNetos);
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
    } = funcionarioActualizado;

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
    const res = titulos.filter((tit) => tit.principal === true);
    if (Object.keys(res).length === 0)
      return mostrarError(
        "Marca uno de los titulos profesionales como principal"
      );
    if (validarFormulario())
      return mostrarError("Llena todos lo campos para actualizarlos");
    const {
      id,
      cedula,
      nombre,
      segundoNombre,
      apellido,
      segundoApellido,
      nacionalidad,
      tipoVinculacion,
      tipoFuncionario,
      fechaNacimiento,
      fechaIngreso,
      fechaSalida,
      genero,
      tipoSangre,
      estadoCivil,
      discapacidadDetalles,
    } = funcionarioActualizado;
    input = {
      id,
      cedula,
      nombre,
      segundoNombre,
      apellido,
      segundoApellido,
      nacionalidad,
      tipoVinculacion,
      tipoFuncionario,
      fechaNacimiento: fechaNacimiento.toString(),
      fechaIngreso,
      fechaSalida,
      tituloProfesional: titulos,
      genero,
      tipoSangre,
      estadoCivil,
      discapacidad,
      discapacidadDetalles,
      nombreImagen: nombreImagenActualizada,
      diasAFavor: diasAFavor,
      horasAcumuladas: horas,
      minutosAcumulados: minutos,
    };
    try {
      guardarFuncionario(input);
      await actualizarFuncionario({
        variables: { input },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const manejarErrorCedula = (e) => {
    if (funcionarioActualizado.cedula.length < 10) {
      mostrarError("El campo cédula debe ser de 10 dígitos");
    }
  };

  if (Object.keys(funcionario).length === 0)
    return <Redirect to="/dashboard/administrar-funcionarios" />;

  return (
    <div className="ml-3">
      <h2>Editar Funcionario</h2>
      <div className="row">
        <div className="col-6">
          <ScrollPanel style={{ width: "100%", height: "650px" }}>
            <form onSubmit={enviarFormulario}>
              <div className="row mb-4 mt-4">
                <div className="col mr-5">
                  <span className="p-float-label">
                    <InputText
                      keyfilter="pint"
                      className="form-control"
                      value={funcionarioActualizado.cedula}
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
                    className="mr-5"
                    style={{ width: "13em" }}
                    name="tipoFuncionario"
                    onChange={manejarEstado}
                    value={funcionarioActualizado.tipoFuncionario}
                  />
                </div>
              </div>
              <div className="row mb-4 mt-4">
                <div className="col">
                  <Calendar
                    value={
                      funcionarioActualizado.fechaIngreso
                        ? new Date(funcionarioActualizado.fechaIngreso)
                        : null
                    }
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
                    value={
                      funcionarioActualizado.fechaSalida
                        ? new Date(funcionarioActualizado.fechaSalida)
                        : null
                    }
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
                      className="form-control"
                      maxLength="25"
                      name="nombre"
                      onChange={manejarEstado}
                      value={funcionarioActualizado.nombre}
                    />
                    <label htmlFor="in">Primer Nombre</label>
                  </span>
                </div>
                <div className="col mr-5">
                  <span className="p-float-label">
                    <InputText
                      className="form-control"
                      maxLength="25"
                      name="segundoNombre"
                      onChange={manejarEstado}
                      value={funcionarioActualizado.segundoNombre}
                    />
                    <label htmlFor="in">Segundo Nombre</label>
                  </span>
                </div>
              </div>
              <div className="row mb-4 mt-4">
                <div className="col">
                  <span className="p-float-label">
                    <InputText
                      className="form-control"
                      maxLength="25"
                      name="apellido"
                      onChange={manejarEstado}
                      value={funcionarioActualizado.apellido}
                    />
                    <label htmlFor="in">Primer Apellido</label>
                  </span>
                </div>
                <div className="col mr-5">
                  <span className="p-float-label">
                    <InputText
                      className="form-control"
                      maxLength="25"
                      name="segundoApellido"
                      onChange={manejarEstado}
                      value={funcionarioActualizado.segundoApellido}
                    />
                    <label htmlFor="in">Segundo Apellido</label>
                  </span>
                </div>
              </div>
              <div className="row mt-4 mb-4">
                <div className="col">
                  <span className="p-float-label">
                    <InputText
                      className="form-control"
                      maxLength="25"
                      name="nacionalidad"
                      onChange={manejarEstado}
                      value={funcionarioActualizado.nacionalidad}
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
                    value={funcionarioActualizado.tipoVinculacion}
                  />
                </div>
              </div>
              <div className="row mt-4 mb-4">
                <div className="col">
                  <Calendar
                    value={new Date(funcionarioActualizado.fechaNacimiento)}
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
                <div className="col mr-5">
                  <TitulosEditar
                    titulos={[...titulos]}
                    setTitulos={setTitulos}
                  />
                </div>
              </div>
              <div className="row mt-4 mb-4">
                <div className="col">
                  <SelectButton
                    options={[
                      { label: "MASCULINO", value: "MASCULINO" },
                      { label: "FEMENINO", value: "FEMENINO" },
                    ]}
                    name="genero"
                    onChange={manejarEstado}
                    value={funcionarioActualizado.genero}
                  />
                </div>
                <div className="col mr-5">
                  <span className="p-float-label">
                    <InputText
                      className="form-control"
                      maxLength="25"
                      name="tipoSangre"
                      onChange={manejarEstado}
                      value={funcionarioActualizado.tipoSangre}
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
                    value={funcionarioActualizado.estadoCivil}
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
                      value={funcionarioActualizado.discapacidadDetalles}
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
                    onChange={() => {
                      setDiscapacidad(true);
                      funcionarioActualizado.discapacidadDetalles =
                        funcionario.discapacidadDetalles;
                    }}
                    checked={discapacidad}
                  />
                  <label htmlFor="rb1" className="p-radiobutton-label pr-5">
                    Si
                  </label>
                  <RadioButton
                    inputId="rb2"
                    name="city"
                    value="New York"
                    onChange={() => {
                      setDiscapacidad(false);
                      funcionarioActualizado.discapacidadDetalles = "";
                    }}
                    checked={!discapacidad}
                  />
                  <label htmlFor="rb2" className="p-radiobutton-label">
                    No
                  </label>
                </div>
                <div className="col mr-5">
                  <span className="p-float-label">
                    <InputText
                      className="form-control"
                      type="text"
                      min="0.1"
                      onChange={(e) => {
                        setDiasAFavor(e.target.value);
                        calculoDias(e.target.value);
                      }}
                      defaultValue={funcionarioActualizado.diasAFavor}
                    />
                    <label htmlFor="in">Días a Favor</label>
                  </span>
                  <p className="text-center mt-4 font-weight-bold">{calculo}</p>
                </div>
              </div>
              <div className="row">
                <div className="col"></div>
                <div className="col mr-5">
                  <button
                    type="submit"
                    className="btn btn-outline-success btn-lg btn-block"
                  >
                    <i className="pi pi-save" />
                    Guardar Cambios
                  </button>
                </div>
              </div>
            </form>
          </ScrollPanel>
        </div>
        <div className="col-2 text-center">
          <GuardarImagen
            cedula={funcionarioActualizado.cedula}
            setNombreImagen={setNombreImagen}
          />
          {funcionarioActualizado.nombreImagen || nombreImagenActualizada ? (
            <>
              <h6 className="text-center">Imagen Actual del Funcionario</h6>
              <img
                src={`http://localhost:5000/imagenes/${
                  nombreImagenActualizada
                    ? nombreImagenActualizada
                    : funcionario.nombreImagen
                }`}
                alt="Imagen del funcionario Actual"
                width="200px"
                height="200px"
                className="mt-2 img-fluid rounded rounded-circle"
              />
            </>
          ) : (
            "Funcionario sin Imagen"
          )}
        </div>
        <div className="col-4">
          <Error />
        </div>
      </div>
    </div>
  );
});
