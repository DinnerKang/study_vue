<template>
  <div class="home">
    <search-bar class="search_bar"></search-bar>
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
import SearchBar from '../components/Search/SearchBar';

export default {
  components: {
    MelonList,
    SearchBar,
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
