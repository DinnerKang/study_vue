<template>
  <div class="hello">
    hi
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

class simpleClass {
    id: number;
    print() : void {
      console.log('hi', this.id);
    }
  }

@Component
export default class HelloWorld extends Vue {

  clickEvent() {
      let a = 2;
        console.log('1 :', a);
      if (a==2) {
          let a = 123; 
          console.log('2 :', a);
      }
      console.log('3 :', a);
  }

  concatString(a,b, c?) {
      console.log(a + b + c);
  }
  
  
  created() {
      this.clickEvent();
      let mySimple = new simpleClass();
      mySimple.id = 1;
      mySimple.print();
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
