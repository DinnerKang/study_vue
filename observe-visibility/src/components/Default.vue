<template>
    <div class="default">
        <ul class="box-area">
            <li id="0" class="default-box">0</li>
            <li id="1" class="default-box">1</li>
            <li id="2" class="default-box">2</li>
            <li id="3" class="default-box">3</li>
            <li id="4" class="default-box">4</li>
            <li id="5" class="default-box">5</li>
            <li id="6" class="default-box">6</li>
        </ul>
        <ul class="nav-area">
            <li class="default-list">0</li>
            <li class="default-list">1</li>
            <li class="default-list">2</li>
            <li class="default-list">3</li>
            <li class="default-list">4</li>
            <li class="default-list">5</li>
            <li class="default-list">6</li>
        </ul>
    </div>
</template>

<script>
import { onMounted } from '@vue/composition-api';

const setObserve = () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                document.querySelectorAll('.default-list')[entry.target.id].classList.remove('active');
                return;
            }
            console.log('노출하는 상자 ID: ', entry.target.id);
            observer.unobserve(entry.target);
            document.querySelectorAll('.default-list')[entry.target.id].classList.add('active');
        });
    }, { root: document.getElementsByClassName('default')[0], threshold: 0.5});

    document.getElementsByClassName('default-box').forEach((box) => {
        observer.observe(box);
    });
};

export default {
    name: "Default",
    setup() {
        onMounted(() => {
            setObserve();
        });
        return {
        };
    },
};
</script>

<style scoped>
.default {
    width: 300px;
    height: 200px;
    border: 1px solid #efefef;
    margin: 100px auto;
    overflow: auto;
    position: relative;
}
.box-area {
    position: absolute;
    width: 100%;
    height: 100%;
    padding-left: 30px;
    display: flex;
    flex-wrap: wrap;
}
.default-box{
    width: 50px;
    height: 50px;
    border: 1px solid #222;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 20px 30px;
}
.nav-area {
    position: sticky;
    top: 0;
    left: 0;
}
.default-list{
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    color: #fff;
}
.active {
    background-color: red;
}
</style>
