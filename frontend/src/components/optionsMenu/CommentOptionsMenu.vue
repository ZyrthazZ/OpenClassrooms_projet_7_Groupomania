<template>
    <el-dropdown trigger="click">
        <ModifyCommentPopup v-if="popupTriggers.buttonTriggerModifyComment"
            :TogglePopup="() => TogglePopup('buttonTriggerModifyComment')" :comment="comment" />

        <DeleteCommentPopup v-if="popupTriggers.buttonTriggerDeleteComment"
            :TogglePopup="() => TogglePopup('buttonTriggerDeleteComment')" :comment="comment" />
        <span class="el-dropdown-link">
            <el-icon class="el-icon--right">
                <MoreFilled />
            </el-icon>
        </span>
        <template #dropdown>
            <el-dropdown-menu>
                <el-dropdown-item @click="() => TogglePopup('buttonTriggerModifyComment')">
                    Modifier le commentaire
                </el-dropdown-item>

                <el-dropdown-item @click="() => TogglePopup('buttonTriggerDeleteComment')">
                    Supprimer le commentaire
                </el-dropdown-item>
            </el-dropdown-menu>
        </template>
    </el-dropdown>

</template>

<script>
import { MoreFilled } from '@element-plus/icons-vue';
import DeleteCommentPopup from '../popup/DeleteCommentPopup.vue';
import ModifyCommentPopup from '../popup/ModifyCommentPopup.vue';

import { ref } from 'vue';

export default {
    name: 'CommentOptionsMenu',

    setup() {
        const popupTriggers = ref({
            buttonTriggerDeleteComment: false,
            buttonTriggerModifyComment: false
        });

        const TogglePopup = (trigger) => {
            popupTriggers.value[trigger] = !popupTriggers.value[trigger]
        }

        return {
            popupTriggers,
            TogglePopup,
        }
    },

    props: ['comment'],

    components: {
        MoreFilled,
        DeleteCommentPopup,
        ModifyCommentPopup
    },

    methods: {
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
