to create this from scratch
- create client and server folders
- cd client
- npm create vite@latest
- npm install

- cd to server
- npm init
- heres a list of the script and dependencies
"scripts": {
    "dev": "nodemon --watch \"server/**\" --ext \"ts,json,js\" --exec \"ts-node server.ts\"",
  },
  "dependencies": {
    "cors": "^2.8.5",
    "dotenv": "^16.0.3",
    "express": "^4.18.2",
    "mongoose": "^6.9.1",
    "save": "^2.9.0"
  },
  "devDependencies": {
    "@types/express": "^4.17.17",
    "@types/mongoose": "^5.11.97",
    "nodemon": "^2.0.20",
    "ts-node": "^10.9.1"
  }



  # use Redux for useDecks function
  In the case of your useDecks function, you would likely use a *Redux store to manage the state* of your deck data once it has been fetched from the backend. You could use a *Redux action to trigger the data fetch*, and a *Redux reducer to handle the state changes* resulting from the fetch. Once the deck data is stored in the Redux store, *Redux selectors are what compnonents use* to access the data.