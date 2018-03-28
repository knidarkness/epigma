import React from 'react';

import './Header.scss';

const Header = () => (
    <header className='page-header'>
        <a href='/' className='page-header__logo'>EPIGMA</a>
        <div className='page-header__right-wrapper'>
            <h2 className='page-header__moto'>Free online vector graphics editor</h2>
            <nav className='page-navigation'>
                <a href="bitcoin:17u6LMHUcwXv1c7PYwBvWw1H9kB5BY3WCL" className='page-navigation__item'>Donate</a>
                <a href="#" className='page-navigation__item'>F_ck off</a>
            </nav>
        </div>
    </header>
);

export default Header;