import React from 'react'
import NavbarPage from './Navbar'
import FooterPage from './Footer'
import CarrouselPage from './Carrousel'
import { NavLink } from 'react-router-dom'
import './Landing.sass'

function Landing(props) {
    return <section>
        <header>
            <NavbarPage />
        </header>
        <main>
            <CarrouselPage />
            <NavLink to="home">
                <button className="enter-button">Enter our online shop!</button>
            </NavLink>
        </main>
        <footer>
            <FooterPage />
        </footer>


    </section>
}

export default Landing