module.exports = (sequelize, DataTypes) => {
    const product = sequelize.define('product',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        unique: true,
      },
      urlImage: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: 'products',
      timestamps: false,
      underscore: true,
    });
  
    return user;
  };
  