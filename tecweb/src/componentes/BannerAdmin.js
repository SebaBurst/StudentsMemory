import { useState, useEffect } from 'react'
import '../css/bannerUser.css'
import Logo from '../img/studentslogowhite.png'
export default function BannerAdmin() {
    return (
        <div>
            <div className="bannerUserAdmin">
                <div className="bannerLogotipo">
                    <img src={Logo} style={{
                        width: '320px',
                        marginLeft: '50%',
                    }} alt="User avatar"
                    />
                </div>
                <div className="menuBotones">
                    
                </div>

            </div>
        </div>

    );
}
