import React, { useCallback, useMemo, useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { UPLOAD_FILE } from '../../mutation'
import { MOSTRAR_IMAGEN } from '../../queries'
import { useDropzone } from "react-dropzone";
import Spinner from '../Spinner'

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

export const GuardarImagen = ({ cedula, setNombreImagen }) => {

  const [NomImagen, setNomImagen] = useState('')

  const [uploadFile, { loading, error }] = useMutation(UPLOAD_FILE, {
    refetchQueries: [{ query: MOSTRAR_IMAGEN }],
    onCompleted: () => {
      setNombreImagen(NomImagen)
    }
  });

  const onDrop = useCallback(
    ([file]) => {
      setNomImagen(file.name)
      uploadFile({ variables: { file } });
    },
    [uploadFile]
  );
  const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone({ onDrop, accept: 'image/*' });

  const style = useMemo(() => ({
    ...baseStyle,
    ...(isDragActive ? activeStyle : {}),
    ...(isDragAccept ? acceptStyle : {}),
    ...(isDragReject ? rejectStyle : {})
  }), [
    isDragActive,
    isDragReject,
    isDragAccept
  ]);
  
  if (!cedula) return ''
  if (error) return 'Error' + error;
  if (loading) return < Spinner />

  const componente = cedula.length === 10 ?
    <div {...getRootProps({ style })} className="mb-3" >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p className="texto-drop animated pulse infinite slow">Suelta La imagen aquí</p>
      ) : (
          <div>
            <p className="texto-drop animated pulse infinite slow" >Arrastra y suelta tu archivo de imagen aquí, o haz click para navegar en tus archivos.</p>
          </div>
        )}
    </div> : '';
  return componente
};