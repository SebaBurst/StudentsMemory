import { useState, useEffect } from 'react'
import '../css/bannerUser.css'
import Nav from 'react-bootstrap/Nav';
import { Button } from 'react-bootstrap';
import FotoUsuario from '../img/fotouser.jpg';
import Logo from '../img/studentslogowhite.png'
import UsuarioMenu from './usuarioMenu';
import { firestore } from '../firebase-config';
import { setDoc, doc, getDoc, collection, getDocs } from "@firebase/firestore";
import { async } from '@firebase/util'

export default function BannerUsers({ id, tipo}) {
    const [user, setUser] = useState(null);

    const getUser = async () => {
        if (!user) {
            const docRef = doc(firestore, tipo, id);
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
            <div>
                <div className="bannerUser">
                    <div className="bannerLogotipo">
                        <img src={Logo} style={{
                            width: '320px',
                            marginLeft: '50%',
                        }} alt="User avatar"
                        />
                    </div>
                    <div className="menuBotones">
                        <div>
                            <UsuarioMenu
                                id={id}
                                photo = {user.photo}
                                nombre = {user.nombre}
                                telefono = {user.telefono}
                            />
                        </div>
                    </div>

                </div>
            </div>

        );
    }
}
