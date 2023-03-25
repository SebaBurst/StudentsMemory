import { useState, useEffect } from 'react';
import '../../css/menuBanner.css';
import '../../css/student.css';
import { firestore } from '../../firebase-config';
import { setDoc, doc, getDoc, collection, getDocs, query, where } from "@firebase/firestore";
import { async } from '@firebase/util'
import { setUserId } from 'firebase/analytics';

function TituloGuia({ id, idProyecto }) {
    const [proyecto, setProyecto] = useState(null);
    const [estudiante, setEstudiante] = useState(null);
    const getProyecto = async () => {
        if (!proyecto) {
            const docRef = doc(firestore, "Proyects", idProyecto);
            const docSnap = await getDoc(docRef);
            console.log("Entre al get proyecto");
            if (docSnap.exists()) {
                const userData = {
                    title: docSnap.data().title,
                    planUrl: docSnap.data().planUrl,
                    planTitle: docSnap.data().planTitle,
                    area: docSnap.data().area,
                };
                setProyecto(userData);
                console.log("Datos del proyecto:", docSnap.data());
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }

    };

    //Obtendremos al estudiante que vive en desesperacion//  :(
    async function getEstudiante() {
        if (!estudiante) {
            const q = query(collection(firestore, "Students"), where("idProyecto", "==", idProyecto));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                const dataUser = {
                    nombre: doc.data().nombre,
                    photoUrl: doc.data().photo,


                }
                setEstudiante(dataUser);
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());
            });
        }

    }

    useEffect(() => {
        getEstudiante();
    })




    useEffect(() => {
        getProyecto();
    });
    if (proyecto) {
        if (estudiante) {
            return (
                <div className='tituloBg'>
                    <div className='fotoUser'>
                        <img src={estudiante.photoUrl} />
                    </div>
                    <div className='editName'>
                        <div className='editTitulo'>
                            <p>Estudiante: {estudiante.nombre}</p>
                        </div>
                        <h2>{proyecto.title}</h2>
                    </div>
                </div>
            )
        }
    }
}

export default TituloGuia