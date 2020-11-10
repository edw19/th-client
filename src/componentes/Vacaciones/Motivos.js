import React from "react";
import { Checkbox } from "primereact/checkbox";

function Motivos({ motivo, setMotivo }) {
  const onChangeMotivo = (e) => {
    let selectMotivos = [...motivo];

    if (e.checked) selectMotivos.push(e.value);
    else selectMotivos.splice(selectMotivos.indexOf(e.value), 1);

    setMotivo(selectMotivos);
  };
  return (
    <div className="row mt-3 mb-3">
      <div className="col-6 mt-2">
        <Checkbox
          inputId="cb1"
          value="Permiso con cargo a vacaciones"
          onChange={onChangeMotivo}
          checked={motivo.indexOf("Permiso con cargo a vacaciones") !== -1}
        ></Checkbox>
        <label htmlFor="cb1" className="p-checkbox-label">
          Permiso con cargo a vacaciones
        </label>
      </div>
      <div className="col-6 mt-2">
        <Checkbox
          inputId="cb2"
          value="Permisos por Estudios Regulares"
          onChange={onChangeMotivo}
          checked={motivo.indexOf("Permisos por Estudios Regulares") !== -1}
        ></Checkbox>
        <label htmlFor="cb2" className="p-checkbox-label">
          Permisos por Estudios Regulares
        </label>
      </div>
      <div className="col-6 mt-2">
        <Checkbox
          inputId="cb3"
          value="Licencia por Matrimonio"
          onChange={onChangeMotivo}
          checked={motivo.indexOf("Licencia por Matrimonio") !== -1}
        ></Checkbox>
        <label htmlFor="cb3" className="p-checkbox-label">
          Licencia por Matrimonio
        </label>
      </div>
      <div className="col-6 mt-2">
        <Checkbox
          inputId="cb4"
          value="Licencia por Estudios"
          onChange={onChangeMotivo}
          checked={motivo.indexOf("Licencia por Estudios") !== -1}
        ></Checkbox>
        <label htmlFor="cb4" className="p-checkbox-label">
          Licencia por Estudios
        </label>
      </div>
      <div className="col-6 mt-2">
        <Checkbox
          inputId="cb5"
          value="Licencia por Calidad doméstica"
          onChange={onChangeMotivo}
          checked={motivo.indexOf("Licencia por Calidad doméstica") !== -1}
        ></Checkbox>
        <label htmlFor="cb5" className="p-checkbox-label">
          Licencia por Calidad doméstica
        </label>
      </div>
      <div className="col-6 mt-2">
        <Checkbox
          inputId="cb6"
          value="Licencia por Enfermedad"
          onChange={onChangeMotivo}
          checked={motivo.indexOf("Licencia por Enfermedad") !== -1}
        ></Checkbox>
        <label htmlFor="cb6" className="p-checkbox-label">
          Licencia por Enfermedad
        </label>
      </div>
      <div className="col-6 mt-2">
        <Checkbox
          inputId="cb7"
          value="Licencia sin Sueldo"
          onChange={onChangeMotivo}
          checked={motivo.indexOf("Licencia sin Sueldo") !== -1}
        ></Checkbox>
        <label htmlFor="cb7" className="p-checkbox-label">
          Licencia sin Sueldo
        </label>
      </div>
      <div className="col-6 mt-2">
        <Checkbox
          inputId="cb8"
          value="Licencia por Maternidad/Paternidad"
          onChange={onChangeMotivo}
          checked={motivo.indexOf("Licencia por Maternidad/Paternidad") !== -1}
        ></Checkbox>
        <label htmlFor="cb8" className="p-checkbox-label">
          Licencia por Maternidad/Paternidad
        </label>
      </div>
      <div className="col-6 mt-2">
        <Checkbox
          inputId="cb9"
          value="Giras Técnicas Académicas"
          onChange={onChangeMotivo}
          checked={motivo.indexOf("Giras Técnicas Académicas") !== -1}
        ></Checkbox>
        <label htmlFor="cb9" className="p-checkbox-label">
          Giras Técnicas Académicas
        </label>
      </div>
      <div className="col-6 mt-2">
        <Checkbox
          inputId="cb10"
          value="Licencia por Cuidado Recien Nacido"
          onChange={onChangeMotivo}
          checked={motivo.indexOf("Licencia por Cuidado Recien Nacido") !== -1}
        ></Checkbox>
        <label htmlFor="cb10" className="p-checkbox-label">
          Licencia por Cuidado Recien Nacido
        </label>
      </div>
      <div className="col-6 mt-2">
        <Checkbox
          inputId="cb11"
          value="Permiso Laboral (Vinculación, Investigación, Delegaciones)"
          onChange={onChangeMotivo}
          checked={
            motivo.indexOf(
              "Permiso Laboral (Vinculación, Investigación, Delegaciones)"
            ) !== -1
          }
        ></Checkbox>
        <label htmlFor="cb11" className="p-checkbox-label">
          Permiso Laboral (Vinculación, Investigación y Delegaciones)
        </label>
      </div>
      <div className="col-6 mt-2">
        <Checkbox
          inputId="cb12"
          value="Otro Motivo"
          onChange={onChangeMotivo}
          checked={motivo.indexOf("Otro Motivo") !== -1}
        ></Checkbox>
        <label htmlFor="cb13" className="p-checkbox-label">
          Otro Motivo
        </label>
      </div>
    </div>
  );
}

export default Motivos;
