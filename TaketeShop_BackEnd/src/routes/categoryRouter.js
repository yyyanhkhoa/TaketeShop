const router = require("express").Router();
const { categoryController } = require("../app/controller/index");


router.post("/addCategory", categoryController.addCategory);
router.patch("/update/:id", categoryController.updateCategoryByIDRequest);
router.delete("/:id", categoryController.deleteCategoryByIDRequest);
router.get("/all", categoryController.getAllCategory);
router.get("/:id", categoryController.getCategoryByID);
router.get("/", categoryController.index);


module.exports = router;



































