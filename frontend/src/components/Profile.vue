<template>
    <header class="profile__header">
        <img src="../assets/logos/icon-left-font-monochrome-white.svg" alt="" class="header__logo">
        <Logout class="profile__header__logout" />
    </header>

    <section class="redirect">
        <router-link :to="'/home'">Retourner à l'accueil</router-link>
    </section>

    <section class="profile">

        <img :src="user.userData.profilePic" alt="Image de profil de l'utilisateur" class="profile__pic">

        <p class="profile__introduction">
            Bienvenue {{ user.userData.username }},<br /> sur cette page vous pouvez modifier les
            informations de votre
            profil
            ainsi que votre mot de passe. Vous pouvez également supprimer votre compte.
        </p>

        <Form @submit="handleUpdateUserProfile" enctype="multipart/form-data" action="" method="post"
            class="profile__form">

            <p class="profile__form-title">Informations du profil</p>
            <p>Adresse email : {{ user.userData.email }}</p>

            <!-- <p>Pseudo</p> -->
            <div class="profile__form-username">
                <label for="username">Pseudo de l'utilisateur</label>

                <Field type="text" name="username" id="username" :value="user.userData.username" />
            </div>

            <div class="profile__form-bio">
                <label for="bio">Bio de l'utilisateur</label>

                <Field type="text" name="bio" id="bio" :value="user.userData.bio" />
            </div>

            <p>Photo de profil</p>
            <div class="profile__form-img">
                <img :src="user.userData.profilePic" alt="Image de profil de l'utilisateur"
                    class="profile__form-img-profilePic">

                <label for="image"><img src="../assets/icons/file-image-regular.svg" alt=""
                        class="profile__form-img-icon" title="Ajouter une image de profil"></label>
                <Field type="file" name="image" id="image" />

            </div>

            <button type="submit" class="profile__form-button">Modifier les informations</button>

        </Form>

        <p class="updatePassword__redirect">
            <router-link :to="'/updatePassword'">Cliquez ici</router-link> pour changer votre mot de passe
        </p>
    </section>

    <!-- Here we deal with the DeleteProfilePopup -->

    <!-- On the click of this button, the TogglePopup function is triggered, 
    which passes the buttonTrigger of popupTriggers to true, which shows the DeleteProfilePopup content -->
    <button @click="() => TogglePopup('buttonTrigger')" class="deleteProfileButton">Supprimer le profil</button>

    <DeleteProfilePopup v-if="popupTriggers.buttonTrigger" :TogglePopup="() => TogglePopup('buttonTrigger')" />
</template>

<script>
import Logout from '../components/Logout.vue';
import DeleteProfilePopup from './popup/DeleteProfilePopup.vue'

import { Form, Field, ErrorMessage } from 'vee-validate';
import { mapState } from 'vuex'
import { ref } from 'vue';

export default {
    name: 'Profile',

    setup() {
        const popupTriggers = ref({
            buttonTrigger: false
        });

        const TogglePopup = (trigger) => {
            popupTriggers.value[trigger] = !popupTriggers.value[trigger]
        }

        return {
            popupTriggers,
            TogglePopup
        }
    },

    components: {
        Logout,
        DeleteProfilePopup,
        Form,
        Field,
        ErrorMessage
    },

    computed: {
        ...mapState(['user'])
    },

    methods: {
        handleUpdateUserProfile(content) {
            //Shows the content the user wants to modify
            console.log("content to send ", content)

            //Defines what the content object contains
            let { username, bio, ...profilePic } = content;

            //If the user changes the profilePic, then we use it in content
            if (profilePic.image) {
                //Defines the data object containing the username, the bio and the image
                let data = {
                    username: username,
                    bio: bio,
                    image: profilePic.image[0]
                }
                console.log(data);

                //Passes the data object to the updateUserProfile in the user module store
                return this.$store.dispatch("user/updateUserProfile", data)

                //If the user doesn't change the profilePic, then we don't pass the image in the content
            } else {
                //Defines the data object containing the username and the bio
                let data = {
                    username: username,
                    bio: bio
                }
                console.log(data);

                //Passes the data object to the updateUserProfile in the user module store
                return this.$store.dispatch("user/updateUserProfile", data)
            }
        }
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
    width: 80%;
    align-items: center;

    @include desktop {
        max-width: 1200px;
    }

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

        &-username {
            display: flex;
            flex-direction: column;
            
            margin: 30px 0 30px 0;
        }
        
        &-bio {
            display: flex;
            flex-direction: column;
            
            margin: 30px 0 30px 0;
        }

        input {
            background-color: $primary-color;
            border-radius: 15px;
            border: none;
            padding: 10px;
            width: 40vw;

            @include desktop {
                max-width: 500px;
            }
        }

        &-img {
            display: flex;
            flex-direction: row;
            justify-content: space-around;

            &-profilePic {
                width: 60px;
                height: 60px;
                object-fit: cover;
            }

            &-icon {
                width: 50px;
                cursor: pointer;
            }

            input {
                display: none;
            }
        }

        &-button {
            margin-top: 20px;
            border: none;
            border-radius: 15px;
            padding: 10px;
            background-color: $primary-color;
            cursor: pointer;
        }
    }

}

.deleteProfileButton {
    display: flex;
    margin: 20px auto;

    margin-top: 20px;
    border: none;
    border-radius: 15px;
    padding: 10px;
    background-color: $primary-color;
    cursor: pointer;
}
</style>