import React from 'react'
import NavbarPage from './Navbar'
import FooterPage from './Footer'
import CarrouselPage from './Carrousel'

function Landing(props) {
    return <section>
        <header>
            <NavbarPage />
        </header>
        <main>
            <CarrouselPage/>
        </main>
        <footer>
            <FooterPage />
        </footer>


    </section>
}

export default Landing