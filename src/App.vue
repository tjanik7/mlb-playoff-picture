<script setup lang="ts">
import SmartBracket from "./bracket/SmartBracket.vue";
</script>

<template>
    <SmartBracket :num-teams="6" />
</template>

<style scoped>
.flex-row {
    display: flex;
}

.flex-col {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
}
</style>
