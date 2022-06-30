const router = require("express").Router();
const { wishlistController } = require("../app/controller/index");

router.post('/add', wishlistController.addWishlistItem);
router.delete('/item', wishlistController.deleteWishlistItemWithProductIDAndUserID);
router.delete('/user', wishlistController.deleteWishlistItemWithUserID);
router.get('/user/:id', wishlistController.getWishlistItemWithUserID);

module.exports = router;
