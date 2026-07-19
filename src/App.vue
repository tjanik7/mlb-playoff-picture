<script setup lang="ts">
import { ref } from "vue";
import { fetchStandingsData } from "./apiClient";
import type { Team } from "./team/team";

const teams = ref<Team[]>();

const loadData = async () => {
    teams.value = await fetchStandingsData();
};

loadData();

const displayTeam = (team: Team) =>
    team.location +
    " " +
    team.name +
    " (" +
    team.wins +
    "-" +
    team.losses +
    ")" +
    " [" +
    team.winPct.toFixed(3).slice(1) +
    "]";
</script>

<template>
    <h1>MLB Playoff Picture</h1>

    <div v-for="team in teams">
        {{ displayTeam(team) }}
    </div>
</template>

<style scoped></style>
