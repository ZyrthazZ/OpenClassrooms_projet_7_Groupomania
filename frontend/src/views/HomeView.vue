<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Header from '../components/Header.vue'
import PostCreateSection from '../components/PostCreateSection.vue'
import Redirect from '../components/Redirect.vue'

</script>

<template>
    <Header />

    <PostCreateSection />
    <Redirect />
    <RouterView />
</template>

