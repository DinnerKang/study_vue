<template>
    <header>
        <div>
            {{userName}}  {{userState}}
        </div>
        <div>
            <button type="button">로그인</button>
        </div>
    </header>
</template>

<script>

const getUserInfo = (store) => {
    const { userName, userState } = store.state;
    
    return { 
        userName,
        userState 
    }
}

export default {
    setup(props, { root }) {
        const { userName, userState } = getUserInfo(root.$store);

        return {
            userName,
            userState,
        };
    },
};
</script>

<style lang="scss" scoped>
    
</style>