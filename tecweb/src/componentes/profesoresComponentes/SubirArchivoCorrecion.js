import React, { useState } from 'react'
import swal from 'sweetalert';
import { Button, Form } from 'react-bootstrap';
import { firestore } from '../../firebase-config';
import { setDoc, doc, getDoc, collection, getDocs, updateDoc } from "@firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuid } from 'uuid';

export default function SubirArchivoCorrecion({ id,carpeta,direccion, documento }) {
    const [file, setFile] = useState(null);
    var contador = 0;
    //Css de los botones
    const botonescss = {
        background: '#E74C3C',
        border: 'rgb(255, 87, 51)',
        color: 'white',
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

            const url = await getDownloadURL(storageRef);
            await updateDoc(doc(firestore, "Proyects", id, direccion, documento), {
                correccion: url,
            })




            //Obtenemos la fecha actual para setearle un nombre al archivo.

            //Creaamos el nuevo documento
            //window.location.reload();
        }
    }

    return (
        <div>
            <div className="uploadImages">
                <input type="file" id="fileUpload" onChange={handleFile} />
                <div>
                    <br>
                    </br>
                    <Button onClick={subirlo} style={botonescss}>Subir Avances</Button>
                </div>
            </div>
        </div >
    )
}
