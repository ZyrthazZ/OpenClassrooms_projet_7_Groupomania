<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Header from '../components/Header.vue'
import PostCreateSection from '../components/PostCreateSection.vue'
</script>

<template>
    <Header />

    <PostCreateSection />
    <RouterView />
</template>



<style>
</style>