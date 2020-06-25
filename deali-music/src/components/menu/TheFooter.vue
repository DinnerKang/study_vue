<template>
    <footer class="myPage_container">
        <div class="footer_area">
            <div class="name_area">
                <img :src="musicIcon" class="picture_area" />
                <div class="music_name_area">{{ videoStatus.videoName }}</div>
            </div>
            <div class="controll_area">
                <div class="controll_icon">
                    <img class="icon_btn next_btn" :src="nextIcon" @click="videoControl('prev')" alt="이전곡" />
                    <img
                        v-if="videoStatus.status!==1"
                        class="icon_btn start_icon"
                        :src="startIcon"
                        @click="videoControl('start')"
                        alt="시작"
                    />
                    <img
                        v-else
                        class="icon_btn start_icon"
                        :src="stopIcon"
                        @click="videoControl('stop')"
                        alt="중지"
                    />
                    <img
                        class="icon_btn"
                        :src="nextIcon"
                        @click="videoControl('next')"
                        alt="다음곡"
                    />
                </div>
                <div class="bar_area">
                    <div>{{ videoStatus.currentTime | getTime(playerStart) }}</div>
                    <div class="percent_area">
                        <div class="bar" />
                        <div
                            class="percent_bar"
                            v-if="playerStart"
                            :style="{ width : videoStatus.currentTime / videoStatus.playTime * 100 +'%' }"
                        />
                    </div>
                    <div>{{ videoStatus.playTime | getTime}}</div>
                </div>
            </div>
            <div class="option_area" v-click-outside="menuControl">
                <div class="sound_area">
                    <img class="option_icon" :src="soundIcon" alt="소리" @click="isSound=!isSound" />
                    <transition name="slide">
                        <div class="slider_area" v-if="isSound">
                                <input
                                    id="slider"
                                    :style="{ background : sliderBackground }"
                                    type="range"
                                    value="50"
                                    min="0"
                                    max="100"
                                    v-model="controlSound"
                                />
                        </div>
                    </transition>
                </div>
                <img class="option_icon" :src="menuIcon" alt="메뉴" @click="isMenu=!isMenu" />
                <transition name="slideTop">
                    <div class="menu_area" v-show="isMenu">
                        <music-list
                            :group-name="'lounge'"
                            :group-key="'lounge'"
                            :group-host="'lounge'"
                            :now-music="videoStatus.videoName"
                            @close-menu="isMenu = false"
                        />
                    </div>
                </transition>
            </div>
        </div>
    </footer>
</template>

<script>
import { ref, onMounted, onBeforeUnmount, watch } from "@vue/composition-api";
import {
    videoController,
    soundControl,
    getControlLoungeStatus
} from "@/services/control";
import { getLoungeStatus } from "@/services/status";
import MusicList from "@/components/list/MusicList";
import ClickOutside from "vue-click-outside";

let timer = null;
const controlVideo = () => {
    const videoStatus = ref({});
    const playerStart = ref(false);
    const sliderBackground = ref(0);
    const controlSound = ref(null);

    const getStatus = () => {
        getLoungeStatus().on("value", snapshot => {
            videoStatus.value = snapshot.val();

            if (videoStatus.value.status === 1) {
                if (timer === null) {
                    timer = setInterval(() => {
                        if (
                            videoStatus.value.currentTime >
                            videoStatus.value.playTime
                        )
                            return;
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
    
    const videoControl = (state) => {
        console.log(state);
        videoController(state);
    };

    const initSound = () => {
        getControlLoungeStatus().once("value", snapshot => {
            controlSound.value = snapshot.val().volume;
        });
    };

    watch(controlSound, (newValue, oldValue) => {
        sliderBackground.value = `linear-gradient(to right, #fff 0%, #fff ${newValue}%, #00A1A1 ${newValue}%, #00A1A1 100%)`;

        if (oldValue === null) return;
        soundControl(newValue);
    });

    return {
        videoControl,
        videoStatus,
        playerStart,
        getStatus,
        controlSound,
        sliderBackground,
        initSound
    };
};

const iconData = () => {
    const startIcon = require("@/assets/icons/Icon_play_25x25(x3).png");
    const menuIcon = require("@/assets/icons/Icon_menu_20x20(x2).png");
    const soundIcon = require("@/assets/icons/Icon_volume_20x20(x2).png");
    const nextIcon = require("@/assets/icons/Icon_skip_18x18(x3).png");
    const stopIcon = require("@/assets/icons/Icon_stop_25x25(x3).png");
    const musicIcon = require('@/assets/icons/Icon_Thumbnail_40x40(x2).png')
 
    return {
        startIcon,
        menuIcon,
        soundIcon,
        nextIcon,
        stopIcon,
        musicIcon,
    };
};

export default {
    name: "TheFooter",
    components: {
        MusicList
    },
    directives: {
        ClickOutside
    },
    setup() {
        const isSound = ref(false);
        const isMenu = ref(false);
        const {
            videoControl,
            videoStatus,
            playerStart,
            getStatus,
            controlSound,
            sliderBackground,
            initSound
        } = controlVideo();

        const menuControl = () => {
            isMenu.value = false;
        };

        onMounted(() => {
            getStatus();
            initSound();
        });
        onBeforeUnmount(() => {
            getLoungeStatus().off();
        });

        return {
            menuControl,
            videoControl,
            videoStatus,
            playerStart,
            controlSound,
            sliderBackground,
            isSound,
            isMenu,
            ...iconData()
        };
    }
};
</script>
<style lang="scss" scoped>
footer {
    position: sticky;
    bottom: 0;
    width: 100%;
    min-width: 1024px;
    height: 72px;
    background-color: $Main;
    color: $Black;
    z-index: 100;

    .footer_area {
        width: 1024px;
        height: 100%;
        margin: 0 auto;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: space-between;
        z-index: 10;

        .menu_area {
            width: 400px;
            height: 600px;
            position: absolute;
            right: 0;
            bottom: 72px;

            .menu_list{
                overflow: hidden;
            }
            .music_container{
                border-bottom: none;
            }
        }
    }

    .name_area {
        padding-left: 24px;
        display: flex;
        align-items: center;
        color: $Gray400;
        font-size: 12px;

        .picture_area {
            width: 40px;
            height: 40px;
            margin-right: 24px;
            color: $Gray600;
        }
        .music_name_area {
            overflow: hidden;
            text-overflow: ellipsis;
            width: 200px;
            white-space: nowrap;
            color: $White;
        }
    }
    .icon_btn {
        width: 18px;
        cursor: pointer;
    }
    .start_icon {
        margin: 0 32px;
        width: 25px;
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
        justify-content: center;

        .controll_icon {
            position: absolute;
            top: 25%;
            display: flex;
            align-items: center;
        }

        .bar_area {
            position: absolute;
            bottom: 8px;
            font-size: 10px;
            display: flex;
            align-items: center;
            color: $White;

            .percent_area {
                position: relative;
                margin: 0 10px;
                width: 300px;
                height: 2px;

                .bar {
                    position: absolute;
                    width: 300px;
                    height: 2px;
                    background-color: #00A1A1;
                }
                .percent_bar {
                    position: absolute;
                    width: 0px;
                    height: 2px;
                    background-color: $White;
                    z-index: 1;
                    max-width: 100%;
                }
            }
        }
    }
    .option_area {
        padding-right: 24px;
        display: flex;
        justify-content: space-between;

        .option_icon {
            width: 25px;
            height: 25px;
            cursor: pointer;
            margin-left: 20px;
        }
        .sound_area {
            height: 25px;
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
        }
    }
}
input[type="range"] {
    -webkit-appearance: none;
    background: transparent;
}
input:focus {
    outline: none;
}

.slider_area {
    display: flex;
    align-items: center;
    height: 25px;
    width: 78px;
    margin-left: 12px;

    #slider {
        border-radius: 6px;
        border: none;
        background: $White;
        height: 3px;
        width: 78px;
        cursor: pointer;
    }
    #slider::-moz-range-thumb {
        border: none;
        width: 5px;
        height: 10px;
        border-radius: 0.8px;
        background-color: $White;
    }
    #slider::-webkit-slider-thumb {
        -webkit-appearance: none;
        background: #ffffff;
        border: none;
        width: 5px;
        height: 10px;
        border-radius: 0.8px;
        background-color: $White;
    }
    #slider::-ms-track {
        -webkit-appearance: none;
        background: #ffffff;
        border: none;
        width: 5px;
        height: 10px;
        border-radius: 0.8px;
        background-color: $White;
    }
}


.slide-enter-active, .slide-leave-active {
  transition: all .3s;
}
.slide-enter, .slide-leave-to{
  width: 0;
  margin-left: 0;
}
.slideTop-enter-active, .slideTop-leave-active {
    transition: all .3s linear;
}
.slideTop-enter, .slideTop-leave-to {
    height: 72px !important;
}
</style>
