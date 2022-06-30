class messagerModel{
    constructor(_id, chanelId, userID, text, isStaff, createAt){
        this._id = _id;
        this.chanelId = chanelId;
        this.userID = userID;       
        this.text = text;
        this.isStaff = isStaff;
        this.createAt = createAt;
    }
}

export default messagerModel;