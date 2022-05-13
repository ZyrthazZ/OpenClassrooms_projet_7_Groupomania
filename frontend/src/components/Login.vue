<template>
    <header class="header">
        <img src="../assets/logos/icon-left-font-monochrome-white.svg" alt="" class="header__logo">
    </header>

    <section class="loginSection">

        <div class="loginSection__introduction">
            <h3>Connexion</h3>
        </div>

        <Form @submit="handleLogin" action="" method="post" class="loginSection__form">

            <div class="loginSection__form-input">
                <div>
                    <Field type="email" :rules="validateEmail" placeholder="Adresse email" name="email" id="email" />
                </div>
                <ErrorMessage name="email" class="loginSection__form-errorMessage" />

                <div>
                    <Field type="password" :rules="validatePassword" placeholder="Mot de Passe" name="password"
                        id="password" />
                </div>
                <ErrorMessage name="password" class="loginSection__form-errorMessage" />
            </div>

            <button type="submit" class="loginSection__form-button">Se connecter</button>

        </Form>

    </section>
</template>

<script>
import { Form, Field, ErrorMessage } from 'vee-validate';
import { useAuthStore } from '../stores/auth';

export default {
    name: "Login",

    setup() {
        const authStore = useAuthStore()

        return {
            authStore
        }
    },

    computed: {
        loggedIn() {
            /* return this.authStore.apple.status.loggedIn; */
            console.log("this.authStore.apple.status" + this.authStore.apple)
        },
    },
    created() {
        if (this.loggedIn) {
            /* this.$router.push("/home"); */
            console.log("prout")
        }
    },

    components: {
        Form,
        Field,
        ErrorMessage
    },

    methods: {
        handleLogin(user) {
            this.authStore.login(user)
        },

        validateEmail(value) {
            //If the field is empty
            if (!value) {
                return 'Veuillez renseigner le champ email'
            }

            //If the field is not a valid email 
            const regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
            if (!regexEmail.test(value)) {
                return 'Ce champ doit contenir un email valide'
            }

            //All id good
            return true;
        }, //End of validateEmail

        validatePassword(value) {
            //If the field is empty
            if (!value) {
                return 'Veuillez renseigner le champ mot de passe'
            }

            //If the field is not matching the password security
            const regexPassword = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/
            if (!regexPassword.test(value)) {
                return "Votre mot de passe doit contenir au min 8 caractères, avoir 1 majuscule, 2 chiffres et 1 caractère spécial"
            }

            //All is good
            return true;
        }
    },
};
</script>

<style lang="scss">
@import '@/assets/sass/main.scss';

.header {
    display: flex;
    justify-content: space-around;
    margin: 20px 5px 50px 5px;

    &__logo {
        width: 200px;
    }
}

.loginSection {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    text-align: center;
    width: 70vw;
    margin: auto;
    margin-top: 100px;


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