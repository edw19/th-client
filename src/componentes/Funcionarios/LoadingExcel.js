import React from "react";

function LoadingExcel() {
  const [porcentaje, setPorcentaje] = React.useState(10);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setPorcentaje(
        (porcentaje) => (porcentaje += Math.ceil(Math.random() * 10))
      );
    }, 500);
    return () => {
      setPorcentaje(100);
      clearInterval(interval);
    };
  }, [porcentaje]);

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm"></div>
        <div className="col-sm">
          <div className="progress">
            <div
              className="progress-bar progress-bar-striped progress-bar-animated"
              role="progressbar"
              style={{ width: `${porcentaje}%` }}
              aria-valuenow={porcentaje}
              aria-valuemin="0"
              aria-valuemax="100"
            ></div>
          </div>
        </div>
        <div className="col-sm">{porcentaje}</div>
      </div>
    </div>
  );
}

export default LoadingExcel;
