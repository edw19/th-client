import React from "react";
import educamos from "../materiales/educamos.png";
import upec from "../materiales/upec.png";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 25,
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
});

function Documento({ funcionarios, periodoSeleccionado, regimen }) {
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
              paddingRight: 20,
              textAlign: "center",
              fontSize: 15,
              marginTop: 15,
            }}
          >
            <Text>Departamento de</Text>
            <Text>Talento Humano</Text>
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
          <Text style={{ marginBottom: 5 }}>
            REPORTE DE ESTADO DE FUNCIONARIOS
          </Text>
          {regimen === "DOCENTE" && <Text>DOCENTES</Text>}
          {regimen === "ADMINISTRATIVO" && <Text>ADMINISTRATIVOS</Text>}
          {regimen === "CÓDIGO LABORAL" && <Text>CÓDIGO LABORAL</Text>}
          {regimen === "*" && <Text>GENERAL</Text>}
        </View>
        <View
          style={{
            textAlign: "right",
            marginVertical: 4,
            paddingTop: 4,
            fontSize: 10,
          }}
        >
          <Text>Período {periodoSeleccionado.nombre}</Text>
        </View>
        {/* Funcionario */}
        {Object.keys(funcionarios).length > 0 ? (
          <View
            style={{
              borderTop: 1,
              borderBottom: 1,
              padding: 6,
              marginTop: 10,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                fontSize: 8,
              }}
            >
              <View
                style={{
                  width: 75,
                  marginTop: 15,
                  fontSize: 10,
                  textAlign: "center",
                  paddingRight: 20,
                }}
              >
                <Text>Cédula</Text>
              </View>
              <View
                style={{
                  width: 200,
                  textAlign: "center",
                  marginRight: 12,
                  fontSize: 10,
                  marginTop: 15,
                }}
              >
                <Text>Funcionario</Text>
              </View>
              <View
                style={{
                  width: 50,
                  textAlign: "center",
                  marginRight: 10,
                  flexDirection: "column",
                }}
              >
                <Text>N°</Text>
                <Text>Vacaciones</Text>
                <Text>Solicitadas</Text>
              </View>
              <View
                style={{
                  width: 50,
                  textAlign: "center",
                  marginRight: 25,
                  flexDirection: "column",
                }}
              >
                <Text>N°</Text>
                <Text>Permisos</Text>
                <Text>Descontados</Text>
              </View>
              <View
                style={{
                  width: 30,
                  textAlign: "center",
                  marginRight: 28,
                  flexDirection: "column",
                  marginTop: 10,
                }}
              >
                <Text>Días</Text>
                <Text>Disponibles</Text>
              </View>
              <View
                style={{
                  width: 50,
                  textAlign: "center",
                  flexDirection: "column",
                  marginTop: 10,
                }}
              >
                <Text>Horas</Text>
                <Text>Acumuladas</Text>
              </View>
            </View>
            {funcionarios.map((funcionario, index) => (
              <View
                key={index}
                style={{
                  flexDirection: "row",
                  borderBottom: 1,
                  marginTop: 3,
                  marginBottom: 3,
                  fontSize: 10,
                }}
              >
                <Text style={{ width: 75 }}>{funcionario.cedula}</Text>
                <Text
                  style={{ width: 200, textAlign: "center", marginRight: 35 }}
                >
                  {funcionario.apellido +
                    " " +
                    funcionario.segundoApellido +
                    " " +
                    funcionario.nombre +
                    " " +
                    funcionario.segundoNombre}
                  {funcionario.tipoFuncionario === "ADMINISTRATIVO" && "  (A)"}
                  {funcionario.tipoFuncionario === "DOCENTE" && "  (D)"}
                  {funcionario.tipoFuncionario === "CÓDIGO DE TRABAJO" &&
                    "  (C)"}
                </Text>
                <Text
                  style={{ width: 10, textAlign: "center", marginRight: 45 }}
                >
                  {funcionario.vacaciones}
                </Text>
                <Text
                  style={{ width: 10, textAlign: "center", marginRight: 58 }}
                >
                  {funcionario.permisos}
                </Text>
                <Text
                  style={{ width: 10, textAlign: "center", marginRight: 40 }}
                >
                  {funcionario.diasAFavor}
                </Text>
                <Text style={{ width: 50, textAlign: "center" }}>
                  {funcionario.horasAcumuladas + "h"}{" "}
                  {funcionario.minutosAcumulados + "m"}
                </Text>
              </View>
            ))}
          </View>
        ) : (
          <View style={{ textAlign: "center", marginTop: 200 }}>
            <Text>Sin Información para este tipo de funcionario</Text>
          </View>
        )}

        {/* FIN Funcionario */}
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
}

export default Documento;
