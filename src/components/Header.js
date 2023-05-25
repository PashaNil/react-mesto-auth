import React from 'react';
import logoHeader from "../images/logo-header.svg";

function Header(){
    return(
        <header className="header">
        <img className="header__logo" src={logoHeader} alt="Место Россия"/>
      </header>
    )
}

export default Header;