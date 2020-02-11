<template>
    <article>
        test
    </article>
</template>

<script>
import * as firebase from "firebase/app";
import "firebase/database";

    export default {
        setup() {
            const ref = firebase.database().ref('group');
            ref.once("value", snapshot=>{
                const keys = Object.keys(snapshot.val());
                keys.map(item=>{
                    ref.child(item)
                        .orderByChild('isDJ').equalTo(true)
                        .on("child_added", snapshot=>{
                            console.log(snapshot.val());
                        });
                })
            });

            return{

            }
        }
    }
</script>

<style lang="scss" scoped>

</style>
