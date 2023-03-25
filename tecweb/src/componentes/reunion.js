import React, { useEffect, useState } from 'react'
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import CrudReunion from './profesoresComponentes/CrudReunion';
import { firestore } from '../firebase-config';
import { setDoc, doc, getDoc, collection, getDocs } from "@firebase/firestore";
import { getAuth, onAuthStateChanged } from 'firebase/auth'
export default function Reunion({ id }) {
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




  if (user) {
    if (proyecto) {
      return (
        <div className="reunion">
          <div className="reunion-title">
            <p> <AiIcons.AiFillAlert style={{
              width: '20px',
              height: '28px',
            }} /> Reuniones </p>
          </div>
          <div className="reunion-bg">
            <CrudReunion
              id={user.idProyecto}
            />
          </div>
        </div>
      )
    }
  }
}
