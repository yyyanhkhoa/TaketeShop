class DistrictModel{
    constructor({districtID, province, name, prefix, createTime, updateTime}){
        this.districtID = districtID;
        this.province = province;
        this.name = name;
        this.prefix = prefix;
        this.createTime = createTime;
        this.updateTime = updateTime;
    }
}
export default DistrictModel;