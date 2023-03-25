import { useState, useEffect } from 'react'
import { Button } from 'react-bootstrap'
import '../css/student.css'
import ModalEditarTitulo from './ModalEditarTitulo'
import '../css/menuBanner.css'
import { firestore } from '../firebase-config';
import { setDoc, doc, getDoc, collection, getDocs } from "@firebase/firestore";
import { async } from '@firebase/util'
import UsuarioMenu from './usuarioMenu'
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';


function TitleProyect({ id, idProyecto }) {
    var titulo = "";
    const [proyecto, setProyecto] = useState(null);
    const [user, setUser] = useState(null);

    const getUser = async () => {
        if (!user) {
            const docRef = doc(firestore, "Students", id);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const userData = {
                    id: docSnap.data().id,
                    idProyecto: docSnap.data().idProyecto,
                    photo: docSnap.data().photo,
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
    const getProyecto = async () => {
        if (user) {
            if (!proyecto) {
                const docRef = doc(firestore, "Proyects", user.idProyecto);
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
        }
    };

    useEffect(() => {
        getProyecto();
    });

    if (user) {
        if (proyecto) {
            console.log("El Titulo del proyecto es: ", proyecto.title);
            console.log("El plan del proyecto es: ", proyecto.planTitle);
            console.log("El id del proyecto es: ", user.idProyecto);

            return (
                <div className='tituloBg'>
                    <div className='fotoUser'>
                        <img src={user.photo} />
                    </div>
                    <div className='editName'>
                        <div className='editTitulo'>
                            <p> <AiIcons.AiTwotoneEdit style={{
                                width: '20px',
                                height: '28px',
                            }} /> Editar Titulo del proyecto</p>
                            <ModalEditarTitulo
                                id={user.idProyecto}
                                titulo={proyecto.title}
                            />
                        </div>
                        <h2>{proyecto.title}</h2>
                    </div>
                </div>
            )
        }

    }



}

export default TitleProyect