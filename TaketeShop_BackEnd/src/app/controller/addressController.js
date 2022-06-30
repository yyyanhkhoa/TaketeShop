const SQLpool = require("../../database/connectSQL");
const { setConvertSQL } = require("../../ulti/ulti");
const GET_ALL_ADDRESS = (id) =>
  "SELECT " +
  "Address.id, " +
  "Address.province_id, " +
  "Address.district_id, " +
  "Address.ward_id, " +
  "Address.user_id, " +
  "Address.name, " +
  "Address.gender, " +
  "Address.phone, " +
  "Province.name as province, " +
  "District.name as district, " +
  "Ward.name as ward, " +
  "Address.street, " +
  "Address.create_time, " +
  "Address.update_time " +
  "FROM `Address` " +
  "LEFT JOIN `District` ON `Address`.`district_id` = `District`.`id` " +
  "LEFT JOIN `Province` ON `Address`.`province_id` = `Province`.`id` " +
  "LEFT JOIN `Ward` ON `Address`.`ward_id` = `Ward`.`id` " +
  (id ? `WHERE Address.user_id = ${id}` : "");
class AddressController {
  index(req, res, next) {
    res.send("Address controller....");
  }

  async getAllAddress(req, res) {
    try {
      var command = GET_ALL_ADDRESS();
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
  async getAddressWithUserID(req, res) {
    try {
      var command = GET_ALL_ADDRESS(req.params.id);
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
  async deleteAddressByIDRequest(req, res) {
    const id = req.params.id;

    try {
      var command = "DELETE FROM Address WHERE `Address`.`id` = " + id;
      SQLpool.execute(command, (err, result, field) => {
        if (err) throw err;
        //console.log(result);
      });
    } catch (err) {
      console.log(err);
      res.send({
        error: true,
        msg: err,
      });
    }
  }
  async addAddress(req, res) {
    try {
      var {
        userID,
        phone,
        provinceID,
        districtID,
        wardID,
        street,
        gender,
        name,
      } = req.body;
      var command =
        "INSERT INTO `Address` (`id`, `user_id`, `phone`, `province_id`, `district_id`, `ward_id`, `street`, `name`, `gender`, `create_time`, `update_time`) VALUES (NULL, '" +
        userID +
        "', '" +
        phone +
        "', '" +
        provinceID +
        "', '" +
        districtID +
        "', '" +
        wardID +
        "', '" +
        street +
        "', '" +
        name +
        "', '" +
        gender +
        "', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)";
      SQLpool.execute(command, (err, result, field) => {
        if (err) throw err;
        console.log("Add Address Success");
      });
    } catch (err) {
      console.log(err);
      res.send({
        error: true,
        msg: err,
      });
    }
  }
  async updateAddressByIDRequest(req, res) {
    const addressID = req.params.id;
    const {
      userID,
      phone,
      name,
      provinceID,
      districtID,
      wardID,
      street,
      gender
    } = req.body;
    const setUserID = setConvertSQL(userID, "user_id");
    const setPhone = setConvertSQL(phone, "phone");
    const setName = setConvertSQL(name, "name");
    const setProvinceID = setConvertSQL(provinceID, "province_id");
    const setDistrictID = setConvertSQL(districtID, "district_id");
    const setWardID = setConvertSQL(wardID, "ward_id");
    const setStreet = setConvertSQL(street, "street");
    const setGender = setConvertSQL(gender, "gender");
    try {
      var command =
        "UPDATE Address SET " +
        `${setName}${setPhone}${setUserID}${setProvinceID}${setDistrictID}${setWardID}${setStreet}${setGender}` +
        " update_time = CURRENT_TIMESTAMP WHERE id = " +
        addressID;
      SQLpool.execute(command, (err, result, field) => {
        if (err) throw err;
        //console.log(result);
        res.send({
          error: false,
          msg: "Update Success",
        });
      });
    } catch (err) {
      console.log(err);
      res.send({
        error: true,
        msg: err,
      });
    }
  }

  async getAllProvince(req, res) {
    try {
      let command = "SELECT * FROM Province ORDER BY Province.name DESC"
      SQLpool.execute(command, (err, result, field) => {
        if (err) throw err;
        //console.log(result);
        res.send(result);
      });
    } catch (error) {
      console.log(error)
    }
  }
  async getProvinceWithID(req, res) {
    try {
      let command = "SELECT * FROM Province WHERE Province.id" + req.params.id;
      SQLpool.execute(command, (err, result, field) => {
        if (err) throw err;
        //console.log(result);
        res.send(result);
      });
    } catch (error) {
      console.log(error)
    }
  }
  async getAllDistrictWithProvinceID(req, res) {
    try {
      let command = `SELECT District.* FROM District INNER JOIN Province ON Province.id = District.province_id WHERE District.province_id = '${req.query.province}' ORDER BY District.name DESC`
      SQLpool.execute(command, (err, result, field) => {
        if (err) throw err;
        console.log(result);
        res.send(result);
      });
    } catch (error) {
      console.log(error)
    }
  }
  async getAllWardWithProvinceIDAndDistrictID(req, res) {
    try {
      let command = `SELECT Ward.* FROM Ward INNER JOIN Province ON Province.id = Ward.province_id INNER JOIN District ON District.id = Ward.district_id WHERE Ward.province_id = '${req.query.province}' AND Ward.district_id = '${req.query.district}' ORDER BY Ward.name DESC`;
      SQLpool.execute(command, (err, result, field) => {
        if (err) throw err;
        // console.log(result);
        res.send(result);
      });
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = new AddressController();
