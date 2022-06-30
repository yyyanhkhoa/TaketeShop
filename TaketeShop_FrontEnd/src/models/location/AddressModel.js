class AddressModel{
    isSelected = false;
    constructor({addressID, provinceID, districtID, wardID, userID, name, gender, phone, province, district, ward, street, createTime, updateTime}){
        this.addressID = addressID;
        this.provinceID = provinceID;
        this.districtID = districtID;
        this.wardID = wardID;
        this.userID = userID;
        this.name = name;
        this.gender = gender;
        this.phone = phone;
        this.province = province;
        this.district = district;
        this.ward = ward;
        this.street = street;
        this.createTime = createTime;
        this.updateTime = updateTime;
    }
}
export default AddressModel;
