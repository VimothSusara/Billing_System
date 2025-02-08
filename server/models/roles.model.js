const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Role extends Model {}

  Role.init(
    {
      role_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      role_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      sequelize,
      modelName: "Role",
      tableName: "Roles",
      timestamps: true,
      // underscored: true,
      freezeTableName: true,
    }
  );

  return Role;
};
