<template>
    <div class="popup">
        <div class="popup-inner">
            <button class="popup-inner__close" @click="TogglePopup()">
                Annuler
            </button>

            <button @click="handleDeletePost(post)" class="popup-inner__form-confirmButton">Confirmer la
                suppression</button>

            <span v-show="successMessage">Ce post a bien été supprimé !</span>
        </div>
    </div>
</template>

<script>
import { Form, Field, ErrorMessage } from 'vee-validate';

export default {
    name: 'DeletePostPopup',

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
        handleDeletePost(post) {
            console.log(post)

            const postId = post.id
            this.$store.dispatch("post/deletePost", postId)
                .then(() => {
                    this.successMessage = true;
                    setTimeout(() => { this.$store.dispatch("post/getAllPosts") }, 2000)
                })
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
    /*     z-index: 99;
 */
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
        }
    }
}
</style>