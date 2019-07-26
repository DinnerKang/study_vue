<template>
  <div id="app">
    <HelloWorld/>
    <ByWorld/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import ByWorld from './components/ByWorld'

export default {
  name: 'app',
  components: {
    HelloWorld,
    ByWorld
  }
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
