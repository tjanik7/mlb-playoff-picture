<script setup lang="ts">
import axios from "axios";
import type { Team } from "./team";

interface ApiTeam {
    id: number;
    link: string;
    name: string;
}

interface ApiTeamRecord {
    team: ApiTeam;
    wins: number;
    losses: number;
}

interface ApiRecord {
    teamRecords: ApiTeamRecord[];
}

interface ApiStandingsResponse {
    records: ApiRecord[];
}

const processRecordsData = (records: ApiRecord[]) => {
    for (const record of records) {
        for (const teamRecord of record.teamRecords) {
            const team: Team = {
                location: "",
                name: teamRecord.team.name,
                wins: 0,
                losses: 0,
            };

            console.log(team.name);
        }
    }
};

const fetchStandingsData = async () => {
    const url = "https://statsapi.mlb.com/api/v1/standings?leagueId=103,104";

    const response = await axios.get<ApiStandingsResponse>(url);
    console.log(response.data.records);

    processRecordsData(response.data.records);
};

fetchStandingsData();
</script>

<template>
    <h1>MLB Playoff Picture</h1>
</template>

<style scoped></style>
