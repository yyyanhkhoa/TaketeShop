class OrderItemsModel{
    constructor({orderItemsID, orderID, categoryID, productID, name, price, quantity, discount, image, createTime, updateTime}){
        this.orderItemsID = orderItemsID;
        this.orderID = orderID;
        this.categoryID = categoryID;
        this.productID = productID;
        this.name = name;
        this.price = price;
        this.discountPrice = price - (discount / 100).toFixed(2) * price;
        this.quantity = quantity;
        this.discount = discount;
        this.image = image;
        this.createTime = createTime;
        this.updateTime = updateTime;

    }
}

export default OrderItemsModel;