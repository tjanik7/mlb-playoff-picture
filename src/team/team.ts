export enum League {
    American = "AL",
    National = "NL",
}

export const idToLeague = (leagueId: number) => {
    if (leagueId === 103) {
        return League.American;
    }

    if (leagueId === 104) {
        return League.National;
    }

    throw new Error(`Invalid league ID: ${leagueId}`);
};

export interface Team {
    location: string; // Location component of a team's name
    name: string; // Actual team name (e.g. Cubs, Rays)
    abbreviation: string;
    wins: number;
    losses: number;
    winPct: number;
    league: League;
}
