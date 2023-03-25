import React, { Component, useEffect, useState } from 'react';
import '../css/menuBanner.css'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { firestore } from '../firebase-config';
import { setDoc, doc, getDoc, collection, getDocs } from "@firebase/firestore";
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'
import { async } from '@firebase/util'
import ModalEditarPerfil from './ModalEditarPerfil';





export default function UsuarioMenu({ id, photo, nombre, telefono }) {
    const [dropdown, setDropdown] = useState(false);
    async function cerrarSesion() {
        const auth = getAuth();
        signOut(auth).then(() => {
            window.location = '/';
        }).catch((error) => {
            // An error happened.
        });
    }
    const abrirCerrar = () => {
        setDropdown(!dropdown);

    }
    const botonescss = {
        fontSize: '15px',
        background: 'white',
        border: 'rgb(255, 87, 51)',
        color: 'rgb(255, 87, 51)',
        fontWeight: '600',
    }
    return (
        
        <div>
            <div onClick={abrirCerrar} className='imagenPerfil'>
                <img src={photo} />
            </div>
            {dropdown && (
                <div className='submenuBanner'>
                    <img src={photo} />
                    <a>{nombre}</a>
                    <ul>
                        <ModalEditarPerfil
                            telefono = {telefono}
                            foto = {photo}
                            id = {id}
                        
                        />
                        <li style = {botonescss} onClick={cerrarSesion}>Cerrar Sesion</li>
                    </ul>
                </div>
            )}
        </div>
    )
}
