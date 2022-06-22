<template>
    <section class="postDisplaySection" v-show="!loading">
        <div v-for="post in post.postData.allPosts" :key="post.id">
            <SinglePost :post="post" />
        </div>
    </section>
</template>

<script>
import { mapState } from 'vuex'

import SinglePost from '../components/SinglePost.vue'


export default {
    name: 'postDisplaySection',

    data() {
        return {
            loading: true,
        }
    },

    components: {
        SinglePost
    },

    computed: {
        ...mapState(['post']),
    },

    created() {

        this.$store.dispatch("post/getAllPosts")
            .then(() => {
                this.loading = false
            })
    },

    methods: {
    },


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
            justify-content: space-between;

            &-box {
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

            &-options {
                padding: 20px 20px 0px 0px;
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