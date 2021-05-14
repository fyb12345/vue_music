const request = require('request')
const {detailTable} = require("./detailTable");
const jsdom = require("jsdom");
const {JSDOM} = jsdom;


let getRecommendDetailData= function (req, res) {
    request({
        method: "GET",
        url: "https://i.y.qq.com/n2/m/share/details/taoge.html",
        qs: {
            ADTAG: "myqq",
            from: "myqq",
            channel: "10007100",
            id: req.params.id
        }
    }, function (err, response, body) {
        console.log('链接成功')
        if (err) throw err;
        detailTable.find({
            id: req.params.id
        }).then((data) => {
            if (data.length === 0) {
                const dom = new JSDOM(body, {runScripts: "dangerously"});
                let songlist = dom.window.firstPageData;
                //查询是否已存在数据
                let finalData = {};
                finalData.id = req.params.id;
                finalData.cover = songlist.taogeData.picurl || songlist.taogeData.headurl; //设置封面
                finalData.title = songlist.taogeData.title; //设置专辑标体
                finalData.tag = []; //预设一个空的数据,存储专辑类型
                finalData.songlist = []; //预设一个空的数据,存储专辑歌曲列表
                songlist.taogeData.tag.forEach(item => {
                    finalData.tag.push({
                        id: item.id,
                        name: item.name
                    });
                });
                songlist.taogeData.songlist.forEach(item => {
                    let singer = [];
                    item.singer.forEach(ite => {
                        if (ite.mid && ite.name && ite.title) {
                            singer.push(ite);
                        }
                    });
                    if (item.mid && item.name && songlist.taogeData.title) {
                        finalData.songlist.push({
                            songMid: item.mid,
                            songName: item.name,
                            songAlbum: songlist.taogeData.title,
                            singer: singer
                        });
                    }

                });
                res.send(JSON.stringify(finalData));
                detailTable.create(finalData);
            } else {
                res.send(JSON.stringify(data))
            }
        }).catch((err) => {
            if (err) throw  err;
        })
    })

}


module.exports={
    getRecommendDetailData
}