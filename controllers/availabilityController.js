const db = require('../models');
const { Op } = require('sequelize');

exports.getAvailableSlots = async (req, res) => {
  try {
    const { professionalId, date } = req.query;

    if (!professionalId || !date) {
      return res.status(400).json({ error: "professionalId and date required" });
    }

    const bookingDate = new Date(date);
    const dayOfWeek = bookingDate.getDay();

    // 1️⃣ Get working hours
    const availability = await db.ProfessionalAvailability.findOne({
      where: { professionalId, dayOfWeek }
    });

    if (!availability) {
      return res.json({ slots: [] });
    }

    const {
      startTime,
      endTime,
      slotDuration,
      breakStart,
      breakEnd
    } = availability;

    // 2️⃣ Get already booked slots
   const startOfDay = new Date(date + "T00:00:00");
const endOfDay = new Date(date + "T23:59:59");

const existingBookings = await db.Booking.findAll({
  where: {
    professionalId,
    bookingDate: {
      [Op.between]: [startOfDay, endOfDay]
    },
    status: {
      [Op.in]: ['pending', 'confirmed']
    }
  }
});

    const bookedSlots = existingBookings.map(b => b.timeSlot);

    // 3️⃣ Generate slots
    const slots = [];
    let current = timeToMinutes(startTime);
    const end = timeToMinutes(endTime);

    while (current + slotDuration <= end) {

      const slotStart = minutesToTime(current);
      const slotEnd = minutesToTime(current + slotDuration);

      // Skip break time
      if (breakStart && breakEnd) {
        const breakStartMin = timeToMinutes(breakStart);
        const breakEndMin = timeToMinutes(breakEnd);

        if (current >= breakStartMin && current < breakEndMin) {
          current += slotDuration;
          continue;
        }
      }

      const slotLabel = `${slotStart} - ${slotEnd}`;

      if (!bookedSlots.includes(slotLabel)) {
        slots.push(slotLabel);
      }

      current += slotDuration;
    }

    res.json({ slots });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/* Helper functions */
function timeToMinutes(time) {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
}

function minutesToTime(minutes) {
  const h = Math.floor(minutes / 60).toString().padStart(2, '0');
  const m = (minutes % 60).toString().padStart(2, '0');
  return `${h}:${m}`;
}