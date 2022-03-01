<template>
  <!-- 增加个转场动画 -->
  <transition name="slide">
    <musicList v-bind:bgImage="bgImage" v-bind:itemid="mid" v-bind:title="title" v-bind:songList="songList"></musicList>
  </transition>
</template>
<script>
import musicList from "../music-list/music-list";
import {mapGetters} from "vuex";
import axios from "axios";

export default {
  name: "singer-details",
  components: {
    musicList
  },
  directives: {},
  data() {
    return {
      songList: [],
    }
  },
  computed: {
    ...mapGetters([
      "singer"
    ]),
    title() {
      return this.singer.singer_name
    },
    bgImage() {
      return this.singer.singer_pic
    },
    mid() {
      return this.singer.singer_mid
    }
  },
  mounted() {
  },
  created() {
    this._getDetail(this.mid)
  },
  methods: {
    _getDetail(mid) {
      let data = {
        mid: mid
      };
      axios.post(`${this.basePath}api/getSingerDetailData`, JSON.stringify(data))
          .then((data) => {
            console.log(data)
            this.songList=data.data.songList;
          })
    },

  },
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.slide-enter-active, .slide-leave-active
  transition: all 0.3s

.slide-enter, .slide-leave-to
  transform: translate3d(100%, 0, 0)
</style>