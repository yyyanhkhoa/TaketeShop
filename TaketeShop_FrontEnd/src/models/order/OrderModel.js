
class OrderModel{
    constructor({orderID, userID, name, gender, phone, province, district, ward, street, quantity, totalCost, status, payment, paid, createTime, updateTime}){
        this.orderID = orderID;
        this.userID = userID;
        this.name = name;
        this.gender = gender;
        this.phone = phone;
        this.province = province;
        this.district = district;
        this.ward = ward;
        this.street = street;
        this.quantity = quantity;
        this.totalCost = totalCost;
        this.status = status;
        this.payment = payment;
        this.paid = paid;
        this.createTime = createTime;
        this.updateTime = updateTime;
    }
}
export default OrderModel;
