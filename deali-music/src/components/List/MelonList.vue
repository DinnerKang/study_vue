<template>
    <div>
        <ul>
            <li class="melon_list" v-for="(list, idx) in melonList" :key="idx">
                {{idx + 1}}위<br />
                음악 : {{list.title}}<br />
                가수 : {{list.artist}}
            </li>
        </ul>
    </div>
</template>

<script>
import * as firebase from 'firebase/app';
import 'firebase/database';
export default {
    data() {
        return {
            melonList: [],
        };
    },
    created() {
        this.getMelonChart();
    },
    methods: {
        getMelonChart() {
            firebase.database()
                .ref(`melon`)
                .on('value', (snapshot) => {
                    const res = snapshot.val();
                    console.log(res);
                    this.melonList = res.result;
            });
        }
    }
}
</script>

<style lang="scss" scoped>
    .melon_list{
        margin-top: 24px;
    }
</style>