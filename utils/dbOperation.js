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
    return await Restaurant.findByPk(id, {
      attributes: ['name', 'category', 'location', 'google_map', 'phone', 'description' ,'image'],
      raw: true,
    });
  } catch (e) {
    throw e;
  }
}