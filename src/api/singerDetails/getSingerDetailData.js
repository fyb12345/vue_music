const request = require("request");
const {JSDOM} = require("jsdom");
const {singerDetailTable} = require("./singerDetailTable");
module.exports = {
    getSingerDetailData: function (req, res,) {
        let body = JSON.parse(Object.keys(req.body)[0]);//s 数据格式转化
        singerDetailTable.find({
            singer_mid: body.mid
        }).then((data) => {
            if (Number(data) === 0) {
                console.log("此时数据库中无数据");
                request({
                    method: "GET",
                    url: "https://i.y.qq.com/n2/m/share/profile_v2/index.html",
                    qs: {
                        ADTAG: "myqq",
                        "from": "myqq",
                        channel: "10007100",
                        singermid: body.mid,
                    }
                }, function (err, response, body) {
                    let dom = new JSDOM(body, {runScripts: "dangerously"});
                    let firstPageData = dom.window.firstPageData;
                    let finalData = {};
                    //基本的歌手信息

                    finalData.singer_name = firstPageData.data.name;//歌手名称
                    finalData.singer_mid = firstPageData.data.singerMid;//歌手mid
                    finalData.singer_pmid = firstPageData.data.singerPMid;//歌手mid
                    finalData.singer_id = firstPageData.data.singerId;//歌手id
                    finalData.singerDesc = firstPageData.data.certificateJumpInfoV2?firstPageData.data.certificateJumpInfoV2.wiki:"暂无信息";//歌手简介
                    finalData.songTotalNumber = firstPageData.data.visitorNum;//歌手歌曲总数
                    finalData.fansTotalNumber = firstPageData.data.fansNum;//歌手粉丝总数
                    //具体的歌曲信息
                    finalData.songList = [];//预存 歌曲信息列表
                    firstPageData.data.tabInfo.list.forEach((item) => {
                        finalData.songList.push({
                            songName: item.name,
                            songMid: item.mid,
                            songAlbum: item.album.name
                        })
                    })
                    res.send(finalData);
                    singerDetailTable.create(finalData).then(() => {
                        // eslint-disable-next-line no-console
                        console.log("数据库写入成功");
                    });
                })
            } else {
                // eslint-disable-next-line no-console
                console.log("此时数据库中有数据");
                res.send(data[0]);
            }
        })
    }
};

