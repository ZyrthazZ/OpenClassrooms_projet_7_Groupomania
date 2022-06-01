<template>
    <header class="header">

        <img src="../assets/logos/icon-left-font-monochrome-white.svg" alt="Logo Groupomania" class="header__logo">

        <div class="header__buttons">
            <router-link to='/profile'>
                <button class="header__profile">
                    <img :src="userContent.profilePic" alt="" class="header__profile-img">
                    <span class="header__profile-pseudo">{{ userContent.username }}</span>
                </button>
            </router-link>

            <Logout class="header__logout" />
        </div>

    </header>
</template>


<script>
import Logout from '../components/Logout.vue';

export default {
    name: 'Header',
    components: {
        Logout
    },
    data() {
        return {
            userContent: ''
        }
    },
    
    created() {
        this.$store.dispatch("user/getUserProfile")
            .then(response => {
                this.userContent = response.data
            })
    }
}
</script>


<style lang="scss">
@import '@/assets/sass/main.scss';

.header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
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
