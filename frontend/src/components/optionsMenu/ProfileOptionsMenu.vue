<template>
    <el-dropdown trigger="click">
        <ViewProfilePopup v-if="popupTriggers.buttonTriggerViewProfile"
            :TogglePopup="() => TogglePopup('buttonTriggerViewProfile')" :user="user" />

        <ModifyProfilePopup v-if="popupTriggers.buttonTriggerModifyProfile"
            :TogglePopup="() => TogglePopup('buttonTriggerModifyProfile')" :user="user" />
        <span class="el-dropdown-link">
            <el-icon class="el-icon--right">
                <img v-bind:src="user.profilePic" alt="Image de profil de l'utilisateur"
                    class="postDisplaySection__post__creator-box-profilePic">
            </el-icon>
        </span>
        <template #dropdown>
            <el-dropdown-menu>
                <el-dropdown-item @click="() => TogglePopup('buttonTriggerViewProfile')">
                    Voir le profil
                </el-dropdown-item>

                <el-dropdown-item @click="() => TogglePopup('buttonTriggerModifyProfile')" v-if="isAdmin">
                    Modifier le profil
                </el-dropdown-item>
            </el-dropdown-menu>
        </template>
    </el-dropdown>

</template>

<script>
import ModifyProfilePopup from '../popup/ModifyProfilePopup.vue';
import ViewProfilePopup from '../popup/ViewProfilePopup.vue';

import { ref } from 'vue';

export default {
    name: 'ProfileOptionsMenu',

    data() {
        return {
            isAdmin: false
        }
    },

    setup() {
        const popupTriggers = ref({
            buttonTriggerViewProfile: false,
            buttonTriggerModifyProfile: false
        });

        const TogglePopup = (trigger) => {
            popupTriggers.value[trigger] = !popupTriggers.value[trigger]
        }

        return {
            popupTriggers,
            TogglePopup,
        }
    },

    props: ['user'],

    components: {
        ViewProfilePopup,
        ModifyProfilePopup
    },

    methods: {
        
    },

    mounted() {
        const user = JSON.parse(localStorage.getItem('user'));
        console.log(user)

        if (user.isAdmin) {
            this.isAdmin = true;
        }
    }
}

</script>

<style scoped>
.example-showcase .el-dropdown-link {
    cursor: pointer;
    display: flex;
    align-items: center;
}
</style>