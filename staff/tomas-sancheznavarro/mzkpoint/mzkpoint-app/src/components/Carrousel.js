import React, { Component } from 'react'
import { Carousel, CarouselInner, CarouselItem, View, Mask, Container } from 'mdbreact'

class CarouselPage extends Component {
    render() {
        return (
            <Container className="container">
                <Carousel interval={3000} activeItem={1} length={5} showControls={false} showIndicators={true} className="z-depth-1">
                    <CarouselInner>
                        <CarouselItem itemId="1">
                            <View className="center-pic">
                                <img className="d-block w-100 img" src="images/fender.jpg" alt="First slide" />
                                <Mask overlay="black-light" />
                            </View>

                        </CarouselItem>
                        <CarouselItem itemId="2">
                            <View className="center-pic">
                                <img className="d-block w-100 img" src="images/gibson.jpg" alt="Second slide" />
                                <Mask overlay="black-light" />
                            </View>

                        </CarouselItem>
                        <CarouselItem itemId="3">
                            <View className="center-pic">
                                <img className="d-block w-100 img" src="images/gretsch.jpg" alt="Third slide" />
                                <Mask overlay="black-light" />
                            </View>

                        </CarouselItem>
                        <CarouselItem itemId="4">
                            <View className="center-pic">
                                <img className="d-block w-100 img" src="images/jazz-bass.jpg" alt="Fourth slide" />
                                <Mask overlay="black-light" />
                            </View>

                        </CarouselItem>
                        <CarouselItem itemId="5">
                            <View className="center-pic">
                                <img className="d-block w-100 img" src="images/keyboard.jpg" alt="Fifth slide" />
                                <Mask overlay="black-light" />
                            </View>

                        </CarouselItem>
                    </CarouselInner>
                </Carousel>
            </Container>
        )
    }
}

export default CarouselPage