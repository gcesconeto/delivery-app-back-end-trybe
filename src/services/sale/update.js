// Client Socket.io running on server to send status updates in real-time:
const ioClient = require('socket.io-client');

const port = process.env.PORT || 3001;

const socket = ioClient.connect(`http://localhost:${port}`, {
    reconnect: true,
});

socket.on('connect', () => console.log('Sale update emitter client connected'));

// Service:
const { sale, user } = require('../../database/models');

const err = require('../../errors/errors');

const nextSellerStatus = (status) => {
    if (status === 'Pendente') return 'Preparando';
    if (status === 'Preparando') return 'Em Trânsito';
    throw err.UNAUTHORIZED;
};

const nextConsumerStatus = (status) => {
    if (status === 'Em Trânsito') return 'Entregue';
    throw err.UNAUTHORIZED;
};

const nextStatus = (status, role) => {
    if (role === 'seller') return nextSellerStatus(status);
    if (role === 'customer') return nextConsumerStatus(status);
    throw err.UNAUTHORIZED;
};

module.exports = async ({ saleId, role, email }) => {
    const found = await sale.findByPk(saleId);
    if (!found) throw err.NOT_FOUND;
    const saleUser = await user.findOne({ where: { email } });
    if (!saleUser) throw err.UNAUTHORIZED;
    const newStatus = nextStatus(found.status, role);
    await sale.update({ status: newStatus }, { where: { id: saleId } });
    // Emit status update to socket:
    socket.emit('updateStatus', { saleId });
};