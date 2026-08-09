<script setup lang="ts">
import { computed } from "vue";
import { displayTeam, League, teamCompare, type Team } from "./team/team";

const { teams } = defineProps<{
    teams: Team[];
}>();

const getWcStandings = (league: League) =>
    teams
        .filter((t) => t.league === league && !t.isDivisionLeader)
        .sort(teamCompare);

const alWcStandings = computed<Team[]>(() => getWcStandings(League.American));

const nlWcStandings = computed<Team[]>(() => getWcStandings(League.National));
</script>

<template>
    <h2>Wild Card Standings</h2>

    <h3>American League</h3>

    <ol>
        <li v-for="team in alWcStandings">
            {{ displayTeam(team) }}
        </li>
    </ol>

    <h3>National League</h3>

    <ol>
        <li v-for="team in nlWcStandings">
            {{ displayTeam(team) }}
        </li>
    </ol>
</template>
