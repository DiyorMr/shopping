import React, { useContext, useEffect, useState } from 'react'
import './Navbar.css'
import logo from '../../img/logo.svg'
import dash from '../../img/cart-dash.svg'
import { Context } from '../../App';

export default function Navbar() {
    const { setModal } = useContext(Context) 
    return (
        <div>
            <div className="navbar">
                <div className="navbar-left">
                    <img src={logo} alt='' />
                    <h1 className='navbar-title'>GREENSHOP</h1>
                </div>
                <div className="navbar-right">
                    <img className='navbar-img' src={dash} alt='' />
                    <button className="navbar-btn" type="button" onClick={()=>setModal(true)}>Add</button>
                    <button className='navbar-btn'>Log in</button>
                </div>
            </div>
        </div>
    )
}
