const SQLpool = require("../../database/connectSQL");
const { setConvertSQL } = require("../../ulti/ulti");
var recombee = require("recombee-api-client");
var rqs = recombee.requests;

var client = new recombee.ApiClient(
  "uit-dev",
  "RmrOMvTYVGcVnqVBWKJv5tpVzmI0U3fS5apNfYre2yq2BCE1dt9B7HNRUk10Kkn4",
  { region: "ap-se" }
);
const GET_ALL_CART_ITEMS_WITH_USER_ID = (id) =>
  "SELECT " +
  "CartItem.id, " +
  "CartItem.user_id as user_id, " +
  "Product.id as product_id, " +
  "Category.id as category_id, " +
  "Unit.id as unit_id, " +
  "Product.name as product_name, " +
  "CartItem.quantity, " +
  "Unit.name, " +
  "Product.price, " +
  "Product.discount, " +
  'GROUP_CONCAT(CONCAT(ProductImage.id," "), CONCAT(ProductImage.image_path)) as images, ' +
  "CartItem.create_time, " +
  "CartItem.update_time " +
  "FROM `Product` " +
  "INNER JOIN `ProductImage` ON `ProductImage`.`product_id` = `Product`.`id` " +
  "INNER JOIN `Unit` ON `Product`.`unit_id` = `Unit`.`id` " +
  "INNER JOIN `CartItem` ON `CartItem`.`product_id` = `Product`.`id` " +
  "INNER JOIN `Category` ON `Product`.`category_id` = `Category`.`id` " +
  ("WHERE CartItem.user_id = " + `'${id}'`) +
  "GROUP BY CartItem.id ORDER BY CartItem.update_time DESC";
class CartController {
  index(req, res, next) {
    res.send("Cart controller....");
  }

  async getCartItemsWithUserID(req, res) {
    try {
      var command = GET_ALL_CART_ITEMS_WITH_USER_ID(req.params.id);
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
  async updateCartItemByIDRequest(req, res) {
    const id = req.params.id;
    const { userID, productID, quantity } = req.body;
    const setUserID = setConvertSQL(userID, "user_id");
    const setProductID = setConvertSQL(productID, "product_id");
    const setQuantity = setConvertSQL(quantity, "quantity");
    try {
      var command =
        "UPDATE `CartItem` SET " +
        `${setUserID}${setProductID}${setQuantity}` +
        " update_time = CURRENT_TIMESTAMP WHERE id = " +
        id;
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
  async deleteCartItemsByIDRequest(req, res) {
    try {
      var command =
        "DELETE FROM CartItem WHERE `CartItem`.`id` = " + req.params.id;
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

  async addCartItem(req, res) {
    try {
      var { productID, quantity, userID } = req.body;
      var command =
        "INSERT INTO `CartItem` (`id`, `user_id`, `product_id`, `quantity`, `create_time`, `update_time`) VALUES (NULL, '" +
        userID +
        "', '" +
        productID +
        "', '" +
        quantity +
        "', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP) ON DUPLICATE KEY UPDATE `quantity` = `quantity` + " +
        quantity;
      SQLpool.execute(command, (err, result, field) => {
        if (err) throw err;
        console.log("Add Cart Success");
        res.send(result);
      });
      client.send(
        new rqs.AddCartAddition(
          `user-${userID}`,
          `item-${productID}`,
          {
            cascadeCreate: true,
          }
        )
      );
    } catch (err) {
      console.log(err);
      res.send({
        error: true,
        msg: err,
      });
    }
  }
}
module.exports = new CartController();
