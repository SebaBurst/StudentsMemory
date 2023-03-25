import React from 'react'
import ModalEditarArea from './ModalEditarArea'
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';

export default function area() {
  return (
    <div className = "area-proyect">
        <div className= "area-name">
            <p> <AiIcons.AiOutlineShareAlt style={{
                                width: '20px',
                                height: '28px',
                            }}/> Area del proyecto </p>
            <ModalEditarArea/>
         </div>
        <div className = "bg-area">
            <p>DESARROLLO DE SOFTWARE</p>
        </div>
    </div>
  )
}
