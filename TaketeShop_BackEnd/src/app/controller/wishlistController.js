const { authService } = require("../services");
const { authValidation } = require("../validations");
const { setConvertSQL } = require("../../ulti/ulti");
const SQLpool = require("../../database/connectSQL");
const GET_ALL_WISH_LIST_WITH_USER_ID = (id, page) =>
  "SELECT " +
  "Product.id, " +
  "Product.category_id, " +
  "Product.unit_id, " +
  "Product.name, " +
  "Unit.name as unit, " +
  "Product.price, " +
  "Product.discount, " +
  "Product.quantity, " +
  'GROUP_CONCAT(CONCAT(ProductImage.id," "), CONCAT(ProductImage.image_path)) as images, ' +
  "Product.create_time, " +
  "Product.update_time " +
  "FROM Product " +
  "LEFT JOIN ProductImage ON ProductImage.product_id = Product.id " +
  "LEFT JOIN Unit ON Product.unit_id = Unit.id " +
  "LEFT JOIN WishList ON WishList.product_id = Product.id " +
  "LEFT JOIN User ON User.id = WishList.user_id " +
  `WHERE User.id = '${id}' ` +
  "GROUP BY Product.id " +
  (page ? `LIMIT ${(page + 1) * 10} OFFSET ${page * 10}` : "");;
class WishlistController {
    async getWishlistItemWithUserID(req, res) {
        try {
          var command = GET_ALL_WISH_LIST_WITH_USER_ID(req.params.id, req.query.page)
          SQLpool.execute(command, (err, result, field) => {
            if (err) throw err;
            res.send(result)
          });
        } catch (err) {
          console.log(err);
          res.send({
            error: true,
            msg: err,
          });
        }
      }
  async addWishlistItem(req, res) {
    try {
      var { productID, userID } = req.body;
      var command =
        "INSERT INTO `WishList` (`id`, `user_id`, `product_id`, `create_time`, `update_time`) VALUES (NULL, '" +
        userID +
        "', '" +
        productID +
        "', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)";
      SQLpool.execute(command, (err, result, field) => {
        if (err) throw err;
      });
    } catch (err) {
      console.log(err);
      res.send({
        error: true,
        msg: err,
      });
    }
  }
  async deleteWishlistItemWithProductIDAndUserID(req, res) {
    try {
      var command = `DELETE FROM WishList WHERE WishList.product_id = '${req.query.productID}' AND WishList.user_id = '${req.query.userID}'`;
      SQLpool.execute(command, (err, result, field) => {
        if (err) throw err;
      });
    } catch (err) {
      console.log(err);
      res.send({
        error: true,
        msg: err,
      });
    }
  }
  async deleteWishlistItemWithUserID(req, res) {
    try {
      var command = `DELETE FROM WishList WHERE WishList.user_id = '${req.query.userID}'`;
      SQLpool.execute(command, (err, result, field) => {
        if (err) throw err;
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
module.exports = new WishlistController();
