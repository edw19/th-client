import React from 'react';
import { useDropzone } from 'react-dropzone';

const baseStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#eeeeee',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    outline: 'none',
    transition: 'border .24s ease-in-out',
};

const activeStyle = {
    borderColor: '#2196f3'
};

const acceptStyle = {
    borderColor: '#00e676'
};

const rejectStyle = {
    borderColor: '#ff1744'
};

function SubirContrato({ mostrarError, mostrarExito, guardarArchivo, archivosAceptado,guardarArchivosAceptado }) {

    const onDropRejected = React.useCallback(() => {
        mostrarError('Formato de archivo no soportado')
    }, [mostrarError]);

    const onDrop = React.useCallback(([archivo]) => {
        if (Object.keys(archivo).length > 0) {
            guardarArchivo(archivo)
            guardarArchivosAceptado(true)
            mostrarExito('Formato de archivo correcto');
        }
    }, [mostrarExito, guardarArchivo, guardarArchivosAceptado])

    const {
        acceptedFiles,
        getRootProps,
        getInputProps,
        isDragAccept,
        isDragActive,
        isDragReject,
    } = useDropzone({ onDrop, onDropRejected, multiple: false, accept: ".pdf" });

    const style = React.useMemo(() => ({
        ...baseStyle,
        ...(isDragActive ? activeStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {})
    }), [
        isDragActive,
        isDragReject,
        isDragAccept
    ]);

    const file = acceptedFiles.map(f => (
        <li key={f.path}>
            {f.path} - { f.size} bytes
        </li>
    ));

    return (
        <div {...getRootProps({ style })}>
            <input {...getInputProps()} />
            {
                isDragActive ? (
                    <p className="pt-3 text-center animated pulse infinite slow">Suelta el archivo aquí</p>
                ) : (
                        <p className="pt-3 text-center animated pulse infinite slow ">Arrastra y suelta el archivo de aquí, o haz click para navegar en tus ficheros </p>
                    )
            }
            <ul>
                {
                    archivosAceptado ?  file : null
                }
            </ul>
        </div>
    )
}

export default SubirContrato;
