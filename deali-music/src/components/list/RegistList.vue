<template>
    <ul class="menu_list" v-click-outside="closeMenu">
        <li class="title">저장 위치</li>
        <ul class="menu_list_area">
            <li class="list" @click="$emit('click-regist', item, 'lounge')">라운지</li>
            <li v-for="list in groupList" :key="list.myKey"
                class="list"
                @click="registMusic(item, list.myKey)">
                {{ list.groupName }}
            </li>
        </ul>
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
        const regitstMusic = (item, myKey) => {
            emit('click-regist', item, myKey);
        };

        return {
            closeMenu,
            regitstMusic,
        };
    },
}
</script>

<style lang="scss" scoped>
.menu_list{
    position: absolute;
    width: 240px;
    height: 180px;
    bottom: -190px;
    right: 0;
    z-index: 3;
    background-color: $Black;
    border: 2px solid $Main;
    color: $White;

    .title{
        height: 36px;
        width: 100%;
        padding: 10px;
        box-sizing: border-box;
        border-bottom: 1px solid $Main;
    }
    .menu_list_area{
        overflow: auto;
        height: 144px;

        .list {
            height: 36px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            width: 100%;
            padding: 10px;
            box-sizing: border-box;
            cursor: pointer;

            &:hover {
                background-color: $Gray400;
            }
        }
    }
}



</style>