const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class ItemType extends Model {}

  ItemType.init(
    {
      type_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      type_name: {
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
      modelName: "ItemType",
      tableName: "ItemTypes",
      timestamps: true,
      // underscored: true,
      freezeTableName: true,
    },
    {
      indexes: [
        {
          fields: ["type_name"],
        },
      ],
    }
  );

  return ItemType;
};
