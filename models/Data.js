module.exports = (sequelize, DataTypes) => {
  const Data = sequelize.define("Data", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    parentId: {
      type: DataTypes.INTEGER,
      default: null,
      allowNull: true,
    },
  });

  return Data;
};
