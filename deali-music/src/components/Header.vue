<template>
    <header>
        <div class="header_container">
            <div class="user_area">
                {{userName}}  {{userState}}
            </div>
            <div>
                <button v-if="userName" type="button" class="login_btn" @click="userLogin">로그인</button>
                <button v-else type="button" class="login_btn" @click="userLogout">로그아웃</button>
            </div>
        </div>
    </header>
</template>

<script>
import { computed } from '@vue/composition-api';
import * as firebase from 'firebase/app';
import "firebase/auth";

const getUserInfo = (store) => {
    let userName = computed(() => store.state.userName || '로그인을 하셔야 서비스를 이용하실 수 있습니다.');
    const userState = computed(() => store.state.userState);

    const userLogin = async() => {
        const provider = new firebase.auth.GoogleAuthProvider();
        const profile = await firebase.auth().signInWithPopup(provider);
        store.commit('loginUser', profile);
    }

    const userLogout = () => {
        store.commit('logoutUser');
    }
    
    return { 
        userName,
        userState,
        userLogin,
        userLogout,
    }
}

export default {
    setup(props, { root }) {
        const { userName, userState, userLogin, userLogout } = getUserInfo(root.$store);

        return {
            userName,
            userState,
            userLogin,
            userLogout,
        };
    },
};
</script>

<style lang="scss" scoped>
    header{
        width: 100%;
        height: 40px;
        border-bottom: 1px solid gray;

        .header_container{
            width: 100%;
            max-width: 1024px;
            height: 100%;
            margin: 0 auto;
            display: flex;
            align-items: center;
            justify-content: space-between;

            .user_area{
                width: 500px;
            }
            .login_btn{
                width: 100px;
                border: 1px solid gray;
                background-color: #fff;
            }
        }
        
    }
</style>