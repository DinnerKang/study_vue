<template>
    <header>
        <div class="header_container">
            <div class="user_area">
                {{userName}}  {{userState}}
            </div>
            <button type="button" class="login_btn" @click="userLogin">로그인</button>
        </div>
    </header>
</template>

<script>
import { computed } from '@vue/composition-api';
import * as firebase from 'firebase/app';
import "firebase/auth";

const getUserInfo = (store) => {
    const userName = computed(() => store.state.userName);
    const userState = computed(() => store.state.userState);

    const userLogin = async() => {
        const provider = new firebase.auth.GoogleAuthProvider();
        const profile = await firebase.auth().signInWithPopup(provider);
        store.commit('loginUser', profile);
    }
    
    return { 
        userName,
        userState,
        userLogin,
    }
}

export default {
    setup(props, { root }) {
        const { userName, userState, userLogin } = getUserInfo(root.$store);

        return {
            userName,
            userState,
            userLogin,
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
                width: 300px;
            }
            .login_btn{
                width: 100px;
            }
        }
        
    }
</style>