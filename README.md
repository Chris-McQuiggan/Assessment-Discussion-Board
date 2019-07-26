# Assessment-Discussion-Board

This project is designed around a basic discussion board.
Users can be created, deleted and logged in as well as post on the board and update what they post.
It comunicates to a mongo database on a local host to persist the data.

Passwords are only stored in a hashed state and never pushed to the front end and users must be logged in to manipulate their data.

This has been built for use with node 8.

# Endpoints

```
get    /account/test
get    /account/login
post   /account/createAccount
```
```
get    /item/test
get    /item/all
post   /item/createItem
put    /item/updateItem
delete /item/deleteItem
```

# How to run

node and npm must bost be installed

to install node
```
sudo apt update
sudo apt install node
```
to install npm
```
sudo apt update
sudo apt install npm
```

open a terminal in the same folder as the ```server.js``` and run
```
node server.js
```

this will then run on port 5000
to access this localy use something like postman and enter the url ```localhost:5000``` then your desiered endpoint to interact with the app.
