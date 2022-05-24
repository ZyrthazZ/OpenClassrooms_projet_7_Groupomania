<template>
    <header class="header">

        <img src="../assets/logos/icon-left-font-monochrome-white.svg" alt="" class="header__logo">

        <div class="header__buttons">
            <router-link :to="'/profile'">
                <button class="header__profile">
                    <img src="../assets/img/default_profile_pic.jpg" alt="" class="header__profile-img">
                    <span class="header__profile-pseudo">{{ content.username }}</span>
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
            content: ''
        }
    },
    beforeMount() {
        /* this.$router.go(1); */
        //TODO : avoid the bug width each time there is a new connection, the mounted method for retrieving user information doesn't work
    },
    mounted() {
        //This method refresh the page 
        if (localStorage.getItem('reloaded')) {
            // The page was just reloaded. Clear the value from local storage
            // so that it will reload the next time this page is visited.
            localStorage.removeItem('reloaded');
        } else {
            // Set a flag so that we know not to reload the page twice.
            localStorage.setItem('reloaded', '1');
            this.$router.go();;
        }
        
        this.$store.dispatch("user/getUserProfile")
            .then(response => {
                this.content = response.data
            })
    },
    created() {
        /* this.$router.go(); */
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
