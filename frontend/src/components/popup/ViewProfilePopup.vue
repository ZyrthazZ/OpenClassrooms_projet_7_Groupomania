<template>
    <div class="popup">
        <div class="popup-inner">
            <div class="popup-inner-profile">
                <img :src="user.profilePic" alt="Image de profil de l'utilisateur" class="profile__pic">

                <p>Pseudo : {{ user.username }}</p>
                <p>Bio : {{ user.bio }}</p>
            </div>
            <button class="popup-inner__close" @click="TogglePopup()">
                Fermer la fenêtre
            </button>
            <span v-show="successMessage">Ce commentaire a bien été modifié !</span>
        </div>
    </div>
</template>

<script>

export default {
    name: 'ViewProfilePopup',

    data() {
        return {
            successMessage: false,
        }
    },

    props: ['TogglePopup', 'user'],

    components: {

    },

    methods: {
        handleUpdateComment(commentUpdate) {
            console.log(this.comment.id)

            console.log("comment updated ", commentUpdate)

            let { content } = commentUpdate;

            let data = {
                content: content,
                commentId: this.comment.id
            }
            console.log(data)

            return this.$store.dispatch("post/updateComment", data)
                .then(() => {
                    this.successMessage = true;
                    this.$store.dispatch("post/getAllPosts")
                        .then(() => {
                            setTimeout(() => { this.TogglePopup() }, 2000)
                        })
                })
        }, //End of handleUpdateComment
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