import {
  ref, onMounted, watch
} from "@vue/composition-api";
import {
  getOpenGroup
} from '@/services/group';

export const openGroup = (perPage, page) => {
  const openGroups = ref([]);
  const isFirst = ref(false);

  const getOpenGroupData = () => {
    getOpenGroup()
      .limitToLast(perPage * page.value)
      .on("value", snapshot => {
        if (!snapshot.val()) return;
        const data = Object.values(snapshot.val()).sort((a,b) => b.likes.count - a.likes.count);
        openGroups.value = data;
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