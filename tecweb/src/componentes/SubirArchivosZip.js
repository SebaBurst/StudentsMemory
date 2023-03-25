import React, { useState } from 'react'
import swal from 'sweetalert';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Button, Form } from 'react-bootstrap';
import InputGroup from 'react-bootstrap/InputGroup';
import { setDoc, doc, getDoc, collection, getDocs, updateDoc } from "@firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuid } from 'uuid';
import Swal from 'sweetalert2';
import { firestore } from '../firebase-config';

export default function SubirArchivosZip({ fotoProfile, id }) {
    const [imgPreview, setImgPreview] = useState(null);
    const [error, setError] = useState(false);
    const [error2, setError2] = useState(null);
    var url2 = "";
    console.log("Hola soy la imagen de : ", id);
    const handleImageChange = async (e) => {
        setError(false);
        const selected = e.target.files[0];
        const unique_id = uuid();
        const storage = getStorage();
        const storageRef = ref(storage, `foto_perfil/${id}`);
        await uploadBytes(storageRef, selected);
        //const storageRef = await firebase2.storage().ref(`fotosPerfil/${selected.name}`);
        //const task = await storageRef.put(selected);
        const ALLOWED_TYPES = ["image/png", "image/jpeg", "image/jpg"];
        if (selected && ALLOWED_TYPES.includes(selected.type)) {
            let reader = new FileReader();
            reader.onloadend = () => {
                setImgPreview(reader.result);
            };
            reader.readAsDataURL(selected);
        } else {
            setError(true);
        }
        const url = await getDownloadURL(storageRef);
        url2 = url;
        setError2(url)
        //console.log(url);
    };
    const actualizarImagen = async () => {

        await updateDoc(doc(firestore, "Students", id), {
            photo: error2,
        })
        Swal.fire({
            title: 'Foto de perfil actualizada',
            text: 'Su foto de perfil ha sido actualizada con exito',
            imageUrl: 'https://1.bp.blogspot.com/-QseErUv8C7Q/YNVBHEVlpkI/AAAAAAAACgs/YRD9NpBzV18Ovs6o13oeA0S6zA2ebClqQCLcBGAsYHQ/s320/Subir.png',
            imageWidth: '300px',
            imageAlt: 'Success',
            confirmButtonColor: '#E74C3C',

        })
    }





    return (
        <div>
            <div className="uploadImages">
                <div className="imgPreview"
                    style={{
                        borderRadius: '100%',
                        width: '54%',
                        marginLeft: '21%',
                        background: imgPreview
                            ? `url("${imgPreview}") no-repeat center/cover`
                            : `url("${fotoProfile}") no-repeat center/cover`
                    }}>
                </div>
                {!imgPreview && (
                    <>
                        <img
                            style={{
                                borderRadius: '100%',
                                width: '54%',
                                marginLeft: '21%',
                            }}
                            src={fotoProfile} />

                        <input type="file" id="fileUpload" onChange={handleImageChange} />

                    </>
                )}

                {imgPreview && (
                    <>
                        <img
                            style={{
                                borderRadius: '100%',
                                width: '54%',
                                marginLeft: '21%',
                            }}
                            src={imgPreview} />
                        <button style={{

                            width: '100%',
                            border: '1px solid rgb(52, 152, 219) ',
                            color: 'white',
                            background: 'rgb(52, 152, 219)',
                            borderRadius: '12px',
                            margin: '4px',
                        }} onClick={() => setImgPreview(null)}>Quitar</button>
                    </>
                )}
                {imgPreview && (

                    <button style={{

                        width: '100%',
                        border: '1px solid rgb(52, 152, 219) ',
                        color: 'white',
                        background: 'rgb(52, 152, 219)',
                        borderRadius: '12px',
                        margin: '4px',



                    }} onClick={actualizarImagen}>Subir</button>
                )}


            </div>

        </div >
    )
}
