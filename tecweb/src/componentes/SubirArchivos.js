import React, { useState } from 'react'
import swal from 'sweetalert';
import { Button, Form } from 'react-bootstrap';
import { firestore } from '../firebase-config';
import { setDoc, doc, getDoc, collection, getDocs, updateDoc } from "@firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuid } from 'uuid';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import Swal from 'sweetalert2';


function SubirArchivos({ id, nombre, carpeta }) {
    //Estados 
    const [file, setFile] = useState(null);
    var contador = 0;
    //Css de los botones
    const botonescss = {
        background: 'rgb(52, 152, 219)',
        border: 'rgb(255, 87, 51)',
        color: 'white',
        width: '100%',
        fontWeight: '600',
    }
    //Metodo que verifica y obtiene el archivo subido por el usuario al sistema.
    const handleFile = (event) => {
        setFile(event.target.files[0])
    }
    //Metodo que sube el archivo a firebase y crea el documento en la coleccion de avancesDocumento del proyectyo
    async function subirlo() {
        if (file != null) {
            const unique_id = uuid();
            const storage = getStorage();
            //const selected = file;
            const storageRef = ref(storage, `${carpeta}/${id}/${unique_id}`);
            //const storageRef = await firebase2.storage().ref(`archivosVerificacion/${id}/${selected.name}`);
            await uploadBytes(storageRef, file);
            //const task = await storageRef.put(selected);
            if(carpeta == "planificacion"){
                const url = await getDownloadURL(storageRef);

                await updateDoc(doc(firestore, "Proyects", id),{
                    planUrl: url,
                    planTitle: nombre,
                })

            }
            else{
                const avances = await collection(firestore, "Proyects", id, carpeta);
                const url = await getDownloadURL(storageRef);
                await setDoc(doc(avances, unique_id), {
                nombre: nombre,
                url: url
                });
            }
            Swal.fire({
                title: 'Archivo Subido',
                text: 'Su Archivo se ha subido correctamente',
                imageUrl: 'https://cdn.dribbble.com/users/2760451/screenshots/5656895/cloud-upload.gif',
                imageWidth: '300px',
                imageAlt: 'Success',
                confirmButtonColor: '#03568d',
    
            })

            //Obtenemos la fecha actual para setearle un nombre al archivo.

            //Creaamos el nuevo documento
            //window.location.reload();
        }
    }
    //Metodo que retorna vista a la interfaz
    return (
        <div>
            <div className="uploadImages">
                <input type="file" id="fileUpload" onChange={handleFile} />
                <div>
                    <br>
                    </br>
                    <Button onClick={subirlo} style={botonescss}> <AiIcons.AiOutlineCloudUpload style={{
                                color: 'white',
                                width: '20px',
                                height: '28px',
                            }}/> Subir Avances</Button>
                </div>
            </div>

        </div >
    )

}

export default SubirArchivos
