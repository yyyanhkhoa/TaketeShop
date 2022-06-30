const messagerSchema = require('../models/messagerModel')
const chanelSchema = require('../models/chanelModel')
//const count = require("./index");
class messagerController {
    //Ham lay du lieu tu database
    async getAllMessager(req, res, next) {
        try {
            const messages = await messagerSchema.find()
                .populate()
            res.send(messages);
            //count = 0;
            console.log("get all messgager susscess")
        }
        catch (err) {
            res.send('Error' + err)
        }
    }

    async getMessagerFromChanelId(req, res) {
        const chanelId = req.params.chanelId;
        //var socket = req.app.get('socketIO');
        //socket.emit('hello');
        try {
            const messages = await messagerSchema.find({ chanelId: chanelId })
            //.populate()

            res.send(messages);
            console.log("get messagers: " + messages.length)
            //count = count + 10;
        } catch (err) {
            res.send('Error' + err)
        }
    }
    async getMessagerFromChanelIdSTAFF(req, res) {
        const chanelId = req.params.chanelId;
        //var socket = req.app.get('socketIO');
        //socket.emit('hello');
        try {
            const messages = await messagerSchema.find({ chanelId: chanelId })
            //.populate()

            res.send(messages);
            console.log("get messagers: " + messages.length)
            //count = count + 10;
        } catch (err) {
            res.send('Error' + err)
        }
    }
    async getMessagerFromChanelIdADMIN(req, res) {
        const chanelId = req.params.chanelId;
        //var socket = req.app.get('socketIO');
        //socket.emit('hello');
        try {
            const messages = await messagerSchema.find({ chanelId: chanelId })
            //.populate()

            res.send(messages);
            console.log("get messagers: " + messages.length)
            //count = count + 10;
        } catch (err) {
            res.send('Error' + err)
        }
    }

    async getMessagerFromUserId(req, res) {
        const userId = req.params.userId
        try {
            const messages = await messagerSchema.find({ userId: userId })
                .populate()
            res.send(messages);

        } catch (err) {
            res.send('Error' + err)
        }
    }

    async getMessagerFromUserIdADMIN(req, res) {
        const userId = req.params.userId
        try {
            const messages = await messagerSchema.find({ userId: userId })
                .populate()
            res.send(messages);

        } catch (err) {
            res.send('Error' + err)
        }
    }

    async getMessagerFromUserIdSTAFF(req, res) {
        const userId = req.params.userId
        try {
            const messages = await messagerSchema.find({ userId: userId })
                .populate()
            res.send(messages);

        } catch (err) {
            res.send('Error' + err)
        }
    }

    async addMessager(req, res) {
        const messages = await new messagerSchema({
            chanelId: req.body.chanelId,
            userId: req.body.userId,
            text: req.body.text,
            isStaff: req.body.isStaff,
        })
        try {
            const temp = await messages.save();
            //res.json(temp)    
            console.log("add messgager from userId susscess");  
           // io.in('/add/:chanelId').emit(req.body);
            //io.emit('temp', req.body);    
            res.send(temp);
        } catch (err) {
            res.send('Error' + err)
        }
        // try {
        //     const temp = await messages.save();           

        //     res.send(temp) ;     
        //     console.log("add messgager from userId susscess");      

        // } catch (err) {
        //     res.send('Error' + err)
        // }
    }
    // async addMessager(req, res) {             
    //     const messages = await new messagerSchema({
    //         chanelId: req.body.chanelId,
    //         userId: req.body.userId,
    //         text: req.body.text,
    //         isStaff: req.body.isStaff,
    //         createAt : req.body.createAt,
    //     })
    //     try {
    //         const temp = await messages.save()
    //         res.json(temp)
    //         console.log("add messgager from userId susscess")
    //     } catch (err) {
    //         res.send('Error' + err)
    //     }
    // }

    async deleteMessagerFromId(req, res) {
        const _id = req.params.id
        try {
            const user = await messagerSchema.findByIdAndDelete(_id)
            res.send(user)
        } catch (err) {
            throw new Error(err)
        }
    }


}
module.exports = new messagerController
