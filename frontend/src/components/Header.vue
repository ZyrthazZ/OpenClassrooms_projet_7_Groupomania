<template>
    <header class="header">

        <img src="../assets/logos/icon-left-font-monochrome-white.svg" alt="Logo Groupomania" class="header__logo">

        <div class="header__buttons">
            <router-link to='/profile'>
                <button class="header__profile" title="Profil">
                    <img :src="user.userData.profilePic" alt="Image de profil de l'utilisateur"
                        class="header__profile-img">
                    <span class="header__profile-pseudo">{{ user.userData.username }}</span>
                </button>
            </router-link>

            <Logout class="header__logout" />
        </div>

    </header>
</template>


<script>
import { mapState } from 'vuex';
import Logout from '../components/Logout.vue';

export default {
    name: 'Header',

    components: {
        Logout
    },

    data() {
        return {

        }
    },

    computed: {
        ...mapState(['user']),

        loggedIn() {
            return this.$store.state.auth.status.loggedIn;
        },
    },

    created() {
        if (!this.loggedIn) {
            this.$router.push("/login");
        }

    },
}
</script>


<style lang="scss">
@import '@/assets/sass/main.scss';

.header {
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin: auto 5px 50px 5px;


    &__logo {
        width: 150px;
    }

    &__profile {
        display: flex;
        flex-direction: column;
        background-color: $background-color;
        cursor: pointer;
        border: none;
        align-items: center;

        &-img {
            width: 40px;
            height: 40px;
            object-fit: cover;
            border-radius: 15px;
            align-items: center;
            margin: 10px;
        }
    }

    &__buttons {
        display: flex;

        a {
            text-decoration: none;
        }
    }

    &__logout {
        width: 30px;
    }
}
</style>
