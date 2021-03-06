const request = require("request")
const {recommendTable} =require('./recommendTable')

request({
    method: "GET",
    url: "https://u.y.qq.com/cgi-bin/musicu.fcg",
    qs: {
        cgiKey: "GetHomePage",
        _: "1577109374807",
        data: `{"comm":{"g_tk":583387737,"uin":3003436226,"format":"json","inCharset":"utf-8","outCharset":"utf-8","notice":0,"platform":"h5","needNewCode":1},"MusicHallHomePage":{"module":"music.musicHall.MusicHallPlatform","method":"MobileWebHome","param":{"ShelfId":[101,102,161]}},"hotkey":{"module":"tencent_musicsoso_hotkey.HotkeyService","method":"GetHotkeyForQQMusicMobile","param":{"remoteplace":"txt.miniapp.wxada7aab80ba27074","searchid":"1559616839293"}}}`
    }
},async (err,res,body)=>{
        if (err) throw err;
        await recommendTable.deleteMany({})
        let data=JSON.parse(body).MusicHallHomePage.data.v_shelf;

        data.forEach((item)=>{

            let  category=item.title_template;//获取分区
            let categoryList=item.v_niche[0].v_card;//获取分区的全部歌单列表
            let arr=[];
            categoryList.forEach((ite)=>{
                if (!ite.time){
                    arr.push({
                        id:ite.id,
                        cover:ite.cover,
                        title:ite.title
                    })
                }
            })
            if (arr.length!==0){
                recommendTable.create({
                    category:category,
                    categoryList:arr
                }).then(()=>{
                    console.log('写入数据库成功')
                }).catch(()=>{
                    console.log("写入数据库失败")
                })
            }

        })
})