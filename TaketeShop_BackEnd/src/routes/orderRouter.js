const router = require("express").Router();
const { orderController } = require("../app/controller/index");
const { verifyTokenWithSHOPRoles, verifyToken } = require("../app/middleware/auth");


router.post("/add", orderController.addOrder);
router.post("/item/add", orderController.addOrderItem);
router.patch("/admin/update/:id", orderController.updateOrderByIDRequest);
router.patch("/update/:id", orderController.updateOrderByIDRequest);
router.patch("/item/update/:id", orderController.updateOrderItemsByIDRequest);
router.delete("/:id", orderController.deleteOrderByIDRequest);
router.delete("/item/:id", orderController.deleteOrderItemByIDRequest);
router.get("/all", orderController.getAllOrder);
router.get("/item/all", orderController.getAllOrderItems);
router.get("/user/:id", verifyToken, orderController.getOrderWithUserID);
router.get("/admin", verifyTokenWithSHOPRoles, orderController.getOrderWithStatus);
router.get("/item/order/:id", orderController.getOrderItemsByOrderID);
router.get("/item/user/:id", orderController.getOrderItemsWithUserID);
router.get("/:id", orderController.getOrderByOrderID)
router.get("/", orderController.index);


module.exports = router;
