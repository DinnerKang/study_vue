<template>
    <div v-if="isOpen" class="modal_container">
        <div class="modal_area" :style="{ width: width + 'px', height: height + 'px'}">
            <div class="close_area">
                <div class="close_icon" @click="closeModal"></div>
            </div>
            <slot></slot>
        </div>
        <div class="background_area" @click="closeModal" />
    </div>
</template>

<script>

export default {
    name: 'Modal',
    props: {
        isOpen: {
            type: Boolean,
            default: false,
        },
        width: {
            type: Number,
            default: 720,
        },
        height: {
            type: Number,
            default: 360,
        }
    },
    setup(props, { emit }) {

        const closeModal = () => {
            emit('close-modal');
        }

        return {
            closeModal,
        }
    },
}
</script>

<style lang="scss" scoped>
    .modal_container{
        position: fixed;
        left:0;
        right:0;
        bottom: 0;
        top:0;
        z-index: 500;

        .modal_area{
            position: absolute;
            width: 600px;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            background-color: $White;
            z-index: 3;

            .close_area{
                width: 100%;
                height: 20px;
                padding-left: 10px;
                margin-bottom: 30px;
                display: flex;
                align-items: center;
                border-bottom: 1px solid $Gray400;
                box-sizing: border-box;

                .close_icon{
                    width: 10px;
                    height: 10px;
                    border-radius: 50%;
                    background-color: #fa8282;
                    cursor: pointer;
                }
            }
        }

        .background_area{
            position: absolute;
            left:0;
            right:0;
            bottom: 0;
            top:0;
            background-color: rgba(0, 0, 0, 0.6);
        }
    }
</style>