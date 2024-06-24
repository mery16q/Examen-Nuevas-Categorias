import { Restaurant, Order, RestaurantCategory } from '../models/models.js'

const checkRestaurantOwnership = async (req, res, next) => {
  try {
    const restaurant = await Restaurant.findByPk(req.params.restaurantId)
    if (req.user.id === restaurant.userId) {
      return next()
    }
    return res.status(403).send('Not enough privileges. This entity does not belong to you')
  } catch (err) {
    return res.status(500).send(err)
  }
}
const restaurantHasNoOrders = async (req, res, next) => {
  try {
    const numberOfRestaurantOrders = await Order.count({
      where: { restaurantId: req.params.restaurantId }
    })
    if (numberOfRestaurantOrders === 0) {
      return next()
    }
    return res.status(409).send('Some orders belong to this restaurant.')
  } catch (err) {
    return res.status(500).send(err.message)
  }
}

const checkCategoryNotExits = async (req, res, next) => {
  const error = 'You can not create a category that already exists'
  try {
    const restaurantCategories = await RestaurantCategory.findAll()
    for (const r of restaurantCategories) {
      if (r.name === req.body.name) {
        return res.status(403).send(error)
      }
    }
    return next()
  } catch (err) {
    return res.status(500).send(error)
  }
}

export { checkRestaurantOwnership, restaurantHasNoOrders, checkCategoryNotExits }
