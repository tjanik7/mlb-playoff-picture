<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
    team: string;
    bottomOffset?: number;
}>();

const offset = computed(() => {
    const asNum = props.bottomOffset ?? 0;
    return String(asNum) + "em";
});
</script>

<template>
    <div class="col-container">
        <div class="flex-item">{{ props.team }}</div>
        <div class="spacer"></div>
    </div>
</template>

<style scoped lang="css">
.col-container {
    display: flex;
    flex-direction: column;
    width: 100%;
    justify-content: flex-end;
}

.flex-item {
    border-bottom: 3px solid black;
    padding: 0 4px;
}

.spacer {
    height: v-bind(offset);
}
</style>
