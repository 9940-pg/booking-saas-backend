const db = require('../models');

// Get all occasions
exports.getOccasions = async (req, res) => {
  try {
    const occasions = await db.Occasion.findAll({
      order: [['id', 'ASC']]
    });

    res.json(occasions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get fields for selected occasion
exports.getOccasionFields = async (req, res) => {
  try {
    const { occasionId } = req.params;

    const fields = await db.OccasionField.findAll({
      where: { occasionId },
      order: [['id', 'ASC']]
    });

    res.json(fields);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};