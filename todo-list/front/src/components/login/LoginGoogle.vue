<template>
    <div class="g-signin2" id="google-signin-btn"></div>
</template>

<script>
export default {
    mounted() {
       window.addEventListener("google-loaded", this.renderGoogleLoginButton);
    },
    methods:{
        renderGoogleLoginButton() {
            window.gapi.signin2.render("google-signin-btn", {
                onsuccess: this.onSignIn,
            });
        },
        onSignIn (googleUser) {
            console.log('test');
            var profile = googleUser.getBasicProfile();
            console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
            console.log('Name: ' + profile.getName());
            console.log('Image URL: ' + profile.getImageUrl());
            console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
        },
    }
}
</script>

<style scoped>

</style>