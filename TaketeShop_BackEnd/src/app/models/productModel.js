class ProductModel{

    category = 'DefaultCategory';
    provider = 'DefaultProvider';
    liked = false;


    constructor(productID, categoryID, providerID, name, description, price, quantity, discount, image){
        this.productID = productID;
        this.categoryID = categoryID;
        this.providerID = providerID;
        this.name = name;
        this.description = description;
        this.price = price;
        this.quantity = quantity;
        this.discount = discount;
        this.discountPrice = (price - (discount/100).toFixed(2)*price);
        this.image = image;
    }


}
export default ProductModel;
