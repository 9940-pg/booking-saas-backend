require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false,
    pool: { max: 5, min: 0, acquire: 30000, idle: 10000 }
  }
);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// =============================
// IMPORT MODELS
// =============================

db.FieldGroup = require('./fieldGroup')(sequelize, DataTypes);
db.Field = require('./field')(sequelize, DataTypes);
db.Booking = require('./booking')(sequelize, DataTypes);
db.BookingField = require('./bookingField')(sequelize, DataTypes);
db.ProfessionalAvailability = require('./ProfessionalAvailability')(sequelize, DataTypes);

// 🔥 NEW MODELS
db.Occasion = require('./occasion')(sequelize, DataTypes);
db.OccasionField = require('./occasionField')(sequelize, DataTypes);

// =============================
// ASSOCIATIONS
// =============================

// Field Groups → Fields
db.FieldGroup.hasMany(db.Field, {
  foreignKey: 'groupId',
  as: 'fields',
  onDelete: 'CASCADE'
});

db.Field.belongsTo(db.FieldGroup, {
  foreignKey: 'groupId',
  as: 'group'
});

// Booking → BookingField
db.Booking.hasMany(db.BookingField, {
  foreignKey: 'bookingId',
  as: 'fieldValues',
  onDelete: 'CASCADE'
});

db.BookingField.belongsTo(db.Booking, {
  foreignKey: 'bookingId',
  as: 'booking'
});

// BookingField → Field
db.BookingField.belongsTo(db.Field, {
  foreignKey: 'fieldId',
  as: 'field'
});

// =============================
// NEW OCCASION ASSOCIATIONS
// =============================

db.Occasion.hasMany(db.OccasionField, {
  foreignKey: 'occasionId',
  as: 'fields',
  onDelete: 'CASCADE'
});

db.OccasionField.belongsTo(db.Occasion, {
  foreignKey: 'occasionId',
  as: 'occasion'
});

module.exports = db;