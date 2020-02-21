<template>
    <footer class="myPage_container">
        <div class="footer_area">
            <div class="name_area">
                <div class="picture_area">
                </div>
                <div class="music_name_area">
                    {{ videoStatus.videoName }}
                </div>
            </div>
            <div class="controll_area">
                <img class="icon_btn play_icon" :src="straightIcon" alt="그냥재생" />
                <img class="icon_btn" :src="nextIcon" @click="videoControl('prev')" alt="이전곡" />
                <img class="icon_btn start_icon" :src="startIcon" @click="videoControl('start')" alt="시작" />
                <img class="icon_btn next_btn" :src="nextIcon" @click="videoControl('next')" alt="다음곡" />
                <img class="icon_btn play_icon" :src="randomIcon" alt="랜덤재생" />
                <div class="bar_area">
                    <div>00:00</div>
                    <div class="bar"></div>
                    <div>00:00</div>
                </div>
            </div>
            <div class="option_area">
                <img class="option_icon" :src="soundIcon" alt="소리" />
                <img class="option_icon" :src="menuIcon" alt="메뉴" />
            </div>
        </div>
        
        
        <!--
        <div>{{ videoStatus.videoName }} ({{ videoStatus.status === 1 ? '재생중' : '정지' }})</div>
        <div>{{ videoStatus.playTime | getTime}}</div>
        <div>
            <button type="button" @click="videoControl('stop')">정지</button>
            <button type="button" @click="videoControl('prev')">이전곡</button>
            <button type="button" @click="videoControl('next')">다음곡</button>
        </div>
        -->
    </footer>
</template>

<script>
import { ref } from "@vue/composition-api";
import { videoController } from "@/service/Control";
import { getLoungeStatus } from "@/service/Status";

const controlVideo = () => {
    let videoStatus = ref({});

    getLoungeStatus().on("value", snapshot => {
        videoStatus.value = snapshot.val();
    });

    const videoControl = state => {
        videoController(state);
    };

    return {
        videoControl,
        videoStatus
    };
};

const iconData = () => {
    const startIcon = require('../../assets/icons/start-white.png');
    const menuIcon= require('../../assets/icons/menu-white.png');
    const soundIcon = require('../../assets/icons/sound-white.png');
    const nextIcon = require('../../assets/icons/prev-white.png');
    const straightIcon = require('../../assets/icons/straight-gray.png');
    const randomIcon = require('../../assets/icons/random-gray.png');

    return {
        startIcon,
        menuIcon,
        soundIcon,
        nextIcon,
        straightIcon,
        randomIcon,
    }
}

export default {
    setup() {
        const { videoControl, videoStatus } = controlVideo();
        
        return {
            videoControl,
            videoStatus,
            ...iconData(),
        };
    }
};
</script>
<style lang="scss" scoped>
footer {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    height: 72px;
    background-color: #000;
    color: $White;
    
    .footer_area{
        width: 100%;
        max-width: 1024px;
        height: 100%;
        margin: 0 auto;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .name_area{
        padding-left:24px;
        display: flex;
        align-items: center;
        color: $Gray400;
        font-size: 12px;

        .picture_area{
            width: 36px;
            height: 36px;
            border: 1px solid;
            margin-right: 24px;
            color: $Gray600;
        }
        .music_name_area{
            overflow: hidden;
            text-overflow: ellipsis;
            width: 200px;
            white-space: nowrap;
        }
    }
    .icon_btn{
        width: 20px;
        cursor: pointer;
    }
    .start_icon{
        margin: 0 32px;
    }
    .next_btn{
        transform: rotate( 180deg );
    }
    .play_icon{
        margin: 0 40px;
    }

    .controll_area{
        width: 400px;
        height: 100%;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        align-items: center;
        justify-content: center;

        .bar_area{
            position: absolute;
            bottom: 4px;
            font-size: 10px;
            display: flex;
            align-items: center;
            color: $Gray600;

            .bar{
                width: 300px;
                height: 2px;
                background-color: $Gray600;
                margin: 0 10px;
            }
        }
    }
    .option_area{
        padding-right: 24px;
        display: flex;
        justify-content: space-between;

        .option_icon{
            width: 24px;
            cursor: pointer;
            margin-left: 24px;
        }
    }
}
</style>
