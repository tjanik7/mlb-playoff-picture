export interface Team {
    location: string; // Location component of a team's name
    name: string; // Actual team name (e.g. Cubs, Rays)
    abbreviation: string;
    wins: number;
    losses: number;
    winPct: number;
}
