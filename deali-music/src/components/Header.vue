<template>
    <header>
        <div class="user_area">
            {{userName}}  {{userState}}
        </div>
        <div class="btn_area">
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
    header{
        width: 100%;
        height: 80px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid gray;

        .user_area{
            width: 300px;
        }
        .btn_area{
            width: 300px;
        }
    }
</style>