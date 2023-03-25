import { useState, useEffect } from 'react'
import '../css/avances.css'
import ModalSubirProyecto from './ModalSubirProyecto'
import CrudProyecto from './CrudProyecto';
import { firestore } from '../firebase-config';
import { setDoc, doc, getDoc, collection, getDocs } from "@firebase/firestore";
import { async } from '@firebase/util'
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';

function ContainerProyect({ id }) {

    const [user, setUser] = useState(null);

    const getUser = async () => {
        if (!user) {
            const docRef = doc(firestore, "Students", id);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const userData = {
                    id: docSnap.data().id,
                    idProyecto: docSnap.data().idProyecto,
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
            <div class="document-status">
                <div class="document-title">
                    <p> <AiIcons.AiFillFileZip style={{
                                width: '20px',
                                height: '28px',
                            }}/> Avances del Proyecto </p>
                    <ModalSubirProyecto
                        id={user.idProyecto}
                    />
                </div>
                <div class="document-bg">
                    <CrudProyecto
                        id={user.idProyecto}
                    />
                </div>
            </div>
        )
    }
}

export default ContainerProyect