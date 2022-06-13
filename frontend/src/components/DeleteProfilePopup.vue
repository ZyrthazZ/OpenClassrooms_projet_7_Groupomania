<template>
    <div class="popup">
        <div class="popup-inner">
            <h3>Êtes-vous sûr(e) de vouloir effacer votre profil?
                Cette action est irréversible</h3>
            <button class="popup-inner__close" @click="TogglePopup()">
                Non
            </button>

            <Form @submit="handleDeleteUserProfile" action="" method="post" class="popup-inner__form">
                <p>Veuillez vérifier votre mot de passe pour sécuriser la suppression de votre compte</p>
                <div>
                    <Field type="password" placeholder="Mot de Passe" name="password" id="password" />
                </div>
                <ErrorMessage name="password" class="popup-inner__form-errorMessage" />

                <button type="submit" class="popup-inner__form-confirmButton">Confirmer la suppression</button>

            </Form>

            <span v-show="successMessage">Votre compte a bien été supprimé !</span>
        </div>
    </div>
</template>
<!-- Azertyui79* -->
<script>
import { Form, Field, ErrorMessage } from 'vee-validate';

export default {
    name: 'DeleteProfilePopup',

    data() {
        return {
            successMessage: false,
        }
    },

    components: {
        Form,
        Field,
        ErrorMessage
    },

    methods: {
        //Display the deleteUserProfile function in the form
        handleDeleteUserProfile(content, error) {
            this.$store.dispatch("user/deleteUserProfile", content, error)
                .then(() => {
                    this.$store.dispatch("auth/logout")
                        .then(() => {
                            this.successMessage = true;
                            setTimeout(() => { this.$router.push("/login") }, 2000)
                        })
                })
                .catch(error => {
                    console.log(error.response.data)
                })
        },

        //Checks if the password fits the rules
        validatePassword(value) {
            //Regex for the passwords, check if the password is at least 8 caracters long, if it contains an uppercase, at least 2 digits and 1 special caracter
            const regexPassword = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/

            //If the field is empty
            if (!value) {
                return 'Veuillez renseigner votre mot de passe'
            }

            //If the field is not matching the password security
            if (!regexPassword.test(value)) {
                return "Votre mot de passe doit contenir au min 8 caractères, avoir 1 majuscule, 2 chiffres et 1 caractère spécial"
            }

            //All is good
            return true;
        },
    },

    props: ['TogglePopup']
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
        width: 70vw;

        text-align: center;
        background: $secondary-color;
        padding: 32px;
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
            }
        }
    }
}
</style>