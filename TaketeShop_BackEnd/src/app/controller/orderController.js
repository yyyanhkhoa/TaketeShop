const { setConvertSQL } = require("../../ulti/ulti");
const SQLpool = require("../../database/connectSQL");
var recombee = require('recombee-api-client');
var rqs = recombee.requests;

var client = new recombee.ApiClient(
  'uit-dev', 
  'RmrOMvTYVGcVnqVBWKJv5tpVzmI0U3fS5apNfYre2yq2BCE1dt9B7HNRUk10Kkn4', 
  { region: 'ap-se' }
);
const ORDER_STATUS = {
  WAITING: 1,
  CONFIRMED: 2,
  DELIVERING: 3,
  DELIVERED: 4,
  CANCEL: 5,
};
const statusConvert = (type) => {
  switch (+type) {
    case ORDER_STATUS.WAITING:
      return `status = 'WAITING'`;
    case ORDER_STATUS.CONFIRMED:
      return `status = 'CONFIRMED'`;
    case ORDER_STATUS.DELIVERING:
      return `status = 'DELIVERING'`;
    case ORDER_STATUS.DELIVERED:
      return `status = 'DELIVERED'`;
    case ORDER_STATUS.CANCEL:
      return `status = 'CANCEL'`;
    default:
      return '';
  }
};

const ORDER_QUERY = ({ id, status, page }) => {
  const userID = id ? `user_id = '${id}' ` : ``;
  const paging = page
    ? `LIMIT ${(page + 1) * 10} OFFSET ${page * 10}`
    : "LIMIT 10 OFFSET 0";
    console.log(statusConvert(status))
  const queryStatus = status? `AND ${statusConvert(status)}` : '';
  return `SELECT * FROM Orders WHERE ${userID}${queryStatus} ${paging}`;
};
const ORDER_QUERY_STATUS = ({ status, page }) => {
  const paging = page
    ? `LIMIT ${(page + 1) * 10} OFFSET ${page * 10}`
    : "LIMIT 10 OFFSET 0";
    console.log(statusConvert(status))
  const queryStatus = status? `${statusConvert(status)}` : '';
  return `SELECT * FROM Orders WHERE ${queryStatus} ${paging}`;
};
class OrderController {
  index(req, res, next) {
    res.send("Order controller....");
  }

  async getAllOrder(req, res) {
    try {
      var command = `SELECT * FROM Orders`;
      SQLpool.execute(command, (err, result, field) => {
        if (err) throw err;
        res.send(result);
      });
    } catch (err) {
      console.log(err);
      res.send({
        error: true,
        msg: err,
      });
    }
  }
  async getOrderByOrderID(req, res) {
    try {
      var command = `SELECT * FROM Orders WHERE Orders.id =` + req.params.id;
      SQLpool.execute(command, (err, result, field) => {
        if (err) throw err;
        res.send(result[0]);
      });
    } catch (err) {
      console.log(err);
      res.send({
        error: true,
        msg: err,
      });
    }
  }
  async getAllOrderItems(req, res) {
    try {
      var command = "SELECT * FROM `OrderItems`";
      SQLpool.execute(command, (err, result, field) => {
        if (err) throw err;
        res.send(result);
      });
    } catch (err) {
      console.log(err);
      res.send({
        error: true,
        msg: err,
      });
    }
  }
  async getOrderItemsByOrderID(req, res) {
    try {
      var command =
        "SELECT * FROM `OrderItems` WHERE OrderItems.order_id = " +
        req.params.id;
        console.log(command)
      SQLpool.execute(command, (err, result, field) => {
        if (err) throw err;
        res.send(result);
      });
    } catch (err) {
      console.log(err);
      res.send({
        error: true,
        msg: err,
      });
    }
  }
  async getOrderWithUserID(req, res) {
    try {
      var command = ORDER_QUERY({
        id: req.params.id,
        status: req.query.status,
        page: req.query.page,
      });
      console.log(command)
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
  async getOrderWithStatus(req, res) {
    try {
      var command = ORDER_QUERY_STATUS({
        status: req.query.status,
        page: req.query.page,
      });
      console.log(command)
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
  async getOrderItemsWithUserID(req, res) {
    try {
      var command =
        "SELECT " +
        "`OrderItems`.* " +
        "FROM " +
        "`OrderItems` " +
        "JOIN `Orders`ON `OrderItems`.`order_id` = `Orders`.`id` " +
        "JOIN `User` ON `Orders`.`user_id` = `User`.`id` " +
        "WHERE User.id = " +
        req.params.id;
        console.log(command);
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
  async updateOrderByIDRequest(req, res) {
    const {
      userID,
      addressID,
      name,
      gender,
      phone,
      province,
      district,
      ward,
      quantity,
      totalCost,
      status,
      payment,
      paid,
    } = req.body;
    const OrderID = req.params.id;
    const setUserID = setConvertSQL(userID, "user_id");
    const setAddressID = setConvertSQL(addressID, "address_id");
    const setName = setConvertSQL(name, "name");
    const setGender = setConvertSQL(gender, "gender");
    const setPhone = setConvertSQL(phone, "phone");
    const setProvince = setConvertSQL(province, "province");
    const setDistrict = setConvertSQL(district, "district");
    const setWard = setConvertSQL(ward, "ward");
    const setQuantity = setConvertSQL(quantity, "quantity");
    const setTotalCost = setConvertSQL(totalCost, "total_cost");
    const setStatus = status ? `${statusConvert(status)}, `: "";
    const setPayment = setConvertSQL(payment, "payment");
    const setPaid = setConvertSQL(paid, "paid");

    try {
      var command =
        "UPDATE `Orders`SET " +
        `${setUserID}${setAddressID}${setName}${setGender}${setPhone}${setProvince}${setDistrict}${setWard}${setQuantity}${setTotalCost}${setStatus}${setPayment}${setPaid}` +
        " update_time = CURRENT_TIMESTAMP WHERE id = " +
        OrderID;
      SQLpool.execute(command, (err, result, field) => {
        if (err) throw err;
        console.log(result);
      });
    } catch (err) {
      res.send({
        error: true,
        msg: err,
      });
    }
  }
  async updateOrderItemsByIDRequest(req, res) {
    const {
      orderID,
      categoryID,
      productID,
      name,
      price,
      quantity,
      discount,
      image,
    } = req.body;
    const id = req.params.id;
    const setOrderID = setConvertSQL(orderID, "user_id");
    const setCategoryID = setConvertSQL(categoryID, "category_id");
    const setProductID = setConvertSQL(productID, "product_id");
    const setName = setConvertSQL(name, "name");
    const setPrice = setConvertSQL(price, "price");
    const setQuantity = setConvertSQL(quantity, "quantity");
    const setDiscount = setConvertSQL(discount, "discount");
    const setImage = setConvertSQL(image, "image");

    try {
      var command =
        "UPDATE `OrderItems` SET " +
        `${setOrderID}${setCategoryID}${setProductID}${setName}${setPrice}${setQuantity}${setDiscount}${setImage}` +
        " update_time = CURRENT_TIMESTAMP WHERE id = " +
        id;
      SQLpool.execute(command, (err, result, field) => {
        if (err) throw err;
        console.log(result);
      });
    } catch (err) {
      res.send({
        error: true,
        msg: err,
      });
    }
  }
  async deleteOrderByIDRequest(req, res) {
    try {
      var command = "DELETE FROM Order WHERE `Orders`.`id` = " + req.params.id;
      SQLpool.execute(command, (err, result, field) => {
        if (err) throw err;
        console.log(result);
        res.send(result);
      });
    } catch (err) {
      console.log(err);
      res.send({
        error: true,
        msg: err,
      });
    }
  }
  async deleteOrderItemByIDRequest(req, res) {
    const { OrderItemID } = req.body;
    try {
      var command =
        "DELETE FROM Order WHERE `OrderItems`.`id` = " + OrderItemID;
      SQLpool.execute(command, (err, result, field) => {
        if (err) throw err;
        console.log(result);
        res.send(result);
      });
    } catch (err) {
      console.log(err);
      res.send({
        error: true,
        msg: err,
      });
    }
  }
  async addOrder(req, res) {
    try {
      var {
        userID,
        name,
        gender,
        phone,
        province,
        district,
        street,
        ward,
        quantity,
        totalCost,
        payment,
        paid,
        items,
      } = req.body;

      SQLpool.getConnection((err, connection) => {
        if (err) throw err;
        //Insert Order to MySQL
        var request;
        var command =
          "INSERT INTO `Orders`(`id`, `user_id`, `name`, `gender`, `phone`, `province`, `district`, `street`, `ward`, `quantity`, `total_cost`, `payment`, `paid`, `create_time`, `update_time`) VALUES (NULL, '" +
          userID +
          "', '" +
          name +
          "', '" +
          gender +
          "', '" +
          phone +
          "', '" +
          province +
          "', '" +
          district +
          "', '" +
          street +
          "', '" +
          ward +
          "', '" +
          quantity +
          "', '" +
          totalCost +
          "', '" +
          payment +
          "', '" +
          paid +
          "', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)";
        connection.query(command, (error, result) => {
          if (error) throw error;
        });

        //Get lastest Order
        command =
          "SELECT `Orders`.* FROM `Orders`WHERE `Orders`.user_id = '" +
          userID +
          "' ORDER BY `Orders`.create_time DESC";
        let id;
        connection.query(command, (error, result) => {
          if (error) throw error;
          id = result[0].id;

          //insert Order Items using req.body.items
          items.forEach((item) => {
            command =
              "INSERT INTO `OrderItems` (`id`, `order_id`, `category_id`, `product_id`, `name`, `price`, `quantity`, `discount`, `image`, `create_time`, `update_time`) VALUES (NULL, '" +
              id +
              "', '" +
              item.categoryID +
              "', '" +
              item.productID +
              "', '" +
              item.name +
              "', '" +
              item.price +
              "', '" +
              item.quantity +
              "', '" +
              (item.discount? item.discount : 0) +
              "', '" +
              item.images[0].image +
              "', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)";
            connection.query(command, (error, result) => {
              if (error) throw error;
              console.log(`Add ${item.name} to Order(${id}) success`);
            });

            command = "DELETE FROM CartItem WHERE `CartItem`.`id` = " + item.id;
            connection.query(command, (error, result) => {
              if (error) throw error;
              console.log("Delete selected Cart Items success");
            });
            client.send(new rqs.AddPurchase(`user-${userID}`,`item-${item.id}`, {cascadeCreate: true}), (err, responses) => {
              console.log(responses);
          });
          });
        });

        connection.release();
      });
    } catch (err) {
      console.log(err);
      res.send({
        error: true,
        msg: err,
      });
    }
  }
  async addOrderItem(req, res) {
    try {
      var {
        orderID,
        categoryID,
        productID,
        name,
        price,
        quantity,
        discount,
        image,
      } = req.body;
      var command =
        "INSERT INTO `OrderItems` (`id`, `order_id`, `category_id`, `product_id`, `name`, `price`, `quantity`, `discount`, `image`, `create_time`, `update_time`) VALUES (NULL, '" +
        orderID +
        "', '" +
        categoryID +
        "', '" +
        productID +
        "', '" +
        name +
        "', '" +
        price +
        "', '" +
        quantity +
        "', '" +
        discount +
        "', '" +
        image +
        "', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)";
      SQLpool.execute(command, (err, result, field) => {
        if (err) throw err;
        console.log("Add Order Success");
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

module.exports = new OrderController();
