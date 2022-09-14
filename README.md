# Book 📖 Coffee ☕ Wine 🍷
____

## Install dependencies
```terminal
npm install
```

## Run
```terminal
# Run all
npm run dev

# Run server
npm run server

# Run client
npm run client
```

### Frontend
The backend uses [React](https://reactjs.org/) and [Redux](https://redux.js.org/).  
Also [Tailwind CSS](https://tailwindcss.com/) for styles.

### Backend
The backend uses [Node](https://nodejs.org/) and [Express](https://expressjs.com/).

## Database
The project uses the [MongoDB](https://www.mongodb.com/) database. You can read about installation and use [here](https://metanit.com/nosql/mongodb/).
[Mongoose](https://mongoosejs.com/) is used to manage the database.
You can also use the official [MongoDB Compass](https://www.mongodb.com/try/download/compass) graphical client to work with MongoDB.  

Connection to the DB:
```text
MONGO_URI = mongodb://localhost:27017/book-coffee-wine

# "mongodb://localhost:27017/" - standard path.
# "/book-coffee-wine" - the name of the database.
```

The database and collections are created automatically when the project is launched, if they are specified in the models and do not already exist.
