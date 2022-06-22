<template>
    <div class="popup">
        <div class="popup-inner">
            <button class="popup-inner__close" @click="TogglePopup()">
                Annuler
            </button>

            <Form @submit="handleUpdatePost" action="" method="post" class="popup-inner__form">

                <p>Titre</p>
                <div class="popup-inner__form-title">
                    <Field type="text" name="title" id="title" :value="post.title" />
                </div>
                <ErrorMessage name="title" class="popup-inner__form-errorMessage" />

                <p>Contenu</p>
                <div class="popup-inner__form-content">
                    <Field type="text" name="content" id="content" :value="post.content" />
                </div>
                <ErrorMessage name="content" class="popup-inner__form-errorMessage" />

                <p>Image</p>
                <div class="popup-inner__form-img">
                    <img :src="post.imageUrl" alt="Image du post" class="popup-inner__form-img-postPic">
                    <label for="image"><img src="../../assets/icons/file-image-regular.svg" alt=""
                            class="popup-inner__form-img-icon" title="Ajouter ou changer l'image d post">
                    </label>
                    <Field type="file" name="image" id="image" />
                </div>

                <button type="submit" class="popup-inner__form-confirmButton">Confirmer les modifications</button>

            </Form>

            <span v-show="successMessage">Ce post a bien été modifié !</span>
        </div>
    </div>
</template>

<script>
import { Form, Field, ErrorMessage } from 'vee-validate';

export default {
    name: 'ModifyPostPopup',

    data() {
        return {
            successMessage: false,
        }
    },

    props: ['TogglePopup', 'post'],

    components: {
        Form,
        Field,
        ErrorMessage
    },

    methods: {
        handleUpdatePost(postUpdate) {
            console.log(this.post.id)

            //Shows the content the user wants to modify
            console.log("post updated ", postUpdate)

            //Defines what the content object contains
            let { title, content, ...imageUrl } = postUpdate;

            //If the user changes the profilePic, then we use it in content
            if (imageUrl.image) {
                //Defines the data object containing the username, the bio and the image
                let data = {
                    title: title,
                    content: content,
                    image: imageUrl.image[0],
                    postId: this.post.id
                }
                console.log(data);

                //Passes the data object to the updateUserProfile in the user module store
                return this.$store.dispatch("post/updatePost", data)
                    .then(() => {
                        this.successMessage = true;
                        this.$store.dispatch("post/getAllPosts")
                            .then(() => {
                                setTimeout(() => { this.TogglePopup() }, 2000)
                            })
                    })

                //If the user doesn't change the profilePic, then we don't pass the image in the content
            } else {
                //Defines the data object containing the username and the bio
                let data = {
                    title: title,
                    content: content,
                    postId: this.post.id
                }
                console.log(data);

                //Passes the data object to the updateUserProfile in the user module store
                return this.$store.dispatch("post/updatePost", data)
                    .then(() => {
                        this.successMessage = true;
                        this.$store.dispatch("post/getAllPosts")
                            .then(() => {
                                setTimeout(() => { this.TogglePopup() }, 2000)
                            })
                    })
            }
        }
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