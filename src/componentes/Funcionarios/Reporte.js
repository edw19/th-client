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
import moment from "moment";
moment.locale("es");

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
    width: "100px",
    height: "100px",
  },
  containerImagen: {
    display: "flex",
    flexDirection: "column",
    alignContent: "center",
    marginLeft: "50px",
    marginRight: 40,
  },
});

function Reporte({ funcionario }) {
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
          <Text style={{ marginBottom: 5 }}>INFORMACIÓN FUNCIONARIO</Text>
        </View>
        <View
          style={{
            textAlign: "right",
            marginVertical: 4,
            paddingTop: 4,
            fontSize: 10,
          }}
        >
          <Text>{moment().format("LL")}</Text>
        </View>
        {/* Funcionario */}
        <View
          style={{
            marginTop: 3,
            marginBottom: 3,
            fontSize: 10,
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              border: true,
              padding: 10,
            }}
          >
            <View
              style={{
                flex: 1,
                height: "100%",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  marginBottom: 10,
                }}
              >
                <Text style={{ width: "50%" }}>Cédula:</Text>
                <Text style={{ width: "50%" }}>{funcionario.cedula}</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  marginBottom: 10,
                }}
              >
                <Text style={{ width: "50%" }}>Nombres:</Text>
                <Text style={{ width: "50%" }}>
                  {funcionario.nombre}
                  {funcionario.segundoNombre}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  marginBottom: 10,
                }}
              >
                <Text style={{ width: "50%" }}>Apellidos:</Text>
                <Text style={{ width: "50%" }}>
                  {funcionario.apellido}
                  {funcionario.segundoApellido}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  marginBottom: 10,
                }}
              >
                <Text style={{ width: "50%" }}>Nacionalidad:</Text>
                <Text style={{ width: "50%" }}>{funcionario.nacionalidad}</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  marginBottom: 10,
                }}
              >
                <Text style={{ width: "50%" }}>Tipo de Vinculación:</Text>
                <Text style={{ width: "50%" }}>
                  {funcionario.tipoVinculacion}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  marginBottom: 10,
                }}
              >
                <Text style={{ width: "50%" }}>Tipo de Funcionario:</Text>
                <Text style={{ width: "50%" }}>
                  {funcionario.tipoFuncionario}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  marginBottom: 10,
                }}
              >
                <Text style={{ width: "50%" }}>Fecha Nacimiento:</Text>
                <Text style={{ width: "50%" }}>
                  {moment(funcionario.nacimiento).format("LL")}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  marginBottom: 10,
                }}
              >
                <Text style={{ width: "50%" }}>Fecha de Ingreso:</Text>
                <Text style={{ width: "50%" }}>
                  {moment(funcionario.fechaIngreso).format("LL")}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  marginBottom: 10,
                }}
              >
                <Text style={{ width: "50%" }}>Fecha de Salida:</Text>
                <Text style={{ width: "50%" }}>
                  {moment(funcionario.fechaSalida).format("LL")}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  marginBottom: 10,
                }}
              >
                <Text style={{ width: "50%" }}>Títulos profesionales:</Text>
                <View style={{ flexDirection: "column" }}>
                  {funcionario.tituloProfesional.map((titulo, index) => (
                    <Text
                      key={index + titulo.nombre}
                      style={{
                        width: "50%",
                      }}
                    >
                      {titulo.nombre}
                    </Text>
                  ))}
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  marginBottom: 10,
                }}
              >
                <Text style={{ width: "50%" }}>Género:</Text>
                <Text style={{ width: "50%" }}>{funcionario.genero}</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  marginBottom: 10,
                }}
              >
                <Text style={{ width: "50%" }}>Tipo de Sangre:</Text>
                <Text style={{ width: "50%" }}>{funcionario.tipoSangre}</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  marginBottom: 10,
                }}
              >
                <Text style={{ width: "50%" }}>Estado Civil:</Text>
                <Text style={{ width: "50%" }}>{funcionario.tipoSangre}</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  marginBottom: 10,
                }}
              >
                <Text style={{ width: "50%" }}>Días a Favor:</Text>
                <Text style={{ width: "50%" }}>{funcionario.diasAFavor}</Text>
              </View>
              {funcionario.discapacidad ? (
                <View
                  style={{
                    flexDirection: "row",
                    marginBottom: 10,
                  }}
                >
                  <Text style={{ width: "50%" }}>Discapacidad Detalles:</Text>
                  <Text style={{ width: "50%" }}>
                    {funcionario.discapacidadDetalles}
                  </Text>
                </View>
              ) : null}
            </View>
            <View
              style={{
                flex: 1,
                height: 100,
                alignContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                src={`http://190.15.129.83:5000/imagenes/${funcionario.nombreImagen}`}
                style={styles.image}
              />
            </View>
          </View>
        </View>

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

export default Reporte;
