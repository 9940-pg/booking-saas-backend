module.exports = (sequelize, DataTypes) => {
  const FieldGroup = sequelize.define(
    "FieldGroup",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
      },
      slug: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
      },

      // ✅ NEW COLUMN
      occasionSlug: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },

      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      displayOrder: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
    },
    {
      tableName: "field_groups",
      timestamps: true,
    }
  );

  return FieldGroup;
};