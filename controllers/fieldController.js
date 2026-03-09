const db = require('../models');

exports.createField = async (req, res) => {
  try {

    const {
      groupId,
      label,
      fieldName,
      fieldType,
      options,
      placeholder,
      defaultValue,
      isRequired,
      isActive,
      displayOrder,
      validationRules
    } = req.body;

    if (!groupId || !label || !fieldName || !fieldType) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const group = await db.FieldGroup.findByPk(groupId);

    if (!group) {
      return res.status(404).json({ error: "Field group not found" });
    }

    const field = await db.Field.create({
      groupId,
      label,
      fieldName,
      fieldType,
      options: options ? JSON.stringify(options) : null,
      placeholder,
      defaultValue,
      isRequired,
      isActive,
      displayOrder,
      validationRules
    });

    res.status(201).json({
      success: true,
      data: field
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getFieldsByGroup = async (req, res) => {
  try {

    const fields = await db.Field.findAll({
      where: { groupId: req.params.groupId },
      order: [["displayOrder", "ASC"]]
    });

    res.json({
      success: true,
      data: fields
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateField = async (req, res) => {
  try {

    const field = await db.Field.findByPk(req.params.id);

    if (!field) {
      return res.status(404).json({ error: "Field not found" });
    }

    const updateData = { ...req.body };

    if (updateData.options) {
      updateData.options = JSON.stringify(updateData.options);
    }

    await field.update(updateData);

    res.json({
      success: true,
      data: field
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteField = async (req, res) => {
  try {

    const field = await db.Field.findByPk(req.params.id);

    if (!field) {
      return res.status(404).json({ error: "Field not found" });
    }

    await field.destroy();

    res.json({
      success: true,
      message: "Field deleted successfully"
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};