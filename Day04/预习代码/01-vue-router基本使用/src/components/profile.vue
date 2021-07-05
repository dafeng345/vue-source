<template>
  <div>
    <h2>我是档案标题</h2>
    <p>params: {{$route.params}}</p>
    <p>query: {{$route.query}}</p>
  </div>
</template>

<script>
  export default {
    name: "profile",
    mounted() {
      console.log(this.$router);
      console.log(this.$route);
    }
  }
</script>

<style scoped>

</style>
