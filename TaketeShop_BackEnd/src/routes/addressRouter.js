const router = require("express").Router();
const { addressController } = require("../app/controller/index");


router.post("/add", addressController.addAddress);
router.get("/user/all/:id", addressController.getAddressWithUserID);
router.get("/all", addressController.getAllAddress);
router.get("/provinces", addressController.getAllProvince);
router.get("/districts", addressController.getAllDistrictWithProvinceID);
router.get("/wards", addressController.getAllWardWithProvinceIDAndDistrictID);
router.delete("/:id", addressController.deleteAddressByIDRequest);
router.patch("/:id", addressController.updateAddressByIDRequest);
router.get("/", addressController.index);


module.exports = router;



































