<template>
  <div id="home">
    <h2>我是首页标题</h2>
    <router-link to="/home/message">消息</router-link>
    <router-link to="/home/news">新闻</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
      name: "home"
  }
</script>

<style scoped>
  #home {
    background-color: #f0f0f0;
  }
</style>
