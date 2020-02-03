<template>
  <div class="home">
    <div>
      <router-link to="/myPage">마이페이지</router-link>
    </div>
    <div>
      <router-link to="/lounge">라운지</router-link>
    </div>
    <section class="melon_container">
      <article>
        <melon-list></melon-list>
      </article>
    </section>
  </div>
</template>

<script>
import MelonList from '../components/List/MelonList';

export default {
  components: {
    MelonList,
  },
  

}
</script>
<style lang="scss" scoped>
  .home{
    text-align: center;

    .melon_container{
      width: 50%;
    }
  }
</style>
