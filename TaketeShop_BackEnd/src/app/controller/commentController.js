const SQLpool = require("../../database/connectSQL");
const { setConvertSQL } = require("../../ulti/ulti");
var recombee = require("recombee-api-client");
var rqs = recombee.requests;

var client = new recombee.ApiClient(
  "uit-dev",
  "RmrOMvTYVGcVnqVBWKJv5tpVzmI0U3fS5apNfYre2yq2BCE1dt9B7HNRUk10Kkn4",
  { region: "ap-se" }
);
const NUM = 100;
const GET_ALL_COMMENT_DETAIL = (field, value) =>
  "SELECT " +
  "`Comment`.`id`, " +
  "`Comment`.`product_id`, " +
  "`Comment`.`user_id`, " +
  "`User`.name AS username,  " +
  "`User`.`avatar`,  " +
  "`Comment`.`comment`, " +
  "`Comment`.`rating`, " +
  'GROUP_CONCAT(CONCAT(CommentImage.id," "), CONCAT(CommentImage.image_path)) as images, ' +
  "`Comment`.`create_time`, " +
  "`Comment`.`update_time` " +
  "FROM `Comment` " +
  "INNER JOIN `User` ON User.id = `Comment`.user_id " +
  "LEFT JOIN CommentImage ON `Comment`.`id` = CommentImage.comment_id " +
  (field ? `WHERE Comment.${field}` + "=" + `'${value}'` : "") +
  "GROUP BY `Comment`.id;";
class CommentController {
  index(req, res, next) {
    res.send("Comment controller....");
  }

  async getAllComment(req, res) {
    try {
      var command = GET_ALL_COMMENT_DETAIL();
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

  async getCommentWithUserID(req, res) {
    try {
      var command = GET_ALL_COMMENT_DETAIL("user_id", req.params.id);
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
  async getCommentWithProductID(req, res) {
    try {
      var command = GET_ALL_COMMENT_DETAIL("product_id", req.params.id);
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

  async updateCommentByIDRequest(req, res) {
    const { productID, userID, comment, rating } = req.body;
    const CommentID = req.params.id;
    const setProductID = setConvertSQL(productID, "product_id");
    const setUserID = setConvertSQL(userID, "user_id");
    const setComment = setConvertSQL(comment, "comment");
    const setRating = setConvertSQL(rating, "rating");

    try {
      var command =
        "UPDATE `Comment` SET " +
        `${setProductID}${setUserID}${setComment}${setRating}` +
        " update_time = CURRENT_TIMESTAMP WHERE id = " +
        CommentID;
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
  async deleteCommentByIDRequest(req, res) {
    try {
      var command =
        "DELETE FROM Comment WHERE `Comment`.`id` = " + req.params.id;
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

  async addComment(req, res) {
    try {
      var { productID, userID, comment, rating } = req.body;
      var command =
        "INSERT INTO `Comment` (`id`, `product_id`, `user_id`, `comment`, `rating`, `create_time`, `update_time`) VALUES (NULL, '" +
        productID +
        "', '" +
        userID +
        "', '" +
        comment +
        "', '" +
        rating +
        "', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)";
      SQLpool.execute(command, (err, result, field) => {
        if (err) throw err;
        console.log("Add Comment Success");

        client.send(
          new rqs.AddRating(
            `user-${userID}`,
            `item-${productID}`,
            (rating * 1.0) / 5,
            {
              cascadeCreate: true,
            }
          )
        );
      });
    } catch (err) {
      console.log(err);
      res.send({
        error: true,
        msg: err,
      });
    }
  }
  async fakeRecommenderComentData(req, res, next) {
    try {
      var command = "SELECT * FROM User";
      let user = [];
      let product = [];

      await SQLpool.execute(command, (err, result, field) => {
        if (err) throw err;
        user = result;
      });
      command = "Select * from Product";
      await SQLpool.execute(command, (err, result, field) => {
        if (err) throw err;
        product = result;
      });
      
      const requests = [];
      const fakeRequest = () => {
        for (let i = 0; i < 1000; i++) {
          const userID = user.sort(() => 0.5 - Math.random()).slice(0, 1);
          const productID = product.sort(() => 0.5 - Math.random()).slice(0, 1);
          requests.push(
            new rqs.AddRating(
              `user-${userID}`,
              `item-${productID}`,
              Math.random(),
              {
                cascadeCreate: true,
              }
            )
          );
        }
      };
      await fakeRequest();
      client.send(new rqs.Batch(requests));
    } catch (err) {
      console.log(err);
      res.send({
        error: true,
        msg: err,
      });
    }
  }
}

module.exports = new CommentController();
