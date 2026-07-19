import axios from "axios";
import type { Team } from "./team";

const API_BASE_URL = "https://statsapi.mlb.com";

interface ResponseTeam {
    franchiseName: string;
    teamName: string;
    abbreviation: string;
}

const toTeam = (resTeam: ResponseTeam): Team => ({
    location: resTeam.franchiseName,
    name: resTeam.teamName,
    abbreviation: resTeam.abbreviation,
    wins: 0,
    losses: 0,
});

export const fetchTeam = async (url: string): Promise<Team> => {
    const response = await axios.get(API_BASE_URL + url);
    return toTeam(response.data.teams[0]);
};
