import React from 'react'
import { firestore } from '../firebase-config';
import { setDoc, doc, getDoc, collection, getDocs } from "@firebase/firestore";
import { useState, useEffect } from 'react'
import ModalInvitar from './ModalInvitar';
import '../css/bannerUser.css'



function BotonesProfesorHome({ id }) {
    const [user, setUser] = useState(null);

    const getUser = async () => {
        if (!user) {
            const docRef = doc(firestore, "Professors", id);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const userData = {
                    id: docSnap.data().id,
                    photo: docSnap.data().photo,
                    nombre: docSnap.data().nombre,
                    telefono: docSnap.data().telefono,
                };
                setUser(userData);
                console.log("Datos del usuario:", docSnap.data());
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }

    }
    useEffect(() => {
        getUser();
    });


    if (user) {
        return (
            <div className='bgInvite'>
                <ModalInvitar
                    id={id}
                    profesor = {user.nombre}   
                
                />
                </div>
        )
    }
}

export default BotonesProfesorHome