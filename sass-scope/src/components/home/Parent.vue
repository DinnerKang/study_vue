<template>
    <div>
        홈 - 부모 컴포넌트
        <child class="child" v-model="testData" />
        <deep-child />
    </div>
</template>

<script>
import Child from './Child';
import DeepChild from './DeepChild';
import { ref } from "@vue/composition-api";

export default {
    name: 'Parent',
    components: {
        Child,
        DeepChild,
    },
    setup() {
        const testData = ref(0);
        return {
            testData,
        };
    },
}
</script>
<style lang="scss" scoped>
    .child{
        color: red;

        &-container{
            color: blue;
        }
    }
    .deep-child{
        color: red;

        ::v-deep &-container{
            color: blue;
        }
    }
</style>