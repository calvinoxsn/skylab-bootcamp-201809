import React, { Component } from 'react'

class InputForm extends Component {
    state = {
        text: '',
        status: this.props.status
    }

    handleInput = event => {
        const text = event.target.value

        this.setState({ text })
    }

    handleSubmit = event => {
        event.preventDefault()

        this.props.onSubmit(this.state.text, 'TODO')

        this.setState({ text: '' })
    }

    render() {
        return <form onSubmit={this.handleSubmit}>
            <input value={this.state.text} placeholder="Write text here..." onChange={this.handleInput} />

            <button type="submit"><i className="fas fa-plus"></i></button>
        </form>
    }
}

export default InputForm