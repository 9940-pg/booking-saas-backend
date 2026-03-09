const express = require('express');
const router = express.Router();

const availabilityController = require('../controllers/availabilityController');
const fieldGroupController = require('../controllers/fieldGroupController');
const fieldController = require('../controllers/fieldController');
const bookingController = require('../controllers/bookingController');
const occasionController = require('../controllers/occasionController');

// =========================
// Occasion Routes
// =========================
router.get('/occasions', occasionController.getOccasions);
router.get('/occasions/:occasionId/fields', occasionController.getOccasionFields);

// =========================
// Field Group Routes
// =========================
router.post('/field-groups', fieldGroupController.createFieldGroup);
router.get('/field-groups', fieldGroupController.getAllFieldGroups);
router.get('/field-groups/:id', fieldGroupController.getFieldGroupById);
router.put('/field-groups/:id', fieldGroupController.updateFieldGroup);
router.delete('/field-groups/:id', fieldGroupController.deleteFieldGroup);

// =========================
// Field Routes
// =========================
router.post('/fields', fieldController.createField);
router.get('/fields/group/:groupId', fieldController.getFieldsByGroup);
router.put('/fields/:id', fieldController.updateField);
router.delete('/fields/:id', fieldController.deleteField);

// =========================
// Booking Routes
// =========================
router.post('/bookings', bookingController.createBooking);
router.get('/bookings', bookingController.getAllBookings);
router.get('/bookings/:id', bookingController.getBookingById);
router.patch('/bookings/:id/status', bookingController.updateBookingStatus);

// =========================
// Availability Routes
// =========================
router.get('/availability', availabilityController.getAvailableSlots);

module.exports = router;