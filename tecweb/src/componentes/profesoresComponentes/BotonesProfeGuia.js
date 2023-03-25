import React from 'react'
import '../../css/student.css'
import ModalReunion from './ModalReunion'

export default function BotonesProfeGuia({ idProyecto }) {
  return (
    <div className='botonProfe'>
      <div>
        <ModalReunion
          id={idProyecto}
        />
      </div>
      <div>
        Modal 2
      </div>
    </div>
  )
}
