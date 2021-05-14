const mongoose = require("mongoose");
const Schema = mongoose.Schema;


mongoose
    .connect('mongodb://localhost:27017/YiMing', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => { console.log('链接成功') })
    .catch(() => { console.log('链接失败') })


let recommendSchema = new Schema({
    category: {
        type: String,
        required: true,
    },
    categoryList: [
        {
            id: {
                type: String,
                required: true,
            },
            cover: {
                type: String,
                required: true,
            },
            title: {
                type: String,
                required: true,
            },

        }
    ]
})
let reacmmendData = mongoose.model("reacmmendData", recommendSchema)
module.exports = {
    recommendTable:reacmmendData
}