<template>
    <section class="mobile">
        <article class="mobile_container">
            코딩 중 노래 듣는 용도로 만들어서 <br />
            모바일을 지원하지 않습니다. <br />
            그래도 보고싶으신 분께서는 버튼을 눌러주세요.
        </article>
        <router-link class="home_link" to='/'>보러가기</router-link>
    </section>
</template>

<style lang="scss" scoped>
    .mobile{
        width: 100vw;
        height: 100vh;
        color: $White;
        font-size: 13px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;

        .mobile_container{
            text-align: center;
        }
        .home_link{
            color: $Main;
        }
    }
    
</style>