<template>
  <div class="hello">
    {{a}} <br />
    {{b}} <br />
    {{c}}
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

const enum DoorState {
  Open,
  Close,
  Ajar,
}

@Component
export default class HelloWorld extends Vue {

  a = DoorState.Open;
  b = DoorState;
  c = DoorState['Close'];
  
  created(){
    console.log(DoorState.Open);
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
