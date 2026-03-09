module.exports = (sequelize, DataTypes) => {
  const ProfessionalAvailability = sequelize.define('ProfessionalAvailability', {
    professionalId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    dayOfWeek: {
      type: DataTypes.INTEGER, // 0 = Sunday, 6 = Saturday
      allowNull: false
    },

    startTime: {
      type: DataTypes.TIME,
      allowNull: false
    },

    endTime: {
      type: DataTypes.TIME,
      allowNull: false
    },

    slotDuration: {
      type: DataTypes.INTEGER, // in minutes
      defaultValue: 30
    },

    breakStart: {
      type: DataTypes.TIME,
      allowNull: true
    },

    breakEnd: {
      type: DataTypes.TIME,
      allowNull: true
    }

  }, {
    tableName: 'professional_availability',
    timestamps: true
  });

  return ProfessionalAvailability;
};