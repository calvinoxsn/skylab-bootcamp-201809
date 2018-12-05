# Vinyls

## Introduction

The application allows its use by registering users. The user can upload their vinyls, follow other users, likes vinyls, add comment to vinyls.

You can also searches for users and serach for vinyls

Each user has a profile page where they can see their data as related vinyls.

The user can have a section where they can edit their personal data, profile photo, edit or delete his vinyls.

### Use cases diagram

![Use cases](images/use-cases.png)

## Activity Diagram

The application has one main activity: publish your vinyls, and other cativities like a search users, search vinyls, follow users, likes vinyls, comment vinyls.

![Use cases](images/activity-diagram.png)

## Block diagram
The front end of the application was built using React. The back end is connected to an API that is connected to data module DATA for make change on the Database(CRUD)

![Block Diagram](images/block-diagram.png)

## Components Diagram
The application has some react components, the business logic and the two APIs used: Ticketmaster and Skylabcoders.

![Components Diagram](images/components-diagram.png)

## Sequence Diagram
The most significant tasks of the application are those that use the APIs. Skylab Coders API is used to save the user data (for register and login purposes) and the user’s favourites list. Ticketmaster API is used to search for events and display its details when an event is clicked.

![Components Diagram](images/sequence-diagram-1.png)

![Components Diagram](images/sequence-diagram-2.png)




## Entity Relation Diagram
![Data diagram](images/data-diagram.png)

## Technology Stack

* HTML
* CSS
* Javascript (ES6)
* React
* React Router
* MD Bootstrap React
* Node js
* Express
* Mongoose
* MongoDB
* TDD Mocha - Chai



