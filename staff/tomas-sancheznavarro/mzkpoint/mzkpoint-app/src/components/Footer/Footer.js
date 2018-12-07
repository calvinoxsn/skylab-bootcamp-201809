import React, { Component } from 'react'
import { Col, Container, Row, Footer } from 'mdbreact'

class FooterPage extends Component {
    render() {
        return (
            <Footer color="stylish-color" className="font-small pt-4 mt-4">
                <Container fluid className="text-center text-md-left">
                    <Row>
                        <Col md="6">
                            <h5 className="title">About us</h5>
                            <p>
                                Launched in 2003 and now with over 1.3 million registered customers, Mzkpoint.com is a leading retailer of musical instruments and music equipment. You can buy music gear from orchestral instruments to rock 'n' roll, including guitars, drum kits, digital pianos, saxophones and cellos, plus leading recording and studio equipment.
                            </p>
                        </Col>
                        <Col md="6">
                            <h5 className="title">Our vendors</h5>
                            <ul>
                                <li className="list-unstyled">
                                    <a href="https://www.fender.com/">Fender.com</a>
                                </li>
                                <li className="list-unstyled">
                                    <a href="https://www.gibson.com/">Gibson.com</a>
                                </li>
                                <li className="list-unstyled">
                                    <a href="#!">Yamaha Instruments</a>
                                </li>
                                <li className="list-unstyled">
                                    <a href="#!">Gretsch Guitars</a>
                                </li>
                            </ul>
                        </Col>
                    </Row>
                </Container>
                <div className="footer-copyright text-center py-3">
                    <Container fluid>
                        &copy; {new Date().getFullYear()} Copyright:{" "} Tomás Sánchez Navarro
                    </Container>
                </div>
            </Footer>
        )
    }
}

export default FooterPage