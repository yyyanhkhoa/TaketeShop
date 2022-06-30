class User{
    constructor(userID, username, password, name, birthday, gender, email, phone, type, avatar, createTime, updateTime){
        this.userID = userID;
        this.username = username;
        this.password = password;
        this.name = name;
        this.birthday = birthday;
        this.gender = gender;
        this.email = email;
        this.phone = phone;
        this.type = type;
        this.avatar = avatar;
        this.createTime = createTime;
        this.updateTime = updateTime;
    }
}


export default User;