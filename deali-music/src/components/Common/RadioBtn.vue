<template>
    <button class="radio_btn" @click="clickBtn()">
        <img v-if="value === keyValue" class="btn_img" :src="checkIcon" alt="라디오 버튼" />
        <img v-else class="btn_img" :src="disableIcon" alt="라디오 버튼" />
        <slot></slot>
    </button>    
</template>



<script>
const iconData = () => {
    const checkIcon = require('../../assets/icons/check-icon.png');
    const disableIcon = require('../../assets/icons/empty-icon.png');

    return {
        checkIcon,
        disableIcon,
    }   
}

export default {
    name: 'radio-btn',
    props: {
        value: {},
        keyValue : {},
    },
    setup(props, { emit }) {

        const clickBtn = () => {
            console.log(props);
            emit('input', props.keyValue);
        }

        return {
            clickBtn,
            ...iconData(),
        }
    }
}
</script>

<style lang="scss" scoped>
    .radio_btn{
        border: none;
        display: inline-flex;
        align-items: center;
        height: 19px;
        outline: none;
        padding: 0;
        font-size: 15px;
        font-weight: bold;
        cursor: pointer;

        .btn_img{
            width: 19px;
            margin-right: 7px;
        }
    }

</style>