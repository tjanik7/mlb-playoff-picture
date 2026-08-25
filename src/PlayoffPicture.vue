<script setup lang="ts">
import { computed } from "vue";
import { League, teamCompare, type Team } from "./team/team";
import SmartBracket from "./bracket/SmartBracket.vue";

const { teams } = defineProps<{
    teams: Team[];
}>();

const getWcStandings = (league: League) =>
    teams
        .filter((t) => t.league === league && !t.isDivisionLeader)
        .sort(teamCompare);

const alDivLeaders = computed(() =>
    teams
        .filter((t) => t.league === League.American && t.isDivisionLeader)
        .sort(teamCompare),
);

const nlDivLeaders = computed(() =>
    teams
        .filter((t) => t.league === League.National && t.isDivisionLeader)
        .sort(teamCompare),
);

const alWcStandings = computed<Team[]>(() => getWcStandings(League.American));

const nlWcStandings = computed<Team[]>(() => getWcStandings(League.National));

const alPlayoffPicture = computed(() => [
    ...alDivLeaders.value,
    ...alWcStandings.value,
]);

const nlPlayoffPicture = computed(() => [
    ...nlDivLeaders.value,
    ...nlWcStandings.value,
]);

const alPlayoffBracket = computed(() => {
    const sliced = alPlayoffPicture.value.slice(0, 6);
    return sliced.map((t) => t.name);
});

const nlPlayoffBracket = computed(() => {
    const sliced = nlPlayoffPicture.value.slice(0, 6);
    return sliced.map((t) => t.name);
});
</script>

<template>
    <h2>Playoff Picture</h2>

    <h2>American League Playoff Picture</h2>
    <SmartBracket :teams="alPlayoffBracket" />

    <h2>National League Playoff Picture</h2>
    <SmartBracket :teams="nlPlayoffBracket" />
</template>

<style lang="css" scoped>
/* TODO: figure out why this isn't actually scoped */
.flex-row {
    display: flex;
}

.flex-col {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
}
</style>
