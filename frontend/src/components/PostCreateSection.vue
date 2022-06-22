<template>
    <section class="create__post">


        <div class="create__post__introduction">

            <span class="create__post__introduction-greetings">
                Bonjour {{ user.userData.username }} !
            </span>
            <br />
            <span class="create__post__introduction-share">
                Voulez-vous partager quelque chose ?
            </span>

        </div>


        <div class="create__post__interface">


            <img :src="user.userData.profilePic" alt="Image de profil de l'utilisateur"
                class="create__post__interface-profilepic">

            <Form @submit="handleCreatePost" action="" method="post" class="create__post__interface__form">

                <div class="create__post__interface__form-title">
                    <Field type="text" placeholder="Titre de votre post" name="title" id="title" />
                </div>

                <div class="create__post__interface__form-text">
                    <Field type="text" placeholder="Qu'avez-vous en tête ?" name="content" id="content" />
                </div>

                <div class="create__post__interface__form-buttons">

                    <div class="create__post__interface__form-buttons-file">
                        <label for="img"><img src="../assets/icons/file-image-regular.svg" alt=""
                                class="create__post__interface__form-buttons-file-icon"
                                title="Ajouter une image"></label>
                        <Field type="file" name="img" id="img" />
                    </div>

                    <div class="create__post__interface__form-buttons-submit">
                        <button type="submit" class="create__post__interface__form-buttons-submit-button"
                            title="Publier"><img src="../assets/icons/send-icon.svg" alt=""
                                class="create__post__interface__form-buttons-submit-icon">
                        </button>
                    </div>

                </div>

            </Form>

        </div>


    </section>
</template>

<script>
import { mapState } from 'vuex'
import { Form, Field, ErrorMessage } from 'vee-validate';

export default {
    name: 'PostCreateSection',

    components: {
        Form,
        Field,
        ErrorMessage
    },

    computed: {
        ...mapState(['user']),
    },

    methods: {
        handleCreatePost(post) {
            console.log(post)

            //Defines what the post object contains
            let { title, content, ...imageUrl } = post;

            //If the user send a picture, then we use it in post
            if (imageUrl.img) {
                //Defines the data object containing the title, the content and the image
                let data = {
                    title: title,
                    content: content,
                    image: imageUrl.img[0]
                }
                console.log(data);

                //Passes the data object to the createPost in the post module store
                return this.$store.dispatch("post/createPost", data)
                    .then(() => {
                        //As a promise we use the getAllPosts function in the post module store, this way the new post is immediately displayed
                        this.$store.dispatch("post/getAllPosts")
                    })
                    .catch()

                //If the user doesn't send a picture, then we don't use it in post
            } else {
                //Defines the data object containing the title and the content
                let data = {
                    title: title,
                    content: content,
                }
                console.log(data);

                //Passes the data object to the createPost in the post module store
                return this.$store.dispatch("post/createPost", data)
                    .then(() => {
                        //As a promise we use the getAllPosts function in the post module store, this way the new post is immediately displayed
                        this.$store.dispatch("post/getAllPosts")
                    })
                    .catch()
            }
        }
    },
}
</script>

<style lang="scss">
@import '@/assets/sass/main.scss';

.create__post {
    display: flex;
    flex-direction: column;
    margin: auto;
    width: 100%;

    @include desktop {
        max-width: 1200px;
    }

    &__introduction {
        margin-bottom: 30px;
        margin: auto auto 10px auto;

        @include desktop {
            margin: auto auto 40px auto;
        }

        &-share {
            color: $text-secondary-color;
        }
    }

    &__interface {
        display: flex;
        justify-content: center;

        margin: auto;
        text-align: center;

        &-profilepic {
            width: 40px;
            height: 40px;
            object-fit: cover;
            border-radius: 15px;
            margin-right: 10px;
        }

        &__form {

            input {
                background-color: $primary-color;
                border-radius: 15px;
                border: none;
                padding: 15px;
                margin-bottom: 10px;
                width: 60vw;

                @include desktop {
                    max-width: 1000px;
                }
            }

            &-buttons {
                display: flex;
                flex-direction: row;
                justify-content: space-between;

                &-file {
                    input {
                        display: none;
                    }

                    &-icon {
                        width: 50px;
                        cursor: pointer;
                    }
                }

                &-submit {
                    &-button {
                        border: none;
                        border-radius: 15px;
                        background-color: $background-color;
                    }

                    &-icon {
                        width: 60px;
                        border: none;
                        cursor: pointer;
                    }
                }
            }
        }
    }
}
</style>