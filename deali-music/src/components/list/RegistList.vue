<template>
    <ul class="menu_list_area" v-click-outside="closeMenu">
        <li class="menu_list" @click="$emit('click-regist', item, 'lounge')">라운지</li>
        <li v-for="list in groupList" :key="list.myKey"
            class="menu_list"
            @click="$emit('click-regist', item, list.myKey)">
            {{ list.groupName }}
        </li>
    </ul>
</template>

<script>
import { ref } from "@vue/composition-api"
import ClickOutside from "vue-click-outside";
export default {
    name: 'RegistList',
    props: {
        item: {
            type: Object,
        },
        groupList: {
            type: Array,
        },
    },
    directives: {
        ClickOutside,
    },
    setup(props, { emit }) {
        const isOpen = ref(false);

        const closeMenu = () => {
            if (isOpen.value) emit('close-menu');
            isOpen.value = true;
        };

        return {
            closeMenu,
        };
    },
}
</script>

<style lang="scss" scoped>
.menu_list_area{
    position: absolute;
    overflow: auto;
    width: 240px;
    height: 180px;
    bottom: 30px;
    z-index: 3;
    background-color: $White;
    border: 1px solid $Gray400;
    color: $Black;

    .menu_list{
        height: 36px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 100%;
    }
}
</style>