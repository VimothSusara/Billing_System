const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class User extends Model {}

  User.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      active:{
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false,
      },
      role_id: {
        type: DataTypes.INTEGER,
        // references: {
        //     model: "roles",
        //     key: "role_id"
        // },
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "Users",
      timestamps: true,
      // underscored: true,
      freezeTableName: true,
    }
  );

  return User;
};
