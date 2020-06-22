<template>
    <div class="on-board" v-if="value">
        <div class="on-board-container">
            <img :src="nowImage" class="board-img" />
            <div class="button-area">
                <img class="btn" :src="prevButton" alt="이전" @click="clickButton(-1)" />
                <ul class="bar-area">
                    <li class="bar" :class="{ active: nowView === 1 }" />
                    <li class="bar" :class="{ active: nowView === 2 }" />
                    <li class="bar" :class="{ active: nowView === 3 }" />
                    <li class="bar" :class="{ active: nowView === 4 }" />
                </ul>
                
                <img class="btn" :src="nextButton" alt="다음" @click="clickButton(1)" />
            </div>
        </div>
    </div>
</template>

<script>
import BoardImg1 from '@/assets/images/Dealibeat_1(x2).png';
import BoardImg2 from '@/assets/images/Dealibeat_2(x2).png';
import BoardImg3 from '@/assets/images/Dealibeat_3(x2).png';
import BoardImg4 from '@/assets/images/Dealibeat_4(x2).png';
import prevButton from '@/assets/images/back_button(x2).png';
import nextButton from '@/assets/images/next_button(x2).png';
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
        const clickButton = (num) => {
            if (nowView.value === 1 && num === -1) return; 
            nowView.value = nowView.value + num;
        };
        return {
            nowImage,
            nowView,
            clickButton,
            nextButton,
            prevButton,
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
        position: relative;
        width: 600px;
        height: 614px;
        background-color: $White;
        border: none;
        border-radius: 12px;
        box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.8);

        .button-area{
            position: absolute;
            display: flex;
            align-items: center;
            justify-content: space-between;
            bottom: 32px;
            width: 100%;
            padding: 0 56px;
            box-sizing: border-box;

            .btn {
                width: 70.5px;
                height: 28px;
                cursor: pointer;
            }
            .bar-area{
                display: flex;

                .bar {
                    width: 8px;
                    height: 8px;
                    border-radius: 3px;
                    background-color: $Black;
                    margin: 0 9px;
                }
                .active{
                    background-color: $Main;
                }
            }
        }

        .board-img {
            width: 600px;
        }
    }
}
    
   
</style>