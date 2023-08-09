const Restaurant = require('../models').Restaurant;
const { Op } = require('sequelize');
const { sanitizeInput } = require('./tools');

exports.listRestaurnats = async (keyword) => {
  try {
    return await Restaurant.findAll({
      raw: true,
      ...(keyword && {
        where: {
          [Op.or]: [
            { name: { [Op.like]: `%${keyword}%` } },
            { category: { [Op.like]: `%${keyword}%` } },
          ]
        }
      })
    });
  } catch (e) {
    throw e;
  }
}

exports.getRestaurant = async (id) => {
  try {
    return await Restaurant.findByPk(id, { raw: true });
  } catch (e) {
    throw e;
  }
}

exports.insertRestaurant = async (info) => {
  try {
    sanitizeInput(info);
    return (await Restaurant.create(info)).id;
  } catch (e) {
    throw e;
  }
}

exports.updateRestaurant = async (id, info) => {
  try {
    sanitizeInput(info);
    await Restaurant.update(info, { where: { id } });
  } catch (e) {
    throw e;
  }
}

exports.deleteRestaurant = async (id) => {
  try {
    await Restaurant.destroy({ where: { id } });
  } catch (e) {
    throw e;
  }
}