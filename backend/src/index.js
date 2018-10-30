require('dotenv').config( { path: 'variables.env' } );
const createServer = require('./createServer');
const db = require('./db');

const server = createServer();

server.start(
    {
        cors: {
            credentials: true,
            progin: process.env.FRONTEND_URL,
        }
    }, 
    function onStart(deets) {
        console.log(`Server is now running on port http://localhost:${deets.port}`);
    }
);
