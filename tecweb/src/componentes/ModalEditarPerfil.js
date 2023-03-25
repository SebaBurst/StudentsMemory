import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { ModalBody } from 'react-bootstrap/esm';
import 'bootstrap/dist/css/bootstrap.min.css'
import swal from 'sweetalert';
import { firestore } from '../firebase-config';
import { setDoc, doc, getDoc, collection, getDocs, updateDoc } from "@firebase/firestore";
import Personaje from '../img/success.jpg';
import SubirArchivosZip from './SubirArchivosZip';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
class ModalEditarPerfil extends React.Component {
    constructor() {
        super();
        this.state = {
            showModal: false,
            form: {
                telefono: '',
            },

        }

    }
    handleModal() {
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
    

    //Metodo que actualiza el titulo del proyecto
    actualizarFoto = async () => {
        await updateDoc(doc(firestore, "Students", this.props.id), {
            telefono: this.state.form.telefono,
        })
        this.setState({ showModal: !this.state.showModal })
        window.location.reload();

    };

    render() {
        console.log("Suoer", this.props.id);

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
        return (
            <>
                <Button style={botonescss} onClick={() => this.handleModal()}>Editar Perfil</Button>
                <Modal show={this.state.showModal} onHide={() => this.handleModal()} >
                    <Modal.Header closeButton style={headercss}>
                        Editar Información de usuario.
                    </Modal.Header>
                    <Modal.Body>
                        <SubirArchivosZip
                            fotoProfile={this.props.foto}
                            id = {this.props.id}
                        />
                        <form>
                            <div className="col-lg-8 col-sm-12 form-group pt-1 ">
                                <label style={{
                                    fontWeight: "bold",
                                    margin: "15px 2px"
                                }}>Nuevo numero de telefono</label>
                                <input style={{
                                    width: "150%",
                                    borderColor: "rgb(52, 152, 219)"
                                }}
                                    type='text'
                                    onChange={this.handleChange}
                                    className="form-control"
                                    id="" cols="30" rows="8"
                                    defaultValue={this.props.telefono}
                                    name="telefono">
                                </input>
                            </div>
                        </form>
                    </Modal.Body>
                    <Modal.Footer style={footercss} >
                        <Button style={botonescss} onClick={() => this.actualizarFoto()} >Actualizar</Button>
                        <Button style={botonescss} onClick={() => this.handleModal()}>Cerrar</Button>
                    </Modal.Footer>

                </Modal>
            </>
        )
    };

}
export default ModalEditarPerfil;