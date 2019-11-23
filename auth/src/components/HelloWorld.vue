<template>
  <div class="hello">
    <button type="button" @click="onTest">통신 테스트</button>
  </div>
</template>

<script>
import { testCall } from '../service/test';

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  methods:{
    async onTest(){
      const test = await testCall();
      console.log(test);
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
