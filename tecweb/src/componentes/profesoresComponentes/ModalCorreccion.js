import React from 'react'
import { Button, Modal } from 'react-bootstrap'
import { ModalBody } from 'react-bootstrap/esm';
import 'bootstrap/dist/css/bootstrap.min.css';
import Correccion from '../../img/correccion.png'
import SubirArchivoCorrecion from './SubirArchivoCorrecion';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';

class ModalCorreccion extends React.Component {
    constructor() {
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
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        })
    }

    handleModal() {
        this.setState({ showModal: !this.state.showModal })
        //window.location.reload();

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

            background: '#03568d',
            border: 'rgb(255, 87, 51)',
            color: 'white',
            fontWeight: '600',
        }
        const botonescss2 = {

            fontSize: '15px',
            background: 'white',
            border: 'rgb(255, 87, 51)',
            color: '#3498db',
            fontWeight: '600',
        }

        return (
            <>
                <Button style={botonescss} onClick={() => this.handleModal()}><AiIcons.AiOutlineFileAdd style={{
                    color: 'white',
                    width: '33px',
                    height: '28px',
                }} />Subir Correción</Button>
                <Modal show={this.state.showModal} onHide={() => this.handleModal()} >
                    <Modal.Header closeButton style={headercss}>
                        Subir correcion del documento/proyecto de memoria
                    </Modal.Header>
                    <Modal.Body>
                        <img
                            src={Correccion}
                            style={{
                                width: '65%',
                                margin: "10px 100px 14px 65px"
                            }}
                        >
                        </img>
                        A continuación podra subir un archivo en PDF, con las correciones realizadas al documento enviado por el estudiante.
                        <label style={{
                            fontWeight: "bold",
                            margin: "15px 2px"
                        }}>Subir archivo a continuaciónpn</label>
                          <SubirArchivoCorrecion
                            id={this.props.id}
                            carpeta = {this.props.carpeta}
                            direccion = {this.props.direccion}
                            documento = {this.props.idProyecto}
                        />
                    </Modal.Body>
                    <Modal.Footer style={footercss} >
                        <Button style={botonescss2} onClick={() => this.handleModal()}>Cerrar</Button>
                    </Modal.Footer>

                </Modal>
            </>
        )
    };
}
export default ModalCorreccion;


