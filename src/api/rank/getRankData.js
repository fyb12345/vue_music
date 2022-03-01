const {rankTable} = require("./rankTable");

module.exports={
    getRankData:function (req,res) {
        rankTable.find({
        }).then((data)=>{
            res.send(data)
        })
    }
}