<template>
  <div id="app">
    <MHeader></MHeader>
    <tab></tab>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import MHeader from "./components/m-header/m-header"
import tab from "./components/tab/tab";

export default {
  name: 'App',
  components: {
    MHeader,
    tab
  },
}
</script>

<style lang="stylus" scoped>
@import './common/stylus/variable.styl';

#app
  color: $color-theme;
</style>
