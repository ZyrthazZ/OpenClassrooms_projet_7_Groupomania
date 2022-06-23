<template>
    <div class="popup">
        <div class="popup-inner">
            <button class="popup-inner__close" @click="TogglePopup()">
                Annuler
            </button>

            <Form @submit="handleUpdateUserProfileAdmin" enctype="multipart/form-data" action="" method="post"
                class="profile__form">

                <p class="profile__form-title">Informations du profil</p>

                <p>Pseudo</p>
                <div class="profile__form-username">
                    <Field type="text" name="username" id="username" :value="user.username" />
                </div>

                <p>Bio</p>
                <div class="profile__form-bio">
                    <Field type="text" name="bio" id="bio" :value="user.bio" />
                </div>

                <p>Photo de profil</p>
                <div class="profile__form-img">
                    <img :src="user.profilePic" alt="Image de profil de l'utilisateur"
                        class="profile__form-img-profilePic">

                    <label for="image"><img src="../../assets/icons/file-image-regular.svg" alt=""
                            class="profile__form-img-icon" title="Ajouter une image de profil"></label>
                    <Field type="file" name="image" id="image" />

                </div>

                <button type="submit" class="popup-inner__form-confirmButton">Modifier les informations</button>

            </Form>

            <button class="popup-inner__close" @click="this.youSure = true">Supprimer l'utilisateur</button>

            <div v-if="youSure" class="popup-inner__deleteConfirmation">
                <span>Êtes-vous sûr(e) ?</span>
                <div>
                    <button @click="handleDeleteUserProfileAdmin" class="popup-inner__form-confirmButton">Oui
                    </button>

                    <button @click="TogglePopup()" class="popup-inner__close">Non
                    </button>
                </div>

            </div>


            <span v-show="successMessageModify">Ce profil a bien été modifié !</span>
            <span v-show="successMessageDelete">Ce profil a bien été supprimé !</span>

        </div>
    </div>
</template>

<script>
import { Form, Field, ErrorMessage } from 'vee-validate';

export default {
    name: 'ModifyProfilePopup',

    data() {
        return {
            successMessageModify: false,
            successMessageDelete: false,
            youSure: false,
        }
    },

    props: ['TogglePopup', 'user'],

    components: {
        Form,
        Field,
        ErrorMessage
    },

    methods: {
        //this function allows the admin to modify a profile
        handleUpdateUserProfileAdmin(content) {
            //Shows the content the user wants to modify
            console.log("content to send ", content)
            console.log(JSON.parse(JSON.stringify(this.user)))
            let { username, bio, ...profilePic } = content;

            //If the user changes the profilePic, then we use it in content
            if (profilePic.image) {
                //Defines the data object containing the username, the bio and the image
                let data = {
                    username: username,
                    bio: bio,
                    image: profilePic.image[0],
                    userId: this.user.id
                }
                console.log(data);

                //Passes the data object to the updateUserProfile in the user module store
                return this.$store.dispatch("user/updateUserProfileAdmin", data)
                    .then(() => {
                        this.successMessageModify = true;
                        this.$store.dispatch("post/getAllPosts")
                            .then(() => {
                                setTimeout(() => { this.TogglePopup() }, 2000)
                            })
                    })

                //If the user doesn't change the profilePic, then we don't pass the image in the content
            } else {
                //Defines the data object containing the username and the bio
                let data = {
                    username: username,
                    bio: bio,
                    userId: this.user.id
                }
                console.log(data);

                //Passes the data object to the updateUserProfile in the user module store
                return this.$store.dispatch("user/updateUserProfileAdmin", data)
                    .then(() => {
                        this.successMessageModify = true;
                        this.$store.dispatch("post/getAllPosts")
                            .then(() => {
                                setTimeout(() => { this.TogglePopup() }, 2000)
                            })
                    })
            }
        }, //End of handleUpdateUserProfileAdmin

        handleDeleteUserProfileAdmin(error) {
            const userId = this.user.id

            return this.$store.dispatch("user/deleteUserProfileAdmin", userId, error)
                .then(() => {
                    this.successMessageDelete = true;
                    this.$store.dispatch("post/getAllPosts")
                        .then(() => {
                            setTimeout(() => { this.TogglePopup() }, 2000)
                        })
                })
                .catch(error => {
                    console.log(error.response.data)
                })
        }, //End of handleDeleteUserProfileAdmin
    },

}
</script>

<style lang="scss" scoped>
@import '@/assets/sass/main.scss';

.popup {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 99;

    background-color: rgba(0, 0, 0, 0.5);

    display: flex;
    align-items: center;
    justify-content: center;

    .popup-inner {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        text-align: center;

        background: $secondary-color;
        padding: 10px;
        border-radius: 10px;

        button {
            margin: 20px auto 40px auto;
            width: 25vw;
        }

        &__close {
            background-color: red;
            border: none;
            border-radius: 5px;
            padding: 5px;
            cursor: pointer;
        }

        &__form {
            border-radius: 15px;

            input {
                background-color: $primary-color;
                border-radius: 15px;
                border: none;
                padding: 15px;
                margin: 15px auto 20px auto;
                width: 40vw;
            }

            &-errorMessage {
                color: red;
                margin-bottom: 10px;
            }

            &-input {
                padding-top: 40px;
                padding-bottom: 30px;
            }

            &-confirmButton {
                margin-bottom: 30px;
                border: none;
                border-radius: 15px;
                padding: 15px;
                background-color: green;
                cursor: pointer;
            }

            &-img {
                display: flex;
                flex-direction: row;
                justify-content: space-around;

                &-postPic {
                    width: 200px;
                    height: 200px;

                    @include desktop {
                        width: 300px;
                        height: 300px;
                    }
                }

                &-icon {
                    width: 50px;
                    padding-top: 100px;
                    cursor: pointer;
                }

                input {
                    display: none;
                }
            }
        }
    }
}
</style>