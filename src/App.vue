<script setup lang="ts">
import SmartBracket from "./bracket/SmartBracket.vue";

const genTeams = (n: number) => {
    const teams = [];

    for (let i = 0; i < n; i++) {
        teams.push(String(i + 1));
    }

    return teams;
};

const t = ["Cubs", "Brewers", "Dodgers", "Mets"];
</script>

<template>
    <SmartBracket :teams="t" />
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
