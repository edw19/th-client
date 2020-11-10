import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { MOSTRAR_IMAGEN } from '../../queries'

export default function MostrarImagenes() {
  const { loading, data } = useQuery(MOSTRAR_IMAGEN)
  if (loading) return 'loading...'
  if(!data) return ''
  return (
    <div>
      {data.mostrarImagen.map(x => (
        <img
          style={{ width: 200 }}
          key={x}
          src={`http://127.0.0.1:5000/imagenes/${x}`}
          alt={x}
        />
      ))}
    </div>
  )
}
