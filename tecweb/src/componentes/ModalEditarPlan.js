import React, { useState } from 'react'
import {Button, Modal} from 'react-bootstrap'
import { ModalBody } from 'react-bootstrap/esm';
import 'bootstrap/dist/css/bootstrap.min.css'
import SubirArchivos from './SubirArchivos';
import SubirArchivosZip from './SubirArchivosZip';
import ModalEditarTitulo from './ModalEditarTitulo';
import Personaje from '../img/Triste.jpg';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
class ModalEditarPlan extends React.Component {
    constructor(){
        super();
        this.state = {
            showModal: false,
            form: {
                nombre: "",
            },
        }

    }
    handleChange = e => {
        this.setState({
            form:{
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        })
    }

    closeaction(){
        window.location.reload();
    }
    handleModal(){
        this.setState({showModal: !this.state.showModal})

    }


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
                <Button style={botonescss} onClick={()=> this.handleModal()}><FaIcons.FaEdit style={{
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
                            }}/> Actualizar Planificación del desarrollo del proyecto.
                    </Modal.Header>
                    <Modal.Body>
                        <img 
                            src ={Personaje} 
                            style={{ width: '50%',
                            margin: "11px 115px 28px 113px"
                         }}  
                           >
                        </img>
                        A continuación podra Actualizar la Planificación de su proyecto, ¿No todo sale como esta planeado,verdad?
                        <form>
                            <div className="col-lg-8 col-sm-12 form-group pt-1 ">
                                        <label style={{
                                                fontWeight: "bold",
                                                margin: "15px 2px"
                                        }}>Nombre del documento</label>
                                        <input style={{
                                            width: "150%",
                                            borderColor: "rgb(52, 152, 219)"
                                            }} 
                                            type='text' 
                                            onChange={this.handleChange}
                                            className="form-control" 
                                            id="" cols="30" rows="8" 
                                            name="nombre">
                                        </input>
                                    </div>
                        </form>
                        <label style={{
                                                fontWeight: "bold",
                                                margin: "15px 2px"
                                        }}>Subir archivo a continuación</label>
                        <SubirArchivos
                             id={this.props.id}
                             nombre ={this.state.form.nombre}
                             carpeta = "planificacion"

                        />
                    </Modal.Body>
                    <Modal.Footer style={footercss} >
                        <Button style={botonescss} onClick={()=> this.closeaction()}>Cerrar</Button>
                    </Modal.Footer>

                </Modal>
            </>
    )};
}
export default ModalEditarPlan;
