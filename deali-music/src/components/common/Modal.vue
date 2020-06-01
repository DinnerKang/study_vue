<template>
    <div v-if="value" class="modal_container">
        <div class="modal_area" :style="{ width: width + 'px', height: height + 'px'}">
            <div class="close_area">
                <img class="close_icon" :src="closeIcon" @click="closeModal" alt="닫기" />
            </div>
            <slot></slot>
        </div>
        <div class="background_area" @click="closeModal" />
    </div>
</template>

<script>
import closeIcon from "@/assets/icons/Icon_close_20x20(x2).png";

export default {
    name: "Modal",
    props: {
        value: {
            type: Boolean,
            default: false
        },
        width: {
            type: Number,
            default: 720
        },
        height: {
            type: Number,
            default: 360
        },
        disabled: {
            type: Boolean,
            default: false,
        },
    },
    setup(props, { emit }) {
        const closeModal = () => {
            if (props.disabled) return;
            emit("input", false);
        };
        return {
            closeModal,
            closeIcon
        };
    }
};
</script>

<style lang="scss" scoped>
.modal_container {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    z-index: 500;

    .modal_area {
        position: absolute;
        width: 600px;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        background-color: $Black;
        z-index: 3;
        border: 2px solid $Main;

        .close_area {
            width: 100%;
            height: 30px;
            padding-right: 10px;
            margin-bottom: 30px;
            display: flex;
            align-items: center;
            border-bottom: 1px solid $Main;
            box-sizing: border-box;
            justify-content: flex-end;

            .close_icon {
                width: 15px;
                height: 15px;
                cursor: pointer;
            }
        }
    }

    .background_area {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        top: 0;
        background-color: rgba(0, 0, 0, 0.6);
    }
}
</style>