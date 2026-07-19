<script setup lang="ts">
import { computed, ref } from "vue";
import { fetchStandingsData } from "./apiClient";
import { League, type Team } from "./team/team";

const teams = ref<Team[]>([]);

const getLeagueStandings = (league: League) =>
    teams.value
        .filter((t) => t.league === league)
        .sort((a, b) => b.winPct - a.winPct);

const alStandings = computed<Team[]>(() => getLeagueStandings(League.American));

const nlStandings = computed<Team[]>(() => getLeagueStandings(League.National));

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

    <h2>American League</h2>

    <ol>
        <li v-for="team in alStandings">
            {{ displayTeam(team) }}
        </li>
    </ol>

    <h2>National League</h2>
    <ol>
        <li v-for="team in nlStandings">
            {{ displayTeam(team) }}
        </li>
    </ol>
</template>

<style scoped></style>
