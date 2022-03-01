<template>
  <div class="singer">
    <listview ref="list" :data="singerList" v-on:select="selectSinger" v-on:scrollToEnd="scrollToEnd"></listview>
      <router-view></router-view>
  </div>
</template>

<script>
import axios from "axios";
import listview from "../base/listview";
import {mapMutations} from "vuex"
export default {
  name: "singer",
  components: {
    listview
  },
  directives: {},
  data() {
    return {
      page: this.pageData,
      singerList: [],
    }
  },
  computed: {},
  mounted() {
  },
  methods: {
    selectSinger(singerItem) {
      this.$router.push({//路由跳转
        path:`/singer/${singerItem.singer_mid}`,
      })
      this.setsinger(singerItem);//添加数据
    },
    ...mapMutations({ //获取
      setsinger:"SET_SINGER"
    }),
    getSingerData(){
      this.page.currentPage++
      axios.get(`${this.basePath}api/getSingerData`, {
        params: {
          page: this.page
        }
      }).then((res) => {
        if (res.data.data.length!==0){
          this.singerList =[...this.singerList,...res.data.data]
          this.page=res.data.page
        }
      })
    },
    scrollToEnd(){
      this.getSingerData()
    }
  },
  created() {
    console.log("创建组件之前")
    this.getSingerData()
  },
}

</script>

<style lang="stylus" scoped>
.singer
  position: fixed
  top: 88px
  bottom: 0
  width: 100%
</style>