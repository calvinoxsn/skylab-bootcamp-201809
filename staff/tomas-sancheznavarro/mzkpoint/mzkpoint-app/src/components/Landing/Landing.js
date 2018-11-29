import React from 'react'
import NavbarPage from '../Navbar/Navbar'
import FooterPage from '../Footer/Footer'
import CarrouselPage from '../Carrousel/Carrousel'
import { NavLink } from 'react-router-dom'
import './Landing.sass'

function Landing() {
    return <section>
        <header>
            <NavbarPage />
        </header>
        <main className="carrousel-container">
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