<template>
    <div class="child">
        <p @click="clickEvent">홈 - 자식 컴포넌트</p>
        <div class="child-container">
            자아아아식 {{ value }}
        </div>
    </div>
</template>

<script>
export default {
    name: 'Child',
    props: {
        value: {
            type: Number,
        },
    },
    setup(props, { emit }) {
        const clickEvent = () => {
            const test = props.value + 1;
            emit('input', test);
        };
        return {
            clickEvent,
        };
    },
}
</script>
