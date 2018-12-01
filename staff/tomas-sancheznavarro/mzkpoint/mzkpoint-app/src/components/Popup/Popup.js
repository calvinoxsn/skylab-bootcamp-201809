import React, { Component } from 'react'
import { Container, Modal, ModalBody, ModalHeader } from 'mdbreact'
import './Popup.sass'


class ModalPage extends Component {
    state = {
        modal: false
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.showModal !== nextProps.showModal) {
            this.setState({ modal: nextProps.showModal })
        }
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        })
        this.props.resetToggle()
    }

    render() {
        return (
            <Container>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader className="modal-header" toggle={this.toggle}> {this.props.activeProduct &&
                        <p className="header">{this.props.activeProduct.brand} <span className="header-type">{this.props.activeProduct.type} </span>{this.props.activeProduct.instrument}</p>
                    }</ModalHeader>
                    <ModalBody>
                        <p className="description">{this.props.activeProduct &&
                            this.props.activeProduct.description
                        }</p>
                        <hr className="divider" />
                    </ModalBody>
                    <ModalBody>
                        {this.props.activeProduct &&
                            this.props.activeProduct.features.map(item => {
                                return (
                                    <ul key={Math.random()}>
                                        <li>{item}</li>
                                    </ul>
                                )
                            })
                        }
                    </ModalBody>

                </Modal>
            </Container>
        )
    }
}

export default ModalPage