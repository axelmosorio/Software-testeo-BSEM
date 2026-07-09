import React from 'react';

function FooterLogo() {
    return (
        <footer>
            <a href='#' className='enlace_logo'>
                <div className='logo'>
                    <img 
                        src='/images/icono-software.png' 
                        alt='Logo' 
                        className='icono_imagen'
                    />
                    <div className='texto_logo'>
                        <p>SOFTWARE INC<br /><span>Los mejores softwares</span></p>
                    </div>
                </div>
            </a>
        </footer>
    );
}

export default FooterLogo;