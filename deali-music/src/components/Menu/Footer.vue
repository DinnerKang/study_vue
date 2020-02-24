<template>
    <footer class="myPage_container">
        <div class="footer_area">
            <div class="name_area">
                <div class="picture_area"></div>
                <div class="music_name_area">{{ videoStatus.videoName }}</div>
            </div>
            <div class="controll_area">
                <img
                    class="icon_btn play_icon"
                    :src="playStyle === 'Straight' ? straightWhiteIcon : straightGrayIcon"
                    @click="straightPlay"
                    alt="그냥재생"
                />
                <img class="icon_btn" :src="nextIcon" @click="videoControl('prev')" alt="이전곡" />
                <img
                    class="icon_btn start_icon"
                    :src="startIcon"
                    @click="videoControl('start')"
                    alt="시작"
                />
                <img
                    class="icon_btn next_btn"
                    :src="nextIcon"
                    @click="videoControl('next')"
                    alt="다음곡"
                />
                <img
                    class="icon_btn play_icon"
                    :src="playStyle === 'Random' ? randomWhiteIcon : randomGrayIcon"
                    alt="랜덤재생"
                    @click="randomPlay"
                />
                <div class="bar_area">
                    <div>{{ videoStatus.currentTime | getTime(playerStart) }}</div>
                    <div class="percent_area">
                        <div class="bar" />
                        <div
                            class="percent_bar"
                            v-if="playerStart"
                            :style="{ width : videoStatus.currentTime / videoStatus.playTime * 300 +'px' }"
                        />
                    </div>
                    <div>{{ videoStatus.playTime | getTime}}</div>
                </div>
            </div>
            <div class="option_area">
                <img class="option_icon" :src="soundIcon" alt="소리" />
                <img class="option_icon" :src="menuIcon" alt="메뉴" />
            </div>
        </div>
    </footer>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from "@vue/composition-api";
import { videoController, updatePlayStyle } from "@/service/Control";
import { getLoungeStatus } from "@/service/Status";

let timer = null;
const controlVideo = () => {
    const videoStatus = ref({});
    const playStyle = ref("Straight");
    const playerStart = ref(false);

    const getStatus = () => {
        getLoungeStatus().on("value", snapshot => {
            videoStatus.value = snapshot.val();

            if (videoStatus.value.status === 1) {
                if (timer===null) {
                    timer = setInterval(() =>{
                        videoStatus.value.currentTime += 1;
                    }, 1000);
                }
            } else {
                playerStart.value = true;
                clearInterval(timer);
                timer = null;
            }
        });
    };

    const videoControl = state => {
        videoController(state, playStyle.value);
    };

    const randomPlay = () => {
        playStyle.value = "Random";
        updatePlayStyle(playStyle.value);
    };

    const straightPlay = () => {
        playStyle.value = "Straight";
        updatePlayStyle(playStyle.value);
    };

    return {
        videoControl,
        videoStatus,
        randomPlay,
        straightPlay,
        playStyle,
        playerStart,
        getStatus,
    };
};

const iconData = () => {
    const startIcon = require("../../assets/icons/start-white.png");
    const menuIcon = require("../../assets/icons/menu-white.png");
    const soundIcon = require("../../assets/icons/sound-white.png");
    const nextIcon = require("../../assets/icons/prev-white.png");
    const straightGrayIcon = require("../../assets/icons/straight-gray.png");
    const straightWhiteIcon = require("../../assets/icons/straight-white.png");
    const randomGrayIcon = require("../../assets/icons/random-gray.png");
    const randomWhiteIcon = require("../../assets/icons/random-white.png");

    return {
        startIcon,
        menuIcon,
        soundIcon,
        nextIcon,
        straightGrayIcon,
        straightWhiteIcon,
        randomGrayIcon,
        randomWhiteIcon
    };
};


export default {
    setup() {
        const {
            videoControl,
            videoStatus,
            randomPlay,
            straightPlay,
            playStyle,
            playerStart,
            getStatus,
        } = controlVideo();

        onMounted(()=> getStatus());
        onBeforeUnmount(()=> {
            getLoungeStatus().off();
        });

        return {
            videoControl,
            videoStatus,
            randomPlay,
            straightPlay,
            playStyle,
            playerStart,
            ...iconData()
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

    .footer_area {
        width: 1024px;
        height: 100%;
        margin: 0 auto;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .name_area {
        padding-left: 24px;
        display: flex;
        align-items: center;
        color: $Gray400;
        font-size: 12px;

        .picture_area {
            width: 36px;
            height: 36px;
            border: 1px solid;
            margin-right: 24px;
            color: $Gray600;
        }
        .music_name_area {
            overflow: hidden;
            text-overflow: ellipsis;
            width: 200px;
            white-space: nowrap;
        }
    }
    .icon_btn {
        width: 20px;
        cursor: pointer;
    }
    .start_icon {
        margin: 0 32px;
    }
    .next_btn {
        transform: rotate(180deg);
    }
    .play_icon {
        margin: 0 40px;
    }

    .controll_area {
        width: 400px;
        height: 100%;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        align-items: center;
        justify-content: center;

        .bar_area {
            position: absolute;
            bottom: 4px;
            font-size: 10px;
            display: flex;
            align-items: center;
            color: $Gray600;

            .percent_area {
                position: relative;
                margin: 0 10px;
                width: 300px;
                height: 2px;

                .bar {
                    position: absolute;
                    width: 300px;
                    height: 2px;
                    background-color: $Gray600;
                }
                .percent_bar {
                    position: absolute;
                    width: 0px;
                    height: 2px;
                    background-color: red;
                    z-index: 1;
                }
            }
        }
    }
    .option_area {
        padding-right: 24px;
        display: flex;
        justify-content: space-between;

        .option_icon {
            width: 24px;
            cursor: pointer;
            margin-left: 24px;
        }
    }
}
</style>
