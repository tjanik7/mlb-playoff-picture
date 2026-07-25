import axios from "axios";
import { idToLeague, League, type Team } from "./team";

const API_BASE_URL = "https://statsapi.mlb.com";

interface ResponseLeague {
    id: number;
    link: string;
    name: string;
}

interface ResponseDivision {
    id: number;
    link: string;
    name: string;
}

interface ResponseTeam {
    franchiseName: string;
    teamName: string;
    abbreviation: string;
    league: ResponseLeague;
    division: ResponseDivision;
}

const toTeam = (resTeam: ResponseTeam): Team => ({
    location: resTeam.franchiseName,
    name: resTeam.teamName,
    abbreviation: resTeam.abbreviation,
    wins: 0,
    losses: 0,
    winPct: 0.0,
    league: idToLeague(resTeam.league.id),
    division: {
        id: resTeam.division.id,
        name: resTeam.division.name,
    },
});

export const fetchTeam = async (url: string): Promise<Team> => {
    const response = await axios.get(API_BASE_URL + url);
    return toTeam(response.data.teams[0]);
};
