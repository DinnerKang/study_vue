<template>
    <div>
        {{msg}}
    </div>
</template>

<script>
import EventBus from '../EventBus';
export default {
    data(){
        return{
            msg: '',
            count: 0,
        }
    },
    created(){
        EventBus.$on('push-msg', (payload)=>{
            this.msg = payload;
            this.count++;
            console.log(this.count);
        });
    },
    beforeDestroy(){
        EventBus.$off('push-msg');
    }

}
</script>

<style scoped>

</style>
