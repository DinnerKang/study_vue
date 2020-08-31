<template>
    <div class="default">
        <ul class="box-area">
            <li
                class="default-box"
                v-for="(list, idx) in 10"
                :key="idx"
                :id="idx"
            >
                {{idx}}
            </li>
        </ul>
        <ul class="default-nav">
            <li
                class="default-list"
                v-for="(list, idx) in 10"
                :key="idx"
            >
                {{ idx }}
            </li>
        </ul>
    </div>
</template>

<script>
import { onMounted } from '@vue/composition-api';

const setObserve = () => {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                document.querySelectorAll('.default-list')[entry.target.id].classList.remove('active');
                return;
            }
            console.log('노출하는 상자 ID: ',entry.target.id);
            document.querySelectorAll('.default-list')[entry.target.id].classList.add('active');
        });
    });

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
}
.default-box{
    width: 50px;
    height: 50px;
    border: 1px solid #222;
    margin: 20px auto;
    display: flex;
    align-items: center;
    justify-content: center;
}
.default-nav {
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
}
.active {
    background-color: red;
}
</style>
