import React, { useEffect, useState } from 'react'
import { Table, Button, Container, Modal, ModalHeader, ModalBody, FormGroup, ModalFooter, } from "reactstrap";
import { firestore } from '../../firebase-config';
import { setDoc, doc, getDoc, collection, getDocs, updateDoc } from "@firebase/firestore";
import ModalCorreccion from './ModalCorreccion';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';

function CrudProyectosGuia({ id, carpeta, direccion}) {
    const [avances, setAvances] = useState([]);
    const getAvances = async () => {
        const querySnapshot = await getDocs(collection(firestore, 'Proyects', id, "avancesProyecto"))
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

        fontSize: '12px',
        background: '#3498db',
        border: 'rgb(255, 87, 51)',
        color: 'white',
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
                                        <img style={{ width: '28%', }} src="https://www.nicepng.com/png/detail/208-2088186_png-file-report-icon-vector-png.png" />
                                    </td>
                                    <td><a >{dato.nombre} </a></td>
                                    <td>
                                        <Button  style ={botonescss} href={dato.url}> <AiIcons.AiFillEye style={{
                                            fontSize: 'smaller',
                                            color: 'white',
                                            width: '20px',
                                            height: '28px',
                                        }} /> Ver Entrega </Button>

                                    </td>
                                    <td>
                                        <Button style ={botonescss} href={dato.correccion}> <AiIcons.AiFillEye style={{
                                            color: 'white',
                                            width: '20px',
                                            height: '28px',
                                        }} /> Ver Correccion </Button>

                                    </td>
                                    <td>
                                        <ModalCorreccion
                                            id ={id}
                                            idProyecto={dato.id}
                                            carpeta = {carpeta}
                                            direccion = {direccion}
                                        
                                        />

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

export default CrudProyectosGuia