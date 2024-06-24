import RestaurantCategoryController from '../controllers/RestaurantCategoryController.js'
import * as RestaurantMiddleware from '../middlewares/RestaurantMiddleware.js'
import * as RestaruantCategoryValidation from '../controllers/validation/RestaurantCategoryValidation.js'
import { hasRole, isLoggedIn } from '../middlewares/AuthMiddleware.js'
import { handleValidation } from '../middlewares/ValidationHandlingMiddleware.js'

const loadFileRoutes = function (app) {
  app.route('/restaurantCategories')
    .get(RestaurantCategoryController.index)
    .post(
      isLoggedIn,
      hasRole('owner'),
      RestaurantMiddleware.checkCategoryNotExits,
      RestaruantCategoryValidation.create,
      handleValidation,
      RestaurantCategoryController.create
    )
}
export default loadFileRoutes
