import React from 'react'
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';

function repository() {
  return (
    <div className = "repository">
        <div className= "repository-title">
            <p> <AiIcons.AiFillGithub style={{
              width: '20px',
              height: '28px',
            }} /> Repositorio </p>
        </div>
        <div className = "repository-bg">
        </div>
    </div>
  )
}

export default repository