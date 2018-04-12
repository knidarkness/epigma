import React from 'react';
import {Link} from 'react-router-dom';
import './Header.scss';

const Header = () => (
    <header className='page-header'>
        <Link to='/' className='page-header__logo'>EPIGMA</Link>
        <div className='page-header__right-wrapper'>
            <h2 className='page-header__moto'>Free online vector graphics editor</h2>
            <nav className='page-navigation'>
                <a href="bitcoin:1J5U3ePyKxfCZy1p4uoUtQtvxLt5gEVBew" rel="noopener noreferrer" target='_blank' className='page-navigation__item'>Donate</a>
                <a href="https://google.com/" rel="noopener noreferrer" target='_blank' className='page-navigation__item'>F_ck off</a>
            </nav>
        </div>
    </header>
);

export default Header;