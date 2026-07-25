<script setup lang="ts">
import { computed, ref } from "vue";
import { fetchStandingsData } from "./apiClient";
import { displayTeam, League, type Division, type Team } from "./team/team";
import Bracket from "./Bracket.vue";
import StandingsEntry from "./StandingsEntry.vue";

interface DivisionStandings {
    [key: number]: {
        division: Division;
        teams: Team[];
    };
}

const divisionStandings = ref<DivisionStandings>();

const teams = ref<Team[]>([]);

const teamCompare = (a: Team, b: Team) => b.winPct - a.winPct;

const getLeagueStandings = (league: League) =>
    teams.value.filter((t) => t.league === league).sort(teamCompare);

const alStandings = computed<Team[]>(() => getLeagueStandings(League.American));

const nlStandings = computed<Team[]>(() => getLeagueStandings(League.National));

const setDivisionStandings = () => {
    const standings: DivisionStandings = {};

    for (const team of teams.value) {
        const divId = team.division.id;

        if (divId in standings) {
            standings[divId]?.teams.push(team);
        } else {
            standings[divId] = {
                division: team.division,
                teams: [team],
            };
        }
    }

    for (let key in standings) {
        const div = standings[key];

        if (div) {
            div.teams.sort(teamCompare);
        }
    }

    divisionStandings.value = standings;
};

const loadData = async () => {
    teams.value = await fetchStandingsData();

    setDivisionStandings();
};

loadData();
</script>

<template>
    <h1>MLB Playoff Picture</h1>

    <h2>American League</h2>

    <Bracket :teams="alStandings" />

    <ol>
        <li v-for="team in alStandings">
            {{ displayTeam(team) }}
        </li>
    </ol>

    <h2>National League</h2>

    <Bracket :teams="nlStandings" />

    <ol>
        <li v-for="team in nlStandings">
            {{ displayTeam(team) }}
        </li>
    </ol>

    <div v-for="div in divisionStandings">
        <StandingsEntry :division="div.division" :teams="div.teams" />
    </div>
</template>

<style scoped></style>
