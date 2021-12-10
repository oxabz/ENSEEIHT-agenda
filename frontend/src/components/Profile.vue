<template>
<div v-if="login" class="flex">
    <div class="mb-8 rounded-full w-24 h-24 flex-initial">
        <img :src="image" alt="avatar">
    </div>
    <div class="flex-initial">
        <button class="btn">Logout</button>
    </div>
</div>
    

</template>
<script>
export default {
    name: "Profile",
    computed: {
        image() {
            return this.$store.state.login.user.avatar;
        },
        login() {
            return this.$store.state.login.login;
        }
    }
};
</script>
