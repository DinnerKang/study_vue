<template>
    <div class="on-board">
        <div class="on-board-container">
            <img :src="nowImage" class="board-img" />
            <h3>{{ boardText[nowView].mainText }}</h3>
            <pre>
                {{ boardText[nowView].subText }}
            </pre>
        </div>
    </div>
</template>

<script>
import BoardImg0 from '@/assets/images/Dealibeat_1(x2).png';
import BoardImg1 from '@/assets/images/Dealibeat_2(x2).png';
import { ref, computed } from '@vue/composition-api';


const boardText = [
    {
        mainText: '웰컴 투 딜리비트',
        subText: '딜리셔스 DJ가 되어보세요!<br />딜리비트는 라운지 음악을 컨트롤할 수 있는 스트리밍 서비스입니다.',
    },
    {
        mainText: '로그인하기',
        subText: '딜리셔스 이메일 계정으로 로그인해 주세요.<br />하단에 재생목록을 관리하는 컨트롤 바가 나타납니다.',    
    },
    {   
        mainText: '음악 검색하기',
        subText: '상단 검색창에 듣고 싶은 음악을 검색해 주세요. <br />듣고 싶은 음악을 ‘라운지’ 플레이리스트에 넣으면 재생됩니다.',    
    },
];

export default {
    name: 'OnBoard',
    setup() {
        const nowView = ref(0);
        const nowImage = computed(() => {
            if (nowView.value === 0 ) return BoardImg0;
            if (nowView.value === 1 ) return BoardImg1;
        });
        
        return {
            nowImage,
            boardText,
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