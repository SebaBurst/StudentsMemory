import React from 'react'
import { firestore } from '../../firebase-config';
import { setDoc, doc, getDoc, collection, getDocs } from "@firebase/firestore";
import { async } from '@firebase/util'
import CrudProyectosGuia from './CrudProyectosGuia';

export default function ContenedorProyectos({id, idProyecto}) {
    if(idProyecto){
        return (
            <div class="document-status">
              <div class="document-title">
                <p> Avances del Proyecto</p>
              </div>
              <div class="document-bg">
                <CrudProyectosGuia
                id = {idProyecto}
                carpeta ="avancesProyectosCorrecion"
                direccion = "avancesProyecto"
            />
              </div>    
            </div>
          )
    
    
      }
}
