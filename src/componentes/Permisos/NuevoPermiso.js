import React, { useState, useEffect, useContext } from "react";
import Error, { mostrarError } from "../Alertas/Error";
import Exito, { mostrarExito } from "../Alertas/Exito";
import { OBTENER_FUNCIONARIO } from "../../queries";
import { useLazyQuery, useMutation } from "@apollo/react-hooks";
import { CREAR_PERMISO } from "../../mutation";
import { Calendar } from "primereact/calendar";
import { withRouter } from "react-router-dom";
import { Spinner } from "primereact/spinner";
import Cedula from "../Cedula";
import { RadioButton } from "primereact/radiobutton";
import { funcionarioContext2 } from "../Context/FuncionarioContext2";
import { periodoContext } from "../Context/PeriodoContext";
import { Link } from "react-router-dom";
import moment from "moment";
import "moment/locale/es";
moment.locale("es");

let es = {
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
  today: "Hoy",
  clear: "Limpiar",
  dateFormat: "dd/mm/yy",
  weekHeader: "Sm",
};

export default withRouter(function NuevoPermiso(props) {
  const {
    funcionario: FuncionarioEnNuevoPermisos,
    guardarFuncionario,
  } = useContext(funcionarioContext2);
  const [cedula, setCedula] = useState(
    FuncionarioEnNuevoPermisos.cedula ? FuncionarioEnNuevoPermisos.cedula : ""
  );
  const { periodoSeleccionado } = useContext(periodoContext);
  const [motivo, setMotivo] = useState("");
  const [horaSalida, setHoraSalida] = useState(new Date());
  const [fechaSalida, setFechaSalida] = useState(new Date());
  const [horasPermiso, setHorasPermiso] = useState(0);
  const [minutosPermiso, setMinutosPermiso] = useState(0);
  const [horaEntrada, setHoraEntrada] = useState(new Date());
  let [funcionario, setFuncionario] = useState(null);
  let [obtenerFuncionario, { loading, data }] = useLazyQuery(
    OBTENER_FUNCIONARIO,
    {
      onError: (error) => {
        setFuncionario(null);
        // console.log(error);
        mostrarError(error.graphQLErrors[0].message.toString());
      },
      onCompleted: () => {
        mostrarExito("Se ha Encontrado al Funcionario");
        setFuncionario({ ...data });
      },
      pollInterval: 500,
    }
  );
  const [crearPermiso] = useMutation(CREAR_PERMISO, {
    onError: (error) => {
      mostrarError(error.graphQLErrors[0].message);
    },
    onCompleted: (data) => {
      mostrarExito(data.crearPermiso);
      limpiarEstado();
      guardarFuncionario({ ...funcionario.obtenerFuncionario });
      props.history.push("/dashboard/otorgar-permisos");
    },
  });

  useEffect(() => {
    if (horasPermiso === 0 || minutosPermiso === 0) setHoraEntrada(horaSalida);
    setHoraEntrada(
      moment(horaSalida)
        .add(horasPermiso, "hours")
        .add(minutosPermiso, "minutes")
        .format("HH:mm")
    );
  }, [horasPermiso, horaSalida, minutosPermiso]);

  useEffect(() => {
    if (cedula.length > 9) {
      obtenerFuncionario({ variables: { cedula } });
      return;
    }
  }, [cedula, obtenerFuncionario]);

  const limpiarEstado = () => {
    setCedula("");
    setMotivo("");
    setHoraSalida(new Date());
    setHorasPermiso(0);
    setMinutosPermiso(0);
    setHoraEntrada(null);
    setFuncionario(null);
  };

  const validaformulario = () => {
    const noValido = !cedula || Object.keys(motivo).length === 0 || !horaSalida;
    return noValido;
  };

  const guardarPermiso = (e) => {
    e.preventDefault();
    if (!horasPermiso && !minutosPermiso)
      return mostrarError("Debes Asignar un tiempo de permiso al funcionario");
    if (!fechaSalida)
      return mostrarError("Fecha del permisos no puede estar vacía");
    let input = {
      funcionario: funcionario.obtenerFuncionario.id,
      periodo: periodoSeleccionado.id,
      fechaSalida: fechaSalida.toString(),
      horaSalida: horaSalida.toString(),
      horasPermiso,
      minutosPermiso,
      motivo: motivo,
      estado: true,
    };
    crearPermiso({
      variables: { input },
    });
  };

  if (loading) return <Spinner />;
  return (
    <div className="ml-3">
      <div className="row">
        <div className="col-3">
          <h2>Nuevo Permiso </h2>
        </div>
        <div className="col-2 text-center">
          <Link to="/dashboard/otorgar-permisos">
            <li
              style={{ fontSize: "2em" }}
              className="pi pi-arrow-left mt-2 mr-5"
            ></li>
          </Link>
        </div>
      </div>
      <form onSubmit={guardarPermiso}>
        <div className="row mt-4">
          <div className="col-8">
            <div className="row">
              <Cedula
                mostrarError={mostrarError}
                cedula={cedula}
                setCedula={setCedula}
                obtenerFuncionario={obtenerFuncionario}
              />
            </div>
            {funcionario !== null ? (
              <div className="row mt-3">
                <div className="col-8">
                  <div className="row">
                    <div className="col">
                      <strong className="text-uppercase">
                        Solicita{" "}
                        {funcionario.obtenerFuncionario.genero === "MASCULINO"
                          ? "EL "
                          : "LA "}
                        {funcionario.obtenerFuncionario.tipoFuncionario ===
                          "CÓDIGO DE TRABAJO" &&
                        funcionario.obtenerFuncionario.genero === "MASCULINO"
                          ? "TRABAJADOR : "
                          : funcionario.obtenerFuncionario.tipoFuncionario ===
                              "CÓDIGO DE TRABAJO" &&
                            funcionario.obtenerFuncionario.genero === "FEMENINO"
                          ? "TRABAJADORA : "
                          : funcionario.obtenerFuncionario.tipoFuncionario ===
                              "ADMINISTRATIVO" &&
                            funcionario.obtenerFuncionario.genero === "FEMENINO"
                          ? "ADMINISTRATIVA : "
                          : funcionario.obtenerFuncionario.tipoFuncionario ===
                              "ADMINISTRATIVO" &&
                            funcionario.obtenerFuncionario.genero ===
                              "MASCULINO"
                          ? "ADMINISTRATIVO : "
                          : funcionario.obtenerFuncionario.tipoFuncionario +
                            ": "}{" "}
                      </strong>
                      {funcionario.obtenerFuncionario.nombre}{" "}
                      {funcionario.obtenerFuncionario.segundoNombre}{" "}
                      {funcionario.obtenerFuncionario.apellido}{" "}
                      {funcionario.obtenerFuncionario.segundoApellido}
                    </div>
                  </div>
                  <div className="row mt-3 mb-3">
                    <div className="col-4 mt-2">
                      <RadioButton
                        inputId="motivo1"
                        name="motivos"
                        value="Asuntos Laborales"
                        onChange={(e) => setMotivo(e.target.value)}
                        checked={motivo === "Asuntos Laborales"}
                      />
                      <label htmlFor="motivo1" className="ml-2">
                        Asuntos Laborales
                      </label>
                    </div>
                    <div className="col-4 mt-2">
                      <RadioButton
                        inputId="motivo2"
                        name="motivos"
                        value="Asuntos Personales"
                        onChange={(e) => setMotivo(e.target.value)}
                        checked={motivo === "Asuntos Personales"}
                      />
                      <label htmlFor="motivo2" className="ml-2">
                        Asuntos Personales
                      </label>
                    </div>
                    <div className="col-4 mt-2">
                      <RadioButton
                        inputId="motivo3"
                        name="motivos"
                        value="Calamidad Doméstica"
                        onChange={(e) => setMotivo(e.target.value)}
                        checked={motivo === "Calamidad Doméstica"}
                      />
                      <label htmlFor="motivo3" className="ml-2">
                        Calamidad Doméstica
                      </label>
                    </div>
                    <div className="col-4 mt-2">
                      <RadioButton
                        inputId="motivo4"
                        name="motivos"
                        value="Enfermedad"
                        onChange={(e) => setMotivo(e.target.value)}
                        checked={motivo === "Enfermedad"}
                      />
                      <label htmlFor="motivo4" className="ml-2">
                        Enfermedad
                      </label>
                    </div>
                    <div className="col-4 mt-2">
                      <RadioButton
                        inputId="motivo5"
                        name="motivos"
                        value="Estudios Regulares"
                        onChange={(e) => setMotivo(e.target.value)}
                        checked={motivo === "Estudios Regulares"}
                      />
                      <label htmlFor="motivo5" className="ml-2">
                        Estudios Regulares
                      </label>
                    </div>
                    <div className="col-4 mt-2">
                      <RadioButton
                        inputId="motivo6"
                        name="motivos"
                        value="Otros"
                        onChange={(e) => setMotivo(e.target.value)}
                        checked={motivo === "Otros"}
                      />
                      <label htmlFor="motivo6" className="ml-2">
                        Otros
                      </label>
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col">
                      <div className="row">
                        <div className="col d-flex flex-column">
                          <strong className="text-uppercase">
                            Hora de Salida
                          </strong>
                          <Calendar
                            value={horaSalida}
                            onChange={(e) => {
                              setHoraSalida(e.target.value);
                            }}
                            timeOnly={true}
                            hourFormat="24"
                          />
                        </div>
                        <div className="col d-flex flex-column">
                          <strong className="text-uppercase">
                            Fecha Salida
                          </strong>
                          <Calendar
                            placeholder="Fecha de Salida"
                            locale={es}
                            value={fechaSalida}
                            onChange={(e) => setFechaSalida(e.target.value)}
                            readOnlyInput={true}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col">
                      {<br />}
                      <Spinner
                        value={minutosPermiso}
                        size={8}
                        onChange={(e) => {
                          setMinutosPermiso(e.value);
                        }}
                        step={5}
                        min={0}
                        max={55}
                      />
                      <strong className="text-uppercase">
                        {"  "}Minutos de Permiso
                      </strong>
                      {<br />}
                      <Spinner
                        value={horasPermiso}
                        size={8}
                        onChange={(e) => {
                          setHorasPermiso(e.value);
                        }}
                        min={0}
                        max={7}
                      />
                      <strong className="text-uppercase">
                        {"  "}Horas de Permiso
                      </strong>
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col">
                      <strong className="text-uppercase">
                        hora de Entrada:{" "}
                      </strong>
                      {horaEntrada}
                    </div>
                    <div className="col">
                      <strong className="text-uppercase">
                        Total horas de permiso:{" "}
                      </strong>
                      <p>
                        {horasPermiso + " horas y "}
                        {minutosPermiso + " minutos"}
                      </p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-6">
                      <button
                        type="submit"
                        className="btn btn-outline-success"
                        disabled={validaformulario()}
                      >
                        <i className="pi pi-save mr-2" />
                        Guardar Permiso
                      </button>
                    </div>
                  </div>
                </div>
                <div className="col-4 text-left">
                  {funcionario.obtenerFuncionario.nombreImagen && (
                    <img
                      src={`http://localhost:5000/imagenes/${funcionario.obtenerFuncionario.nombreImagen}`}
                      width="200px"
                      height="200px"
                      className="img-fluid rounded rounded-circle"
                      alt={`${funcionario.obtenerFuncionario.nombre} ${funcionario.obtenerFuncionario.apellido}`}
                    />
                  )}
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="col-4">
            <Exito />
            <Error />
          </div>
        </div>
      </form>
    </div>
  );
});
