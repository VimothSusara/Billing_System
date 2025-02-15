const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Warranty extends Model {}

  Warranty.init(
    {
      warranty_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      warranty_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Warranty",
      tableName: "Warranties",
      timestamps: true,
      // underscored: true,
      freezeTableName: true,
    },
    {
      indexes: [
        {
          fields: ["warranty_name"],
        },
      ],
    }
  );

  return Warranty;
};
