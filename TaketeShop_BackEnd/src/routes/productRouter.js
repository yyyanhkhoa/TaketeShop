const router = require("express").Router();
const { productController } = require("../app/controller/index");


router.post("/addWthImage", productController.addProductWithoutImage);
router.patch("/update/:id", productController.updateProductByIDRequest);
router.delete("/:id", productController.deleteProductByID);
router.get("/productList", productController.getProductWithCategoryIDPagination);
router.get("/uploadRecommentList/user", productController.updateUserRecommenderList);
router.get("/uploadRecommentList", productController.updateRecommenderList);
router.get("/productList/banner/:id", productController.getProductWithBannerID);
router.get("/all", productController.getAllProductWithPagination);
router.get("/recommender/:id", productController.getRecommenderProductWithUserID);
router.get("/raw", productController.getRawProductWithPagination);
router.get("/search", productController.searchProductWithPagination);
router.get("/unit", productController.getAllUnit);
router.get("/:id", productController.getProductByID);
router.get("/", productController.index);


module.exports = router;



































