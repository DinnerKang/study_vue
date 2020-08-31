<template>
    <div id="app">
        <default />
        <percent />
    </div>
</template>

<script>
import Default from "./components/Default.vue";
import Percent from '@/components/Percent.vue';

export default {
    name: "App",
    components: {
        Default,
        Percent,
    }
};
</script>

<style>
li,
ul {
    list-style: none;
    padding: 0;
    margin: 0;
}
</style>
