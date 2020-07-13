import React, { useContext } from 'react';
import { HACER_VIGENTE } from '../../mutation';
import { ELIMINAR_PERIODO } from '../../mutation';
import { useMutation } from '@apollo/react-hooks';
import { mostrarExito } from '../Alertas/Exito';
import PaginadorPeriodos from './PaginadorPeriodos';
import { periodoContext } from '../Context/PeriodoContext';
import Noty from 'noty';
import moment from 'moment';
import 'moment/locale/es';
moment.locale('es');

function Periodos({ periodos }) {
    const [hacerVigente] = useMutation(HACER_VIGENTE);
    const [eliminarPeriodo] = useMutation(ELIMINAR_PERIODO);
    const { totalPeriodos, setOffset, guardarActual } = useContext(periodoContext);

    const eliminarPeriodoFuncion = async (periodo, nombre) => {
        new Promise((resolve, reject) => {
            let noti = new Noty({
                type: 'warning',
                layout: 'center',
                text: `<h6> ¿Estás seguro de eliminar este Período?</h6> <br /> <p>Al eliminar este periodo se eliminaran registros de permisos, vaciones y funcionarios registrados en ${nombre} </p>`,
                theme: 'mint',
                modal: true,
                closeWith: ['button'],
                animation: {
                    open: 'animated bounceInDown',
                    close: 'animated bounceOutUp'
                },
                buttons: [
                    Noty.button('SI', 'btn btn-noti', async function () {
                        const { data } = await eliminarPeriodo({ variables: { id: periodo } });
                        setOffset(0);
                        guardarActual(1);
                        mostrarExito(data.eliminarPeriodo)
                        return resolve(noti.close())
                    }),

                    Noty.button('NO', 'btn btn-error btn-noti-no', function () {
                        noti.close();
                        return reject(mostrarExito('No se elimino el periodo'))
                    })
                ]
            }).show()
        }).catch((error) => {
            console.log(error)
        })
    }
    return (
        <>
            <table className="table text-center">
                <thead>
                    <tr>
                        <th scope="col">Nombre</th>
                        <th scope="col">Fecha Inicio</th>
                        <th scope="col">Fecha Final</th>
                        <th scope="col">Vigente</th>
                        <th scope="col">Eliminar</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        periodos.map(periodo => (
                            <tr key={periodo.id} style={{ backgroundColor: periodo.vigente === true ? '#90d971' : '' }}>
                                <td>{periodo.nombre}</td>
                                <td>{moment(periodo.fechaInicio).format('LL')}</td>
                                <td>{moment(periodo.fechaFinal).format('LL')}</td>
                                <td>
                                    <button
                                        className="btn btn-outline-info"
                                        disabled={periodo.vigente ? true : false}
                                        onClick={async () => {
                                            const { data } = await hacerVigente({ variables: { id: periodo.id } });
                                            mostrarExito(data.hacerVigente)
                                        }}
                                    >Seleccionar
                                </button>
                                </td>
                                <td>
                                    <button
                                        onClick={() => eliminarPeriodoFuncion(periodo.id, periodo.nombre)}
                                        className="btn btn-outline-danger"
                                        disabled={periodo.vigente ? true : false}
                                    >
                                        X
                                    </button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            {
                Object.keys(periodos).length > 0 ?
                    <PaginadorPeriodos
                        totalPeriodos={totalPeriodos}
                    /> : null
            }
        </>
    )
}

export default Periodos;
