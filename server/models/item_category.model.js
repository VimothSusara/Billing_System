const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Category extends Model {}

  Category.init(
    {
      category_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      category_name: {
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
      modelName: "Category",
      tableName: "Categories",
      timestamps: true,
      // underscored: true,
      freezeTableName: true,
    },
    {
      indexes: [
        {
          fields: ["category_name"],
        },
      ],
    }
  );

  return Category;
};
