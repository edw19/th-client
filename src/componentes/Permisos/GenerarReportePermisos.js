import React, { useContext } from "react"
import { REPORTE_PERMISOS } from "../../queries"
import { useQuery } from "@apollo/react-hooks"
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer"
import upec from "../materiales/upec.png"
import educamos from "../materiales/educamos.png"
import { PDFDownloadLink } from "@react-pdf/renderer"
import { permisosContext } from "../Context/PermisosContext"
import { periodoContext } from "../Context/PeriodoContext"
import "moment/locale/es"
import moment from "moment"
moment.locale("es")

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
  flexMio1: {
    flexDirection: "row",
    marginLeft: 30,
  },
  flexMio2: {
    flexDirection: "row",
    marginRight: 80,
  },
})

function DocumentoPermisos({ permisos, resultado, periodo, funcionario }) {
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
          <Text>REPORTE DE PERMISOS</Text>
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
              src={`http://localhost:5000/imagenes/${funcionario.nombreImagen}`}
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
            {resultado?.totalPermisosEnMinutos > 0 && (
              <View style={styles.flexMio}>
                <Text style={styles.textBold}>Permisos en Minutos: </Text>
                <Text style={styles.textThin}>
                  {resultado.totalPermisosEnMinutos}
                </Text>
              </View>
            )}
            {resultado.totalPermisosEnHoras > 0 && (
              <View style={styles.flexMio}>
                <Text style={styles.textBold}>Permisos en horas: </Text>
                <Text style={styles.textThin}>
                  {resultado.totalPermisosEnHoras}
                </Text>
              </View>
            )}
            {resultado.diasDescontados > 0 && (
              <View style={styles.flexMio}>
                <Text style={styles.textBold}>Días Descontados: </Text>
                <Text style={styles.textThin}>{resultado.diasDescontados}</Text>
              </View>
            )}
            {resultado.totalPermisos > 0 && (
              <View style={styles.flexMio}>
                <Text style={styles.textBold}>Total Permisos: </Text>
                <Text style={styles.textThin}>{resultado.totalPermisos}</Text>
              </View>
            )}
            {funcionario.diasAFavor > 0 && (
              <View style={styles.flexMio}>
                <Text style={styles.textBold}>Días Disponibles: </Text>
                <Text style={styles.textThin}>{funcionario.diasAFavor}</Text>
              </View>
            )}
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View style={styles.flexMio}>
            <Text style={styles.textBold}>
              {resultado.totalPorMotivo[0].motivo}
              {": "}
            </Text>
            <Text style={styles.textThin}>
              {resultado.totalPorMotivo[0].valor}
            </Text>
          </View>
          <View style={styles.flexMio}>
            <Text style={styles.textBold}>
              {resultado.totalPorMotivo[1].motivo}
              {": "}
            </Text>
            <Text style={styles.textThin}>
              {resultado.totalPorMotivo[1].valor}
            </Text>
          </View>
          <View style={styles.flexMio}>
            <Text style={styles.textBold}>
              {resultado.totalPorMotivo[2].motivo}
              {": "}
            </Text>
            <Text style={styles.textThin}>
              {resultado.totalPorMotivo[2].valor}
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View style={styles.flexMio}>
            <Text style={styles.textBold}>
              {resultado.totalPorMotivo[3].motivo}
              {": "}
            </Text>
            <Text style={styles.textThin}>
              {resultado.totalPorMotivo[3].valor}
            </Text>
          </View>
          <View style={styles.flexMio1}>
            <Text style={styles.textBold}>
              {resultado.totalPorMotivo[4].motivo}
              {": "}
            </Text>
            <Text style={styles.textThin}>
              {resultado.totalPorMotivo[4].valor}
            </Text>
          </View>
          <View style={styles.flexMio2}>
            <Text style={styles.textBold}>
              {resultado.totalPorMotivo[5].motivo}
              {": "}
            </Text>
            <Text style={styles.textThin}>
              {resultado.totalPorMotivo[5].valor}
            </Text>
          </View>
        </View>

        {/* Permisos solicitados */}
        {Object.keys(permisos).length > 0 ? (
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
              <Text style={{ marginRight: 50 }}>N°</Text>
              <Text style={{ marginRight: 115 }}>Motivo</Text>
              <Text style={{ marginRight: 55 }}>Fecha Salida</Text>
              <Text style={{ marginRight: 21 }}>Hora Salida</Text>
              <Text style={{ marginRight: 25 }}>Horas </Text>
              <Text>Minutos </Text>
            </View>
            {permisos.map((per, index) => (
              <View
                style={{
                  flexDirection: "row",
                  borderBottom: 1,
                  marginTop: 3,
                  marginBottom: 3,
                  backgroundColor:
                    per.motivo === "Asuntos Personales" ? "#ff5d52" : null,
                  color: per.motivo === "Asuntos Personales" ? "white" : null,
                  padding: per.motivo === "Asuntos Personales" ? 2 : null,
                }}
                key={index}
              >
                <Text style={{ width: 30 }}>{index + 1}</Text>
                <View
                  style={{
                    width: 110,
                    textAlign: "center",
                  }}
                >
                  <Text>{per.motivo}</Text>
                </View>
                <View style={{ width: 200, textAlign: "center" }}>
                  <Text>{moment(new Date(per.horaSalida)).format("LL")}</Text>
                </View>
                <Text
                  style={{ width: 30, textAlign: "center", marginRight: 35 }}
                >
                  {moment(new Date(per.horaSalida)).format("HH:mm")}
                </Text>
                <Text
                  style={{ width: 30, textAlign: "center", marginRight: 35 }}
                >
                  {per.horasPermiso + "h"}
                </Text>
                <Text style={{ width: 30, textAlign: "center" }}>
                  {per.minutosPermiso + "m"}
                </Text>
              </View>
            ))}
          </View>
        ) : (
          <View style={{ textAlign: "center" }}>
            <Text>Funcionario sin permisos descontados</Text>
          </View>
        )}
        {/* Fin permisos solicitados */}
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
  )
}

function GenerarReportePermisos() {
  const { funcionario } = useContext(permisosContext)
  const { periodoSeleccionado } = useContext(periodoContext)
  const { data, loading } = useQuery(REPORTE_PERMISOS, {
    fetchPolicy: "network-only",
    variables: {
      id: funcionario.id,
      periodo: periodoSeleccionado.id,
    },
  })

  if (!data) return "No hay permisos"

  const documento = !loading ? (
    <DocumentoPermisos
      permisos={data?.obtenerPermisosReporte?.permisos}
      resultado={data?.obtenerPermisosReporte?.resultado}
      funcionario={funcionario}
      periodo={periodoSeleccionado}
    />
  ) : undefined
  return (
    <>
      <PDFDownloadLink
        className="ml-5"
        document={documento}
        fileName={`Permisos ${funcionario.nombre} ${funcionario.apellido} ${periodoSeleccionado.nombre}`}
      >
        {({ loading }) =>
          loading ? (
            <span style={{ fontFamily: "Cursive", color: "#28A745" }}>
              Generando PDF...
            </span>
          ) : (
            <li
              className="pi pi-download animated bounce infinite slow"
              style={{
                fontSize: "2em",
                position: "absolute",
                color: "#28A745",
              }}
            ></li>
          )
        }
      </PDFDownloadLink>
    </>
  )
}

export default GenerarReportePermisos
