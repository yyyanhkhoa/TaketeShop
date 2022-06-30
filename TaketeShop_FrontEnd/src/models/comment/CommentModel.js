class CommentModel {
  constructor(
    commentID,
    productID,
    userID,
    user,
    avatar,
    comment,
    rating,
    image,
    createTime,
    updateTime,
  ) {
    this.commentID = commentID;
    this.productID = productID;
    this.userID = userID;
    this.user = user;
    this.avatar = avatar;
    this.comment = comment;
    this.rating = rating;
    this.images = image;
    this.createTime = createTime;
    this.updateTime = updateTime;
  }
}
export default CommentModel
