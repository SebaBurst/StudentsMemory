import React from 'react'
import { firestore } from '../../firebase-config';
import { setDoc, doc, getDoc, collection, getDocs } from "@firebase/firestore";
import { async } from '@firebase/util'
import CrudDocumentosGuia from './CrudDocumentosGuia';

import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';





function ContenedorDocumentos({id, idProyecto}) {

  if(idProyecto){
    return (
        <div class="document-status">
          <div class="document-title">
            <p> <AiIcons.AiFillFilePdf style={{
                                width: '20px',
                                height: '28px',
                            }}/>  Avances del documento </p>
          </div>
          <div class="document-bg">
            <CrudDocumentosGuia
                id = {idProyecto}
                carpeta ="avancesDocumentosCorrecion"
                direccion = "avancesDocumento"
            />
          </div>    
        </div>
      )


  }
}

export default ContenedorDocumentos