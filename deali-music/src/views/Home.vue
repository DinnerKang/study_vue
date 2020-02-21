<template>
  <div class="home">
    <section class="my_play_list">
      <h2>
        마이 플레이리스트
      </h2>
      <div class="group_list">
        <article >
          <group-list></group-list>
        </article>
        <article>
          <group-list></group-list>
        </article>
      </div>
    </section>
    <section class="recomend_play_list">
      <h2>
        추천 플레이리스트
      </h2>
      <div class="group_list">
        <article >
          <group-list :width="'208'" :height="'90'" :is-outside="true"></group-list>
        </article>
        <article>
          <group-list :width="'208'" :height="'90'" :is-outside="true"></group-list>
        </article>
        <article>
          <group-list :width="'208'" :height="'90'" :is-outside="true"></group-list>
        </article>
        <article>
          <group-list :width="'208'" :height="'90'" :is-outside="true"></group-list>
        </article>
      </div>
    </section>
  </div>
</template>

<script>
import GroupList from '@/components/List/GroupList';

export default {
  components: {
    GroupList,
  }
}
</script>

<style lang="scss" scoped>
  .home{
    margin: 0 auto;
    
    section{
      margin-top: 64px;

      h2{
        font-size:28px;
        margin-bottom: 32px;
      }
      .group_list{
        display: flex;
        justify-content: space-between;
      }
    }
    .my_play_list{
      margin-bottom: 48px;
    }
  }
</style>
