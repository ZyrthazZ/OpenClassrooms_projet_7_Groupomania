<template>
    <section class="postDisplaySection">
        <div v-for="post in post.postData.allPosts" :key="post.id">
            <!-- :key="post.id" -->

            <div class="postDisplaySection__post">

                <div class="postDisplaySection__post__creator">
                    <img v-bind:src="post.User.profilePic" alt="Image de profil de l'utilisateur"
                        class="postDisplaySection__post__creator-profilePic">
                    <div class="postDisplaySection__post__creator-text">
                        <span class="postDisplaySection__post__creator-text-username">{{ post.User.username }}</span>
                        <span class="postDisplaySection__post__creator-text-published">
                            Publié {{ dayjs(post.createdAt).fromNow() }}</span>
                    </div>
                </div>

                <div class="postDisplaySection__post__content">
                    <div class="postDisplaySection__post__content-text">
                        <h3 class="postDisplaySection__post__content-text-title">{{ post.title }}</h3>
                        <p class="postDisplaySection__post__content-text-text">{{ post.content }}
                        </p>
                    </div>

                    <div class="postDisplaySection__post__content-imgContainer">
                        <img v-show="post.imageUrl" v-bind:src="post.imageUrl" alt=""
                            class="postDisplaySection__post__content-imgContainer-img">
                    </div>
                </div>

            </div>

            <div class="postDisplaySection__post__social-buttons">
                <div class="postDisplaySection__post__social-like">
                    <button @click="handleLikePost(post.id)" class="postDisplaySection__post__social-like-button"
                        title="J'aime"><img src="../assets/icons/like-solid-icon.svg" alt=""
                            class="postDisplaySection__post__social-like-button-icon"></button>
                    <span class="postDisplaySection__post__social-like-count">{{ post.likes }}</span>
                </div>

                <div class="postDisplaySection__post__social-comment">
                    <button @click="showComments" class="postDisplaySection__post__social-comment-button"
                        title="Commentaires"><img src="../assets/icons/comment-regular-icon.svg" alt=""
                            class="postDisplaySection__post__social-comment-button-icon"><span
                            class="postDisplaySection__post__social-comment-count">
                            {{ post.commentsCount }}</span>
                    </button>
                </div>
            </div>

            <div class="postDisplaySection__post__social">
                <!-- <div v-show="tomate"> -->
                <!-- This div contains the comment section, which is hidden except on click of the showComments button -->
                <div>
                    <Form @submit="handleCommentPost" class="postDisplaySection__post__social-comment-form">
                        <div class="postDisplaySection__post__social-comment-form-text">
                            <Field type="text" name="content" id="content" placeholder="Qu'en pensez-vous ?" />
                        </div>
                        <ErrorMessage name="content" />
                        <div class="postDisplaySection__post__social-comment-form-postId">
                            <Field type="text" name="postId" id="postId" :value="post.id" />
                        </div>
                        <button type="submit"
                            class="postDisplaySection__post__social-comment-form-button">Commenter</button>
                    </Form>

                    <div v-for="comment in post.Comments" class="postDisplaySection__post__social-comment-content">
                        <div class="postDisplaySection__post__social-comment-content-creator">
                            <img :src="comment.user.profilePic"
                                alt="Photo de profil de la personne ayant commenté ce post"
                                class="postDisplaySection__post__social-comment-content-creator-profilePic" />
                            <span class="postDisplaySection__post__social-comment-content-creator-username">
                                {{ comment.user.username }}</span>
                        </div>
                        <span class="postDisplaySection__post__social-comment-content-text">{{ comment.content
                        }}</span>
                    </div>

                </div>

                <!-- </div> -->
            </div>

        </div>
    </section>
</template>

<script>
import { mapState } from 'vuex'
import { Form, Field, ErrorMessage } from 'vee-validate';

//Here we have the dayjs logic, to display dates in a more readable way
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import * as locale from 'dayjs/locale/fr'
dayjs.extend(relativeTime).locale(locale)


export default {
    name: 'postDisplaySection',

    data() {
        return {
            dayjs,
            tomate: false,
        }
    },

    components: {
        Form,
        Field,
        ErrorMessage
    },

    computed: {
        ...mapState(['post']),
    },

    methods: {
        //Begin of the like post function
        handleLikePost(postId) {
            console.log(postId)
            this.$store.dispatch("post/likePost", postId)
                .then(() => {
                    this.$store.dispatch("post/getAllPosts")
                })
        }, //End of handleLikePost

        //Begin of the comment creation function
        handleCommentPost(comment) {
            //We take the form data, with the content of the comment, and with the 
            //post.id which is hidden in an invisible input, as :value, so the postId
            //get past in the comment object

            console.log(comment)

            this.$store.dispatch("post/commentPost", comment)
                .then(() => {
                    this.$store.dispatch("post/getAllPosts")
                })
        }, //End of handleCommentPost

        showComments() {
            if (this.tomate) {
                this.tomate = false
            } else {
                this.tomate = true
            }
        }
    },

    mounted() {
        this.$store.dispatch("post/getAllPosts")
            .then(() => {

            })
    }
}
</script>

<style lang="scss">
@import '@/assets/sass/main.scss';

.postDisplaySection {

    display: flex;
    flex-direction: column;
    margin: 40px auto auto auto;
    justify-content: center;

    @include desktop {
        margin: 80px auto auto auto;
    }

    &__post {
        background-color: $secondary-color;
        border-radius: 15px;
        margin: auto;
        margin-bottom: 40px;

        width: 100%;

        @include mobile {
            width: 80%;
        }

        @include tablet {
            width: 60%;
        }

        @include desktop {
            max-width: 1200px;
        }

        &__creator {
            display: flex;

            &-profilePic {
                width: 40px;
                height: 40px;
                object-fit: cover;
                border-radius: 15px;
                align-items: center;
                margin: 10px;
            }

            &-text {
                display: flex;
                flex-direction: column;

                &-username {
                    align-self: flex-start;
                    padding-top: 10px;
                    padding-bottom: 2px;
                }
            }
        }

        &__content {

            &-text {
                padding: 15px;
                background-color: $primary-color;
            }

            &-imgContainer {

                &-img {
                    height: 100%;
                    width: 100%;
                    object-fit: contain;
                    border-radius: 0px 0px 15px 15px;

                    margin-bottom: -5px;
                }
            }
        }

        &__social {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            margin-bottom: 70px;

            @include desktop {
                margin-bottom: 200px;
            }

            &-buttons {
                display: flex;
                flex-direction: row;
                justify-content: space-around;

                @include desktop {
                    margin: auto 300px auto 300px;
                }
            }

            &-like {


                &-button {
                    cursor: pointer;
                    border: none;
                    border-radius: 15px;
                    background-color: $background-color;

                    &-icon {
                        width: 30px;
                    }
                }
            }

            &-comment {


                &-button {
                    cursor: pointer;
                    border: none;
                    border-radius: 15px;
                    background-color: $background-color;

                    &-icon {
                        width: 30px;
                    }
                }

                &-form {
                    text-align: center;

                    input {
                        background-color: $primary-color;
                        border-radius: 15px;
                        border: none;
                        padding: 15px;
                        margin-bottom: 10px;
                        width: 30vw;
                    }

                    &-postId {
                        display: none;
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

                &-content {
                    width: 100%;

                    @include mobile {
                        width: 80%;
                    }

                    @include tablet {
                        width: 60%;
                    }

                    @include desktop {
                        max-width: 1200px;
                    }

                    background-color: $secondary-color;

                    border-radius: 15px;
                    margin: 40px auto 30px auto;

                    display: flex;
                    flex-direction: column;





                    &-creator {
                        display: flex;
                        flex-direction: row;
                        background-color: $primary-color;
                        border-radius: 15px 15px 0px 0px;

                        &-username {
                            align-self: center;
                            margin: 5px;
                        }

                        &-profilePic {
                            width: 40px;
                            height: 40px;
                            object-fit: cover;
                            border-radius: 15px;
                            align-items: center;
                            margin: 5px;
                        }
                    }

                    &-text {
                        margin: 10px;
                    }
                }
            }
        }
    }


}
</style>