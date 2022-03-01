const {singerTable} = require("./singerTable")

module.exports = {
    getSingerData: function (req, res) {
        let reqData = {...req.body, ...req.query}

        let page=JSON.parse(reqData.page)
        console.log(page)
        singerTable.find({}, {
            _id: false,
            __v: false
        }, {
            limit: page.showCount,//查找几条
            skip: page.showCount*page.currentPage, //从几开始
        }).then((data) => {
            let addData={
                data:data,
                page:page,
            }
            res.send(JSON.stringify(addData));
        }).catch((err)=>{
            console.log(err)
        })
    }
}