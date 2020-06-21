<template>
    <div class="on-board" v-if="value">
        <div class="on-board-container">
            <img :src="nowImage" class="board-img" />
            <div>
                <button>이전</button>
                <button @click="nowView++">다음</button>
            </div>
        </div>
    </div>
</template>

<script>
import BoardImg1 from '@/assets/images/Dealibeat_1(x2).png';
import BoardImg2 from '@/assets/images/Dealibeat_2(x2).png';
import BoardImg3 from '@/assets/images/Dealibeat_3(x2).png';
import BoardImg4 from '@/assets/images/Dealibeat_4(x2).png';
import { ref, computed } from '@vue/composition-api';



export default {
    name: 'OnBoard',
    props: {
        value: {
            type: Boolean,
            default: false,
        },
    },
    setup(_, { root, emit }) {
        const nowView = ref(1);
        const nowImage = computed(() => {
            if (nowView.value === 1 ) return BoardImg1;
            if (nowView.value === 2 ) return BoardImg2;
            if (nowView.value === 3 ) return BoardImg3;
            if (nowView.value === 4 ) return BoardImg4;
            if (nowView.value > 4) {
                root.$cookies.set('board', true, '1y');
                emit('input', false);
                return;
            }
        });
        return {
            nowImage,
            nowView,
        };
    },
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

        .board-img {
            width: 600px;
        }
    }
}
   
</style>