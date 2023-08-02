# Imagery 📖

![version](https://img.shields.io/badge/version-1.0.0-yellowgreen)
![licence](https://img.shields.io/badge/license-Closed%20Source-darkred)
![repo size](https://img.shields.io/github/repo-size/betelgeuseAS/imagery.svg)
![open pr](https://img.shields.io/github/issues-pr-raw/betelgeuseAS/imagery.svg)
![open issues](https://img.shields.io/github/issues-raw/betelgeuseAS/imagery.svg)
![author](https://img.shields.io/badge/author-Andrew%20Samchuk-orange)

____

## Install & Run
```terminal
# Install dependencies
npm install

# Run server development
npm run server

# Run client development
npm run client

# Run web development
npm run start:web:dev

# Run electron development
npm run start:web:dev
npm run start:electron:dev
```

## Tech Stack

The project is being developed primarily as a software project and [Electron](https://www.electronjs.org/) is used for this purpose, with a possible transition to [Tauri](https://tauri.app/) in the future.

#### Frontend
The backend uses [React](https://reactjs.org/), [Redux](https://redux.js.org/), [TypeScript](https://www.typescriptlang.org/), [MUI](https://mui.com/) created by [Create React App](https://create-react-app.dev/).

#### Backend
The backend uses [Node](https://nodejs.org/), [Express](https://expressjs.com/), [TypeScript](https://www.typescriptlang.org/).

## Database
The project uses the [MongoDB](https://www.mongodb.com/) database. You can read about installation and use [here](https://metanit.com/nosql/mongodb/).
[Mongoose](https://mongoosejs.com/) is used to manage the database.
You can also use the official [MongoDB Compass](https://www.mongodb.com/try/download/compass) graphical client to work with MongoDB.  

**Connection to the DB:**
```text
MONGO_URI = mongodb://localhost:27017/imagery
# Or
MONGO_URI = mongodb://127.0.0.1:27017/imagery


# "mongodb://localhost:27017/" - standard path.
# "/imagery" - the name of the database.
```

The database and collections are created automatically when the project is launched, if they are specified in the models and do not already exist.
