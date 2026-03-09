const db = require('../models');
const { Op } = require('sequelize');

/* ------------------- Booking Number Generator ------------------- */
const generateBookingNumber = () => {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `BK-${timestamp}-${random}`;
};

/* ------------------- CREATE BOOKING ------------------- */
exports.createBooking = async (req, res) => {
  const t = await db.sequelize.transaction();

  try {
    const {
      customerName,
      customerEmail,
      customerPhone,
      bookingDate,
      notes,
      professionalId,
      timeSlot,
      fieldValues
    } = req.body;

    /* -------- Basic Validation -------- */
    if (!customerName || !customerEmail || !customerPhone || !bookingDate) {
      await t.rollback();
      return res.status(400).json({
        error: "Missing required customer information"
      });
    }

    if (!professionalId || !timeSlot) {
      await t.rollback();
      return res.status(400).json({
        error: "professionalId and timeSlot are required"
      });
    }

    if (!fieldValues || !Array.isArray(fieldValues)) {
      await t.rollback();
      return res.status(400).json({
        error: "Field values are required for price calculation"
      });
    }

    /* -------- Normalize Date (Prevent Timezone Bugs) -------- */
    const startOfDay = new Date(bookingDate + "T00:00:00");
    const endOfDay = new Date(bookingDate + "T23:59:59");

    /* -------- Prevent Double Booking -------- */
    const existingBooking = await db.Booking.findOne({
      where: {
        professionalId,
        timeSlot,
        bookingDate: {
          [Op.between]: [startOfDay, endOfDay]
        },
        status: {
          [Op.in]: ['pending', 'confirmed']
        }
      },
      transaction: t
    });

    if (existingBooking) {
      await t.rollback();
      return res.status(409).json({
        message: "This slot is already booked. Please choose another time."
      });
    }

    /* -------- Calculate Total From DB -------- */
    let calculatedTotal = 0;

    for (const field of fieldValues) {
      const dbField = await db.Field.findByPk(field.fieldId, { transaction: t });
      if (!dbField) continue;

      const value = field.value;

      switch (dbField.priceType) {

        case 'flat':
          calculatedTotal += Number(dbField.price);
          break;

        case 'per_unit':
        case 'per_hour':
          calculatedTotal += Number(dbField.price) * Number(value || 0);
          break;

        case 'option':
          let options = [];

          if (dbField.options) {
            options = typeof dbField.options === 'string'
              ? JSON.parse(dbField.options)
              : dbField.options;
          }

          const selectedOption = options.find(o => o.label == value);
          if (selectedOption) {
            calculatedTotal += Number(selectedOption.price || 0);
          }
          break;
      }
    }

    const bookingNumber = generateBookingNumber();

    /* -------- Create Booking -------- */
    const booking = await db.Booking.create({
      bookingNumber,
      professionalId,
      timeSlot,
      customerName,
      customerEmail,
      customerPhone,
      bookingDate,
      totalAmount: calculatedTotal,
      notes,
      status: 'pending'
    }, { transaction: t });

    /* -------- Save Selected Fields -------- */
    const bookingFields = fieldValues.map(fv => ({
      bookingId: booking.id,
      fieldId: fv.fieldId,
      value: typeof fv.value === 'object'
        ? JSON.stringify(fv.value)
        : fv.value
    }));

    await db.BookingField.bulkCreate(bookingFields, { transaction: t });

    await t.commit();

    /* -------- Fetch Complete Booking -------- */
    const createdBooking = await db.Booking.findByPk(booking.id, {
      include: [{
        model: db.BookingField,
        as: 'fieldValues',
        include: [{ model: db.Field, as: 'field' }]
      }]
    });

    return res.status(201).json({
      success: true,
      data: createdBooking
    });

  } catch (error) {
    await t.rollback();

    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({
        error: "This slot was just booked by someone else."
      });
    }

    return res.status(500).json({
      error: error.message
    });
  }
};


/* ------------------- GET ALL BOOKINGS ------------------- */
exports.getAllBookings = async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;
    const where = {};

    if (status) where.status = status;

    const offset = (page - 1) * limit;

    const { count, rows } = await db.Booking.findAndCountAll({
      where,
      include: [{
        model: db.BookingField,
        as: 'fieldValues',
        include: [{ model: db.Field, as: 'field' }]
      }],
      order: [['createdAt', 'DESC']],
      limit: parseInt(limit),
      offset: parseInt(offset)
    });

    return res.json({
      success: true,
      data: rows,
      pagination: {
        total: count,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(count / limit)
      }
    });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};


/* ------------------- GET BOOKING BY ID ------------------- */
exports.getBookingById = async (req, res) => {
  try {
    const booking = await db.Booking.findByPk(req.params.id, {
      include: [{
        model: db.BookingField,
        as: 'fieldValues',
        include: [{ model: db.Field, as: 'field' }]
      }]
    });

    if (!booking) {
      return res.status(404).json({
        error: "Booking not found"
      });
    }

    return res.json({
      success: true,
      data: booking
    });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};


/* ------------------- UPDATE BOOKING STATUS ------------------- */
exports.updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const allowedStatus = ['pending', 'confirmed', 'cancelled', 'completed'];

    if (!allowedStatus.includes(status)) {
      return res.status(400).json({
        error: "Invalid status value"
      });
    }

    const booking = await db.Booking.findByPk(req.params.id);

    if (!booking) {
      return res.status(404).json({
        error: "Booking not found"
      });
    }

    await booking.update({ status });

    return res.json({
      success: true,
      data: booking
    });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};