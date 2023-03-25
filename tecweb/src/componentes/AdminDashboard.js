import React from 'react'
import BannerAdmin from './BannerAdmin'
import CrudProfesores from './CrudProfesores'
import ModalAddProfe from './ModalAddProfe'

function AdminDashboard() {
  return (
    <div>
      <BannerAdmin />
      <div className='dashboardAdmin'>
        <ModalAddProfe />
        <CrudProfesores />
      </div>





    </div>
  )
}

export default AdminDashboard