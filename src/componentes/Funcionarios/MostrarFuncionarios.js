import React from "react";
import { ScrollPanel } from "primereact/scrollpanel";
import { OBTENER_FUNCIONARIOS } from "../../queries";
import { useQuery } from "@apollo/react-hooks";
import Spinner from "../Spinner";
import useClippy from "use-clippy";

function MostrarFuncionarios({ setCedula, obtenerFuncionario, mostrarExito }) {
  const [, setClip] = useClippy();
  // console.log(clip);
  const [funcionarios, guardarFuncionarios] = React.useState([]);
  let { loading, data, startPolling, stopPolling } = useQuery(
    OBTENER_FUNCIONARIOS
  );

  React.useEffect(() => {
    startPolling(500);
    return () => stopPolling();
  }, [startPolling, stopPolling]);

  React.useEffect(() => {
    if (data) return guardarFuncionarios([...data.obtenerFuncionarios]);
  }, [data]);

  const buscarInformacion = (e) => {
    const texto = e.target.value.toUpperCase();
    const datos = data.obtenerFuncionarios;

    const busqueda = datos.filter((func) => {
      const nombre = func.nombre.toUpperCase();
      const segundoNombre = func.segundoNombre.toUpperCase();
      const apellido = func.apellido.toUpperCase();
      const segundoApellido = func.segundoApellido.toUpperCase();
      return (
        nombre.indexOf(texto) > -1 ||
        segundoNombre.indexOf(texto) > -1 ||
        apellido.indexOf(texto) > -1 ||
        segundoApellido.indexOf(texto) > -1
      );
    });
    if (Object.keys(busqueda).length > 0) {
      return guardarFuncionarios([...busqueda]);
    }
  };

  if (loading) return <Spinner />;

  return (
    <>
      {Object.keys(funcionarios).length > 0 ? (
        <ScrollPanel style={{ width: "100%", height: "650px" }}>
          <input
            type="text"
            className="form-control"
            onChange={(e) => buscarInformacion(e)}
            placeholder="Buscar funcionario por nombres o apellidos"
          />
          <table className="table table-hover">
            <thead className="thead-dark text-center">
              <tr>
                <th scope="col">Cédula</th>
                <th scope="col">Funcionario</th>
                <th scope="col">Días a Favor</th>
                <th scope="col">Tipo Funcionario</th>
                <th scope="col">Vinculación</th>
                <th scope="col">Ver</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {funcionarios.map((func, index) => (
                <tr key={func.cedula + index}>
                  <td
                    style={{
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      setClip(func.cedula);
                      mostrarExito(`Cédula copiada a portapapeles`);
                    }}
                  >
                    <i className="pi pi-copy mr-3" style={{ fontSize: 25 }} />
                    {func.cedula}
                  </td>
                  <td
                    style={{
                      cursor: "alias",
                    }}
                    onClick={async () => {
                      setCedula(func.cedula);
                      await obtenerFuncionario({
                        variables: { cedula: func.cedula },
                      });
                    }}
                  >
                    {func.apellido} {func.segundoApellido} {func.nombre}{" "}
                    {func.segundoNombre}{" "}
                  </td>
                  <td
                    style={{
                      cursor: "alias",
                    }}
                    onClick={async () => {
                      setCedula(func.cedula);
                      await obtenerFuncionario({
                        variables: { cedula: func.cedula },
                      });
                    }}
                  >
                    {func.diasAFavor}
                  </td>
                  <td
                    style={{
                      cursor: "alias",
                    }}
                    onClick={async () => {
                      setCedula(func.cedula);
                      await obtenerFuncionario({
                        variables: { cedula: func.cedula },
                      });
                    }}
                  >
                    {func.tipoFuncionario}
                  </td>
                  <td
                    style={{
                      cursor: "alias",
                    }}
                    onClick={async () => {
                      setCedula(func.cedula);
                      await obtenerFuncionario({
                        variables: { cedula: func.cedula },
                      });
                    }}
                  >
                    {func.tipoVinculacion}
                  </td>
                  <td
                    style={{
                      cursor: "pointer",
                    }}
                    onClick={async () => {
                      setCedula(func.cedula);
                      await obtenerFuncionario({
                        variables: { cedula: func.cedula },
                      });
                    }}
                  >
                    <i
                      className="pi pi-eye"
                      style={{ fontSize: 25, color: "#007BFF" }}
                    ></i>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </ScrollPanel>
      ) : null}
    </>
  );
}

export default MostrarFuncionarios;
