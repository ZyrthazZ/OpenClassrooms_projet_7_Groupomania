<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Header from '../components/Header.vue'
import PostCreateSection from '../components/PostCreateSection.vue'
import PostDisplaySection from '../components/PostDisplaySection.vue'
import Redirect from '../components/Redirect.vue'

</script>

<template>
    <Redirect />
    <Header />

    <PostCreateSection />

    <PostDisplaySection />

    <RouterView />
</template>

