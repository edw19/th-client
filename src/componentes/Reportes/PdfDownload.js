import React from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import Documento from "./Documento";

function PdfDownload({ funcionarios, periodoSeleccionado, regimen }) {
  return (
    <PDFDownloadLink
      document={
        <Documento
          funcionarios={funcionarios}
          periodoSeleccionado={periodoSeleccionado}
          regimen={regimen}
        />
      }
      fileName={`reporte-estado-funcionarios-${
        regimen === "*" ? "general" : regimen.toLowerCase()
      }`}
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
              fontSize: "2em",
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
