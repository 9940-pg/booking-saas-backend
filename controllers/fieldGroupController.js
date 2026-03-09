const db = require('../models');
const { Op } = require('sequelize');

const createSlug = (name) => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
};

exports.createFieldGroup = async (req, res) => {
  try {

    const {
      name,
      description,
      occasionSlug,
      isActive,
      displayOrder
    } = req.body;

    if (!name) {
      return res.status(400).json({ error: "Name is required" });
    }

    const slug = createSlug(name);

    const existingGroup = await db.FieldGroup.findOne({
      where: { slug }
    });

    if (existingGroup) {
      return res.status(400).json({
        error: "Field group with this name already exists"
      });
    }

    const fieldGroup = await db.FieldGroup.create({
      name,
      slug,
      description,
      occasionSlug,
      isActive,
      displayOrder
    });

    res.status(201).json({
      success: true,
      data: fieldGroup
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllFieldGroups = async (req, res) => {
  try {

    const { isActive, occasionSlug } = req.query;

    const where = {};

    if (isActive !== undefined) {
      where.isActive = isActive === "true";
    }

    if (occasionSlug) {
      where[Op.or] = [
        { occasionSlug },
        { occasionSlug: null }
      ];
    }

    const fieldGroups = await db.FieldGroup.findAll({
      where,
      include: [
        {
          model: db.Field,
          as: "fields",
          where: { isActive: true },
          required: false
        }
      ],
      order: [["displayOrder", "ASC"]]
    });

    res.json({
      success: true,
      data: fieldGroups
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getFieldGroupById = async (req, res) => {
  try {

    const fieldGroup = await db.FieldGroup.findByPk(req.params.id, {
      include: [
        {
          model: db.Field,
          as: "fields"
        }
      ]
    });

    if (!fieldGroup) {
      return res.status(404).json({
        error: "Field group not found"
      });
    }

    res.json({
      success: true,
      data: fieldGroup
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateFieldGroup = async (req, res) => {
  try {

    const {
      name,
      description,
      occasionSlug,
      isActive,
      displayOrder
    } = req.body;

    const fieldGroup = await db.FieldGroup.findByPk(req.params.id);

    if (!fieldGroup) {
      return res.status(404).json({
        error: "Field group not found"
      });
    }

    const updateData = {
      description,
      occasionSlug,
      isActive,
      displayOrder
    };

    if (name && name !== fieldGroup.name) {

      const slug = createSlug(name);

      const existingGroup = await db.FieldGroup.findOne({
        where: {
          slug,
          id: { [Op.ne]: req.params.id }
        }
      });

      if (existingGroup) {
        return res.status(400).json({
          error: "Field group with this name already exists"
        });
      }

      updateData.name = name;
      updateData.slug = slug;
    }

    await fieldGroup.update(updateData);

    res.json({
      success: true,
      data: fieldGroup
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteFieldGroup = async (req, res) => {
  try {

    const fieldGroup = await db.FieldGroup.findByPk(req.params.id);

    if (!fieldGroup) {
      return res.status(404).json({
        error: "Field group not found"
      });
    }

    await fieldGroup.destroy();

    res.json({
      success: true,
      message: "Field group deleted successfully"
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};