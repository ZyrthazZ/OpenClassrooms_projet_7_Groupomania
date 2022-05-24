<template>
    <header class="header">
        <img src="../assets/logos/icon-left-font-monochrome-white.svg" alt="" class="header__logo">
    </header>

    <section class="redirect">
        <router-link :to="'/home'">Retourner à l'accueil</router-link>
    </section>

    <section class="profile">
        {{ content.email }}
    </section>
</template>

<script>
import UserService from '../services/user.service';
export default {
    name: 'Profile',
    data() {
        return {
            content: ''
        }
    },

    mounted() {
        if (localStorage.getItem('reloaded')) {
            // The page was just reloaded. Clear the value from local storage
            // so that it will reload the next time this page is visited.
            localStorage.removeItem('reloaded');
        } else {
            // Set a flag so that we know not to reload the page twice.
            localStorage.setItem('reloaded', '1');
            location.reload();
        }
        this.$store.dispatch("user/getUserProfile")
            .then(response => {
                this.content = response.data
            })
    },

}
</script>

<style lang="scss">
@import '@/assets/sass/main.scss';

.header {
    display: flex;
    justify-content: space-around;
    margin: 20px 5px 50px 5px;

    &__logo {
        width: 200px;
    }
}

.redirect {
    display: flex;
    justify-content: space-around;
    margin-bottom: 100px;
}

.profile {
    display: flex;
    justify-content: space-around;
}
</style>