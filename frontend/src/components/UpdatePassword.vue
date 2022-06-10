<template>
    <header class="updatePassword__header">
        <img src="../assets/logos/icon-left-font-monochrome-white.svg" alt="" class="header__logo">
        <Logout class="updatePassword__header__logout" />
    </header>

    <section class="updatePasswordSection">

        <div class="updatePasswordSection__redirectToLogin">
            <router-link :to="'/profile'">Cliquez ici</router-link> pour retourner sur votre profile
        </div>

        <div class="updatePasswordSection__introduction">
            <h3>Changer votre mot de passe</h3>
            <p>Pour changer votre mot de passe, veuillez remplir le premier champ avec votre mot de passe actuel. <br />
                Ensuite, dans le deuxième champ, veuillez renseigner votre nouveau mot de passe, puis veuillez le
                confirmer dans le 3ème champ.
            </p>
        </div>
        <!-- Azertyui79* -->
        <Form @submit="handleUpdateUserPassword" action="" method="post" class="updatePasswordSection__form">

            <div class="updatePasswordSection__form-input">
                <div>
                    <Field type="password" :rules="validatePassword" placeholder="Mot de Passe actuel" name="password"
                        id="password" />
                </div>
                <ErrorMessage name="password" class="updatePasswordSection__form-errorMessage" />

                <div>
                    <Field type="password" :rules="validateNewPassword" placeholder="Nouveau mot de Passe"
                        name="newPassword" id="newPassword" />
                </div>
                <ErrorMessage name="newPassword" class="updatePasswordSection__form-errorMessage" />

                <div>
                    <Field type="password" :rules="validateConfirmNewPassword"
                        placeholder="Confirmez le nouveau mot de Passe" name="confirmNewPassword"
                        id="confirmNewPassword" />
                </div>
                <ErrorMessage name="confirmNewPassword" class="updatePasswordSection__form-errorMessage" />
            </div>

            <button type="submit" class="updatePasswordSection__form-button">Mettre à jour le mot de passe</button>

        </Form>
        <span v-show="successMessage">Félicitations ! Votre Mot de Passe a été mis à jour ! Retour à la page
            profile...</span>
    </section>
</template>

<script>
import Logout from '../components/Logout.vue';
import { Form, Field, ErrorMessage } from 'vee-validate';

//Regex for the passwords, check if the password is at least 8 caracters long, if it contains an uppercase, at least 2 digits and 1 special caracter
const regexPassword = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/

export default {
    name: "UpdatePassword",

    data() {
        return {
            successMessage: false,
        }
    },

    components: {
        Logout,
        Form,
        Field,
        ErrorMessage
    },

    methods: {
        //Display the updateUserPassword function in the form
        handleUpdateUserPassword(updatedPassword, error) {
            return this.$store.dispatch("user/updateUserPassword", updatedPassword, error)
                .then(() => {
                    this.successMessage = true;
                    setTimeout(() => { this.$router.push("/profile") }, 2000)
                })
                .catch(error => {
                    console.log(error.response.data)
                })
        },

        //Checks if the actual password fits the rules
        validatePassword(value) {
            //If the field is empty
            if (!value) {
                return 'Veuillez renseigner votre mot de passe actuel'
            }

            //If the field is not matching the password security
            if (!regexPassword.test(value)) {
                return "Votre mot de passe doit contenir au min 8 caractères, avoir 1 majuscule, 2 chiffres et 1 caractère spécial"
            }

            //All is good
            return true;
        },

        //Checks if the new password fits the rules
        validateNewPassword(value) {
            //If the field is empty
            if (!value) {
                return 'Veuillez renseigner votre nouveau mot de passe'
            }

            //If the field is not matching the password security
            if (!regexPassword.test(value)) {
                return "Votre mot de passe doit contenir au min 8 caractères, avoir 1 majuscule, 2 chiffres et 1 caractère spécial"
            }

            //All is good
            return true;
        },

        //Check if the confirmNewPassword fits the rules
        validateConfirmNewPassword(value) {
            //If the field is empty
            if (!value) {
                return 'Veuillez confirmer votre nouveau mot de passe'
            }

            //If the field is not matching the password security
            if (!regexPassword.test(value)) {
                return "Votre mot de passe doit contenir au min 8 caractères, avoir 1 majuscule, 2 chiffres et 1 caractère spécial"
            }

            //All is good
            return true;
        }
    }
}
</script>

<style lang="scss">
@import '@/assets/sass/main.scss';

.updatePassword__header {
    display: flex;
    justify-content: center;
    margin: 20px 5px 0px 5px;

    &__logo {
        width: 200px;
    }

    &__logout {
        width: 30px;
        padding-left: 40px;
    }
}

.updatePasswordSection {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    text-align: center;
    width: 70vw;
    margin: auto;
    margin-top: 50px;

    &__redirectToLogin {
        margin-bottom: 40px;
    }

    &__form {
        background-color: $secondary-color;
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
        }

        &-input {
            padding-top: 40px;
            padding-bottom: 30px;
        }

        &-button {
            margin-bottom: 30px;
            border: none;
            border-radius: 15px;
            padding: 15px;
            background-color: $primary-color;
        }
    }
}
</style>