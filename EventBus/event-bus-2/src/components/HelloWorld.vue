<template>
  <div>
    <ByWorld @hello-world="childMsg" ></ByWorld>
    {{msg}}
  </div>
</template>

<script>
import ByWorld from './ByWorld';

export default {
  name: 'HelloWorld',
  components:{
    ByWorld
  },
  data(){
    return{
      msg: '',
    }
  },
  methods:{
    childMsg(payload){
      this.msg = payload;
    }
  }
}
</script>

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
