<script setup>
import { RouterLink, RouterView } from 'vue-router'
import UpdatePassword from '../components/UpdatePassword.vue'
import Redirect from '../components/Redirect.vue'

</script>

<template>
    <UpdatePassword />
    <Redirect />
    <RouterView />
</template>

