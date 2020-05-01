import {
  ref, watch, onMounted 
} from "@vue/composition-api";
import {
  getOpenGroup
} from '@/services/group';

export const openGroup = (defaultPage) => {
  const perPage = ref(defaultPage);
  const openGroups = ref([]);
  const isFirst = ref(false);
  const tempArr = [];

  const getOpenGroupData = () => {
    getOpenGroup()
      .limitToLast(perPage.value)
      .on("child_added", snapshot => {
        if (!snapshot.val()) return;
        if (tempArr.includes(snapshot.key)) return;
        tempArr.push(snapshot.key);
        if (isFirst.value) {
          openGroups.value.push(snapshot.val());
        } else {
          openGroups.value.unshift(snapshot.val());
        }
      });
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
        perPage.value = perPage.value * 2;
      }
    };
  };
  watch(perPage, () => {
    getOpenGroupData(perPage.value);
  });

  onMounted(() => {
    scroll();
  });

  return {
    perPage,
    openGroups
  };
};