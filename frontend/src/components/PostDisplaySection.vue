<template>
    <section class="postDisplaySection">
        <div v-for="post in post.postData.allPosts">

            <div class="postDisplaySection__post">

                <div class="postDisplaySection__post__creator">
                    <img v-bind:src="post.User.profilePic" alt="" class="postDisplaySection__post__creator-profilePic">
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
            <span>{{ post.likes }}</span>
            <span>{{ post.Comments }}</span>
            <span>{{ post.commentsCount }}</span>
        </div>
    </section>
</template>

<script>
import { mapState } from 'vuex'

//Here we have the dayjs logic, to display dates in a more readable way
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import * as locale from 'dayjs/locale/fr'

dayjs.extend(relativeTime).locale(locale)


export default {
    name: 'postDisplaySection',

    data() {
        return { dayjs }
    },

    computed: {
        ...mapState(['post']),
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
    margin: 30px auto auto auto;
    justify-content: center;
    align-items: center;

    &__post {
        background-color: $secondary-color;
        width: 70vw;
        border-radius: 15px;
        margin-bottom: 50px;

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
    }


}
</style>