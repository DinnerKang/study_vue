<template>
  <div class="home">
    <div>
      <router-link to="/myPage">마이페이지</router-link>
    </div>
    <show-list></show-list>
  </div>
</template>

<script>
import ShowList from "../components/List/ShowList";

export default {
  components: {
    ShowList
  },
}
</script>

<style lang="scss" scoped>
  .home{
    text-align: center;
  }
</style>
