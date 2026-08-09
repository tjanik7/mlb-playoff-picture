<script setup lang="ts">
import { ref } from "vue";
import { teamCompare, type Division, type Team } from "./team/team";
import StandingsEntry from "./StandingsEntry.vue";

const { teams } = defineProps<{
    teams: Team[];
}>();

interface DivisionStandings {
    [key: number]: {
        division: Division;
        teams: Team[];
    };
}

const divisionStandings = ref<DivisionStandings>();

const setDivisionStandings = () => {
    const addTeamToDiv = (team: Team) => {
        const divId = team.division.id;

        if (divId in standings) {
            standings[divId]?.teams.push(team);
        } else {
            standings[divId] = {
                division: team.division,
                teams: [team],
            };
        }
    };

    const standings: DivisionStandings = {};

    for (const team of teams) {
        addTeamToDiv(team);
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

setDivisionStandings();
</script>

<template>
    <h2>Division Standings</h2>

    <div v-for="div in divisionStandings">
        <StandingsEntry :division="div.division" :teams="div.teams" />
    </div>
</template>
