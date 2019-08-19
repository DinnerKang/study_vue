<template>
    <div>
        <button v-on:click="helloWorld">자식 버튼</button>
    </div>
</template>

<script>
export default {
    methods:{
        helloWorld(){
            this.$emit('hello-world', '안녀엉');
        }
    }
}
</script>

<style scoped>

</style>
