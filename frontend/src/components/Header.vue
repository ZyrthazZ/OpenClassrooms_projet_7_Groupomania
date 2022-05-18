<template>
    <header class="header">

        <img src="../assets/logos/icon-left-font-monochrome-white.svg" alt="" class="header__logo">

        <div class="header__buttons">
            <router-link :to="'/home'">
                <button class="header__profile">
                    <img src="../assets/img/default_profile_pic.jpg" alt="" class="header__profile-img">
                    <span class="header__profile-pseudo">Pseudo utilisateur</span>
                </button>
            </router-link>

            <Logout class="header__logout" />
        </div>

    </header>
</template>


<script setup>
import Logout from '../components/Logout.vue';
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
            border-radius: 15px;
            align-items: center;
            margin: 10px;
        }
    }
    
    &__buttons {
        display: flex;
    }
    
    &__logout {
        width: 30px;
        padding-bottom: 20px;
    }
}
</style>
