const router = require("express").Router();
const { commentController } = require("../app/controller/index");


router.post("/add", commentController.addComment);
router.patch("/update/:id", commentController.updateCommentByIDRequest);
router.delete("/:id", commentController.deleteCommentByIDRequest);
router.get("/product/:id", commentController.getCommentWithProductID);
router.get("/user/:id", commentController.getCommentWithUserID);
router.get("/all", commentController.getAllComment);
router.get("/fakeRecommender", commentController.fakeRecommenderComentData);
router.get("/", commentController.index);


module.exports = router;
