<template>
    <ul class="melon_list_area">
        <li class="update_date">
            <div class="title">
                멜론 차트
            </div>
            <div class="update_area">
                최근 업데이트 : {{updateDate | timeForToday}}
                <button class="update_btn" @click="updateMelonChart">새로고침</button>
            </div>
        </li>
        <li class="melon_list" v-for="(list, idx) in melonList" :key="idx">
            <span class="artist_area" :title="list.artist">{{idx + 1}}. {{list.artist}}</span>
            |
            <span class="title_area" :title="list.title">{{list.title}}</span>
            <button type="button" class="add_btn">담기</button>
        </li>
    </ul>
</template>

<script>
import { reactive, toRefs } from '@vue/composition-api';
import * as firebase from 'firebase/app';
import 'firebase/database';
import { getMelonChart } from '../../service/AWS';
import { updateMelon } from '../../service/Firebase';

const getMelon = (store) => {

    const state = reactive({
        melonList: '',
        updateDate: '',
    });

    firebase.database()
                .ref(`melon`)
                .on('value', (snapshot) => {
                    const res = snapshot.val();
                    state.melonList = res.result;
                    state.updateDate = res.registDate;
    });

    const updateMelonChart = async() => {
        const status = store.state.login.userState === '딜리언즈' ? 'deali' : '';
        
        try {
            const { data } = await getMelonChart(status);
            await updateMelon(data);
        } catch (e) {
            console.log(e);
        }
    }

    return {
        ...toRefs(state),
        updateMelonChart,
    }
};

export default {
    setup(props, { root }){
        const { melonList, updateDate, updateMelonChart } = getMelon(root.$store);

        return {
            melonList,
            updateDate,
            updateMelonChart,
        }
    }
};
</script>

<style lang="scss" scoped>
    .melon_list_area{
        width: 100%;
        height: 500px;
        overflow: auto;
        border: 1px solid gray;

        .update_date{
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 100%;
            height: 60px;

            .title{
                width: 50%;
                height: 100%;
            }
            .update_area{
                width: 50%;
                height: 100%;
            }
        }

        .melon_list{
            display: flex;
            align-items: center;
            width: 100%;
            padding-left: 30px;
            box-sizing: border-box;
            margin-bottom: 10px;
            position: relative;

            .artist_area{
                display: inline-block;
                text-align: left;
                width: 30%;
                text-overflow: ellipsis;
                white-space: nowrap;
                overflow: hidden;
            }

            .title_area{
                margin-left: 5px;
                max-width: 50%;
                text-overflow: ellipsis;
                white-space: nowrap;
                overflow: hidden;
            }

            .add_btn{
                position: absolute;
                right: 30px;
            }
        }
    }
</style>