import {
  ref,
  onMounted,
  watch
} from "@vue/composition-api";
import {
  getOpenGroup,
  getOpenGroupLength
} from '@/services/group';

export const openGroup = (perPage, page, isScroll = true) => {
  const openGroups = ref([]);
  let tempKey = [];
  let tempValue = [];
  let tempArr = [];
  const groupLength = ref(0);
  const lastKey = ref('');
  const lastValue = ref(0);
  const isFinish = ref(false);

  const getOpenGroupData = () => {
    if (isFinish.value) return;
    tempArr = [];
    tempKey = [];
    tempValue = [];

    getOpenGroup()
      .endAt(lastValue.value, lastKey.value)
      .limitToLast(perPage + 1)
      .on("child_added", snapshot => {
        if (!snapshot.val()) return;
        tempArr.push(snapshot.val());

        tempKey.push(snapshot.key);
        tempValue.push(snapshot.val().likes.count);
        lastKey.value = tempKey[0];
        lastValue.value = tempValue[0];

        if (tempArr.length === groupLength.value) {
          isFinish.value = true;
          openGroups.value.push(...tempArr.reverse());
        }

        if (tempArr.length === 5) {
          tempArr.shift();
          openGroups.value.push(...tempArr.reverse());
          groupLength.value -= perPage;
        }

      });
  };

  const init = () => {
    getOpenGroupLength()
      .once('value', snapshot => {
        groupLength.value += snapshot.numChildren();

        getOpenGroup()
          .limitToLast(perPage + 1)
          .on("child_added", snapshot => {
            if (!snapshot.val()) return;
            console.log(snapshot.val());
            tempArr.push(snapshot.val());

            tempKey.push(snapshot.key);
            tempValue.push(snapshot.val().likes.count);
            lastKey.value = tempKey[0];
            lastValue.value = tempValue[0];

            if (tempArr.length === groupLength.value) {
              isFinish.value = true;
              openGroups.value.push(...tempArr.reverse());
            }

            if (tempArr.length === perPage + 1) {
              tempArr.shift();
              openGroups.value.push(...tempArr.reverse());
              groupLength.value -= perPage;
            }
          });
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