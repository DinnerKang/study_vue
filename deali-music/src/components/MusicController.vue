<template>
  <article class="myPage_container">
      <div>라운지 컨트롤러</div>
      <div>
          현재곡 : {{ videoStatus.videoName }} ({{ videoStatus.status === 1 ? '재생중' : '정지' }})
      </div>
      <div>{{ videoStatus.playTime | getTime}}</div>
      <div> 
            <button type="button" @click="videoControl('start')">시작</button>
            <button type="button" @click="videoControl('stop')">정지</button>
            <button type="button" @click="videoControl('prev')">이전곡</button>
            <button type="button" @click="videoControl('next')">다음곡</button>
      </div>
  </article>
</template>

<script>
import { ref } from "@vue/composition-api";
import { videoController } from '@/service/Control';
import { getLoungeStatus } from '@/service/Status';

const controlVideo = () => {
  let videoStatus = ref({});

  getLoungeStatus().on("value", snapshot => {
      videoStatus.value = snapshot.val();
  });

  const videoControl = (state) => {
      videoController(state);
  };
  
  return {
    videoControl,
    videoStatus,
  }
};


export default {
  setup() {
    const { videoControl, videoStatus } = controlVideo();
    return{
      videoControl,
      videoStatus,
    }
  },
}
</script>
<style lang="scss" scoped>
</style>
