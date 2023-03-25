import React from 'react'
import '../css/bannerUser.css'
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';

export default function titlesContainers({text}) {
  return (
    <div className='textLine'>
        <div className='dividerText'>
            <h2> <FaIcons.FaRobot style={{
                                color: '#03568d',
                                width: '35px',
                                height: '28px',
                            }}/> {text}</h2>
        </div>
        <div className='dividerBg'></div>
    </div>
  )
}
