module.exports = (sequelize, DataTypes) => {
  const OccasionField = sequelize.define("OccasionField", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    occasionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    label: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    maxLength: {
      type: DataTypes.INTEGER,
    },
  });

  return OccasionField;
};