<template>
    <div class="todo-container">
        <h2>To Do List 만들기</h2>
    </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
    name: 'todo',
});
</script>

<style lang="scss" scoped>
    .todo-container{
        width: 100%;
        height: 100vh;
    }
</style>