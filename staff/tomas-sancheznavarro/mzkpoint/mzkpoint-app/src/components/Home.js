import React, { Component } from 'react'
import NavbarPage from './Navbar'
import SearchBar from './Search'
import Sidebar from './Sidebar'
import CarrouselPage from './Carrousel'
import Main from './Main'
import './Home.sass'
import './Sidebar.sass'

class Home extends Component {

    state = {
        products: []
    }

    pushProducts = (products) => {
        this.setState({ products })
    }

    render() {

        return <section>
            <header>
                <NavbarPage />
            </header>

            <section className="upper-bar">
                <SearchBar pushProducts={this.pushProducts} />
            </section>

            <section className="carrousel-deals">
                <CarrouselPage />
            </section>

            <section className="home-container">
                <Sidebar className="aside" pushProducts={this.pushProducts} />

                <main className="main">
                    <Main products={this.state.products} />
                </main>
            </section>

        </section>
    }

}

export default Home
