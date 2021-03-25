import React, { useContext } from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { vacacionesContext } from "../Context/VacacionesContext";
import { periodoContext } from "../Context/PeriodoContext";
import educamos from "../materiales/educamos.png";
import upec from "../materiales/upec.png";
import moment from "moment";

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
    // fontFamily: "Times-Roman",
  },
  encabezado: {
    display: "flex",
    flexDirection: "row",
    alignSelf: "center",
  },
  image: {
    width: "75px",
    height: "75px",
  },
  containerImagen: {
    display: "flex",
    flexDirection: "column",
    alignContent: "center",
    marginLeft: "50px",
    marginRight: 40,
  },
  funcionario: {
    flexDirection: "row",
    alignContent: "flex-end",
    padding: 20,
  },
  funcionarioContainer: {
    flexDirection: "column",
    marginLeft: 15,
    fontSize: 10,
    textAlign: "justify",
  },
  text: {
    fontSize: 12,
    fontWeight: "bold",
  },
  textBold: {
    fontSize: 11,
    fontWeight: "ultrabold",
    marginVertical: 3,
  },
  textThin: {
    fontSize: 10,
    fontWeight: "light",
    marginVertical: 3,
  },
  flexMio: {
    flexDirection: "row",
  },
});

const Documento = ({
  funcionario,
  periodo,
  vacaciones,
  totalVacaciones,
  totalDiasDescontados,
}) => {
  return (
    <Document>
      <Page style={styles.body} size="A4">
        <View style={styles.encabezado}>
          <View style={{ marginLeft: 40 }}>
            <Image style={styles.image} src={upec} />
          </View>
          <View
            style={{
              marginRight: "170px",
              textAlign: "justify",
              fontSize: 15,
              marginTop: 15,
            }}
          >
            <Text style={{ textAlign: "center" }}>Departamento de</Text>
            <Text style={{ textAlign: "center" }}>Talento Humano</Text>
          </View>
          <View style={styles.containerImagen}>
            <Image style={styles.image} src={educamos} />
          </View>
        </View>
        <View
          style={{
            textAlign: "center",
            fontWeight: "bold",
            borderTop: 1,
            borderBottom: 1,
            paddingVertical: 7,
          }}
        >
          <Text>REPORTE DE VACACIONES</Text>
        </View>
        <View style={{ flexDirection: "row", marginTop: 5 }}>
          <Text style={styles.text}>
            <Text style={{ fontWeight: "bold" }}>Período:</Text>{" "}
            {periodo.nombre}
          </Text>
        </View>
        <View style={styles.funcionario}>
          <View>
            <Image
              src={`http://190.15.129.83:5000/imagenes/${funcionario.nombreImagen}`}
              style={styles.image}
            />
          </View>
          <View style={styles.funcionarioContainer}>
            <View style={styles.flexMio}>
              <Text style={styles.textBold}>Cédula: </Text>
              <Text style={styles.textThin}>{funcionario.cedula}</Text>
            </View>
            <View style={styles.flexMio}>
              <Text style={styles.textBold}>Funcionario: </Text>
              <Text style={styles.textThin}>
                {funcionario.nombre} {funcionario.segundoNombre}
              </Text>
            </View>
            <View style={styles.flexMio}>
              <Text style={(styles.textThin, { marginLeft: 60 })}>
                {funcionario.apellido} {funcionario.segundoApellido}
              </Text>
            </View>
            <View style={styles.flexMio}>
              <Text style={styles.textBold}>Tipo Funcionario: </Text>
              <Text style={styles.textThin}>{funcionario.tipoFuncionario}</Text>
            </View>
            {funcionario.horasAcumuladas > 0 ||
            funcionario.minutosAcumulados > 0 ? (
              <View style={styles.flexMio}>
                <Text style={styles.textBold}>Tiempo Acumulado: </Text>
                <Text style={styles.textThin}>
                  {funcionario.horasAcumuladas > 0
                    ? funcionario.horasAcumuladas + " h"
                    : null}
                  {funcionario.minutosAcumulados > 0
                    ? " y " + funcionario.minutosAcumulados + " min"
                    : null}
                </Text>
              </View>
            ) : null}
          </View>
          <View style={styles.funcionarioContainer}>
            {funcionario.diasAFavor > 0 && (
              <View style={styles.flexMio}>
                <Text style={styles.textBold}>Días disponibles: </Text>
                <Text style={styles.textThin}>{funcionario.diasAFavor}</Text>
              </View>
            )}
            {totalVacaciones > 0 && (
              <View style={styles.flexMio}>
                <Text style={styles.textBold}>Vacaciones Solicitadas: </Text>
                <Text style={styles.textThin}>{totalVacaciones}</Text>
              </View>
            )}
            {totalDiasDescontados > 0 && (
              <View style={styles.flexMio}>
                <Text style={styles.textBold}>Días Descontados: </Text>
                <Text style={styles.textThin}>{totalDiasDescontados}</Text>
              </View>
            )}
          </View>
        </View>

        {/* Vacaciones solicitados */}
        {Object.keys(vacaciones).length > 0 ? (
          <View
            style={{
              borderTop: 1,
              borderBottom: 1,
              padding: 12,
              marginTop: 10,
              fontSize: 11,
            }}
          >
            <View style={{ flexDirection: "row", textAlign: "left" }}>
              <Text style={{ marginRight: 25 }}>N°</Text>
              <Text style={{ marginRight: 50 }}>Días Solicitados</Text>
              <Text style={{ marginRight: 70 }}>Fecha Salida</Text>
              <Text style={{ marginRight: 50 }}>Fecha Entrada</Text>
              <Text>Estado</Text>
            </View>
            {vacaciones.map((vacacion, index) => (
              <View
                style={{
                  flexDirection: "row",
                  borderBottom: 1,
                  marginTop: 3,
                  marginBottom: 3,
                }}
                key={index}
              >
                <Text style={{ width: 30, marginRight: 25 }}>{index + 1}</Text>
                <View
                  style={{ width: 30, textAlign: "center", marginRight: 65 }}
                >
                  <Text>{vacacion.diasSolicitados}</Text>
                </View>
                <View
                  style={{ width: 100, textAlign: "center", marginRight: 35 }}
                >
                  <Text>
                    {moment(new Date(vacacion.fechaSalida)).format("LL")}
                  </Text>
                </View>
                <View
                  style={{ width: 100, textAlign: "center", marginRight: 25 }}
                >
                  <Text>
                    {moment(new Date(vacacion.fechaEntrada)).format("LL")}
                  </Text>
                </View>
                <View style={{ width: 80, textAlign: "center" }}>
                  <Text>
                    {vacacion.estado ? "DESCONTADO" : "SIN DESCONTAR"}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        ) : (
          <View style={{ textAlign: "center" }}>
            <Text>Funcionario sin vacaciones solicitadas</Text>
          </View>
        )}

        {/* Fin vacaciones solicitados */}
        <View
          style={{
            position: "absolute",
            fontSize: 12,
            bottom: 60,
            left: 0,
            right: 0,
            textAlign: "center",
            color: "black",
          }}
          render={() => (
            <View
              style={{
                flex: 1,
                flexDirection: "column",
                marginBottom: 15,
              }}
            >
              <Text>______________________________</Text>
              <Text style={{ marginTop: 10 }}>
                Jefe del Departamento de Talento Humano
              </Text>
            </View>
          )}
        />
        <Text
          style={{
            position: "absolute",
            fontSize: 12,
            bottom: 30,
            left: 0,
            right: 20,
            textAlign: "right",
            color: "grey",
          }}
          render={({ pageNumber, totalPages }) =>
            `${pageNumber} / ${totalPages}`
          }
          fixed
        />
      </Page>
    </Document>
  );
};

function GenerarReporteVacaciones({
  vacaciones,
  totalVacaciones,
  totalDiasDescontados,
}) {
  const { funcionario } = useContext(vacacionesContext);
  const { periodoSeleccionado } = useContext(periodoContext);
  return (
    <PDFDownloadLink
      className="ml-5"
      document={
        <Documento
          funcionario={funcionario}
          periodo={periodoSeleccionado}
          vacaciones={vacaciones}
          totalVacaciones={totalVacaciones}
          totalDiasDescontados={totalDiasDescontados}
        />
      }
      fileName={`Vacaciones ${funcionario.nombre} ${funcionario.apellido} ${periodoSeleccionado.nombre}`}
    >
      {({ blob, url, loading, error }) =>
        loading ? (
          <span style={{ fontFamily: "Cursive", color: "#28A745" }}>
            Generando PDF...
          </span>
        ) : (
          <li
            className="pi pi-download animated bounce infinite slow"
            style={{ fontSize: "2em", position: "absolute", color: "#28A745" }}
          ></li>
        )
      }
    </PDFDownloadLink>
  );
}

export default GenerarReporteVacaciones;
