import {
  ref, onMounted, watch
} from "@vue/composition-api";
import {
  getOpenGroup
} from '@/services/group';

export const openGroup = (perPage, page) => {
  const openGroups = ref([]);
  const isFirst = ref(false);
  let tempArr = [];
  const checkKeyArr = [];
  const lastKey = ref('');

  // 0513 기존 코드
  /*
  const getOpenGroupData = () => {
    getOpenGroup()
      .limitToLast(perPage * page.value)
      .on("value", snapshot => {
        if (!snapshot.val()) return;
        const data = Object.values(snapshot.val()).sort((a,b) => b.likes.count - a.likes.count);
        openGroups.value = data;
      });
  };
  */
 // 테스트 코드
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
  // 테스트용
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