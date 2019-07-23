const { Router } = require('express');
const restaurants = Router();
const { Restaurant } = require('../models');
const { restrict, genToken } = require('../auth')

restaurants.get('/', async (req, res) => {
  const restaurants = await Restaurant.findAll();
  res.json({ restaurants });
});

restaurants.get('/:id', async (req, res) => {
  const restaurant = await Restaurant.findByPk(req.params.id);
  res.json({ restaurant })
});

restaurants.put('/:id', restrict, async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    await Restaurant.update(
      data,
      {
        where: {
          id,
        },
      });
    const restaurant = await Restaurant.findByPk(id);
    res.json(restaurant);
  } catch (e) {
    console.log(e.message);
    res.status(500).send(e.message);
  }
});

restaurants.post('/', restrict, async (req, res) => {
  const { name, address, priceRange, website, category } = req.body;
  const restaurant = await Restaurant.create({
    name: name,
    address: address,
    price_range: priceRange,
    website: website,
    category: category,
    userId: res.locals.user.id,
  })
  res.json({ restaurant })
})

restaurants.delete('/:id', restrict, async (req, res) => {
  try {
    const id = req.params.id;
    const restaurant = await Restaurant.destroy(
      {
        where: {
          id,
        },
      });
    res.json(restaurant);
  } catch (e) {
    console.log(e.message);
    res.status(500).send(e.message);
  }
});




module.exports = restaurants;



