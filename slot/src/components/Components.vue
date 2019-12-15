<template>
  <div class="hello">
    <navigation-link url="/profile">
      Your Profile
    </navigation-link>  
  </div>
</template>

<script>
import navigationLink from './navigationLink';
export default {
  name: 'HelloWorld',
  components: {
    navigationLink,
  },
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
