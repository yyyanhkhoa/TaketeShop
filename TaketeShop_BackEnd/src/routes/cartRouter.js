const router = require("express").Router();
const { cartController } = require("../app/controller/index");


router.post("/item/add", cartController.addCartItem);
router.delete("/item/:id", cartController.deleteCartItemsByIDRequest);
router.patch("/item/:id", cartController.updateCartItemByIDRequest);
router.get("/item/user/:id", cartController.getCartItemsWithUserID);
router.get("/", cartController.index);


module.exports = router;
