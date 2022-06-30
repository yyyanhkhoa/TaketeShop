const SQLpool = require("../../database/connectSQL");
const { setConvertSQL } = require("../../ulti/ulti");

const GET_ALL_DISCOUNT_DETAIL = (field, value) =>
  "SELECT * " +
  "FROM `Discount` "


class DiscountController {
  index(req, res, next) {
    res.send("Discount controller....");
  }

  async getAllDiscount(req, res) {
    try {
      var command = GET_ALL_DISCOUNT_DETAIL();
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

  async getDiscountWithDiscountID(req, res) {   
    try {
      const id = req.params.id;
      var command = "SELECT * FROM Discount WHERE `id` = " + id;
      SQLpool.execute(command, (err, result, field) => {
        if (err) throw err;
        console.log(result);
        res.send(result);
      });
    }catch (err) {
      res.send({
        error: true,
        msg: err,
      });
    }

  }
  async updateDiscountByIDRequest(req, res) {  
    const {category_id,voucher, discount, membership, end_time } = req.body;
    const setCategory_id = setConvertSQL(category_id, "category_id");   
    const setVoucher = setConvertSQL(voucher, "voucher");
    const setDiscount = setConvertSQL(discount, "discount");
    const setMembership = setConvertSQL(membership, "membership");
    const setEnd_time = setConvertSQL(end_time, "end_time");
    
    try {
      console.log("aa" +setMembership);
      var command =
        "UPDATE `Discount` SET " +
        `${setCategory_id}${setVoucher}${setDiscount}${setMembership}${setEnd_time}` +
        " update_time = CURRENT_TIMESTAMP WHERE id = " +
        req.params.id;
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
  async deleteDiscountByIDRequest(req, res) {
    const id = req.params.id;

    try {
      var command = "DELETE FROM Discount WHERE `Discount`.`id` = " + id;
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

  async addDiscount(req, res) {
    try {
      var { category_id, voucher, discount, membership, end_time } = req.body;
      var command =
        "INSERT INTO `Discount` (`id`, `category_id`,`voucher`, `discount`,`membership`,  `end_time`, `create_time`, `update_time`) VALUES (NULL, '" +
        category_id +
        "', '" +
        voucher +
        "', '" +
        discount +
        "', '" +
        membership +
        "', '" +
        end_time +
        "', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)";
      SQLpool.execute(command, (err, result, field) => {
        if (err) throw err;
        console.log("Add Discount Success");
      });
    } catch (err) {
      console.log(err);
      res.send({
        error: true,
        msg: err,
      });
    }
  }
};

module.exports = new DiscountController();
