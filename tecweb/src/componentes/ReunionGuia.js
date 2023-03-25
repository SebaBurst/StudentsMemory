import React, { useEffect, useState } from 'react'
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import CrudReunion from './profesoresComponentes/CrudReunion';
import { firestore } from '../firebase-config';
import { setDoc, doc, getDoc, collection, getDocs } from "@firebase/firestore";
import { getAuth, onAuthStateChanged } from 'firebase/auth'
function ReunionGuia({ id }) {
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
                    id={id}
                />
            </div>
        </div>
    )
}

export default ReunionGuia