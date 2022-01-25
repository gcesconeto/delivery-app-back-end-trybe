module.exports = (sequelize, DataTypes) => {
    const sale = sequelize.define('sale',
    {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        foreignKey: true
      },
      seller_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        foreignKey: true
      },
      totalPrice: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      deliveryAddress: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      deliveryNumber: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: 'sales',
      timestamps: true,
      createdAt: 'sale_date',
      updatedAt: false,
      underscore: true,
    });
  
    sale.associate = (models) => {
      sale.belongsToMany(models.user,
        { foreignKey: 'user_id', as: 'sales' })
      sale.belongsToMany(models.user,
        { foreignKey: 'seller_id', as: 'sales' });
    };
  
    return user;
  };
  