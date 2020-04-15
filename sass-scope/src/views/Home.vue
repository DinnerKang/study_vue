<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <parent />
  </div>
</template>

<script>
// @ is an alias to /src
import Parent from '@/components/home/Parent.vue'

export default {
  name: 'Home',
  components: {
    Parent
  }
}
</script>
