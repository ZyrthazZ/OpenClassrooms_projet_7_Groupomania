<template>
    <div class="postDisplaySection__post__social-comment-content-creator">
        <div class="postDisplaySection__post__social-comment-content-creator-box">
            <img :src="comment.user.profilePic" alt="Photo de profil de la personne ayant commenté ce post"
                class="postDisplaySection__post__social-comment-content-creator-box-profilePic" />
            <span class="postDisplaySection__post__social-comment-content-creator-box-username">
                {{ comment.user.username }}</span>
        </div>

        <CommentOptionsMenu class="postDisplaySection__post__social-comment-content-creator-options"
            v-if="adminOrAuthorOfComment" :comment="comment" />
    </div>
    <span class="postDisplaySection__post__social-comment-content-text">{{ comment.content }}</span>
</template>

<script>
import CommentOptionsMenu from './optionsMenu/CommentOptionsMenu.vue'

export default {
    name: 'SingleComment',

    props: ['comment'],

    data() {
        return {
            adminOrAuthorOfComment: false,
        }
    },

    components: {
        CommentOptionsMenu
    },

    mounted() {
        const user = JSON.parse(localStorage.getItem('user'));
        console.log(user)
        const currentComment = JSON.parse(JSON.stringify(this.comment))
        console.log(currentComment)

        if (user.userId == currentComment.UserId || user.isAdmin) {
            this.adminOrAuthorOfComment = true;
        }
    }
}
</script>

<style>
</style>