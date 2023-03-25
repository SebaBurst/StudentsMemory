import React, { useEffect, useState } from 'react'
import BannerUsers from './bannerUsers.js'
import '../css/bannerUser.css'
import Contenedor from './containerProyects.js'
import ContenedorCo from './containerCoGuide.js'
import Titulo from './titlesContainers.js'
import Footer from './footer.js'
import '../App.css';
import { firestore } from '../firebase-config';
import { setDoc, doc, getDoc, collection, getDocs } from "@firebase/firestore";
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { async } from '@firebase/util'
import Oculto from './oculto.js'
import ModalInvitar from './ModalInvitar.js'
import BotonesProfesorHome from './BotonesProfesorHome.js'
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';

function Profesor() {
  const [usuario, setUsuario] = useState(null);
  var id = "";
  var idProyecto = "";
  const auth = getAuth();
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
      <div className='profesorBG'>
        <BannerUsers
          id={usuario.id}
          tipo="Professors"

        />
        <Oculto />
        <BotonesProfesorHome
          id={usuario.id}
        />
        <Titulo
          text="Proyectos como Profesor Guía"
        />
        <Contenedor
          id={usuario.id}


        />
        <Titulo
          text="Proyectos como Profesor Co-Guía"
        />
        <ContenedorCo />
        <Footer />
      </div>
    )

  }
}

export default Profesor