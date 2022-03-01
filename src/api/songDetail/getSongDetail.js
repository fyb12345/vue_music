const request = require("request");
const {JSDOM} = require("jsdom");
const {songTable} = require("./songTable")
module.exports = {
  getSongDetail: function (req, res) {
    console.log("getSongDetail api 运行")
    let body = JSON.parse(Object.keys(req.body)[0]);//s 数据格式转化
    songTable.find({
      songMid: body.mid
    }).then((data) => {
      // eslint-disable-next-line no-console
      console.log(body.mid);
      if (Number(data) === 0) {
        // eslint-disable-next-line no-console
        console.log("此时数据库中无数据");
        request({
          method: "GET", url: "https://i.y.qq.com/v8/playsong.html", qs: {
            songmid: body.mid, _qmp: 0,
          }, headers: {
            "user-agent": `Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1`
          }
        }, function (err, response, body) {
          let dom = new JSDOM(body, {runScripts: "dangerously"});
          // eslint-disable-next-line no-console
          let songData = dom.window.__ssrFirstPageData__.songList[0];
          console.log(songData.url)

          let finalData = {
            songMid: songData.mid,
            m4aUrl: songData.url,
            songName: songData.name,
            playTime: songData.interval,
            songPic: dom.window.__ssrFirstPageData__.metaData.image
          };

          // eslint-disable-next-line no-console
          console.log(finalData);
          res.send(finalData);
          if (songData.url) songTable.create(finalData);


        });
      } else {
        // eslint-disable-next-line no-console
        console.log("此时数据库中有数据");
        res.send(data);
      }
    })
  }
}
