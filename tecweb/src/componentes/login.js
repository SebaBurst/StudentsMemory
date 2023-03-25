import React from 'react'
import '../App.css';
import { Button, Form, Row, Toast } from 'react-bootstrap';
import '../css/login.css';
import Card from './card'
import Banner from './banner'
import Logo from '../img/loginicon.png';
import { firestore } from '../firebase-config';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { setDoc, doc, getDoc, collection, getDocs, updateDoc, query, where } from "@firebase/firestore";
import Swal from 'sweetalert2';






export default function () {


    async function gameMaster() {
        window.location = '/administrador';

    }
    async function go(email) {
        const q = query(collection(firestore, "Students"), where("correo", "==", email));
        const docSnap = await getDocs(q);
        if (!docSnap.empty) {
            window.location = '/estudiante';
        }
        else {
            window.location = '/profesor';

        }

    }

    async function IniciarSesion(password, correo) {
        const authref = getAuth();
        await signInWithEmailAndPassword
            (authref, correo, password).then((usuarioFirebase) => {
                go(correo);
            },
                (reason) => {
                    Swal.fire({
                        title: 'Usuario y/o Contraseña incorrectos',
                        text: 'El correo o la contraseña que ingreso no son validos',
                        imageUrl: 'https://img.freepik.com/vector-gratis/ilustracion-concepto-uy-error-404-robot-roto_114360-1932.jpg?w=826&t=st=1669829973~exp=1669830573~hmac=8af7c8881eddbcd27b74a8cfae8d9233a411fa99201bb59a7b89569c096a730d',
                        imageWidth: '300px',
                        imageAlt: 'Success',
                        confirmButtonColor: '#03568d',

                    })


                },);


    }
    function submitHandler2(e) {
        e.preventDefault();
        const correo = e.target.elements.correo.value;
        const password = e.target.elements.password.value;
        if (correo == "administrador" && password == "controlmaestro") {
            gameMaster()
        }
        else {
            IniciarSesion(password, correo);
            console.log("Llegue", correo);
        }
    }
    return (
        <div>
            <Banner />
            <div className="body-background">
                <div class="formBg">
                    <table width="550px" height="100" >
                        <td width="100px" colspan="2">
                            <img src={Logo} style={{
                                width: '50%',
                                marginLeft: '34px',

                            }}></img>
                        </td>
                        <td colspan="2">
                            <h1>BIENVENIDO</h1>
                        </td>
                    </table >
                    <div class="form-block">
                        <form onSubmit={submitHandler2} >
                            <input class="input-lg" required="required" name="correo" type="text" placeholder="Correo Electronico" />
                            <br />
                            <br />
                            <input class="input-lg" required="required" name="password" type="password" placeholder="Contrasenia" />
                            <br />
                            <br />
                            <input class="button-lg" type="submit" value="Iniciar Sesion" />
                        </form>
                    </div>
                </div>
            </div>


        </div>
    )
}


