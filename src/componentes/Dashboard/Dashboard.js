import React from 'react';

function Dashboard() {
    return (
        <div className="pl-2 border p-3">
            <h1 className="text-center">Panel de control</h1>
            <div className="row p-1">
                <div  className="col" style={{ height: '15em', overflow: 'hidden', backgroundColor: 'red', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <p>Número de funcionarios por tipo</p>
                </div>
                <div className="col" style={{ height: '15em', backgroundColor: 'pink', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <p> Numero de funcionario hombres y mujeres </p>
                </div>
                <div className="col" style={{ height: '15em', backgroundColor: 'blue', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <p>Edad promerdio de hombre y promedio de mujeres</p>
                </div>
                <div className="w-100"></div>
                <div className="col" style={{ height: '15em', backgroundColor: 'orange', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <p>Los 10 funcionarios con màs permisos</p>
                </div>
                <div className="col" style={{ height: '15em', backgroundColor: 'yellow', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <p></p>
                </div>
                <div className="col" style={{ height: '15em', backgroundColor: 'pink', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    asdasdasd
                </div>
                <div className="w-100"></div>
                <div className="col" style={{ height: '15em', backgroundColor: 'yellow', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    asdasdasd
                </div>
                <div className="col" style={{ height: '15em', backgroundColor: 'red', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    asdasdasd
                </div>
                <div className="col" style={{ height: '15em', backgroundColor: 'orange', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    asdasd
                </div>
            </div>
        </div>
    )
}
export default Dashboard;