class CartItemsModel{
    isSelected = false;
    constructor({id, userID, productID, categoryID, name, quantity , price, discount, images, createTime, updateTime}){
        this.id = id;
        this.userID = userID;
        this.productID = productID;
        this.categoryID = categoryID;
        this.name = name;
        this.quantity = quantity;
        this.price = price;
        this.discount = discount;
        this.discountPrice = price - (discount / 100).toFixed(2) * price;
        this.images = images;
        this.createTime = createTime;
        this.updateTime = updateTime;
    }
}

export default CartItemsModel;