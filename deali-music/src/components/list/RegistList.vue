<template>
    <ul class="menu_list" v-click-outside="closeMenu">
        <li class="title">저장 위치</li>
        <ul class="menu_list_area">
            <li
                class="list"
                v-if="userInfo.userState === '딜리언즈'"
                @click="$emit('click-regist', item, 'lounge')">
                라운지
            </li>
            <li
                v-for="list in groupList"
                :key="list.myKey"
                class="list"
                @click="registMusic(item, list.myKey)">
                {{ list.groupName }}
            </li>
            <li v-if="groupList.length === 0"
                class="list disabled">
                플레이 리스트를 만들어주세요.
            </li>
        </ul>
    </ul>
</template>

<script>
import { ref, computed } from "@vue/composition-api";
import ClickOutside from "vue-click-outside";
export default {
    name: "RegistList",
    props: {
        item: {
            type: Object
        },
        groupList: {
            type: Array
        }
    },
    directives: {
        ClickOutside
    },
    setup(props, { root, emit }) {
        const isOpen = ref(false);
        const userInfo = computed(
            () => root.$store.getters["login/getUserStatus"]
        );

        const closeMenu = () => {
            if (isOpen.value) emit("close-menu");
            isOpen.value = true;
        };
        const registMusic = (item, myKey) => {
            emit("click-regist", item, myKey);
        };

        return {
            closeMenu,
            registMusic,
            userInfo
        };
    }
};
</script>

<style lang="scss" scoped>
.menu_list {
    position: absolute;
    width: 240px;
    height: 180px;
    bottom: -190px;
    right: 0;
    z-index: 3;
    background-color: $Black;
    border: 2px solid $Main;
    color: $White;

    .title {
        height: 36px;
        width: 100%;
        padding: 10px;
        box-sizing: border-box;
        border-bottom: 1px solid $Main;
    }
    .menu_list_area {
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
.disabled:hover {
    background: $Black !important;
    cursor: auto !important;
}
</style>