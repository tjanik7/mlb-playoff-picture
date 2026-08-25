<script setup lang="ts">
import { ref } from "vue";
import { fetchStandingsData } from "./apiClient";
import { type Team } from "./team/team";
import PlayoffPicture from "./PlayoffPicture.vue";
import WildCardStandings from "./WildCardStandings.vue";
import DivisionStandings from "./DivisionStandings.vue";

const teams = ref<Team[]>([]);

const loadData = async () => {
    teams.value = await fetchStandingsData();
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
