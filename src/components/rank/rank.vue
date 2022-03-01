<template>
  <div ref="rank" class="rank">
    <scroll ref="toplist" :data="topList" class="toplist">
      <ul>
        <li v-for="(item,index) in topList" v-bind:key="index" class="item" @click="selectItem(item)">
          <div class="icon">
            <img :src="item.picUrl" alt="图片" height="100" width="100"/> <!-- 排行榜类别的图片 -->
          </div>
          <ul class="songlist">
            <li v-for="(song,index) in item.songlist" v-bind:key="index" class="song">
              <span>{{ index + 1 }}</span>
              <span>{{ song.songName }}-{{ song.singerName }}</span>
            </li>
          </ul>
        </li>
      </ul>
      <div v-show="!topList.length" class="loading-container">
        <loading></loading>
      </div>
    </scroll>
    <router-view></router-view>
  </div>
</template>

<script>
import Scroll from "../base/scroll"
import Loading from '../base/loading'
import {playlistMixin} from '@/common/js/mixin'
import axios from "axios";
import {mapMutations} from "vuex";

export default {
  mixins: [playlistMixin],
  created() {
    axios.get(`${this.basePath}api/getRankData`).then((data) => {
      this.topList = data.data
    })
  },
  data() {
    return {
      topList: []
    }
  },
  methods: {
    ...mapMutations({
      setTopList: "SET_TOPLIST"
    }),
    handlePlaylist(playlist) {
      this.$refs.rank.style.bottom = playlist.length > 0 ? '60px' : ''
      this.$refs.toplist.refresh()
    },
    selectItem(item) {

      axios.get(`${this.basePath}api/getRankDetailData/${item.topId}`).then((data) => {
        this.$router.push({
          path: `/rank/${item.topId}`
        });
        this.setTopList(data.data);
      })

    }
  },
  components: {
    Scroll,
    Loading
  }
}
</script>

<style lang="stylus" scoped>

@import "../../common/stylus/variable.styl"
@import "../../common/stylus/mixin.styl"

.rank
  position: fixed
  width: 100%
  top: 88px
  bottom: 0

  .toplist
    height: 100%
    overflow: hidden

    .item
      display: flex
      margin: 0 20px
      padding-top: 20px
      height: 100px

      &:last-child
        padding-bottom: 20px

      .icon
        flex: 0 0 100px
        width: 100px
        height: 100px

      .songlist
        flex: 1
        display: flex
        flex-direction: column
        justify-content: center
        padding: 0 20px
        height: 100px
        overflow: hidden
        background: $color-highlight-background
        color: $color-text-d
        font-size: $font-size-small

        .song
          no-wrap()
          line-height: 26px

    .loading-container
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>