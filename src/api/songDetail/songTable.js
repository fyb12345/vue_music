const mongoose = require("mongoose");
const Schema = mongoose.Schema;
mongoose.connect("mongodb://127.0.0.1:271:27017/YiMing", {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log("数据库链接成功-songDetail");
    })
    .catch((err) => {
        if (err) throw err;
        console.log("数据库链接失败");
    });

let songSchema = new Schema({
    songMid: {
        type: String,
        required: true
    },
    m4aUrl: {
        type: String,
        required: true
    },
    songName: {
        type: String,
        required: true
    },
    playTime: {
        type: String,
        required: true
    },
    songPic: {
        type: String,
        required: true
    }

});

let songTable = mongoose.model("songTables", songSchema);

module.exports = {
    songTable
};