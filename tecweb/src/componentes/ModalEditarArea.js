import React, { useState } from 'react'
import {Button, Modal} from 'react-bootstrap'
import { ModalBody } from 'react-bootstrap/esm';
import 'bootstrap/dist/css/bootstrap.min.css'
import SubirArchivos from './SubirArchivos';
import SubirArchivosZip from './SubirArchivosZip';
import ModalEditarTitulo from './ModalEditarTitulo';
import Personaje from '../img/idea.jpg';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';

class ModalEditarArea extends React.Component {
    constructor(){
        super();
        this.state = {
            showModal: false
        }

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
                            }}/> Modificar Area del desarrollo de su proyecto.
                    </Modal.Header>
                    <Modal.Body>
                        <img 
                            src ={Personaje} 
                            style={{ width: '65%',
                            margin: "10px 100px 14px 65px"
                         }}  
                           >
                        </img>
                        A continuación podra Actualizar el area de su proyecto.
                        <form>
                            <div className="col-lg-8 col-sm-12 form-group pt-1 ">
                                        <label style={{
                                                fontWeight: "bold",
                                                margin: "15px 2px"
                                        }}>Seleccione su area de interes</label>
                                         <select class = "select-input" name="Area" id="areaTrabajo">
                            <option value="Desarrollo de Sotware">Desarrollo de Software</option>
                            <option value="Investigacion">Investigacion</option>
                            <option value="Otro">Otro</option>
                    </select>
                                    </div>
                        </form>
                       
                    </Modal.Body>
                    <Modal.Footer style={footercss} >
                        <Button style={botonescss} onClick={()=> this.closeaction()}>Cerrar</Button>
                        <Button style={botonescss} >Actualizar</Button>
                    </Modal.Footer>

                </Modal>
            </>
    )};
}
export default ModalEditarArea;
