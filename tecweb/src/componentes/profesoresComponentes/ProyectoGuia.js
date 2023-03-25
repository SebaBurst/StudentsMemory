import React, { useEffect, useState } from 'react'
import Oculto from '../oculto'
import '../../css/bannerUser.css'
import BannerUser from '../bannerUsers'
import { firestore } from '../../firebase-config';
import { setDoc, doc, getDoc, collection, getDocs } from "@firebase/firestore";
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { async } from '@firebase/util'
import TituloGuia from './TituloGuia';
import { useSearchParams, useParams } from "react-router-dom";
import ContenedorDocumentos from './ContenedorDocumentos';
import ContenedorProyectos from './ContenedorProyectos';
import BotonesProfeGuia from './BotonesProfeGuia';
import Footer from '../../componentes/footer'
import Reunion from '../../componentes/reunion.js'
import ReunionGuia from '../ReunionGuia';
function ProyectoGuia() {
  const [usuario, setUsuario] = useState(null);
  const auth = getAuth();
  let { id } = useParams(); //Id del proyecto obtenido desde la url
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      if (!usuario) {
        const uid = user.uid;
        const userData = {
          id: uid,
        };
        setUsuario(userData);
        console.log("UserData", userData);
      }        // ...
    } else {
      // User is signed out
      // ...
    }
  });



  if (usuario) {
    return (
      <div>
        <BannerUser
          id={usuario.id}
          tipo="Professors"
        />
        <Oculto />
        <div className='studentBG'>
          <div className='leftStudent'>
            <TituloGuia
              id={usuario.id}
              idProyecto={id}
            />
            <BotonesProfeGuia
              idProyecto={id}
            />
            <ContenedorDocumentos
              id={usuario.id}
              idProyecto={id}
            />
            <ContenedorProyectos
              id={usuario.id}
              idProyecto={id}
            />
          </div>
        <div className='rightStudent'>
        <ReunionGuia
         id={id}
        />
        </div>
        
        </div>
        <Footer />


      </div>
    )
  }
}

export default ProyectoGuia