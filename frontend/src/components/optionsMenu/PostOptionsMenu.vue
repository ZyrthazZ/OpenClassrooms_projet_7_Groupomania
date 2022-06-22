<template>
    <el-dropdown trigger="click">
        <ModifyPostPopup v-if="popupTriggers.buttonTriggerModifyPost"
            :TogglePopup="() => TogglePopup('buttonTriggerModifyPost')" :post="post" />

        <DeletePostPopup v-if="popupTriggers.buttonTriggerDeletePost"
            :TogglePopup="() => TogglePopup('buttonTriggerDeletePost')" :post="post" />
        <span class="el-dropdown-link">
            <el-icon class="el-icon--right">
                <MoreFilled />
            </el-icon>
        </span>
        <template #dropdown>
            <el-dropdown-menu>
                <el-dropdown-item @click="() => TogglePopup('buttonTriggerModifyPost')">
                    Modifier le post
                </el-dropdown-item>

                <el-dropdown-item @click="() => TogglePopup('buttonTriggerDeletePost')">
                    Supprimer le post
                </el-dropdown-item>
            </el-dropdown-menu>
        </template>
    </el-dropdown>

    <!-- <button>Modifier le post</button><button>Supprimer le post</button> -->
</template>

<script>
import { MoreFilled } from '@element-plus/icons-vue';
import DeletePostPopup from '../popup/DeletePostPopup.vue';
import ModifyPostPopup from '../popup/ModifyPostPopup.vue';

import { ref } from 'vue';

export default {
    name: 'PostOptionsMenu',

    setup() {
        const popupTriggers = ref({
            buttonTriggerDeletePost: false,
            buttonTriggerModifyPost: false
        });

        const TogglePopup = (trigger) => {
            popupTriggers.value[trigger] = !popupTriggers.value[trigger]
        }

        return {
            popupTriggers,
            TogglePopup,
            ModifyPostPopup
        }
    },

    props: ['post'],

    components: {
        MoreFilled,
        DeletePostPopup,
        ModifyPostPopup
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
