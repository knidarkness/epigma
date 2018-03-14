import React from 'react';
import {changeZoom} from "../actions";

const Header = ({changeZoom}) => (
    <section>
        <input type="button" value="+" onClick={() => changeZoom(0.01)}/>
        <input type="button" value="-" onClick={() => changeZoom(-0.01)}/>
    </section>
);

export default Header;