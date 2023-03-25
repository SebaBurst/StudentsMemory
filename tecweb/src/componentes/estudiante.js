import React, { useEffect, useState } from 'react'
import BannerUsers from './bannerUsers.js'
import '../css/bannerUser.css'
import Titulo from './titleProyect.js'
import Footer from './footer.js'
import Planificacion from './planification.js'
import ContainerDocument from './containerDocument.js'
import ContainerProyect from './containerProyect.js'
import Reunion from './reunion.js'
import Repository from './repository.js'
import Oculto from './oculto.js'
import Area from './area.js'
import '../App.css';
import { firestore } from '../firebase-config';
import { setDoc, doc, getDoc, collection, getDocs } from "@firebase/firestore";
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { async } from '@firebase/util'
function Estudiante() {
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
            <div>
                <BannerUsers 
                    id = {usuario.id}
                    tipo = "Students"
                />
                <Oculto />
                <div className='studentBG'>
                    <div className='leftStudent'>
                        <Titulo
                            id={usuario.id}
                        />
                        <Area />
                        <Planificacion
                            id={usuario.id}
                        />
                        <ContainerDocument
                            id={usuario.id}
                        />
                        <ContainerProyect 
                         id={usuario.id}
                        />
                    </div>
                    <div className='rightStudent'>
                        <Reunion 
                        id = {usuario.id}/>
                        <Repository />
                    </div>

                </div>
                <Footer />
            </div>
        )
    }
}
export default Estudiante

