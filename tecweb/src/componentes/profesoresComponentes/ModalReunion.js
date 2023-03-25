import React from 'react'
import { Button, Modal } from 'react-bootstrap'
import { ModalBody } from 'react-bootstrap/esm';
import 'bootstrap/dist/css/bootstrap.min.css';
import Correccion from '../../img/ayuda.png'
import emailjs from "emailjs-com";
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { setDoc, doc, getDoc, addDoc, collection, getDocs, updateDoc, query, where } from "@firebase/firestore";
import { firestore } from '../../firebase-config';




async function enviarCorreo({idProyecto, date, time}) {

    const q = query(collection(firestore, "Students"), where("idProyecto", "==", idProyecto));
    const docSnap = await getDocs(q);
    if (!docSnap.empty) {

        var templateParams = {
            to: docSnap.data().correo,
            name:docSnap.data().nombre,
            title:"Se ha agendado una reunion con tu Profesor Guia" ,
            date: date,
            time: time,
    
        };
        emailjs.send('service_3f0hyhl', 'template_vbqjcii', templateParams, 'QF4fd2JQPdOHNk7l8')
            .then(function (response) {
                console.log('SUCCESS!', response.status, response.text);
            }, function (error) {
                console.log('FAILED...', error);
            });
    }
    else {
        console.log("Error");
    }


}



class ModalReunion extends React.Component {
    constructor(){
        super();
        this.state = {
            showModal: false,
            form: {
                titulo: '',
                fecha: '',
                comentario: '',
            },
            
        }

    }
    handleModal(){
        this.setState({showModal: !this.state.showModal})
    }
    async mandarCorreo(){
        const docRef = await addDoc(collection(firestore, "Reunion"), {
            titulo: this.state.form.titulo,
            fecha: this.state.form.fecha,
            comentario: this.state.form.comentario,
            idProyecto: this.props.id
          });
          enviarCorreo(this.props.id, this.state.form.fecha,this.state.form.comentario)
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


        const botonescssw = {

            fontSize: '18px',
            background: '#03568d',
            border: 'rgb(255, 87, 51)',
            color: 'white',
            fontWeight: '600',
        }
        return (
            <>
                <Button style={botonescssw} onClick={()=> this.handleModal()}><FaIcons.FaCalendarAlt style={{
                    color: 'white',
                    width: '33px',
                    height: '28px',
                }} /> Planificar Reunion</Button>
                <Modal show = {this.state.showModal} onHide = {()=> this.handleModal()} >
                    <Modal.Header closeButton style={headercss}>
                        Planificar una reunion con el estudiante.
                    </Modal.Header>
                    <Modal.Body>
                        <img 
                            src = {Correccion}
                            style={{ width: '70%',
                            margin: '15px 56px 13px 85px' }}  
                           >
                        </img>
                        A continuación podra planificar una reunion para ayudar a su estudiante indefenso... muy indefenso...
                        <form>
                            <div className="col-lg-8 col-sm-12 form-group pt-1 ">
                                        <label style={{
                                                fontWeight: "bold",
                                                margin: "15px 2px"
                                        }}>Nombre de la reunion
                                        </label>
                                        <input style={{
                                            width: "150%",
                                            borderColor: "#3498db"
                                            }} 
                                            type='text'
                                            onChange={this.handleChange}
                                            className="form-control" 
                                            id="" cols="30" rows="8" 
                                            name="titulo">
                                        </input>
                                        <label style={{
                                                fontWeight: "bold",
                                                margin: "15px 2px"
                                        }}>Fecha de la reunion.
                                        </label>
                                        <input style={{
                                            width: "150%",
                                            borderColor: "#3498db"
                                            }} 
                                            type='date'
                                            onChange={this.handleChange}
                                            className="form-control" 
                                            id="" cols="30" rows="8" 
                                            name="fecha">
                                        </input>    
                                        <label style={{
                                                fontWeight: "bold",
                                                margin: "15px 2px"
                                        }}>Comentarios de la reunion
                                        </label>
                                        <input style={{
                                            width: "150%",
                                            borderColor: "#3498db"
                                            }} 
                                            type='text'
                                            onChange={this.handleChange}
                                            className="form-control" 
                                            id="" cols="30" rows="8" 
                                            name="comentario">
                                        </input>


                                    </div>
                        </form>
                    </Modal.Body>
                    <Modal.Footer style={footercss} >
                        <Button style={botonescss} onClick ={()=> this.mandarCorreo()}> Agendar Reunion </Button>
                        <Button style={botonescss} onClick={()=> this.handleModal()}>Cerrar</Button>
                    </Modal.Footer>

                </Modal>
            </>
    )};

}
export default ModalReunion;
