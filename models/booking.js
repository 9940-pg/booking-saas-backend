module.exports = (sequelize, DataTypes) => {
    const Booking = sequelize.define('Booking', {

        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        bookingNumber: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true
        },

        professionalId: {   // ✅ ADDED
            type: DataTypes.INTEGER,
            allowNull: false
        },

        timeSlot: {         // ✅ ADDED
            type: DataTypes.STRING(50),
            allowNull: false
        },

        customerName: {
            type: DataTypes.STRING(100),
            allowNull: false
        },

        customerEmail: {
            type: DataTypes.STRING(100),
            allowNull: false
        },

        customerPhone: {
            type: DataTypes.STRING(20),
            allowNull: false
        },

        bookingDate: {
            type: DataTypes.DATE,
            allowNull: false
        },

        status: {
            type: DataTypes.ENUM('pending', 'confirmed', 'cancelled', 'completed'),
            defaultValue: 'pending'
        },

        totalAmount: {
            type: DataTypes.DECIMAL(10, 2),
            defaultValue: 0.00
        },

        notes: {
            type: DataTypes.TEXT,
            allowNull: true
        }

    }, {
        tableName: 'bookings',
        timestamps: true
    });

    return Booking;
};
