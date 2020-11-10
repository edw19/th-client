import React from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import Reporte from "./Reporte";

function PdfDownload({ funcionario }) {
  return (
    <PDFDownloadLink
      document={<Reporte funcionario={funcionario} />}
      fileName={`reporte-información-funcionario-${funcionario.apellido}-${funcionario.segundoApellido}-${funcionario.nombre}`}
    >
      {({ loading }) => {
        if (loading) {
          return (
            <span style={{ fontFamily: "Cursive", color: "#28A745" }}>
              Generando PDF...
            </span>
          );
        }
        // if (!loading) mostrarExito("Reporte generado con éxito");

        return (
          <li
            className="pi pi-download animated bounce infinite slow"
            style={{
              fontSize: "3em",
              position: "absolute",
              color: "#28A745",
            }}
          ></li>
        );
      }}
    </PDFDownloadLink>
  );
}

export default PdfDownload;
