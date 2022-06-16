<template>
    <button @click="handleLogout" class="logout__button" title="Se déconnecter">
        <img src="../assets/icons/logout-icon.svg" alt="" class="logout__button-icon">
    </button>
</template>

<script>
export default {
    name: 'Logout',

    methods: {
        handleLogout() {
            this.$store.dispatch('auth/logout')
                .then(() => {
                    this.$router.push("/login");
                }
                );
        }
    }
}
</script>

<style lang="scss">
@import '@/assets/sass/main.scss';

.logout__button {
    border: none;
    border-radius: 15px;
    background-color: $background-color;
    cursor: pointer;

    &-icon {
        width: 30px;
    }
}
</style>