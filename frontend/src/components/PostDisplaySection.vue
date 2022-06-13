<template>
    <section class="postDisplaySection">
        <h1>COUCOU</h1>
    </section>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: 'postDisplaySection',

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

<style>
</style>