<template>
    <img
        src="@/assets/login/btn_google_signin_light_normal_web@2x.png"
        @click="loginWithGoogle"
    />
</template>

<script>
import * as firebase from "firebase/app";
import "firebase/auth";
const firebaseConfig = {
    apiKey: "AIzaSyB5CXXxYHN5jJ1ESA0w_2p5pYwXaZAw6nw",
    authDomain: "test-web-e8d37.firebaseapp.com",
    databaseURL: "https://test-web-e8d37.firebaseio.com",
    projectId: "test-web-e8d37",
    storageBucket: "test-web-e8d37.appspot.com",
    messagingSenderId: "390069637413",
    appId: "1:390069637413:web:36307ee220a1a37c590acc",
};

export default {
    created() {
        firebase.initializeApp(firebaseConfig);
    },
    methods: {
        async loginWithGoogle() {
            console.log("login");
            const provider = new firebase.auth.GoogleAuthProvider();
            provider.setCustomParameters({
                prompt: "select_account",
            });
            const profile = await firebase.auth().signInWithPopup(provider);
            console.log(profile);
        },
    },
};
</script>

<style scoped>
</style>