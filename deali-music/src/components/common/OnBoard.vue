<template>
    <div class="on-board">
        <div class="on-board-container">
            온보드 영역
        </div>
    </div>
</template>

<script>
export default {
    name: 'OnBoard',
}
</script>

<style lang="scss" scoped>
.on-board{
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: rgba(0,0,0, .5);
    display: flex;
    align-items: center;
    justify-content: center;
    
    &-container{
        position: absolute;
        width: 600px;
        height: 600px;
        background-color: $White;
        border: none;
    }
}
   
</style>