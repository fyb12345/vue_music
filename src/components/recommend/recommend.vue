<template>
  <div ref="recommend" class="recommend">
    <scroll class="recommend-content" v-bind:data="disclist" ref="list">
      <div><!-- 滚动插件里面需要加一个子元素, 让内部的元素撑开高度 -->
        <div ref="sliderWrapper" class="slider-wrapper">
          <slider>
            <div v-for="item in sliderRecommends" v-bind:key="item.id" v-on:click="selectItem(item)">
              <a>
                <img alt="" v-bind:src="item.cover">
              </a>
            </div>
          </slider>
        </div>
        <div class="recommend-list">
          <h1 class="list-title">热门歌单推荐</h1>
          <ul>
            <li v-for="item in disclist" v-bind:key="item.id" class="item" v-on:click="selectItem(item)">
              <div class="icon">
                <img height="60" v-bind:src="item.cover" width="60" alt="cover">
              </div>
              <div class="text">
                <h2 class="name" v-html="item.category"></h2>
                <p class="desc" v-html="item.title"></p>
              </div>
            </li>
          </ul>
        </div>
      </div>


      <div class="loading-container" v-show="!disclist.length"><!-- 在获取到数据之前加载 -->
        <loading></loading>
      </div>
    </scroll>

    <router-view></router-view>
  </div>
</template>

<script>
import axios from "axios"
import Slider from "../base/slider"
import scroll from "../base/scroll";
import loading from "../base/loading";

export default {
  data() {
    return {
      sliderRecommends: [],//存放轮播的推荐信息,
      disclist: []
    }
  },
  computed: {},
  beforeCreate() {
    console.log("创建组件之前")
    axios.get(`${this.basePath}api/getRecommendData`)
        .then((data) => {
          console.log(111111111111111111111)
          this.sliderRecommends = data.data.shift().categoryList;//第一个歌单列表作为轮播图的部分
          data.data.forEach(item => {//剩余的数据 作为剩下的列表部分
            item.categoryList.forEach(item1 => {//获取列表里面的核心数据
              item1.category = item.category;//每个单独的数据,保存一下这个歌单的父类数据
              this.disclist.push(item1);
            });
          });
        })
  },
  mounted() {
    console.log(this.$refs)
  },
  methods: {
    handlePlaylist(playlist) {
      // 监听是否得到了playlist的值
      this.$refs.recommend.style.bottom = playlist.length > 0 ? "50px" : "";
      this.$refs.list.refresh();
    },
    selectItem(item) {
      axios.get(`${this.basePath}api/getRecommendDetailData/${item.id}`).then( (data)=>{
        console.log(data)
        this.$router.push(`/recommend/${item.id}`)
      }).catch((err) => {
        if (err) throw  err;
      })

    }
  },
  components: {
    Slider,
    scroll,
    loading
  }
}

</script>
<style lang="stylus" scoped>
@import "../../common/stylus/variable.styl"

.recommend
  position: fixed
  width: 100%
  top: 88px
  bottom: 0

  .recommend-content
    height: 100%
    overflow: hidden

    .slider-wrapper
      position: relative
      width: 100%
      overflow: hidden

    .recommend-list
      .list-title
        height: 65px
        line-height: 65px
        text-align: center
        font-size: $font-size-medium
        color: $color-theme

      .item
        display: flex
        box-sizing: border-box
        align-items: center
        padding: 0 20px 20px 20px

        .icon
          flex: 0 0 60px
          width: 60px
          padding-right: 20px

        .text
          display: flex
          flex-direction: column
          justify-content: center
          flex: 1
          line-height: 20px
          overflow: hidden
          font-size: $font-size-medium

          .name
            margin-bottom: 10px
            color: $color-text

          .desc
            color: $color-text-d

    .loading-container
      position: absolute
      width: 100%
      top: 80%
      transform: translateY(-50%)
</style>