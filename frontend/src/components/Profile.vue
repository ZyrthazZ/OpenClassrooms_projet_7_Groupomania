<template>
    <header class="profile__header">
        <img src="../assets/logos/icon-left-font-monochrome-white.svg" alt="" class="header__logo">
        <Logout class="profile__header__logout" />
    </header>

    <section class="redirect">
        <router-link :to="'/home'">Retourner à l'accueil</router-link>
    </section>

    <section class="profile">

        <img :src="this.$store.state.user.userData.profilePic" alt="Photo de profil de l'utilisateur"
            class="profile__pic">

        <p class="profile__introduction">
            Bienvenue {{ this.$store.state.user.userData.username }},<br /> sur cette page vous pouvez modifier les
            informations de votre
            profil
            ainsi que votre mot de passe.
        </p>

        <Form @submit="handleUpdateUserProfile" enctype="multipart/form-data" action="" method="post"
            class="profile__form">

            <p class="profile__form-title">Informations du profil</p>
            <p>Adresse email : {{ this.$store.state.user.userData.email }}</p>

            <div class="profile__form-username">
                <p>Pseudo</p>
                <Field type="text" name="username" id="username" :value="this.$store.state.user.userData.username" />
            </div>

            <div class="profile__form-bio">
                <p>Bio</p>
                <Field type="text" name="bio" id="bio" :value="this.$store.state.user.userData.bio" />
            </div>

            <div class="profile__form-img">
                <p>Photo de profil</p>
                <img :src="this.$store.state.user.userData.profilePic" alt="Photo de profil de l'utilisateur"
                    class="profile__form-img-profilePic">

                <label for="file"><img src="../assets/icons/file-image-regular.svg" alt=""
                        class="create__post__interface__form-buttons-file-icon"></label>
                <Field type="file" name="image" id="image" />
            </div>

            <button type="submit" class="profile__form-button">Modifier les informations</button>

        </Form>

        <p class="updatePassword__redirect">
            <router-link :to="'/updatePassword'">Cliquez ici</router-link> pour changer votre mot de passe
        </p>
    </section>
</template>

<script>
import Logout from '../components/Logout.vue';
import { Form, Field, ErrorMessage } from 'vee-validate';
import UserService from "../services/user.service";

export default {
    name: 'Profile',

    data() {
        return {

        }
    },

    components: {
        Logout,
        Form,
        Field,
        ErrorMessage
    },

    methods: {
        handleUpdateUserProfile(content) {

            // I wish to call the dispate update userprofile directly here so that it calls the update UserProfile service
            UserService.updateUserProfile(content)
                .then(() => {
                    //As a promise of updateUserProfile, we call getUserProfile from the store
                    this.$store.dispatch("user/getUserProfile")
                        .then(() => {
                            //As a promise of getUserProfile, we reload the page
                            this.$router.go()
                        })
                })
        }
    },
    created() {

    },

}
</script>

<style lang="scss">
@import '@/assets/sass/main.scss';

.profile__header {
    display: flex;
    justify-content: center;
    margin: 20px 5px 50px 5px;

    &__logo {
        width: 200px;
    }

    &__logout {
        width: 30px;
        padding-left: 40px;
    }
}

.redirect {
    display: flex;
    justify-content: space-around;
    margin-bottom: 60px;
}

.profile {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: auto;
    text-align: center;
    width: 70vw;
    align-items: center;

    &__pic {
        width: 100px;
        height: 100px;
        margin-bottom: 30px;
        border-radius: 15px;
        object-fit: cover;
    }

    &__form {
        background-color: $secondary-color;
        border-radius: 15px;
        padding: 20px;
        text-align: center;

        &-title {
            margin-bottom: 40px;
        }

        input {
            background-color: $primary-color;
            border-radius: 15px;
            border: none;
            padding: 10px;
            width: 40vw;
        }

        &-img {
            &-profilePic {
                width: 60px;
                height: 60px;
                object-fit: cover;
            }

            /* input {
                display: none;
            } */
        }

        &-button {
            margin-top: 20px;
            border: none;
            border-radius: 15px;
            padding: 10px;
            background-color: $primary-color;
        }
    }
}
</style>