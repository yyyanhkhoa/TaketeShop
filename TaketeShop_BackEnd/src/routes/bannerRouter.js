const router = require("express").Router();
const { bannerController } = require("../app/controller/index");

router.post("/add", bannerController.addBanner);
router.get("/all", bannerController.getAllBanner);
router.get("/list/:id", bannerController.getProductIDWithBannerID);
router.delete("/:id", bannerController.deleteBannerByIDRequest);
router.patch("/:id", bannerController.updateBannerByIDRequest);
router.get("/", bannerController.index);

module.exports = router;
