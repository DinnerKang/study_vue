<template>
    <header>
        <div class="header_container">
            <div class="logo_area" @click="clickLogo">
                <img :src="logoIcon" alt="딜리비트" class="logo" />
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
import SearchBar from '../search/SearchBar';

const getUserInfo = (store, router) => {
    const userName = computed(() => store.state.login.userName);
    const userState = computed(() => store.state.login.userState);
    const logoIcon = require('@/assets/icons/logo_135x23(x2).png');

    const userLogin = async() => {
        const provider = new firebase.auth.GoogleAuthProvider();
        provider.setCustomParameters({
            prompt: 'select_account'
        });
        const profile = await firebase.auth().signInWithPopup(provider);
        store.commit('login/loginUser', profile);
        router.replace('/');
    }

    const userLogout = () => {
        if (!confirm('로그아웃하시겠습니까?')) return;
        store.commit('login/logoutUser');
        router.push('/');
    }

    const clickLogo = () => {
        router.push('/');
    };
    
    return { 
        userName,
        userState,
        userLogin,
        userLogout,
        clickLogo,
        logoIcon,
    }
}

export default {
    components: {
        SearchBar,
    },
    setup(props, { root }) {
        return {
            ...getUserInfo(root.$store, root.$router),
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
            position: relative;

            .logo_area{
                height: 30px;
                display: flex;
                align-items: center;
                cursor: pointer;

                .logo{
                    width: 150px;
                }
            }
            .search_area{
                width: 600px;
                height: 30px;
                position: absolute;
                left: 50%;
                transform: translateX(-50%);
                border: 1px solid $Main;
            }
            .info_area{
                height: 30px;
                display: flex;
                align-items: center;
                justify-content: flex-end;
                color: $White;

                .logout_area{
                    width: 100%;
                    display: flex;
                    height: 100%;
                    align-items: center;
                    justify-content: space-between;
                    
                    .name_area{
                        width: 70px;
                        text-align: center;
                    }
                }
            }  
            .page_link {
                color: $White;
                text-align: center;
                font-size:12px;
                width: 70px;
            }
            .login_btn{
                border: none;
                background-color: $Black;
                cursor: pointer;
                color: $White;
                width: 70px;
                text-align: center;
                font-size:12px;
            }
        }
        
    }
</style>