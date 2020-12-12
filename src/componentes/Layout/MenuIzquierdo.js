import React, { useState } from "react";
import { Link } from "react-router-dom";
import MenuSuperior from "./MenuSuperior";
import "../css/simple-sidebar.css";
import Logo from "../materiales/logo.svg";
import { USUARIO_ACTUAL } from "../../queries";
import { useQuery } from "@apollo/react-hooks";

import { ESTAS_AUTENTICADO } from "../../queries";
import { cerrarSessionUsuario } from "../Auth/CerrarSession";
import { useApolloClient } from "@apollo/react-hooks";

function MenuIzquierdo() {
  const client = useApolloClient();
  let [clase, setClase] = useState("d-flex");
  const cambiarClase = () => {
    if (clase === "d-flex") {
      setClase("d-flex toggled");
    } else {
      setClase("d-flex");
    }
  };
  const { data } = useQuery(USUARIO_ACTUAL);
  const rol = data?.obtenerUsuario.rol;
  const token = localStorage.getItem("th-token");
  const { error } = useQuery(ESTAS_AUTENTICADO, {
    variables: {
      token,
    },
  });
  if (error) {
    console.log(error);
    cerrarSessionUsuario(client);
    return "Cerrando Sesión.....";
  }

  return (
    <div className={`${clase}`} id="wrapper">
      <div className="border-right bg-dark" id="sidebar-wrapper">
        <div className="sidebar-heading text-center">
          <h1 className="font-weight-italic text-white">SARF</h1>
          <img
            src={Logo}
            className="mt-5 mb-3 img-fluid"
            width="200px"
            height="250px"
            alt="logo talento humano, extracción de datos"
          />
          <p className="text-white" style={{ fontSize: "16px" }}>
            Sistema de Administración Y
            <br />
            Registro de Funcionarios
          </p>
        </div>
        <div className="sidenav list-group list-group-flush">
          {rol === "ADMINISTRADOR" && (
            <Link
              to="/dashboard"
              className="list-group-item list-group-item-action bg-dark text-white"
            >
              <i className="pi pi-chart-bar" style={{ fontSize: "2em" }}></i>{" "}
              Panel de Control
            </Link>
          )}
          {rol === "PRIMARIO" && (
            <Link
              to="/dashboard/crear-periodo"
              className="list-group-item list-group-item-action bg-dark text-white"
            >
              <i className="pi pi-tags" style={{ fontSize: "2em" }}></i> Período
            </Link>
          )}
          {rol === "ADMINISTRADOR" && (
            <Link
              to="/dashboard/crear-periodo"
              className="list-group-item list-group-item-action bg-dark text-white"
            >
              <i className="pi pi-tags" style={{ fontSize: "2em" }}></i> Crear
              Período
            </Link>
          )}
          <Link
            to="/dashboard/otorgar-permisos"
            className="list-group-item list-group-item-action bg-dark text-white "
          >
            <i className="pi pi-ticket" style={{ fontSize: "2em" }}></i> Otorgar
            Permisos
          </Link>
          <Link
            to="/dashboard/otorgar-vacaciones"
            className="list-group-item list-group-item-action bg-dark text-white"
          >
            <i className="pi pi-calendar" style={{ fontSize: "2em" }}></i>{" "}
            Otorgar Vacaciones
          </Link>
          <Link
            to="/dashboard/administrar-documentos"
            className="list-group-item list-group-item-action bg-dark text-white"
          >
            <i className="pi pi-file" style={{ fontSize: "2em" }}></i>
            <span style={{ fontSize: 15 }}>Administrar Documentos</span>
          </Link>
          {rol === "PRIMARIO" && (
            <Link
              to="/dashboard/generar-reportes"
              className="list-group-item list-group-item-action bg-dark text-white "
            >
              <i className="pi pi-file-pdf" style={{ fontSize: "2em" }}></i>
              Reportes
            </Link>
          )}
          {rol === "ADMINISTRADOR" && (
            <Link
              to="/dashboard/generar-reportes"
              className="list-group-item list-group-item-action bg-dark text-white "
            >
              <i className="pi pi-file-pdf" style={{ fontSize: "2em" }}></i>
              Reportes
            </Link>
          )}
          <Link
            to="/dashboard/administrar-funcionarios"
            className="list-group-item list-group-item-action bg-dark text-white "
          >
            <i className="pi pi-user-minus" style={{ fontSize: "2em" }}></i>{" "}
            Funcionarios
          </Link>
          <Link
            to="/dashboard/configuracion-usuarios"
            className="list-group-item list-group-item-action bg-dark text-white"
          >
            <i className="pi pi-user" style={{ fontSize: "2em" }}></i> Usuario{" "}
          </Link>
        </div>
      </div>
      <MenuSuperior cambiarClase={cambiarClase} />
    </div>
  );
}

export default MenuIzquierdo;
