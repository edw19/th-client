import React from "react";
import Noty from "noty";
function DescontarMasivo({
  mostrarError,
  mostrarExito,
  periodoSeleccionado,
  descontarPermisosMasivo,
  mostrarInfo,
  messageClear,
}) {
  return (
    <button
      className="btn btn-outline-danger mr-2"
      onMouseEnter={() =>
        mostrarInfo(
          "Esta función le permite descontar los permisos de todos los funcionarios del período seleccionado"
        )
      }
      onMouseLeave={() => messageClear()}
      onClick={async () => {
        try {
          await new Promise((resolve, reject) => {
            let noti = new Noty({
              type: "info",
              layout: "center",
              text:
                "<div><h6> Descontar Permisos de Funcionarios ¿Deseas continuar ?</h6> <br/><p>Esta función descuenta todos los permisos registrados de todos los funcionarios</p></div>",
              theme: "mint",
              timeout: false,
              modal: true,
              closeWith: ["button"],
              animation: {
                open: "animated bounceInDown",
                close: "animated bounceOutUp",
              },
              buttons: [
                Noty.button("SI", "btn btn-noti", async function () {
                  try {
                    const { data } = await descontarPermisosMasivo({
                      variables: {
                        idPeriodo: periodoSeleccionado,
                      },
                    });
                    mostrarExito(data.descontarPermisosMasivo);
                  } catch (error) {
                    mostrarError(error.message.replace("GraphQL error:", ""));
                  }
                  return resolve(noti.close());
                }),

                Noty.button("NO", "btn btn-error btn-noti-no", function () {
                  noti.close();
                  return reject(mostrarError("No se ha descontado permisos"));
                }),
              ],
            }).show();
          });
        } catch (error) {
          console.log(error);
        }
      }}
    >
      <li className="pi pi-exclamation-triangle" /> Descontar Permisos
    </button>
  );
}

export default DescontarMasivo;
