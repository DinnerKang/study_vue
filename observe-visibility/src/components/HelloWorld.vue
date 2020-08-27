<template>
<div>
    <ul class="hello">
        <li v-for="(list, idx) in 10" :key="idx" :id="idx" v-observe-visibility="visibilityChanged">
            {{idx}}
        </li>
    </ul>
</div>
</template>

<script>
export default {
    name: "HelloWorld",
    props: {
        msg: String
    },
    setup() {
        console.log('hi');
        const visibilityChanged = (isVisible, entry) => {
            if (isVisible === false) return;
            console.log('보이는 ID: ', entry.target.id);
        };
        return {
            visibilityChanged,
        };
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>
li {
    list-style: none;
    width: 100px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 500px;
    border: 1px solid red;
    margin-left: 80px;
}

.hello {
    margin: 0 auto;
    width: 800px;
    border: 1px solid #000;
    display: flex;
    flex-wrap: wrap;
}
</style>
