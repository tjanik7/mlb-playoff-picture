<script setup lang="ts">
import { computed } from "vue";
import { League, teamCompare, type Team } from "./team/team";
import Bracket from "./Bracket.vue";

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
</script>

<template>
    <h2>Playoff Picture</h2>

    <h2>American League Playoff Picture</h2>
    <Bracket :teams="alPlayoffPicture" />

    <h2>National League Playoff Picture</h2>
    <Bracket :teams="nlPlayoffPicture" />
</template>
