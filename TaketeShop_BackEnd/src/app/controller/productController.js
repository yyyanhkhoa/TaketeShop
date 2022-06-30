const { authService } = require("../services");
const { authValidation } = require("../validations");
const { setConvertSQL } = require("../../ulti/ulti");
const SQLpool = require("../../database/connectSQL");
var recombee = require("recombee-api-client");
var rqs = recombee.requests;

var client = new recombee.ApiClient(
  "uit-dev",
  "RmrOMvTYVGcVnqVBWKJv5tpVzmI0U3fS5apNfYre2yq2BCE1dt9B7HNRUk10Kkn4",
  { region: "ap-se" }
);

const NUM = 100;
const GET_ALL_PRODUCT_DETAIL = ({ field, value, filter, sort, page }) =>
  "SELECT " +
  "result.* " +
  "FROM ( " +
  "SELECT " +
  "Product.create_time, " +
  "Product.update_time, " +
  "Product.id, " +
  "Product.category_id as category_id, " +
  "Product.user_id, " +
  "Product.unit_id, " +
  "Product.name, " +
  "Category.name as category_name, " +
  "Product.descriptions, " +
  "Product.price, " +
  "Product.quantity, " +
  "Product.discount, " +
  "Unit.name as unit, " +
  'GROUP_CONCAT(CONCAT(ProductImage.id," "), CONCAT(ProductImage.image_path)) as images, ' +
  "CONVERT(IF (SUM(OrderItems.quantity) IS null, 0, SUM(OrderItems.quantity)), UNSIGNED) AS sold " +
  "FROM Product " +
  "LEFT JOIN OrderItems ON OrderItems.product_id = Product.id " +
  "JOIN Category ON Product.category_id = Category.id " +
  "JOIN ProductImage ON ProductImage.product_id = Product.id " +
  "JOIN Unit ON Product.unit_id = Unit.id GROUP by ProductImage.product_id) result " +
  (field ? `WHERE result.${field}` + "=" + `'${value}'` : "") +
  " " +
  "GROUP by result.id " +
  (filter ? `ORDER BY result.${filter} ` : "ORDER BY result.update_time ") +
  (sort ? sort : "DESC") +
  " " +
  (page ? `LIMIT ${(page + 1) * 10} OFFSET ${page * 10}` : "LIMIT 15 OFFSET 0");

const GET_ALL_PRODUCT_DETAIL_BY_BANNER_ID = (bannerID) =>
  "SELECT " +
  "result.* " +
  "FROM ( " +
  "SELECT " +
  "Product.create_time, " +
  "Product.update_time, " +
  "Product.id, " +
  "Product.category_id as category_id, " +
  "Product.user_id, " +
  "Product.unit_id, " +
  "Product.name, " +
  "Category.name as category_name, " +
  "Product.descriptions, " +
  "Product.price, " +
  "Product.quantity, " +
  "Product.discount, " +
  "Unit.name as unit, " +
  'GROUP_CONCAT(CONCAT(ProductImage.id," "), CONCAT(ProductImage.image_path)) as images, ' +
  "CONVERT(IF (SUM(OrderItems.quantity) IS null, 0, SUM(OrderItems.quantity)), UNSIGNED) AS sold, " +
  "GROUP_CONCAT(DISTINCT BannerDetail.banner_id) as bannerID " +
  "FROM Product " +
  "LEFT JOIN OrderItems ON OrderItems.product_id = Product.id " +
  "JOIN Category ON Product.category_id = Category.id " +
  "JOIN ProductImage ON ProductImage.product_id = Product.id " +
  "JOIN BannerDetail ON BannerDetail.product_id = Product.id " +
  "JOIN Unit ON Product.unit_id = Unit.id GROUP by ProductImage.product_id) result " +
  `WHERE result.bannerID = ${bannerID} ` +
  "GROUP by result.id " +
  "ORDER BY result.update_time DESC";

const GET_RAW_PRODUCT = ({ field, value, filter, sort, page }) =>
  "SELECT * FROM Product " +
  (field ? `WHERE Product.${field}` + "=" + `'${value}' ` : " ") +
  (filter ? `ORDER BY Product.${filter} ` : "ORDER BY Product.id ") +
  (sort ? sort : "DESC") +
  " " +
  (page ? `LIMIT ${(page + 1) * 10} OFFSET ${page * 10}` : "");

const SEARCH_TO_DETAIL_PRODUCTS = ({ value, filter, sort, page }) =>
  "SELECT " +
  "result.* " +
  "FROM ( " +
  "SELECT " +
  "Product.create_time, " +
  "Product.update_time, " +
  "Product.id, " +
  "Product.category_id as category_id, " +
  "Product.user_id, " +
  "Product.unit_id, " +
  "Product.name, " +
  "Category.name as category_name, " +
  "Product.descriptions, " +
  "Product.price, " +
  "Product.quantity, " +
  "Product.discount, " +
  "Unit.name as unit, " +
  'GROUP_CONCAT(CONCAT(ProductImage.id," "), CONCAT(ProductImage.image_path)) as images, ' +
  "CONVERT(IF (SUM(OrderItems.quantity) IS null, 0, SUM(OrderItems.quantity)), UNSIGNED) AS sold " +
  "FROM Product " +
  "LEFT JOIN OrderItems ON OrderItems.product_id = Product.id " +
  "JOIN Category ON Product.category_id = Category.id " +
  "JOIN ProductImage ON ProductImage.product_id = Product.id " +
  "JOIN Unit ON Product.unit_id = Unit.id " +
  ("WHERE MATCH(Product.name) AGAINST(" +
    `'${value}'` +
    " WITH QUERY EXPANSION) ") +
  " GROUP by ProductImage.product_id) result " +
  "GROUP by result.id " +
  (filter ? `ORDER BY result.${filter} ` : "ORDER BY result.update_time ") +
  (sort ? sort : "DESC") +
  " " +
  (page ? `LIMIT (${(page + 1) * 10} - 1) OFFSET ${page * 10}` : "");
class ProductController {
  index(req, res, next) {
    res.send("Product controller....");
  }
  async getRawProductWithPagination(req, res) {
    try {
      var command = GET_RAW_PRODUCT({
        value: req.query.value,
        filter: req.query.filter,
        sort: req.query.sort,
        page: +req.query.page,
      });
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
  async searchRawProduct(req, res) {
    try {
      var command = "SELECT * FROM PRODUCT";
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
  async searchProductWithPagination(req, res) {
    try {
      var command = SEARCH_TO_DETAIL_PRODUCTS({
        value: req.query.value,
        filter: req.query.filter,
        sort: req.query.sort,
        page: +req.query.page,
      });

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
  async getAllUnit(req, res) {
    try {
      var command = "Select * from Unit";

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
  async getAllProductWithPagination(req, res) {
    try {
      var command = GET_ALL_PRODUCT_DETAIL({
        value: req.query.value,
        field: req.query.field,
        filter: req.query.filter,
        sort: req.query.sort,
        page: +req.query.page,
      });

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

  async getProductWithCategoryIDPagination(req, res, next) {
    try {
      var command = GET_ALL_PRODUCT_DETAIL({
        field: "category_id",
        value: req.query.value,
        filter: req.query.filter,
        sort: req.query.sort,
        page: +req.query.page,
      });
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
  async getProductWithBannerID(req, res) {
    try {
      var command = GET_ALL_PRODUCT_DETAIL_BY_BANNER_ID(req.params.id);

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

  async getProductByID(req, res) {
    try {
      var command = GET_ALL_PRODUCT_DETAIL({
        field: "id",
        value: req.params.id,
      });
      SQLpool.execute(command, (err, result, field) => {
        if (err) throw err;
        console.log(result.length);
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
  async deleteProductByID(req, res) {
    try {
      var command = "DELETE FROM `Product` WHERE Product.id =" + req.params.id;
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

  async updateProductByIDRequest(req, res) {
    const productID = req.params.id;
    const {
      categoryID,
      userID,
      name,
      descriptions,
      price,
      quantity,
      unitID,
      discount,
    } = req.body;
    const setCategory = setConvertSQL(categoryID, "category_id");
    const setUserID = setConvertSQL(userID, "user_id");
    const setName = setConvertSQL(name, "name");
    const setDescriptions = setConvertSQL(descriptions, "descriptions");
    const setPrice = setConvertSQL(price, "price");
    const setQuantity = setConvertSQL(quantity, "quantity");
    const setUnitID = setConvertSQL(unitID, "unit_id");
    const setDiscount = setConvertSQL(discount, "discount");

    try {
      var command =
        "UPDATE Product SET " +
        `${setCategory}${setUserID}${setName}${setDescriptions}${setPrice}${setQuantity}${setUnitID}${setDiscount}` +
        " update_time = CURRENT_TIMESTAMP WHERE id = " +
        productID;
      SQLpool.execute(command, (err, result, field) => {
        if (err) throw err;
        console.log(result);
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

  async addProductWithoutImage(req, res, next) {
    try {
      var {
        categoryID,
        userID,
        name,
        descriptions,
        price,
        quantity,
        discount,
        unitID,
      } = req.body;
      var command =
        "INSERT INTO `Product` (`id`, `category_id`, `user_id`, `name`, `descriptions`, `price`, `quantity`, `unit_id`, `discount`, `create_time`, `update_time`) VALUES (NULL, '" +
        categoryID +
        "', '" +
        userID +
        "', '" +
        name +
        "', '" +
        descriptions +
        "', '" +
        price +
        "', '" +
        quantity +
        "', '" +
        unitID +
        "', '" +
        discount +
        "', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);";

      SQLpool.execute(command, (err, result, field) => {
        if (err) throw err;
        console.log("Add Product Success");
        next();
      });
    } catch (err) {
      console.log(err);
      res.send({
        error: true,
        msg: err,
      });
    }
  }

  async getRecommenderProductWithUserID(req, res, next) {
    try {
      var id = req.params.id;
      var recomment;
      var command;

      await client.send(
        new rqs.RecommendItemsToUser(`user-${id}`, 5, {
          scenario: "TaketeRecommender",
        }),
        async (err, recommendations) => {
          recomment = recommendations.recomms;
          const products = [];
          const promisePool = SQLpool.promise();
          const getData = async () => {
           
            for(const item of recomment){
              command = GET_ALL_PRODUCT_DETAIL({
                field: "id",
                value: item.id.split("-")[1],
              });
              const [results, fields] = await promisePool.query(command)
              products.push(results[0]);
              console.log(products)
            }

          };
          
          await getData()
          console.log({res: products})
          res.send(products)
        }
      );
    } catch (err) {
      console.log(err);
      res.send({
        error: true,
        msg: err,
      });
    }
  }
  async updateRecommenderList(req, res, next) {
    try {
      var command = GET_ALL_PRODUCT_DETAIL({
        value: req.query.value,
        field: req.query.field,
        filter: req.query.filter,
        sort: req.query.sort,
        page: +req.query.page,
      });

      await SQLpool.execute(command, (err, result, field) => {
        if (err) throw err;
        client
          .send(
            new rqs.Batch([
              new rqs.AddItemProperty("category_id", "int"),
              new rqs.AddItemProperty("user_id", "int"),
              new rqs.AddItemProperty("unit_id", "int"),
              new rqs.AddItemProperty("name", "string"),
              new rqs.AddItemProperty("category_name", "string"),
              new rqs.AddItemProperty("descriptions", "string"),
              new rqs.AddItemProperty("price", "int"),
              new rqs.AddItemProperty("quantity", "int"),
              new rqs.AddItemProperty("discount", "int"),
              new rqs.AddItemProperty("unit", "string"),
              new rqs.AddItemProperty("images", "string"),
              new rqs.AddItemProperty("sold", "int"),
            ])
          )
          .then((responses) => {
            //Prepare requests for setting a catalog of computers

            var requests = result.map((item) => {
              return client.send(
                new rqs.SetItemValues(
                  `item-${item.id}`, //itemId
                  //values:
                  {
                    category_id: item.category_id,
                    user_id: item.user_id,
                    unit_id: item.unit_id,
                    name: item.name,
                    category_name: item.category_name,
                    descriptions: item.descriptions,
                    price: item.price,
                    quantity: item.quantity,
                    discount: item.discount,
                    unit: item.unit,
                    images: item.images,
                    sold: item.sold,
                  },
                  //optional parameters:
                  {
                    cascadeCreate: true, // Use cascadeCreate for creating item
                    // with given itemId, if it doesn't exist
                  }
                )
              );
            });
            // client.send(new rqs.Batch(requests));

            //Send catalog to the recommender system
            return console.log("Update Product Success");
          })
          .catch((error) => {
            console.error(error);
            // Use fallback
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
  async updateUserRecommenderList(req, res, next) {
    try {
      var command = "SELECT * FROM User";

      await SQLpool.execute(command, (err, result, field) => {
        if (err) throw err;
        client
          .send(
            new rqs.Batch([
              new rqs.AddUserProperty("username", "string"),
              new rqs.AddUserProperty("name", "string"),
              new rqs.AddUserProperty("gender", "int"),
            ])
          )
          .then((responses) => {
            //Prepare requests for setting a catalog of computers

            var requests = result.map((item) => {
              return client.send(
                new rqs.SetUserValues(
                  `user-${item.id}`, //itemId
                  //values:
                  {
                    username: item.username,
                    name: item.name,
                    gender: item.gender,
                  },
                  //optional parameters:
                  {
                    cascadeCreate: true, // Use cascadeCreate for creating item
                    // with given itemId, if it doesn't exist
                  }
                )
              );
            });

            // Send the data to Recombee, use Batch for faster processing of larger data
            client.send(new rqs.Batch(purchases));
            //Send catalog to the recommender system
            return console.log("Update user success");
          })
          .catch((error) => {
            console.error(error);
            // Use fallback
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
}

module.exports = new ProductController();
