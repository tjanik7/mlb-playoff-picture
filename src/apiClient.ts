import axios from "axios";
import { fetchTeam } from "./team/teamApiClient";
import type { Team } from "./team/team";

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

const winPct = (wins: number, losses: number) => wins / (wins + losses);

const processRecordsData = async (records: ApiRecord[]) => {
    const teams: Team[] = [];

    for (const record of records) {
        for (const teamRecord of record.teamRecords) {
            const team = await fetchTeam(teamRecord.team.link);
            team.wins = teamRecord.wins;
            team.losses = teamRecord.losses;
            team.winPct = winPct(team.wins, team.losses);

            teams.push(team);
        }
    }
    return teams;
};

export const fetchStandingsData = async () => {
    const url = "https://statsapi.mlb.com/api/v1/standings?leagueId=103,104";

    const response = await axios.get<ApiStandingsResponse>(url);
    return await processRecordsData(response.data.records);
};
