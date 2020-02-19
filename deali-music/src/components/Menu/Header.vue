<template>
    <header>
        <div class="header_container">
            <div class="logo_area">
                로고
            </div>
            <div class="search_area">
                <search-bar />
            </div>
            <div class="info_area">
                <button v-if="!userState" type="button" class="login_btn" @click="userLogin">로그인</button>
                <button v-else type="button" class="login_btn" @click="userLogout">로그아웃</button>
            </div>
        </div>
    </header>
</template>

<script>
import { computed } from '@vue/composition-api';
import * as firebase from 'firebase/app';
import "firebase/auth";
import SearchBar from '../Search/SearchBar';

const getUserInfo = (store) => {
    let userName = computed(() => store.state.login.userName || '로그인을 하셔야 서비스를 이용하실 수 있습니다.');
    const userState = computed(() => store.state.login.userState);

    const userLogin = async() => {
        const provider = new firebase.auth.GoogleAuthProvider();
        provider.setCustomParameters({
            prompt: 'select_account'
        });
        const profile = await firebase.auth().signInWithPopup(provider);
        store.commit('login/loginUser', profile);
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
    components: {
        SearchBar,
    },
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

        .header_container{
            width: 100%;
            max-width: 1024px;
            height: 100%;
            margin: 0 auto;
            display: flex;
            align-items: center;
            justify-content: space-between;

            .logo_area{
                width: 80px;
                height: 20px;
            }
            .search_area{
                width: 500px;
                height: 30px;
            }
            .info_area{
                width: 100px;
            }

            .login_btn{
                width: 100px;
            }
        }
        
    }
</style>