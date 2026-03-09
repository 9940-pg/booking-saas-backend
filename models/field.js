module.exports = (sequelize, DataTypes) => {
  const Field = sequelize.define('Field', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    groupId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'field_groups',
        key: 'id'
      }
    },
    label: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    fieldName: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    fieldType: {
      type: DataTypes.ENUM(
        'text',
        'textarea',
        'number',
        'select',
        'radio',
        'checkbox',
        'date',
        'email',
        'tel'
      ),
      allowNull: false,
      defaultValue: 'text'
    },
    options: {
      type: DataTypes.JSON,
      allowNull: true
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0
    },
    priceType: {
      type: DataTypes.ENUM('flat', 'per_unit', 'per_hour', 'option'),
      defaultValue: 'flat'
    },
    placeholder: DataTypes.STRING(255),
    defaultValue: DataTypes.STRING(255),
    isRequired: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    displayOrder: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    validationRules: {
      type: DataTypes.JSON,
      allowNull: true
    }
  }, {
    tableName: 'fields',
    timestamps: true
  });

  return Field;
};