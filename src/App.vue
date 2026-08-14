<script setup lang="ts">
import SingleBracket from "./bracket/SingleBracket.vue";
import SingleTeam from "./bracket/SingleTeam.vue";
import SmartBracket from "./bracket/SmartBracket.vue";
</script>

<template>
    <SmartBracket :num-teams="2" />
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
