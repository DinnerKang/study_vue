<template>
  <div class="hello">
    <button v-on:click="clickBtn">HelloWorld</button>
    <button v-on:click="changeComponent">Change Component</button>
    <ByWorld v-if="isComponent"></ByWorld>
  </div>
</template>

<script>
import EventBus from '../EventBus';
import ByWorld from './ByWorld'

export default {
  name: 'HelloWorld',
  components:{
    ByWorld
  },
  data(){
    return{
      isComponent : true,
    }
  },
  methods:{
    clickBtn(){
      EventBus.$emit('push-msg', '안녕');
    },
    changeComponent(){
      this.isComponent = !this.isComponent;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
