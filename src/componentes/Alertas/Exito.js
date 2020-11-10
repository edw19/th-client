import React from "react";
import { Messages } from "primereact/messages";

let messages;
export const mostrarExito = (mensaje) => {
  messages.show({
    closable: true,
    severity: "success",
    summary: "Correcto:",
    detail: mensaje,
  });
};

export const messageClear = () => {
  messages.clear();
};

const Error = (mensaje) => {
  const error = mensaje ? <Messages ref={(el) => (messages = el)} /> : "";

  return <div>{error}</div>;
};
export default Error;
