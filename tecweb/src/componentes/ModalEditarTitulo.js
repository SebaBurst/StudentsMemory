import React, { useState } from 'react'
import {Button, Modal} from 'react-bootstrap'
import { ModalBody } from 'react-bootstrap/esm';
import 'bootstrap/dist/css/bootstrap.min.css'
import swal from 'sweetalert';
import {firestore} from '../firebase-config';
import { setDoc,doc, getDoc, collection, getDocs,updateDoc } from "@firebase/firestore";
import Personaje from '../img/success.jpg';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import '../css/login.css';

class ModalEditarTitulo extends React.Component {
    constructor(){
        super();
        this.state = {
            showModal: false,
            form: {
                titulo: '',
            },
            
        }

    }
    handleModal(){
        this.setState({showModal: !this.state.showModal})
    }

    handleChange = e => {
        this.setState({
            form:{
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        })
    }

    //Metodo que actualiza el titulo del proyecto
    actualizarTitulo = async () => {
            await updateDoc(doc(firestore, "Proyects", this.props.id),{
                title: this.state.form.titulo,
            })
            this.setState({showModal: !this.state.showModal})
            window.location.reload();
        
    };

    render(){
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
            fontSize:'15px',
            background: 'white',
            border: 'rgb(255, 87, 51)',
            color: '#3498db',
            fontWeight: '600',
        }
        return (
            <>
                <Button clasName = "buttonModal" style={botonescss} onClick={()=> this.handleModal()}><FaIcons.FaEdit style={{
                                color: '#03568d',
                                width: '20px',
                                height: '28px',
                            }}/></Button>
                <Modal show = {this.state.showModal} onHide = {()=> this.handleModal()} >
                    <Modal.Header closeButton style={headercss}>
                    <AiIcons.AiTwotoneEdit style={{
                                color: 'white',
                                width: '20px',
                                height: '28px',
                            }}/> Editar Titulo del Proyecto
                    </Modal.Header>
                    <Modal.Body>
                        <img 
                            src ="https://img.freepik.com/premium-vector/male-student-learning-before-exams-writing-test-flat-illustration-cartoon-angry-character-doing-hard-assignments-preparing-module-work-study-knowledge-concept_179970-3820.jpg" 
                            style={{ width: '100%' }}  
                           >
                        </img>
                        A continuación usted podra modificar libremente el titulo de su proyecto, Le sugerimos ser creativo, ¿Podra hacerlo?
                        <form>
                            <div className="col-lg-8 col-sm-12 form-group pt-1 ">
                                        <label style={{
                                                fontWeight: "bold",
                                                margin: "15px 2px"
                                        }}>Nuevo nombre del proyecto</label>
                                        <input style={{
                                            width: "150%",
                                            borderColor: "rgb(52, 152, 219)"
                                            }} 
                                            type='text'
                                            onChange={this.handleChange}
                                            className="form-control" 
                                            id="" cols="30" rows="8" 
                                            defaultValue={this.props.titulo}
                                            name="titulo">
                                        </input>
                                    </div>
                        </form>
                    </Modal.Body>
                    <Modal.Footer style={footercss} >
                        <Button style={botonescss} onClick={()=> this.actualizarTitulo()} >Actualizar</Button>
                        <Button style={botonescss} onClick={()=> this.handleModal()}>Cerrar</Button>
                    </Modal.Footer>

                </Modal>
            </>
    )};

}
export default ModalEditarTitulo;