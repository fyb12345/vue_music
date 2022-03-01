const mongoose = require("mongoose");
const Schema = mongoose.Schema;
mongoose
  .connect('mongodb://localhost:27017/YiMing', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => { console.log('链接成功') })
  .catch(() => { console.log('链接失败') })

let rankShema = new Schema({
    picUrl:{
        type:String,
        required:true
    },
    intro:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    topId:{
        type:Number,
        required:true
    },
    songlist:[
        {
            songName:{
                type:String,
                required:true
            },
            albumMid:{
                type:String,
                required:true
            },
            singerName:{
                type:String,
                required:true
            },
            singerMid:{
                type:String,
                required:true
            }
        }
    ]

})
let rankData = mongoose.model("rankDatas", rankShema);
module.exports={
    rankTable:rankData
}