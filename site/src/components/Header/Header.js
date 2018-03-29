import React from 'react';

import './Header.scss';

const Header = () => (
    <header className='page-header'>
        <a href='/' className='page-header__logo'>EPIGMA</a>
        <div className='page-header__right-wrapper'>
            <h2 className='page-header__moto'>Free online vector graphics editor</h2>
            <nav className='page-navigation'>
                <a href="bitcoin:1J5U3ePyKxfCZy1p4uoUtQtvxLt5gEVBew" className='page-navigation__item'>Donate</a>
                <a href="https://google.com/" className='page-navigation__item'>F_ck off</a>
            </nav>
        </div>
    </header>
);

export default Header;