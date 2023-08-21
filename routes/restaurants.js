const router = require('express').Router();
const Restaurant = require('../models').Restaurant;
const { Op } = require('sequelize');
const verifyRestaurantForm = require('../middlewares/restaurant-form-handler');
const { sanitizeInput } = require('../utils/tools')

router.get('/', async (req, res, next) => {
  try {
    // const keyword = req.query.keyword?.trim()?.toLowerCase();
    const restaurants = await Restaurant.findAll({
      raw: true,
      where: {
        userId: req.user.id,
        /*
        ...(keyword && {
          [Op.or]: [
            { name: { [Op.like]: `%${keyword}%` } },
            { category: { [Op.like]: `%${keyword}%` } },
          ]
        }),
        */
      },
    });

    res.render('index', { restaurants }); //, keyword: req.query.keyword
  } catch (e) {
    e.alertMsg = '餐廳清單獲取失敗';
    next(e);
  }
});

router.get('/new', (_req, res) => {
  res.render('form');
});

router.get('/:id', async (req, res, next) => {
  try {
    const restaurant = await Restaurant.findByPk(req.params.id, { raw: true });

    if (!restaurant) {
      req.flash('fail', '需求餐廳不存在');
      res.redirect('/restaurants');
    } else if (restaurant.userId !== req.user.id) {
      req.flash('fail', '未授權的請求');
      res.redirect('/restaurants');
    } else res.render('detail', { restaurant });
  } catch (e) {
    e.alertMsg = '瀏覽指定餐廳請求失敗';
    next(e);
  }
});

router.get('/:id/edit', async (req, res, next) => {
  try {
    const restaurant = await Restaurant.findByPk(req.params.id, { raw: true });

    if (!restaurant) {
      req.flash('fail', '需求餐廳不存在');
      res.redirect('/restaurants');
    } else if (restaurant.userId !== req.user.id) {
      req.flash('fail', '未授權的請求');
      res.redirect('/restaurants');
    } else res.render('form', { restaurant });
  } catch (e) {
    e.alertMsg = '編輯指定餐廳請求失敗';
    next(e);
  }
});

router.post('/', verifyRestaurantForm, async (req, res, next) => {
  try {
    const userId = req.user.id;
    const restaurantId = (await Restaurant.create({
      ...sanitizeInput(req.body),
      userId
    })).id;
    
    req.flash('success', '成功新增餐廳');
    res.redirect(`/restaurants/${restaurantId}`);
  } catch (e) {
    e.alertMsg = e.name === 'SequelizeUniqueConstraintError'
      ? '該餐廳地址已重複' : '新增餐廳失敗';
    next(e);
  }
});

router.put('/:id', verifyRestaurantForm, async (req, res, next) => {
  try {
    const id = req.params.id;
    const restaurant = await Restaurant.findByPk(id);

    if (!restaurant) {
      req.flash('fail', '需求餐廳不存在');
      res.redirect('/restaurants');
    } else if (restaurant.userId !== req.user.id) {
      req.flash('fail', '未授權的請求');
      res.redirect('/restaurants');
    } else {
      await restaurant.update(sanitizeInput(req.body));
      req.flash('success', '成功編輯餐廳');
      res.redirect(`/restaurants/${id}`);
    }
  } catch (e) {
    e.alertMsg = '編輯餐廳失敗';
    next(e);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const restaurant = await Restaurant.findByPk(req.params.id);

    if (!restaurant) {
      req.flash('fail', '需求餐廳不存在');
      res.redirect('/restaurants');
    } else if (restaurant.userId !== req.user.id) {
      req.flash('fail', '未授權的請求');
      res.redirect('/restaurants');
    } else {
      await restaurant.destroy();
      req.flash('success', '成功刪除餐廳');
      res.redirect(`/restaurants`);
    }
  } catch (e) {
    e.alertMsg = '刪除餐廳失敗';
    next(e);
  }
});

module.exports = router;