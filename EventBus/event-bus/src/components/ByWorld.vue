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
        }
    },
    created(){
        EventBus.$on('push-msg', (payload)=>{
            this.msg = payload;
        });
    }

}
</script>

<style scoped>

</style>
