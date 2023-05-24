<template>
  <div id="app">
    <the-header-nav-bar></the-header-nav-bar>
    <router-view></router-view>
  </div>
</template>

<script>
import TheHeaderNavBar from "./components/TheHeaderNavBar.vue";

export default {
  name: "app",
  components: { TheHeaderNavBar },
};
</script>
<style>
@font-face {
  font-family: "Delivery";
  src: url(assets/fonts/BMHANNAAir_otf.otf) format("woff2");
  /* 다른 웹 폰트 파일 포맷도 필요에 따라 추가 */
  /* 경로(path/to/font-file)는 실제 파일 경로로 수정해야 합니다. */
}

#app {
  font-family: "Delivery", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
