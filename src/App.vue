<script setup lang="ts">
import axios from "axios";

interface Team {
    id: number;
    link: string;
    name: string;
}

interface TeamRecord {
    team: Team;
    wins: number;
    losses: number;
}

interface Record {
    teamRecords: TeamRecord[];
}

interface StandingsResponse {
    records: Record[];
}

const fetchStandingsData = async () => {
    const url = "https://statsapi.mlb.com/api/v1/standings?leagueId=103,104";

    const response = await axios.get<StandingsResponse>(url);
};

fetchStandingsData();
</script>

<template>
    <h1>MLB Playoff Picture</h1>
</template>

<style scoped></style>
