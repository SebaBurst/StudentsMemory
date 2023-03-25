import React, { useEffect, useState } from 'react'
import { Table, Button, Container, Modal, ModalHeader, ModalBody, FormGroup, ModalFooter, } from "reactstrap";
import { firestore } from '../../firebase-config';
import { setDoc, doc, getDoc, collection, getDocs, updateDoc } from "@firebase/firestore";
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';

export default function CrudReunion({ id }) {
    console.log("ID EN CRUD"+id)
    const [avances, setAvances] = useState([]);
    const getAvances = async () => {
        const querySnapshot = await getDocs(collection(firestore, 'Reunion'))
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
                titulo: a.titulo,
                fecha: a.fecha,
                comentario: a.comentario,
            }
            if (a.idProyecto == id) {
                datitos.push(datos);
            }

        }))
    }

    const tableStyles = {
        color: 'white',
        backgroundColor: '#FF5733'
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
            <div className='reunionTable'>
            <Table>
                        <thead style={tableStyles}>
                            <tr>
                            </tr>
                        </thead>

                        <tbody>
                            {datitos.map((dato) => (
                                <tr key={dato.id}>
                                    <td><a ><AiIcons.AiTwotoneAlert style={{
                                            color: 'rgb(3, 86, 141)',
                                            width: '20px',
                                            height: '28px',
                                        }} /></a></td>
                                    <td><a >{dato.titulo} </a></td>
                                    <td><a >{dato.fecha} </a></td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>

            </div>

        </div>
    )
}
