<template>
    <div class="check">
        <modal v-model="isAuth" :disabled="true" width="420" height="150">
            <div class="check-area">
                <input class="check-area__text" v-model="checkPwd" placeholder="강디너에게 문의해주세요." />
                <button class="check-area__button" type="button" @click="clickPwd">확인</button>
            </div>
        </modal>
    </div>
</template>

<script>
import Modal from '@/components/common/Modal.vue';
import loungeKey from '../../loungeKey';
import { ref } from '@vue/composition-api';

export default {
    name: 'checkPwd',
    components: {
        Modal,
    },
    setup(_, { root }) {
        const isAuth = ref(true);
        const checkPwd = ref('');
        const clickPwd = () => {
            if (checkPwd.value === loungeKey) {
                root.$router.push({
                    path: '/lounge',
                    query: {
                        [loungeKey]: true,
                    },
                })
            }
        };
        return {
            isAuth,
            checkPwd,
            clickPwd,
        };
    },
};
</script>
<style lang="scss" scoped>
    .check{
        width: 100vw;
        display: flex;
        align-items: center;
        justify-content: space-between;

        &-area {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 10px;

            &__text {
                width: 260px;
                height: 30px;
                border: 1px solid #00dbdb;
                font-size: 12px;
                background-color: #000000;
                padding-left: 8px;
                color: #ffffff;
                box-sizing: border-box;
            }
            &__button{
                outline: none;
                width: 120px;
                height: 30px;
                border: 1px solid #00dbdb;
                color: #ffffff;
                font-weight: bold;
                font-size: 15px;
                padding: 0;
                background-color: #000000;
                cursor: pointer;
            }
        }
    }
</style>