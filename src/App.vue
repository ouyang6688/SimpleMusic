<template>
  <div id="app">
    <HeaderNav v-if="!$route.meta.headerfalg" @showOr-p="showOr"></HeaderNav>
    <router-view v-show="falg"></router-view>
  </div>
</template>

<script>
import HeaderNav from "./components/header/HeaderNav";


export default {
  name: "App",
  data() {
    return {
      falg: true,
    }
  },
  components: {
    HeaderNav,

  },
  methods: {
    showOr(data) {
      // console.log(data)
      this.falg = !data;
    },
  }
}
</script>

<style lang="less">
@import "assets/css/base.css";

</style>
