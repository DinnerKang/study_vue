<template>
    <div class="home">
        <section class="my_play_list" v-if="myGroupKeys.length > 0">
            <h2>나의 플레이리스트</h2>
            <div class="group_list">
                <article v-for="data in myGroupKeys" :key="data.groupKey">
                    <my-group-list :groupKey="data.groupKey" :target-name="data.targetName"></my-group-list>
                </article>
            </div>
        </section>
        <section class="recomend_play_list">
            <h2>공개 플레이리스트</h2>
            <div class="recomend_group">
                <article
                    v-for="list in openGroups"
                    :key="list.targetKey"
                    class="recomend_group_list"
                >
                    <open-group-list :openGroupData="list"></open-group-list>
                </article>
            </div>
        </section>
        <on-board v-model="checkBoard"/>
    </div>
</template>

<script>
import { ref, computed, watch } from "@vue/composition-api";
import MyGroupList from "@/components/list/MyGroupList";
import { getMusicListByGroup } from "@/services/music";
import { openGroup } from "@/composible/openGroup";
import openGroupList from "@/components/list/OpenGroupList";
import OnBoard from '@/components/common/OnBoard.vue';

const checkOnBoard = (root) => {
    const checkBoard = ref(false);
    const isRead = root.$cookies.get('onBoard');
    if (!isRead)  checkBoard.value = true;

    return {
        checkBoard,
    };
};

const myGroup = (userInfo) => {
    const myGroupKeys = ref([]);

    const getMyGroupList = () => {
        const data = {
            dealiName: userInfo.value.dealiName,
            groupKey: ""
        };

        getMusicListByGroup(data).once("value", snapshot => {
            if (!snapshot.val()) return myGroupKeys.value = [];
            const keys = Object.keys(snapshot.val())
                .sort(() => Math.random() - Math.random())
                .splice(0, 2);
            for (let i = 0; i < keys.length; i += 1) {
                myGroupKeys.value.push({
                    targetName: userInfo.value.dealiName,
                    groupKey: keys[i]
                });
            }
        });
    };

    return {
        myGroupKeys,
        getMyGroupList
    };
};

export default {
    name: "Home",
    metaInfo: {
        meta: [
            {
                property: "og:image",
                content: require("@/assets/icons/logo_135x23(x2).png")
            }
        ]
    },
    components: {
        MyGroupList,
        openGroupList,
        OnBoard,
    },
    setup(props, { root }) {
        const userInfo = computed(
            () => root.$store.getters["login/getUserStatus"]
        );
        const perPage = 12;
        const page = ref(1);
        const { myGroupKeys, getMyGroupList } = myGroup(userInfo);

        watch(() => userInfo.value.dealiName, (newValue) => {
            if (newValue) {
                getMyGroupList();
            } else {
                myGroupKeys.value = [];
            }
        });

        return {
            myGroupKeys,
            userInfo,
            page,
            ...openGroup(perPage, page),
            ...checkOnBoard(root),
        };
    }
};
</script>

<style lang="scss" scoped>
.home {
    section {
        margin-top: 64px;

        h2 {
            font-size: 28px;
            margin-bottom: 32px;
            color: $White;
        }
        .group_list {
            display: flex;
            justify-content: space-between;
        }
    }
    .my_play_list {
        margin-bottom: 48px;
    }

    .recomend_group {
        display: grid;
        gap: 10px 20px;
        grid-template-rows: 250px;
        grid-template-columns: repeat(4, 1fr);
        margin-bottom: 300px;

        .recomend_group {
            display: flex;
            justify-content: center;
        }
    }
}
</style>
