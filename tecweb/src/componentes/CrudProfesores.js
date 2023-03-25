
import React, { useEffect, useState } from 'react'
import { Table, Button, Container, Modal, ModalHeader, ModalBody, FormGroup, ModalFooter, } from "reactstrap";
import { firestore } from '../firebase-config';
import { setDoc, doc, getDoc, collection, getDocs, updateDoc } from "@firebase/firestore";
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';

function CrudProfesores() {
    const [avances, setAvances] = useState([]);
    const getAvances = async () => {
        const querySnapshot = await getDocs(collection(firestore, 'Professors'))
        const proyectos = []
        querySnapshot.forEach((doc) => {
            proyectos.push({ ...doc.data(), id: doc.id });
            console.log(doc.data().nombre)
        })
        setAvances(proyectos);
    };

    useEffect(() => {
        getAvances();
    }, []);

    const datitos = [];

    {
        avances.map((a => {
            var datos = {
                id: a.id,
                nombre: a.nombre,
                correo: a.correo,
                photo: a.photo,
            }
            datitos.push(datos);

        }))
    }














    const tableStyles = {
        color: 'white',
        backgroundColor: '#03568d'
    }
    const botonescss = {
        fontSize: '15px',
        color: 'white',
        border: 'rgb(255, 87, 51)',
        background: '#3498db',
        fontWeight: '600',
    }
    const contador = 0;
    return (
        <div>

            <div className="fondoAdmin">
                <div className="container-asesorias">
                    <Table>
                        <thead style={tableStyles}>
                        <tr>
                                    <th>Foto Perfil</th>
                                    <th>Nombre</th>
                                    <th>Correo</th>

                                </tr>
                            </thead>

                        <tbody>
                            {datitos.map((dato) => (
                                <tr key={dato.id}>
                                    <td style={{
                                        height: "27px",
                                        width: "154px",
                                    }}>
                                        <img style={{ width: '20%', }} src={dato.photo} />
                                    </td>
                                    <td><a>{dato.nombre} </a></td>
                                    <td><a>{dato.correo} </a></td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </div>
        </div>
    )
}

export default CrudProfesores