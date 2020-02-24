<template>
    <div v-if="isOpen" class="modal_container">
        <div class="modal_area">
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
            height: 600px;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            background-color: $White;
            z-index: 3;
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