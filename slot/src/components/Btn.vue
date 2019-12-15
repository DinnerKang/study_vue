<template>
    <Button class="btn">
        <slot></slot>
    </Button>
</template>

<script>
export default {
    
}
</script>

<style scoped>
    .btn{
        width: 120px;
        height: 40px;
        border: none;
        background-color: salmon;
        color: black;
        margin: 0 10px;
    }
</style>