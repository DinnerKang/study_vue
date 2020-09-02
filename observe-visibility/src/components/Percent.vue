<template>
    <div class="percent">
        <ul class="box-area">
            <li class="percent-box" id="0">
                0
            </li>
            <li class="percent-box" id="1">1</li>
            <li class="percent-box" id="2">2</li>
            <li class="percent-box" id="3">3</li>
            <li class="percent-box" id="4">4</li>
            <li class="percent-box" id="5">5</li>
            <li class="percent-box" id="6">6</li>
            <li class="percent-box" id="7">7</li>
            <li class="percent-box" id="8">8</li>
            <li class="percent-box" id="9">9</li>
        </ul>
        <ul class="nav-area">
            <li class="percent-list">0</li>
            <li class="percent-list">1</li>
            <li class="percent-list">2</li>
            <li class="percent-list">3</li>
            <li class="percent-list">4</li>
            <li class="percent-list">5</li>
            <li class="percent-list">6</li>
            <li class="percent-list">7</li>
            <li class="percent-list">8</li>
            <li class="percent-list">9</li>
        </ul>
    </div>
</template>

<script>
import { onMounted } from '@vue/composition-api';

const setObserve = () => {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                document.querySelectorAll('.percent-list')[entry.target.id].classList.remove('active');
                return;
            }
            // console.log('노출하는 상자 ID: ',entry.target.id);
            document.querySelectorAll('.percent-list')[entry.target.id].classList.add('active');
        });
    });

    document.getElementsByClassName('percent-box').forEach((box) => {
        observer.observe(box);
    });
};

export default {
    name: "Percent",
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
.percent {
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
}
.percent-box{
    width: 50px;
    height: 50px;
    border: 1px solid #222;
    margin: 20px auto;
    display: flex;
    align-items: center;
    justify-content: center;
}
.nav-area{
    position: sticky;
    top: 0;
    left: 0;
}
.percent-list {
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