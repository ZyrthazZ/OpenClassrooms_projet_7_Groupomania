<template>
    <section class="create__post">


        <div class="create__post__introduction">

            <span class="create__post__introduction-greetings">
                Bonjour {{ content.username }} !
            </span>
            <br />
            <span class="create__post__introduction-share">
                Voulez-vous partager quelque chose ?
            </span>

        </div>


        <div class="create__post__interface">


            <img :src="content.profilePic" alt="" class="create__post__interface-profilepic">

            <form action="" method="post" class="create__post__interface__form">

                <div class="create__post__interface__form-title">
                    <input type="text" placeholder="Titre de votre post" name="title" id="title" required>
                </div>

                <div class="create__post__interface__form-text">
                    <input type="text" placeholder="Qu'avez-vous en tête ?" name="text" id="text">
                </div>

                <div class="create__post__interface__form-buttons">
                    <div class="create__post__interface__form-buttons-file">
                        <label for="file"><img src="../assets/icons/file-image-regular.svg" alt=""
                                class="create__post__interface__form-buttons-file-icon"></label>
                        <input type="file" name="file" id="file">
                    </div>

                    <div class="create__post__interface__form-buttons-submit">
                        <button type="submit" name="btnSendForm"
                            class="create__post__interface__form-buttons-submit-button"><img
                                src="../assets/icons/send-icon.svg" alt=""
                                class="create__post__interface__form-buttons-submit-icon"></button>
                    </div>
                </div>

            </form>


        </div>


    </section>
</template>

<script>
export default {
    name: 'PostCreateSection',
    data() {
        return {
            content: ''
        }
    },

    mounted() {
        this.$store.dispatch("user/getUserProfile")
            .then(response => {
                this.content = response.data
            })
    },
}
</script>

<style lang="scss">
@import '@/assets/sass/main.scss';

.create__post {

    &__introduction {
        max-width: 250px;
        padding-left: 20px;
        margin-bottom: 30px;

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
                    }
                }
            }
        }
    }
}
</style>