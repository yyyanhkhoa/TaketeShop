class DiscountModel{   
    constructor(id, categoryId, voucher,discount, membership, endTime){
        this.id = id;
        this.categoryId = categoryId;
        this.voucher = voucher;       
        this.discount = discount;
        this.membership = membership;
        this.endTime = endTime;                  
    }
}
export default DiscountModel;