<template>
  <div id="app">
    <Components></Components>
  </div>
</template>

<script>
import Components from './components/Components';

export default {
  name: 'app',
  components: {
    Components
  },
}

</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
