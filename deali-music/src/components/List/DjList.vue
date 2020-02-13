<template>
    <article>
        test
    </article>
</template>

<script>
import { getGroup } from '@/service/Group';

    export default {
        setup() {
        
            getGroup().once('value', snapshot => {
                const keys = Object.keys(snapshot.val());
                keys.map(item => {
                    getGroup().child(item)
                        .orderByChild('isDJ').equalTo(true)
                        .on("child_added", snapshot=>{
                            console.log(snapshot.val());
                        });
                })
            })

            return{

            }
        }
    }
</script>

<style lang="scss" scoped>

</style>
