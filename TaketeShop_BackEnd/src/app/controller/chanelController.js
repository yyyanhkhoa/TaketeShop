const chanelSchema = require('../models/chanelModel')
//const count = require("./index");

class ChanelCotroller {
    //Ham lay du lieu tu database
    async getAllChanel(req, res) {
        try {            
            const question = await chanelSchema.find().populate()
            res.send(question);
            console.log("get all chanel susscess")
        }
        catch (err) {
            res.send('Error' + err)
        }
    }

    async getAllChanelADMIN(req, res) {
        try {            
            const question = await chanelSchema.find().populate()
            res.send(question);
            console.log("get all chanel susscess")
        }
        catch (err) {
            res.send('Error' + err)
        }
    }


    async addChanel(req, res) {       
        const questions = await new chanelSchema({
            userId: req.params.userId,
        })
        try {
            const temp = await questions.save();
            //res.json(temp)            
            res.send(temp) ;  
        } catch (err) {
            res.send('Error' + err)
        }
    }

    async deleteChanelFromUserId(req, res) {
        const userId = req.params.userId
        try {
            const user = await chanelSchema.findOneAndDelete({userId: userId})
            res.send(user)
        } catch (err) {
            res.send('error' + err)
        }
    }  


    async findChanelFromUserId(req, res) {
        const userId = req.params.userId;
        //count = 0;
        try {
            const chanel = await chanelSchema.find({userId: userId})
            res.send(chanel)            
        } catch (err) {
            res.send('error' + err)
        }
    }
}
module.exports = new ChanelCotroller