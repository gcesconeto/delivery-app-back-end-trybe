/* eslint-disable sonarjs/no-duplicate-string */
module.exports = {
    admLogin: { email: 'adm@deliveryapp.com', password: '--adm2@21!!--' },
    usrLogin: { email: 'zebirita@email.com', password: '$#zebirita#$' },
    admEmail: { email: 'adm@deliveryapp.com' },
    usrEmail: { email: 'zebirita@email.com' },
    wrongEmail: { email: 'idontexist@email.com' },
    newUser: {
        name: 'Test Consumer Name',
        email: 'consumer@email.com',
        password: 'imAPassword',
    },
    newAdm: {
        name: 'Test Admin Name',
        email: 'admin@email.com',
        password: 'imAPassword',
        role: 'administrator',
    },
    newSeller: {
        name: 'Test Seller Name',
        email: 'seller@email.com',
        password: 'imAPassword',
        role: 'seller',
    },
    newSale: {
        userEmail: 'zebirita@email.com',
        sellerEmail: 'fulana@deliveryapp.com',
        totalPrice: 651,
        deliveryAddress: 'address',
        deliveryNumber: 651981,
        products: [
            { productId: 1, quantity: 2 },
            { productId: 2, quantity: 4 },
        ],
    },
};