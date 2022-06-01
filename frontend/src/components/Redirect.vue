<script>
export default {
    name: "Redirect",

    setup() {

    },

    computed: {
        loggedIn() {
            return this.$store.state.auth.status.loggedIn;
        },
    },
    beforeCreated() {
        if (!this.loggedIn) {
            this.$router.push("/login");
        }
    },

}
</script>

<template>
    
</template>