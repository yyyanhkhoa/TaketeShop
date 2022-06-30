const { authService } = require("../services");
const { authValidation } = require("../validations");
const SQLpool = require("../../database/connectSQL");
const { setConvertSQL } = require("../../ulti/ulti");

class CategoryController {
  index(req, res, next) {
    res.send("Category controller....");
  }

  async getAllCategory(req, res) {
    try {
      var command = "SELECT `Category`.* FROM `Product` JOIN `Category` ON `Product`.`category_id` = `Category`.`id` GROUP BY Category.id;";
      SQLpool.execute(command, (err, result, field) => {
        if (err) throw err;
        res.send(result);
      });
    } catch (err) {
      res.send({
        error: true,
        msg: err,
      });
    }
  }

  async getCategoryByID(req, res) {
    try {
      var command = "SELECT * FROM `Category` WHERE id =" + req.params.id;
      SQLpool.execute(command, (err, result, field) => {
        if (err) throw err;
        res.send(result);
      });
    } catch (err) {
      res.send({
        error: true,
        msg: err,
      });
    }
  }

  async updateCategoryByIDRequest(req, res) {
    const categoryID = req.params.id;
    const { name, discount, image } = req.body;
    const setName = setConvertSQL(name, "name");
    const setDiscount = setConvertSQL(discount, "discount");
    const setImage = setConvertSQL(image, "image");
    try {
      var command =
        "UPDATE `Category` SET " +
        `${setName}${setDiscount}${setImage}` +
        " update_time = CURRENT_TIMESTAMP WHERE id = " +
        categoryID;
      SQLpool.execute(command, (err, result, field) => {
        if (err) throw err;
        console.log(result);
        res.send(result);
      });
    } catch (err) {
      res.send({
        error: true,
        msg: err,
      });
    }
  }

  async addCategory(req, res) {
    try {
      var { name, image, discount } = req.body;
      var command =
        "INSERT INTO `Category` (`id`, `name`, `discount`, `image`, `create_time`, `update_time`) VALUES (NULL, '" +
        name +
        "', '" +
        discount +
        "', '" +
        (image
          ? image
          : "https://www.englishclub.com/images/vocabulary/food/fish-seafood/fish-seafood.jpg") +
        "' , CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);";

      SQLpool.execute(command, (err, result, field) => {
        if (err) throw err;
        console.log("Add Category Success");
        res.send(result);
      });
    } catch (err) {
      res.send({
        error: true,
        msg: err,
      });
    }
  }
  async deleteCategoryByIDRequest(req, res) {
    const id = req.params.id;

    try {
      var command = "DELETE FROM Category WHERE `Category`.`id` = " + id;
      SQLpool.execute(command, (err, result, field) => {
        if (err) throw err;
        console.log(result);
      });
    } catch (err) {
      console.log(err);
      res.send({
        error: true,
        msg: err,
      });
    }
  }
}

module.exports = new CategoryController();
