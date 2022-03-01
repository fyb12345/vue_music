<template>
  <div id="app">
    <MHeader></MHeader>
    <tab></tab>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <player></player>
  </div>
</template>

<script>
import MHeader from "./components/m-header/m-header"
import tab from "./components/tab/tab";
import player from "./components/player/player"
export default {
  name: 'App',
  components: {
    MHeader,
    tab,
    player
  },
}
</script>

<style lang="stylus" scoped>
@import './common/stylus/variable.styl';

#app
  color: $color-theme;
</style>
