const { sale, product } = require('../../database/models');
const errors = require('../../errors/errors');

module.exports = async (id) => {
    const found = await sale.findByPk(id,
        { 
            include: [{ model: product, as: 'products' }],
            attributes: { exclude: ['user_id', 'seller_id'] },
        });

    if (!found) throw errors.NOT_FOUND;
    
    return found;
};