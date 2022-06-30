const router = require("express").Router();
const { discountController } = require("../app/controller/index");

router.post("/add", discountController.addDiscount);
router.get("/all", discountController.getAllDiscount);
router.get("/:id", discountController.getDiscountWithDiscountID);
//router.get("/list/:id", discountController.getProductIDWithDiscountID);
router.delete("/:id", discountController.deleteDiscountByIDRequest);
router.patch("/:id", discountController.updateDiscountByIDRequest);
router.get("/", discountController.index);

module.exports = router;


