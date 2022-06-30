class ProductModel {
  liked = false;
  image = [];
  constructor(
    {productID,
    categoryID,
    unitID,
    userID,
    name,
    category,
    description,
    price,
    quantity,
    unit,
    discount,
    liked,
    sold,
    image,
    createTime,
    updateTime,}
  ) {
    this.productID = productID;
    this.categoryID = categoryID;
    this.unitID = unitID;
    this.userID = userID;
    this.name = name;
    this.category = category;
    this.description = description;
    this.price = price;
    this.quantity = quantity;
    this.discount = discount;
    this.discountPrice = price - (discount / 100).toFixed(2) * price;
    this.unit =unit;
    this.image = image;
    this.liked = liked;
    this.sold = sold;
    this.createTime = createTime ? createTime : new Date();
    this.updateTime = updateTime ? updateTime : new Date();
  }
}
export default ProductModel;
