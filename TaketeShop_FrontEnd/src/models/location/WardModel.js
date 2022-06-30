class WardModel{
    constructor({wardID, district, province, name, prefix, createTime, updateTime}){
        this.wardID = wardID;
        this.district = district;
        this.province = province;
        this.name = name;
        this.prefix = prefix;
        this.createTime = createTime;
        this.updateTime = updateTime;
    }
}
export default WardModel;