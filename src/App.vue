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

const getWcStandings = (league: League) =>
    teams.value
        .filter((t) => t.league === league && !t.isDivisionLeader)
        .sort(teamCompare);

const alWcStandings = computed<Team[]>(() => getWcStandings(League.American));

const nlWcStandings = computed<Team[]>(() => getWcStandings(League.National));

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

    // Sort divisions by win pct
    for (let key in standings) {
        const div = standings[key];

        if (div) {
            div.teams.sort(teamCompare);

            // Mark division leaders
            const divLeader = div.teams[0];

            if (divLeader) {
                divLeader.isDivisionLeader = true;
            }
        }
    }

    divisionStandings.value = standings;
};

const alDivLeaders = computed(() =>
    teams.value
        .filter((t) => t.league === League.American && t.isDivisionLeader)
        .sort(teamCompare),
);

const nlDivLeaders = computed(() =>
    teams.value
        .filter((t) => t.league === League.National && t.isDivisionLeader)
        .sort(teamCompare),
);

const alPlayoffPicture = computed(() => [
    ...alDivLeaders.value,
    ...alWcStandings.value,
]);

const nlPlayoffPicture = computed(() => [
    ...nlDivLeaders.value,
    ...nlWcStandings.value,
]);

const loadData = async () => {
    teams.value = await fetchStandingsData();

    setDivisionStandings();
};

loadData();
</script>

<template>
    <h1>MLB Playoff Picture</h1>

    <h2>American League</h2>

    <Bracket :teams="alPlayoffPicture" />

    <Bracket :teams="nlPlayoffPicture" />

    <ol>
        <li v-for="team in alWcStandings">
            {{ displayTeam(team) }}
        </li>
    </ol>

    <h2>National League</h2>

    <ol>
        <li v-for="team in nlWcStandings">
            {{ displayTeam(team) }}
        </li>
    </ol>

    <div v-for="div in divisionStandings">
        <StandingsEntry :division="div.division" :teams="div.teams" />
    </div>
</template>

<style scoped></style>
