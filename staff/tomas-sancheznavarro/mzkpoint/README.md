# MzkPoint (Music Point)

## Introduction

This is a simple SPA (Simple Page Application) that acts as a website for an online music store and emulates an e-Commerce. 
This application allows the user, registered or otherwise, to browse through a database of products through the use of a search bar or by clicking on different categories.

A registered user can add items to a personalized wishilst and can later choose to move said items to a shopping cart. If the user so desires, he/she can add the products to a checkout area that displays which items have been purchased.
Finally, when the user clicks on the "Make Purchase" button, their purchase history is displayed in the "My Orders" section.

In a future release, registered users will be able to update their profiles by modifying their personal information (username, password, email, et cetera).

You can try a live demo ![here](https://mzkpoint.surge.sh)!

## FUNCTIONAL DESCRIPTION

## Use cases diagram

![Use cases](images/use-cases.png)

## Activity Diagram

At the moment, the application offers two main features: browse through a product catalogue that displays detailed information about any given item, and then make purchases.
In a future release, the application will offer an administration mode, which will allow the user to upload products

## TECHNICAL DESCRIPTION

## Block diagram
The front-end of the application was built using React. The back-end is connected to a custom API that feeds product information to the website.

![Block Diagram](images/block-diagram.png)

## Components Diagram
The application has some react components, a front-end logic, and an API back-end connected to the data served by a MongoDB Database.


## Data model

The application offers three data models: User, Product, and Order, which is embedded in the User schema.

## Technology Stack

* HTML
* CSS / SASS
* Javascript (ES6)
* React
* React Router
* MD Bootstrap React
* Sweet Alert 2
* Moment
* APIs
* Node js
* Express
* Mongoose
* MongoDB
* TDD Mocha - Chai - NYC Coverage Report

