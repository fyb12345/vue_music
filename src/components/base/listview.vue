<template>
  <div class="listview">
    <scroll
        :listen-scroll="listenScroll"
        :probe-type="probeType"
        :data="data"
        :pullup="true"
        class="listview"
        ref="listview"
    @scrollToEnd="scrollToEnd">
      <uL>
        <li @click="selectItem(item)" v-for="item in data" class="list-group-item" v-bind:key="item.singer_mid"
            ref="listGroup">
          <img class="avatar" v-bind:src="item.singer_pic" alt="图片">
          <span class="name">{{item.singer_name}}</span>
        </li>
      </uL>
      <div v-show="!data.length" class="loading-container">
        <loading></loading>
      </div>
    </scroll>
  </div>
</template>

<script>
import scroll from "./scroll";
import loading from "./loading";
export default {
  name: "listview",
  components: {
    scroll,
    loading
  },
  props:{
    data: {
      type: Array
    }
  },
  created() {
    this.probeType = 3;
    this.listenScroll = true;
  },
  directives: {},
  data() {
    return {}
  },
  computed: {},
  mounted() {
  },
  methods: {
    selectItem(item) {
      this.$emit('select', item);//给父组件数据
    },
    refresh() {//控制重新渲染
      this.$refs.listview.refresh()
    },
    _calculateHeight() {//计算高度
      this.listHeight = [];
      const list = this.$refs.listGroup;//获取元素列表
      let height = 0//初始高度
      this.listHeight.push(height)
      for (let i = 0; i < list.length; i++) {
        let item = list[i]
        height += item.clientHeight//叠加
        this.listHeight.push(height)//获得列表的总高度
      }
    },
    scrollToEnd(){
      this.$emit('scrollToEnd',);//给父组件数据
    }
  },
  watch: {
    data() {
      setTimeout(() => {//获得数据后重新更新数据
        this._calculateHeight()
      }, 20)
    }
  },
}
</script>

<style lang="stylus" scoped>
@import "../../common/stylus/variable.styl"
.listview
  position: relative
  width: 100%
  height: 100%
  overflow: hidden
  background: $color-background

  .list-group-item
    display: flex
    align-items: center
    padding: 20px 0 0 30px

    .avatar
      width: 50px
      height: 50px
      border-radius: 50%

    .name
      margin-left: 20px
      color: $color-text-l
      font-size: $font-size-medium

  .loading-container
    position: absolute
    width: 100%
    top: 50%
    transform: translateY(-50%)
</style>