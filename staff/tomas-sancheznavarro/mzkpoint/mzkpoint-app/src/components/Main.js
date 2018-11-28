import React from 'react'
import Card from './Card'
import './Main.sass'

function Main(props) {

    return (
        <ul className="main-cards">
            {(props.products || []).map(product => (
                <Card key={product.id} imageUrl={product.imageUrl} brand={product.brand}
                    model={product.model} price={product.price} />

            ))}
        </ul>
    )

}

export default Main