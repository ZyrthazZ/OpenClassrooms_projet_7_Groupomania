<script>
export default {
    name: "Redirect",

    computed: {
        loggedIn() {
            return this.$store.state.auth.status.loggedIn;
        },
    },
    mounted() {
        if (!this.loggedIn) {
            this.$router.push("/login");
        }
    },

}
</script>

<template>

</template>