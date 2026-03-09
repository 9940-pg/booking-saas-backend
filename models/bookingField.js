module.exports = (sequelize, DataTypes) => {
    const BookingField = sequelize.define('BookingField', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        bookingId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: 'bookings', key: 'id' }
        },
        fieldId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: 'fields', key: 'id' }
        },
        value: {
            type: DataTypes.TEXT,
            allowNull: true
        }
    }, {
        tableName: 'booking_fields',
        timestamps: true
    });

    return BookingField;
};