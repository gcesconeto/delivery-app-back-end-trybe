# Delivery App Backend - Trybe

## Context
---
This API was developed as part of a project during the back-end module of my course at Trybe.

This is an API for a simple delivery type app with the following features:
* User creation
* User login
* User listing
* User deletion
* Product listing
* Sale creation between specific seller and user
* Sale listing
* Sale status update

These are the main technologies used:
* Node + express for the API;
* JWT for authentication and user identification;
* MySQL + sequelize ORM as the database;
* Socket.IO to provide real-time updates of DB changes.
* Jest + supertest for integration tests.


## Installation
---
### Pre-requisites:
* MySQL
* npm
### Setup:
* Clone the repository https://github.com/gcesconeto/delivery-app-back-end-trybe;
* Open a terminal window inside the project folder and
  * run `npm install`
  * run `npm run db:reset`
  
* Create a .env file on the root directory following this layout

    `NODE_ENV=development`        <- environment\
    `API_PORT=3001`                   <- the PORT for the API to run\
    `MYSQL_HOST=`                 <- the host for the MySQL connection\
    `MYSQL_PORT=`                 <- the PORT for MySQL connection\
    `MYSQL_USER=`                 <- your MySQL username\
    `MYSQL_PASSWORD=`             <- your MySQL password\
    `MYSQL_DB_NAME=delivery-app`  <- the database name\

## Using the API
---
Run `npm start` in the root directory, these endpoints will be available at http://localhost:3001/sale/create (default)
### Endpoints:
  * POST `/user/register`:
    * Receives the name, email and password of the new consumer user.
    * Registering a new seller or admin user requires an admin token. An extra field role must be provided.
    * Responds with a token encoding the new user's name, email and role.
  * POST `/user/login`:
    * Receives the email and password of the user.
    * Responds with a token encoding the new user's name, email and role.
  * GET `/user/list`:
    * Requires admin token.
    * Responds with a list of all registered users.
  * GET `/user/seller/list`:
    * Requires any token.
    * Responds with a list of all registered seller users.
  * DELETE `/user/delete`:
    * Requires admin or own user token.
    * Receives the email of the user to be deleted.
    * Responds with deletion of user and OK status.
  * GET `/product/list`:
    * Requires any token.
    * Responds with a list of all products in DB.
  * POST `/sale/create`:
    * Requires consumer token.
    * Receives the email of the user, email of the seller, price, delivery information and a list of products and quantities.\
    * Returns the id for the new sale.
  * GET `/sale/list`:
    * Requires consumer or seller token.
    * Responds with a list of all sales pertaining to the user making the request.
  * GET `/sale/:id`:
    * Requires consumer or seller token.
    * Receives the id of the sale in the URL.
    * Responds with specific sale details.
  * PUT `/sale/update/:id`:
    * Requires consumer or seller token.
    * Receives the id of the sale in the URL.
    * Responds with update of sale status to next state and OK status.
### Socket.IO integration
This API emits an `statusUpdate` event for every successfull request to "PUT `/sale/update/:id`" with the sale id and it's new status. 

## Tests
---
Integration tests were created for every endpoint covering the happy & unhappy paths.\
To run them use `npm run test` 

## Next steps

* Implement further features such as creation of new products and stock-keeping for individual sellers;
* Refactor for better separation of authentication layers;
* Dockerization;


## Contact

* Guilherme Cesconeto
* [`Github`](https://github.com/gcesconeto)