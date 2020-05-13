import {
  ref, onMounted, watch
} from "@vue/composition-api";
import {
  getOpenGroup
} from '@/services/group';

export const openGroup = (perPage, page, isScroll = true) => {
  const openGroups = ref([]);
  const isFirst = ref(false);
  let tempArr = [];
  const checkKeyArr = [];
  const lastKey = ref('');

 const getOpenGroupData = () => {
    tempArr = [];
    getOpenGroup()
      .startAt(null, lastKey.value)
      .limitToLast(perPage * page.value + 1)
      .on("child_added", snapshot => {
        if (!snapshot.val()) return;
      
        // 중복값일때
        if (!checkKeyArr.includes(snapshot.key)) {
          checkKeyArr.unshift(snapshot.key);
        } else {
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
  }; 
  const init = () => {
    console.log('init');
    getOpenGroup()
      .limitToLast(perPage * page.value +1)
      .on("child_added", snapshot => {
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
    page.value += 1;
  };

  const scroll = () => {
    isFirst.value = true;
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
  };
};