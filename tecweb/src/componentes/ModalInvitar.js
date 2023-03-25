import React, { useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { ModalBody } from 'react-bootstrap/esm';
import 'bootstrap/dist/css/bootstrap.min.css';
import Correccion from '../img/loginicon.png'
import emailjs from "emailjs-com";
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { firestore } from '../firebase-config';
import { setDoc, doc, getDoc, collection, getDocs } from "@firebase/firestore";
import { v4 as uuid } from 'uuid';
import Swal from 'sweetalert2';

async function EnviarCorreo(correo, profesor, uniqueId) {    
        console.log("Emial Recibido: " + correo)
        var templateParams = {
            to: correo,
            title: 'Invitación a la plataforma "StudentsMemory"',
            professor: profesor,
            codigo: uniqueId,
        };
        emailjs.send('service_ue631rv', 'template_6w5yi0b', templateParams, 'TGE-KLKcsexWtpRSm')
            .then(function (response) {
                console.log('SUCCESS!', response.status, response.text);
            }, function (error) {
                console.log('FAILED...', error);
            });
    
}

class ModalInvitar extends React.Component {
    constructor() {
        super();
        this.state = {
            showModal: false,
            form: {
                correoEstudiante: '',
            },

        }

    }
    handleModal() {
        this.setState({ showModal: !this.state.showModal })
    }
    async mandarCorreo() {
        const uniqueId = uuid();        
        EnviarCorreo(this.state.form.correoEstudiante, this.props.profesor, uniqueId);
        await setDoc(doc(firestore, "Invitation", uniqueId),{
            title: "Invitacion",
            profeId: this.props.id,
            verification: "false",
            code: uniqueId,

        });
        Swal.fire({
            title: 'El Estudiante Indefenso ha recibido la invitación',
            text: 'Se ha enviado un enlace de registro junto con un codigo de validación para el estudiante.',
            imageUrl: 'https://img.freepik.com/vector-premium/tu-amigo-telefono-inteligente-tiene-mensaje-ti-personaje-telefono-dibujos-animados-icono-ilustracion-plana-aislado-blanco-carta-mensaje-enviado-telefono-movil_92289-502.jpg?w=740',
            imageWidth: '300px',
            imageAlt: 'Success',
            confirmButtonColor: '#03568d',

        })
        this.setState({ showModal: !this.state.showModal })
    }

    handleChange = e => {
        this.setState({
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        })
    }
    render() {
        const modalStyles = {
            position: "absolute",
            top: '50%',
            left: '50%',
            width: '100%',
            transform: 'translate(-50%, -50%)'
        }
        const headercss = {
            color: 'white',
            backgroundColor: '#3498db'
        }
        const footercss = {

            background: '#3498db',

        }
        const botonescss = {

            fontSize: '15px',

            background: 'white',
            border: 'rgb(255, 87, 51)',
            color: '#3498db',
            fontWeight: '600',
        }


        const botonescssw = {

            fontSize: '15px',
            color: 'white',
            border: 'rgb(255, 87, 51)',
            background: '#3498db',
            fontWeight: '600',
        }
        return (
            <>
                <Button style={botonescssw} onClick={() => this.handleModal()}>  <FaIcons.FaUserGraduate style={{
                    color: 'white',
                    width: '20px',
                    height: '28px',
                }} /> Invitar a un estudiante</Button>
                <Modal show={this.state.showModal} onHide={() => this.handleModal()} >
                    <Modal.Header closeButton style={headercss}>
                        <FaIcons.FaUserGraduate style={{
                            color: 'white',
                            width: '20px',
                            height: '28px',
                        }} />  Invitar a un estudiante a la plataforma.
                    </Modal.Header>
                    <Modal.Body>
                        <img
                            src={Correccion}
                            style={{ width: '50%',
                            margin: "11px 115px 28px 113px"

                        
                        }}
                        >
                        </img>
                        A continuación podra invitar a un estudiante a la plataforma, para ello debe ingresar el correo del estudiante.
                        <form>
                            <div className="col-lg-8 col-sm-12 form-group pt-1 ">
                                <label style={{
                                    fontWeight: "bold",
                                    margin: "15px 2px"
                                }}>Correo del Estudiante.
                                </label>
                                <input style={{
                                    width: "150%",
                                    borderColor: "#3498db"
                                }}
                                    type='text'
                                    onChange={this.handleChange}
                                    className="form-control"
                                    id="" cols="30" rows="8"
                                    name="correoEstudiante">
                                </input>
                            </div>
                        </form>
                    </Modal.Body>
                    <Modal.Footer style={footercss} >
                        <Button style={botonescss} onClick={() => this.mandarCorreo()}> Invitar Estudiante </Button>
                        <Button style={botonescss} onClick={() => this.handleModal()}>Cerrar</Button>
                    </Modal.Footer>

                </Modal>
            </>
        )
    };

}
export default ModalInvitar;
