import React from "react";
import { Messages } from "primereact/messages";

let messages;
export const mostrarInfo = (mensaje) => {
  messages.show({
    closable: true,
    severity: "info",
    // summary: ":",
    detail: mensaje,
  });
};

export const messageClear = () => {
  messages.clear();
};

const Info = (mensaje) => {
  const error = mensaje ? <Messages ref={(el) => (messages = el)} /> : "";
  return <div className="text-center">{error}</div>;
};

export default Info;
