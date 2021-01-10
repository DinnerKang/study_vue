<template>
    <section>
        <div>회원가입 페이지</div>
        <form @submit.prevent="clickSignUp(email, password)">
            <div>
                <input type="email" v-model="email" />
            </div>
            <div>
                <input type="text" v-model="password" />
            </div>
            <button type="submit">완료</button>
        </form>
    </section>
</template>

<script>
import { ref } from "@vue/composition-api";
import { signUpService } from "@/services/signUp";

export default {
    setup() {
        const email = ref("");
        const password = ref("");

        return {
            email,
            password,
            ...signUpService(),
        };
    },
};
</script>

<style lang="scss" scoped></style>
