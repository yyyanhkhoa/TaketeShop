class BannerModel{
    productID = [];
    constructor(id, title, discount, endTime, image, productID, createTime, updateTime){
        this.id = id;
        this.title = title;
        this.discount = discount;
        this.endTime = endTime;
        this.image = image;
        this.productID = productID;
        this.createTime = createTime;
        this.updateTime = updateTime;
    }
}

export default BannerModel;