import React, { useContext } from "react";
import { Route, Switch, Link } from "react-router-dom";
import "../css/simple-sidebar.css";
import { periodoContext } from "../Context/PeriodoContext";

// importar componentes
import Dashboard from "../Dashboard/Dashboard";
import AdministrarPermisos from "../Permisos/AdministrarPermisos";
import NuevoPermiso from "../Permisos/NuevoPermiso";
import CerrarSession from "../Auth/CerrarSession";
import { RutasPrivadas } from "../Auth/RutasPrivadas";
import NuevoFuncionario from "../Funcionarios/NuevoFuncionario";
import AdministrarFuncionarios from "../Funcionarios/AdministrarFuncionarios";
import EditarFuncionario from "../Funcionarios/EditarFuncionario";
import AdministrarVacaiones from "../Vacaciones/AdministrarVacaciones";
import OtorgarVacaciones from "../Vacaciones/OtorgarVacaciones";
import Configuracion from "../Configuracion/Configuracion";
import moment from "moment";
import "moment/locale/es";
import DescontarPermisos from "../Permisos/DescontarPermisos";
import AdministrarContratos from "../Contratos/AdministrarContratos";
import NuevoContrato from "../Contratos/NuevoContrato";
import Usuario from "../Usuario/Usuario";
import Editar from "../Usuario/Editar";
import { USUARIO_ACTUAL } from "../../queries";
import { useQuery } from "@apollo/react-hooks";
import NuevoUsuario from "../Usuario/NuevoUsuario";
import { useHistory } from "react-router-dom";
import Reportes from "../Reportes/Reportes";

moment.locale("es");

function MenuSuperior({ cambiarClase }) {
  const { loading, periodoSeleccionado } = useContext(periodoContext);
  const { data, loading: loadingUsuario } = useQuery(USUARIO_ACTUAL);
  const history = useHistory();
  const rol = data?.obtenerUsuario.rol;

  React.useEffect(() => {
    history.push("/dashboard");
  }, [history]);

  if (loadingUsuario)
    return (
      <div className="container mt-3 text-primary" style={{ fontSize: 18 }}>
        Cargando usuario...
      </div>
    );

  function meses() {
    let meses = moment(periodoSeleccionado.fechaFinal).diff(
      moment(periodoSeleccionado.fechaInicio),
      "months"
    );

    return Number(meses) + 1;
  }

  return (
    <div id="page-content-wrapper">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid d-flex">
          <div className="navbar-header">
            <button
              className="btn btn-link"
              id="menu-toggle"
              onClick={cambiarClase}
            >
              <li className="pi pi-list" style={{ fontSize: "2em" }}></li>
            </button>
          </div>
          <div>
            {loading ? (
              <div className="loader">Loading...</div>
            ) : (
              <div className="text-center">
                {periodoSeleccionado
                  ? `Duración aproximada del período, ${
                      meses() > 1 ? meses() + " meses" : meses() + " mes"
                    } `
                  : null}
                <h6>{periodoSeleccionado && periodoSeleccionado.nombre}</h6>
              </div>
            )}
          </div>
          <ul className="nav navbar-nav navbar-right">
            <div className="mt-2 mr-5">
              {rol === "ADMINISTRADOR" ? (
                <Link
                  style={{ textDecoration: "none" }}
                  to="/dashboard/configuracion-usuarios"
                >
                  <li className="pi pi-user" />{" "}
                  {data && data.obtenerUsuario.nombre}
                </Link>
              ) : (
                <Link
                  style={{ textDecoration: "none" }}
                  to="#!"
                  onClick={(e) => e.preventDefault()}
                >
                  <li className="pi pi-user" />{" "}
                  {data && data.obtenerUsuario.nombre}
                </Link>
              )}
            </div>
            <CerrarSession />
          </ul>
        </div>
      </nav>
      <div className="container-main mt-3">
        <Switch>
          {/* permisos */}
          {rol === "ADMINISTRADOR" && (
            <RutasPrivadas
              exact
              path="/dashboard"
              component={() => <Dashboard />}
            />
          )}
          <RutasPrivadas
            exact
            path="/dashboard/otorgar-permisos"
            component={() => <AdministrarPermisos />}
          />
          <RutasPrivadas
            exact
            path="/dashboard/nuevo-permiso"
            component={() => <NuevoPermiso />}
          />
          <RutasPrivadas
            exact
            path="/dashboard/descontar-permisos"
            component={() => <DescontarPermisos />}
          />
          {/* //funcionario */}
          <RutasPrivadas
            exact
            path="/dashboard/administrar-funcionarios"
            component={() => <AdministrarFuncionarios rol={rol} />}
          />
          <RutasPrivadas
            exact
            path="/dashboard/nuevo-funcionario"
            component={() => <NuevoFuncionario />}
          />
          <RutasPrivadas
            exact
            path="/dashboard/editar-funcionario"
            component={() => <EditarFuncionario />}
          />
          {/* Vacaciones */}
          <RutasPrivadas
            exact
            path="/dashboard/otorgar-vacaciones"
            component={() => <AdministrarVacaiones />}
          />
          <RutasPrivadas
            exact
            path="/dashboard/conceder-vacaciones"
            component={() => <OtorgarVacaciones />}
          />
          {/* Contratos */}
          <RutasPrivadas
            exact
            path="/dashboard/administrar-documentos"
            component={() => <AdministrarContratos />}
          />
          <RutasPrivadas
            exact
            path="/dashboard/nuevo-contrato"
            component={() => <NuevoContrato />}
          />
          {/* Reportes y periodos */}
          {rol === "ADMINISTRADOR" && (
            <RutasPrivadas
              exact
              path="/dashboard/generar-reportes"
              component={() => <Reportes />}
            />
          )}
          {rol === "PRIMARIO" && (
            <RutasPrivadas
              exact
              path="/dashboard/generar-reportes"
              component={() => <Reportes />}
            />
          )}
          {rol === "ADMINISTRADOR" && (
            <RutasPrivadas
              exact
              path="/dashboard/crear-periodo"
              component={() => <Configuracion />}
            />
          )}
          {rol === "PRIMARIO" && (
            <RutasPrivadas
              exact
              path="/dashboard/crear-periodo"
              component={() => <Configuracion />}
            />
          )}
          <RutasPrivadas
            exact
            path="/dashboard/configuracion-usuarios"
            component={() => <Usuario />}
          />
          <RutasPrivadas
            exact
            path="/dashboard/editar-usuario"
            component={() => <Editar />}
          />

          {/* Usuario */}
          {rol === "ADMINISTRADOR" ? (
            <>
              <RutasPrivadas
                exact
                path="/dashboard/crear-usuario"
                component={() => <NuevoUsuario />}
              />
            </>
          ) : (
            <AdministrarPermisos />
          )}
          <Route path="*" render={() => "404 not found"} />
        </Switch>
      </div>
    </div>
  );
}

export default MenuSuperior;
