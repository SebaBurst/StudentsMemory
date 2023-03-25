import React from 'react'
import '../css/card.css'

export default function card({ autor, title, autorImg, id }) {
  function handleClick(e) {
    e.preventDefault();
    window.location = '/proyecto/' + id;

  }



  return (
    <div  onClick={handleClick} className='bgCard'>
      <div className="card-title">
        <a className="card-title">
          <p> {title} </p>
        </a>
      </div>
      <div class="profile-card">
        <img src="https://cdn-icons-png.flaticon.com/512/2784/2784461.png" />
        <h2> {autor} </h2>

      </div>
    </div>
  )
}
