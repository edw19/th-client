import React from "react";
import { Link, withRouter } from "react-router-dom";
import { ELIMINAR_FUNCIONARIO } from "../../mutation";
import { useMutation } from "@apollo/react-hooks";
import Noty from "noty";
import { ScrollPanel } from "primereact/scrollpanel";
import PfdDownload from "./PdfDownload";
import moment from "moment";
import "moment/locale/es";
moment.locale("es");

export default withRouter(function MostrarFuncionario({
  data,
  mostrarExito,
  mostrarError,
  guardarFuncionario,
  setCedula,
  history,
}) {
  const [generar, setGenerar] = React.useState(false);
  const [eliminarFuncionario] = useMutation(ELIMINAR_FUNCIONARIO, {
    onError: (error) => {
      mostrarError(error.graphQLErrors[0].message);
    },
    onCompleted: (data) => {
      mostrarExito(data.eliminarFuncionario);
    },
  });

  const eliminarFuncionarioFuncion = () => {
    new Promise((resolve, reject) => {
      let noti = new Noty({
        type: "info",
        layout: "center",
        text: `<div> <h6>¿ Quieres eliminar el funcionario ${data.nombre} ${data.apellido} ?</h6> <br /><span>Se eliminaran los permisos, vacaciones y contratos asociados a este funcionario</span> </div>`,
        theme: "mint",
        modal: true,
        closeWith: ["button"],
        animation: {
          open: "animated bounceInDown",
          close: "animated bounceOutUp",
        },
        buttons: [
          Noty.button("SI", "btn btn-noti", function () {
            const { id } = data;
            eliminarFuncionario({ variables: { id } });
            guardarFuncionario({});
            setCedula("");
            resolve(noti.close());
            return history.push("/dashboard/administrar-funcionarios");
          }),

          Noty.button("NO", "btn btn-error btn-noti-no", function () {
            noti.close();
            return reject("Funcionario no se ha eliminado");
          }),
        ],
      }).show();
    }).catch((error) => {
      mostrarExito(error);
    });
  };

  return (
    <>
      {data.cedula ? (
        <ScrollPanel style={{ width: "100%", height: "700px" }}>
          <div className="row p-2">
            <div className="col-6">
              <div className="row">
                <div className="col">
                  <strong>Nombres: </strong>
                  {data.nombre} {data.segundoNombre}
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col">
                  <strong>Apellidos: </strong>
                  {data.apellido} {data.segundoApellido}
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col">
                  <strong>Nacionalidad: </strong>
                  {data.nacionalidad}
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col">
                  <strong>Tipo de Vinculación: </strong>
                  {data.tipoVinculacion}
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col">
                  <strong>Fecha de Nacimiento: </strong>
                  {moment(new Date(data.fechaNacimiento)).format("LL")}
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <strong>Fecha de Ingreso: </strong>
                  {data.fechaIngreso
                    ? moment(new Date(data.fechaIngreso)).format("LL")
                    : "Sin información"}
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <strong>Fecha de Salida: </strong>
                  {data.fechaSalida
                    ? moment(new Date(data.fechaSalida)).format("LL")
                    : "Sin información"}
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col d-flex flex-column">
                  <strong>Títulos Profesionales: </strong>
                  {data.tituloProfesional.map((tit, i) => (
                    <span
                      key={tit + i}
                      className="d-flex justify-content-center"
                      style={{ color: tit.principal && "green" }}
                    >
                      {tit.nombre}
                    </span>
                  ))}
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col">
                  <strong>Género: </strong>
                  {data.genero}
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col">
                  <strong>Tipo de Sangre: </strong>
                  {data.tipoSangre}
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col">
                  <strong>Estado Civil: </strong>
                  {data.estadoCivil}
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col">
                  <strong>Tipo Funcionario: </strong>
                  {data.tipoFuncionario}
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col">
                  <strong>Días a Favor: </strong>
                  {data.diasAFavor}
                </div>
              </div>
              <hr />
              {data.discapacidad ? (
                <div className="row">
                  <div className="col">
                    <strong>Discapacidad del Funcionario: </strong>
                    {data.discapacidadDetalles}
                  </div>
                </div>
              ) : null}
            </div>
            <div className="col-6">
              <div className="row">
                {data.nombreImagen ? (
                  <div className="col">
                    <h6 className="text-center">
                      {" "}
                      Imagen Actual del funcionario
                    </h6>
                    <div className="d-flex justify-content-center">
                      <img
                        className="img-fluid rounded rounded-circle float-right mt-3"
                        src={`http://localhost:5000/imagenes/${data.nombreImagen}`}
                        width="250px"
                        height="800px"
                        alt="Imagen del funcionario"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="col">
                    <h6 className="text-center">Funcionario sin Imagen</h6>
                    <div className="d-fex justify-content-center">
                      <p>
                        Debes editar la información del funcionario y agregar
                        una imagen
                      </p>
                    </div>
                  </div>
                )}
              </div>
              <hr />
              <div className="row mt-1">
                <div
                  className={`col text-center ${generar ? "mb-5 mr-5" : ""}`}
                >
                  {generar ? (
                    <PfdDownload funcionario={data} />
                  ) : (
                    <button
                      onClick={() => {
                        setGenerar(true);
                        setTimeout(() => {
                          setGenerar(false);
                        }, 5000);
                      }}
                      className="btn btn-outline-success btn-lg btn-block"
                    >
                      Imprimir Información
                    </button>
                  )}
                </div>
              </div>
              <div className="row mt-1">
                <div className="col">
                  <Link
                    to={{
                      pathname: "/dashboard/editar-funcionario",
                      state: data,
                    }}
                    className="btn btn-outline-primary btn-lg btn-block"
                  >
                    Editar Información
                  </Link>
                </div>
              </div>
              <div className="row mt-1">
                <div className="col">
                  <button
                    className="btn btn-outline-danger btn-lg btn-block"
                    onClick={eliminarFuncionarioFuncion}
                  >
                    Eliminar Funcionario
                  </button>
                </div>
              </div>
            </div>
          </div>
        </ScrollPanel>
      ) : (
        ""
      )}
    </>
  );
});
