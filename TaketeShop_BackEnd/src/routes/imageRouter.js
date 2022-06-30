const router = require("express").Router();
const { imageController } = require("../app/controller/index");

router.get("/allCloud", imageController.getAllImageCloudinary);

router.post("/add", imageController.addImage);
router.patch("/update/:id", imageController.updateImageByIDRequest);
router.get("/:id", imageController.getImageByID);
router.get("/all", imageController.getAllImage)
router.delete("/:id", imageController.deleteImageByIDRequest);
router.get("/", imageController.index);


module.exports = router;
