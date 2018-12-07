import React, { Component } from 'react'
import NavbarPage from '../Navbar/Navbar'
import SearchBar from '../Search/Search'
import Sidebar from '../Sidebar/Sidebar'
import CarrouselPage from '../Carrousel/Carrousel'
import Main from '../Main/Main'
import ModalPage from '../Popup/Popup'
import './Home.sass'
import '../Sidebar/Sidebar.sass'

class Home extends Component {

    state = {
        products: [],
        refresh: 0
    }

    pushProducts = (products) => {
        this.setState({ products })
    }

    handleRefresh = () => this.setState({ refresh: this.state.refresh + 1 })

    render() {

        return <section>
            <header>
                <NavbarPage refresh={this.state.refresh} />
                <ModalPage />
            </header>

            <section className="upper-bar">
                <SearchBar pushProducts={this.pushProducts} />
            </section>

            <section className="carrousel-deals">
                <h1>...or check out our latest deals!</h1>
                <div className="carrousel-home">
                    <CarrouselPage />
                </div>
            </section>

            <section className="home-container">
                <Sidebar className="aside" pushProducts={this.pushProducts} />

                <main className="main">
                    <Main products={this.state.products} onHandleRefresh={this.handleRefresh} />
                </main>
            </section>

        </section>
    }

}

export default Home
