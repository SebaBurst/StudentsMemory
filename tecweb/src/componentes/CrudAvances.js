import React, { useEffect, useState } from 'react'
import { Table, Button, Container, Modal, ModalHeader, ModalBody, FormGroup, ModalFooter, } from "reactstrap";
import { firestore } from '../firebase-config';
import { setDoc, doc, getDoc, collection, getDocs, updateDoc } from "@firebase/firestore";
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';



function CrudAvances({ id }) {

    const [avances, setAvances] = useState([]);
    const getAvances = async () => {
        const querySnapshot = await getDocs(collection(firestore, 'Proyects', id, "avancesDocumento"))
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
                url: a.url,
                correccion: a.correccion,
            }
            datitos.push(datos);

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

            <div className="fondoAdmin">
                <div className="container-asesorias">
                    <Table>
                        <thead style={tableStyles}>
                            <tr>
                            </tr>
                        </thead>

                        <tbody>
                            {datitos.map((dato) => (
                                <tr key={dato.id}>
                                    <td style={{
                                        height: "27px",
                                        width: "154px",
                                    }}>
                                        <img style={{ width: '20%', }} src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/PDF_file_icon.svg/1667px-PDF_file_icon.svg.png" />
                                    </td>
                                    <td><a>{dato.nombre} </a></td>
                                    <td>
                                        <Button href={dato.url} style={botonescss}><AiIcons.AiFillEye style={{
                                            color: 'white',
                                            width: '20px',
                                            height: '28px',
                                        }} /> Ver Entrega</Button></td>
                                    <td>
                                        <Button href={dato.correccion} style={botonescss}><FaIcons.FaCloudDownloadAlt style={{
                                            color: 'white',
                                            width: '20px',
                                            height: '28px',
                                        }} /> Descargar Correccion</Button></td>

                                    <td>

                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </div>
        </div>
    )

}

export default CrudAvances
