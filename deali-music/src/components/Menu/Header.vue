<template>
    <header>
        <div class="header_container">
            <div class="logo_area" @click="clickLogo">
                Dealibeat
            </div>
            <div class="search_area">
                <search-bar />
            </div>
            <div class="info_area">
                <button v-if="!userState" type="button" class="login_btn" @click="userLogin">로그인</button>
                <div class="logout_area" v-else>
                    <div class="name_area"><strong>{{userName}}</strong>님</div>
                    <router-link to="/myPage" class="page_link">마이페이지</router-link>
                    <button type="button" class="login_btn" @click="userLogout">로그아웃</button>
                </div>
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
        store.commit('login/logoutUser');
    }
    
    return { 
        userName,
        userState,
        userLogin,
        userLogout,
    }
}

const clickEvent = (router) => {

    const clickLogo = () => {
        router.push('/');
    };

    return {
        clickLogo,
    }
};

export default {
    components: {
        SearchBar,
    },
    setup(props, { root }) {
        const { userName, userState, userLogin, userLogout } = getUserInfo(root.$store);
        const { clickLogo } = clickEvent(root.$router);

        return {
            userName,
            userState,
            userLogin,
            userLogout,
            clickLogo,
        };
    },
};
</script>

<style lang="scss" scoped>
    header{
        min-width: 1024px;
        height: 56px;

        .header_container{
            width: 1024px;
            height: 100%;
            margin: 0 auto;
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size:12px;

            .logo_area{
                width: 150px;
                height: 30px;
                display: flex;
                align-items: center;
            }
            .search_area{
                width: 630px;
                height: 30px;
            }
            .info_area{
                width: 245px;
                height: 30px;
                display: flex;
                align-items: center;
                justify-content: flex-end;
                color: $Gray600;

                .logout_area{
                    width: 100%;
                    display: flex;
                    height: 100%;
                    align-items: center;
                    justify-content: flex-end;
                    
                    .name_area{
                        width: 100px;
                        text-align: center;
                    }
                }
            }  
            .page_link {
                color: $Gray600;
                width: 70px;
                text-align: center;
                font-size:12px;
            }
            .login_btn{
                border: none;
                background-color: #fff;
                margin-left: 20px;
                cursor: pointer;
                color: $Gray600;
                width: 70px;
                text-align: center;
                font-size:12px;
            }
        }
        
    }
</style>