const Restaurant = require('../models').Restaurant;
const { Op } = require('sequelize');

exports.listRestaurnats = async (keyword) => {
  try {
    return await Restaurant.findAll({
      attributes: ['id', 'image', 'name', 'category', 'rating'],
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

function examInput(info) {
  if (!info.name) throw new Error('Restaurant name is necessary');
  if (!info.location) throw new Error('Restaurant location is necessary');
}

exports.insertRestaurant = async (info) => {
  try {
    examInput(info);
    return (await Restaurant.create(info)).id;
  } catch (e) {
    throw e;
  }
}

exports.updateRestaurant = async (id, info) => {
  try {
    examInput(info);
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