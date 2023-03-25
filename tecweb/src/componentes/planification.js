import { useState, useEffect } from 'react'
import ModalEditarPlan from './ModalEditarPlan'
import { Table, Button, Container, Modal, ModalHeader, ModalBody, FormGroup, ModalFooter, } from "reactstrap";
import { firestore } from '../firebase-config';
import { setDoc, doc, getDoc, collection, getDocs } from "@firebase/firestore";
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';


function Planification({ id }) {

  const [proyecto, setProyecto] = useState(null);
  const [user, setUser] = useState(null);

  const getUser = async () => {
    if (!user) {
      const docRef = doc(firestore, "Students", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const userData = {
          id: docSnap.data().id,
          idProyecto: docSnap.data().idProyecto,
        };
        setUser(userData);
        console.log("Datos del usuario:", docSnap.data());
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    }

  }
  useEffect(() => {
    getUser();
  });
  const getProyecto = async () => {
    if (user) {
      if (!proyecto) {
        const docRef = doc(firestore, "Proyects", user.idProyecto);
        const docSnap = await getDoc(docRef);
        console.log("Entre al get proyecto");
        if (docSnap.exists()) {
          const userData = {
            title: docSnap.data().title,
            planUrl: docSnap.data().planUrl,
            planTitle: docSnap.data().planTitle,
            area: docSnap.data().area,
          };
          setProyecto(userData);
          console.log("Datos del proyecto:", docSnap.data());
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      }
    }
  };

  useEffect(() => {
    getProyecto();
  });

  const tableStyles = {
    color: 'white',
    backgroundColor: '#FF5733'
  }
  if (user) {
    if (proyecto) {
      return (
        <div class="planification">
          <div class="plan-title">
            <p> <FaIcons.FaCalendarAlt style={{
              width: '20px',
              height: '28px',
            }} /> Planificacion del proyecto </p>
            <ModalEditarPlan
              id={user.idProyecto}
            />
          </div>
          <div class="plan-bg">
            <Table>
              <thead style={tableStyles}>
                <tr>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{
                    height: "27px",
                    width: "154px",
                  }}>
                    <img style={{ width: '28%', }} src="https://cdn-icons-png.flaticon.com/512/5988/5988432.png" />
                  </td>
                  <td><a href={proyecto.planUrl}>{proyecto.planTitle} </a></td>
                </tr>
              </tbody>
            </Table>

          </div>
        </div>
      )
    }
  }
}

export default Planification