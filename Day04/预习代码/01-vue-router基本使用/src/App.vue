<template>
  <div id="app">
    <h1>我是网站的标题</h1>
    <router-link to="/home">首页</router-link>
    <router-link to="/about">关于</router-link>
    <!--<router-link-->
      <!--:to="{-->
        <!--path: '/profile/' + 123,-->
        <!--query: {name: 'why', age: 18}-->
      <!--}"-->
    <!--&gt;档案</router-link>-->
    <button @click="toProfile">档案</button>
    <router-view class="content"></router-view>
    <h2>我是APP中一些底部版权信息</h2>
  </div>
</template>

<script>

export default {
  name: 'App',
  methods: {
    toProfile() {
      this.$router.push({
        path: '/profile/' + 123,
        query: {name: 'why', age: 18}
      })
    }
  }
}
</script>

<style>
  .content {
    background-color: #f0f0f0;
  }
</style>
