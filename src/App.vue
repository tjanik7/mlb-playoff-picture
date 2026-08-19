<script setup lang="ts">
import SmartBracket from "./bracket/SmartBracket.vue";

const t = ["Cubs", "Brewers", "Dodgers", "Mets", "red sox"];

// TODO: keep fixing this
</script>

<template>
    <SmartBracket :teams="t" />
</template>

<style lang="css" scoped>
.flex-row {
    display: flex;
}

.flex-col {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
}
</style>
