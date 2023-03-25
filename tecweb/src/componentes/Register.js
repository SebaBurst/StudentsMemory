import React from 'react'
import '../css/login.css';
import Banner from './banner';
import Goku from '../img/loginicon.png';
import { firestore } from '../firebase-config';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { setDoc, doc, getDoc, collection, getDocs, updateDoc, query, where, arrayUnion } from "@firebase/firestore";
import { v4 as uuid } from 'uuid';
import Swal from 'sweetalert2';



function go() {
    window.location = '/';

}
export default function () {

    async function registrarUsuario(email, password, nombre, matricula, codigo, telefono, invitacion) {
        const authref = getAuth();

        const infoUsuario = await createUserWithEmailAndPassword
            (authref, email, password).then((usuarioFirebase) => {
                return usuarioFirebase;
            });
        const idUser = infoUsuario.user.uid; //
        const uniqueId = uuid();

        const docRef = doc(firestore, "Invitation", invitacion);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const docRef2 = doc(firestore, "Professors", docSnap.data().profeId);
            const docSnap2 = await getDoc(docRef);
            if (docSnap2.exists()) {

                await updateDoc(doc(firestore, "Professors", docSnap.data().profeId), {
                    proyectosGuia: arrayUnion(uniqueId)
                })
            } else {
                console.log("No such document2!");

            }
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }




        await setDoc(doc(firestore, "Proyects", uniqueId), {
            title: "Sin titulo definido",
            planUrl: "",
            planTitle: "Sin Planificacion definida",
            area: "",


        });


        await setDoc(doc(firestore, "Students", idUser), {
            nombre: nombre,
            correo: email,
            photo:"https://cdn-icons-png.flaticon.com/512/2784/2784403.png",
            telefono: telefono,
            codigoUnico: codigo,
            matricula: matricula,
            idProyecto: uniqueId,
            profesorGuia: "",
        });

        await updateDoc(doc(firestore, "Invitation", invitacion), {
            verification: "true",
        })
        Swal.fire({
            title: 'El Estudiante Indefenso ha sido registrado con exito',
            text: 'Su pacto con el mismisimo infierno ha sido firmado ante notario, ahora sera enviado a la pantalla de inicio',
            imageUrl: 'https://1.bp.blogspot.com/-QseErUv8C7Q/YNVBHEVlpkI/AAAAAAAACgs/YRD9NpBzV18Ovs6o13oeA0S6zA2ebClqQCLcBGAsYHQ/s320/Subir.png',
            imageWidth: '300px',
            imageAlt: 'Success',
            confirmButtonColor: '#E74C3C',

        })
        go()








    }
    async function submitHandler(e) {
        e.preventDefault();
        const nombre = e.target.elements.nombre.value;
        const matricula = e.target.elements.matricula.value;
        const correo = e.target.elements.correo.value;
        const telefono = e.target.elements.telefono.value;
        const password = e.target.elements.password.value;
        const passwordRepeat = e.target.elements.passwordRepeat.value;
        const codigo = e.target.elements.codigo.value;
        console.log("submit", nombre, matricula, correo, telefono, password, passwordRepeat, codigo);
        const docRef = doc(firestore, "Invitation", codigo);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            if (docSnap.data().verification == "false") {
                console.log("El Codigo esta Libre")
                registrarUsuario(correo, password, nombre, matricula, codigo, telefono, docSnap.id);


            }
            else {
                Swal.fire({
                    title: 'Codigo Ingresado, ya fue canjeado',
                    text: 'Su codigo de acceso Unico, ya fue utilizado por otra persona, lo siento',
                    imageUrl: 'https://1.bp.blogspot.com/-QseErUv8C7Q/YNVBHEVlpkI/AAAAAAAACgs/YRD9NpBzV18Ovs6o13oeA0S6zA2ebClqQCLcBGAsYHQ/s320/Subir.png',
                    imageWidth: '300px',
                    imageAlt: 'Success',
                    confirmButtonColor: '#E74C3C',

                })
            }


            console.log("Document data:", docSnap.data());
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }



    }
    return (
        <div>
            <Banner />
            <div className="body-backgroundR">
                <div className="formBgR">
                    <table width="550px" height="100" >
                        <td width="100px" colspan="2">
                            <img src={Goku} style={{
                                width: '50%',
                                marginLeft: '34px',

                            }}></img>
                        </td>
                        <td colspan="2">
                            <h1>REGISTRO</h1>
                        </td>
                    </table >
                    <div className="form-block">
                        <form onSubmit={submitHandler}>
                            <input className="input-lg" required="required" name="nombre" type="text" placeholder="Ingrese su Nombre Completo" />
                            <br />
                            <br />
                            <input className="input-lg" required="required" name="matricula" type="text" placeholder="Ingrese su Numero de Matricula" />
                            <br />
                            <br />
                            <input className="input-lg" required="required" name="correo" type="text" placeholder="Ingrese correo electronico" />
                            <br />
                            <br />
                            <input className="input-lg" required="required" name="telefono" type="text" placeholder="Ingrese Telefono" />
                            <br />
                            <br />
                            <input className="input-lg" required="required" name="password" type="password" placeholder="Ingrese contraseña" />
                            <br />
                            <br />
                            <input className="input-lg" required="required" name="passwordRepeat" type="password" placeholder="Repita Contraseña" />
                            <br />
                            <br />
                            <input className="input-lg" required="required" name="codigo" type="text" placeholder="Ingrese el codigo unico de registro" />
                            <br />
                            <br />
                            <input className="button-lg" type="submit" value="Registrarse" />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
