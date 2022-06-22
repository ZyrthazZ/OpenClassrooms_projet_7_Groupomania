<template>
    <div class="postDisplaySection__post">

        <div class="postDisplaySection__post__creator">

            <div class="postDisplaySection__post__creator-box">
                <img v-bind:src="post.User.profilePic" alt="Image de profil de l'utilisateur"
                    class="postDisplaySection__post__creator-box-profilePic">

                <div class="postDisplaySection__post__creator-box-text">
                    <span class="postDisplaySection__post__creator-box-text-username">
                        {{ post.User.username }}
                    </span>
                    <span class="postDisplaySection__post__creator-text-published">
                        Publié {{ dayjs(post.createdAt).fromNow() }}</span>
                </div>

            </div>

            <PostOptionsMenu class="postDisplaySection__post__creator-options" v-if="adminOrAuthorOfPost"
                :post="post" />

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
        <div v-show="tomate">
            <!-- This div contains the comment section, which is hidden except on click of the showComments button -->
            <div>
                <Form @submit="handleCommentPost" class="postDisplaySection__post__social-comment-form">
                    <div class="postDisplaySection__post__social-comment-form-text">
                        <Field type="text" name="content" id="content" placeholder="Qu'en pensez-vous ?" />
                    </div>
                    <ErrorMessage name="content" />
                    <!-- <div class="postDisplaySection__post__social-comment-form-postId">
                        <Field type="text" name="postId" id="postId" :value="post.id" />
                    </div> -->
                    <button type="submit"
                        class="postDisplaySection__post__social-comment-form-button">Commenter</button>
                </Form>

                <div v-for="comment in post.Comments" class="postDisplaySection__post__social-comment-content">
                    <SingleComment :comment="comment" />
                </div>

            </div>

        </div>
    </div>
</template>

<script>
import PostOptionsMenu from './optionsMenu/PostOptionsMenu.vue'
import SingleComment from '../components/SingleComment.vue'
import { Form, Field, ErrorMessage } from 'vee-validate';


//Here we have the dayjs logic, to display dates in a more readable way
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import * as locale from 'dayjs/locale/fr'
dayjs.extend(relativeTime).locale(locale)

export default {
    name: 'SinglePost',

    props: ['post'],

    components: {
        Form,
        Field,
        ErrorMessage,
        SingleComment,
        PostOptionsMenu,
    },

    data() {
        return {
            dayjs,
            tomate: false,
            adminOrAuthorOfPost: false,
        }
    },

    computed: {

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
        handleCommentPost(content) {
            //We take the form data, with the content of the comment, and with the 
            //post.id which is hidden in an invisible input, as :value, so the postId
            //get past in the comment object

            const postId = this.post.id;
            console.log(postId)
            console.log(content)

            const comment = {
                postId,
                content
            }
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
        const user = JSON.parse(localStorage.getItem('user'));
        console.log(user)
        const currentPost = JSON.parse(JSON.stringify(this.post))
        console.log(currentPost)

        if (user.userId == currentPost.UserId || user.isAdmin) {
            this.adminOrAuthorOfPost = true;
        }
    }
}


</script>

<style>
</style>