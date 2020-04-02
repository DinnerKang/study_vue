import { ref } from "@vue/composition-api";
import { getOpenGroup } from '@/services/Group';

export const openGroup = () => {
    const openGroups = ref([]);
    
    getOpenGroup().once('value', snapshot => {
      if (!snapshot.val()) return;
      openGroups.value = Object.values(snapshot.val()).sort(() => Math.random() - Math.random());
    });
    
    return {
        openGroups,
    }
  };