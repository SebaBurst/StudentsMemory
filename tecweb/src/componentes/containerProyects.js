import React, { useEffect, useState } from 'react'
import '../css/bannerUser.css'
import Tarjeta from './card.js'
import { firestore } from '../firebase-config';
import { setDoc, doc, getDoc, collection, getDocs, updateDoc } from "@firebase/firestore";
import { async } from '@firebase/util'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


export default function ContainerProyects({ id }) {
  const [user, setUser] = useState(null);

  const getUser = async () => {
    if (!user) {
      const docRef = doc(firestore, "Professors", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const userData = {
          proyectosGuia: docSnap.data().proyectosGuia,
          photo: docSnap.data().photo,
        };
        setUser(userData);
        //console.log("Datos del usuario:", docSnap.data());
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    }

  }


  useEffect(() => {
    getUser();
  });



  const [avances, setAvances] = useState([]);
  const getAvances = async () => {
    const querySnapshot = await getDocs(collection(firestore, 'Proyects'))
    const proyectos = []
    querySnapshot.forEach((doc) => {
      proyectos.push({ ...doc.data(), id: doc.id });
      console.log(doc.data().planTitle)

    })
    setAvances(proyectos);
  };

  useEffect(() => {
    getAvances();
  }, []);





  if (user) {

    const listaProyectosGuia = [];
    {
      avances.map(avance => {
        console.log("Encontre uno", avance.alumno);
        {
          user.proyectosGuia.map(a => {
            if (a == avance.id) {
              listaProyectosGuia.push(avance);

            }
          })

        }

      })
    }





    return (
      <div className='contenedorBg'>
        <Row style={{ marginLeft: '0%', marginTop: '0%', width: '100%', height: '50%' }} md={4}>
          {
            listaProyectosGuia.map(avance => {
              return (
                <Col key={avance.id}>
                  <Tarjeta
                    autor={avance.alumno}
                    title={avance.title}
                    autorImg="https://i.pinimg.com/originals/7e/e0/a7/7ee0a7d3d8bfb6f70c732cb50754715b.jpg"
                    id = {avance.id}
                  />
                </Col>
              )
            })

          }

        </Row>


      </div >
    )
  }
}
