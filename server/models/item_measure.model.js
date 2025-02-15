const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class ItemMeasure extends Model {}

  ItemMeasure.init(
    {
      measure_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      measure_name: {
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
      modelName: "ItemMeasure",
      tableName: "ItemMeasures",
      timestamps: true,
      // underscored: true,
      freezeTableName: true,
    },
    {
      indexes: [
        {
          fields: ["measure_name"],
        },
      ],
    }
  );

  return ItemMeasure;
};
