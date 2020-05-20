import {
  ref, onMounted, watch
} from "@vue/composition-api";
import {
  getOpenGroup
} from '@/services/group';

export const openGroup = (perPage, page, isScroll = true) => {
  const openGroups = ref([]);
  let tempArr = [];
  const checkKeyArr = [];
  const lastKey = ref('');
  const isFinish = ref(false);

 const getOpenGroupData = () => {
    if (isFinish.value) return;
    tempArr = [];
    console.log(lastKey.value);
    getOpenGroup()
      .startAt(null, "-M7CkPRfuLU-7XDKt-VU")
      .limitToLast(2)
      .on("child_added", snapshot => {
        console.log('test', snapshot.val());
      });

    /*
    getOpenGroup()
      .startAt(null, lastKey.value)
      .limitToLast(perPage +1)
      .on("child_added", snapshot => {
        if (!snapshot.val()) return;
        // 중복값일때
        if (!checkKeyArr.includes(snapshot.key)) {
          checkKeyArr.unshift(snapshot.key);
        } else {
          isFinish.value = true;
          return;
        }
        openGroups.value.unshift(snapshot.val());
        tempArr.push(snapshot.key);
        lastKey.value = tempArr[0];

        if (tempArr[perPage]) {
          openGroups.value.pop();
          checkKeyArr.pop();
          return;
        }
      });
      */
  }; 
  const init = () => {
    getOpenGroup()
      .limitToLast(perPage +1)
      .on("child_added", snapshot => {
        console.log(snapshot.val());
        if (!snapshot.val()) return;

        openGroups.value.unshift(snapshot.val());
        checkKeyArr.unshift(snapshot.key);
        tempArr.push(snapshot.key);
        lastKey.value = tempArr[0];

        if (tempArr[perPage]) {
          openGroups.value.pop();
          checkKeyArr.pop();
        }
      });
  };

  const readMore = () => {
    if (isFinish.value) return;
    page.value += 1;
  };

  const scroll = () => {
    if (!isScroll) return;
    window.onscroll = () => {
      let bottomOfWindow =
        Math.max(
          window.pageYOffset,
          document.documentElement.scrollTop,
          document.body.scrollTop
        ) +
        window.innerHeight ===
        document.documentElement.offsetHeight;

      if (bottomOfWindow) {
        page.value += 1;
      }
    };
  };

  watch(page, () => {
    if (page.value === 1) return init();
    getOpenGroupData();
  });

  onMounted(() => {
    scroll();
  });

  return {
    openGroups,
    readMore,
    isFinish,
  };
};