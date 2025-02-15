const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Supplier extends Model {}

  Supplier.init(
    {
      supplier_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      supplier_code: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      supplier_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      supplier_address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      tel_no: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
      contact_person: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email_address: {
        type: DataTypes.STRING,
      },
      status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Supplier",
      tableName: "Suppliers",
      timestamps: true,
      // underscored: true,
      freezeTableName: true,
    },
    {
      indexes: [
        {
          fields: ["supplier_code"],
        },
        {
          fields: ["supplier_name"],
        },
        {
          fields: ["tel_no"],
        },
      ],
    }
  );

  return Supplier;
};
