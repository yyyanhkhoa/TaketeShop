class ProductItemsModel{
    categoryID = 0;
    liked = false;


    constructor({productID, categoryID, name, unit, price, quantity, discount, liked, image}){
        this.productID = productID;
        this.categoryID = categoryID;
        this.name = name;
        this.unit = unit;
        this.price = price;
        this.quantity = quantity;
        this.discount = discount;
        this.discountPrice = (price - (discount/100).toFixed(2)*price);
        this.image = image;
        this.liked = liked;
    }

}
export default ProductItemsModel;
