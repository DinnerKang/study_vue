<template>
    <section>
        <div>
            회원가입 페이지
        </div>
        <div>
            <input type="text" v-model="email" />
        </div>
        <div>
            <input type="text" v-model="password" />
        </div>
        <div>
            <button @click="clickSignUp(email, password)">완료</button>
        </div>
    </section>
</template>

<script>
import { ref } from '@vue/composition-api';
import { signUpService } from '@/services/signUp';

export default {
    setup() {
        const email = ref('');
        const password = ref('');

        return {
            email,
            password,
            ...signUpService(),
        };
    },
}
</script>

<style lang="scss" scoped>

</style>