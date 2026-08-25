<script setup lang="ts">
import { ref } from "vue";
import { fetchStandingsData } from "./apiClient";
import { teamCompare, type Division, type Team } from "./team/team";
import PlayoffPicture from "./PlayoffPicture.vue";
import WildCardStandings from "./WildCardStandings.vue";
import DivisionStandings from "./DivisionStandings.vue";

interface DivisionStandings {
    [key: number]: {
        division: Division;
        teams: Team[];
    };
}

const teams = ref<Team[]>([]);

const markDivLeaders = (teamArr: Team[]) => {
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

    for (const team of teamArr) {
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

    return teamArr;
};

const loadData = async () => {
    const teamArr = await fetchStandingsData();
    teams.value = markDivLeaders(teamArr);
};

loadData();

enum ViewChoices {
    PlayoffPicture = "Playoff Picture",
    DivStandings = "Division Standings",
    WcStandings = "Wild Card Standings",
}

const selectedView = ref(ViewChoices.PlayoffPicture);
</script>

<template>
    <h1>MLB</h1>

    <label>
        <input
            type="radio"
            :value="ViewChoices.PlayoffPicture"
            v-model="selectedView"
        />
        {{ ViewChoices.PlayoffPicture }}
    </label>

    <label>
        <input
            type="radio"
            :value="ViewChoices.DivStandings"
            v-model="selectedView"
        />
        {{ ViewChoices.DivStandings }}
    </label>

    <label>
        <input
            type="radio"
            :value="ViewChoices.WcStandings"
            v-model="selectedView"
        />
        {{ ViewChoices.WcStandings }}
    </label>

    <PlayoffPicture
        v-if="selectedView === ViewChoices.PlayoffPicture"
        :teams="teams"
    />

    <DivisionStandings
        v-if="selectedView === ViewChoices.DivStandings"
        :teams="teams"
    />

    <WildCardStandings
        v-if="selectedView === ViewChoices.WcStandings"
        :teams="teams"
    />
</template>

<style scoped></style>
