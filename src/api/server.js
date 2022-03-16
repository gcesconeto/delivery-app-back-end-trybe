const socketIo = require('socket.io');

const socketIoServer = require('./socket');

const port = process.env.API_PORT || 3001;

const io = socketIo(socketIoServer, {
    cors: {
        origins: [`http://localhost:${port}`, 'http://localhost:3000'],
        methods: ['GET', 'POST', 'PUT'],
    },
});

require('../sockets/updateStatus')(io);

socketIoServer.listen(
    port, console.log(`Api & Socket.io Server listening on port ${port}!`),
);