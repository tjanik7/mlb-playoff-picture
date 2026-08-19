interface Matchup {
    road: number;
    home: number;
}
type BracketNode = Matchup | "bye";
type BracketColumn = BracketNode[];

const calcNumRounds = (numTeams: number) =>
    Math.ceil(Math.log(numTeams) / Math.log(2));

// Seeds (in a matchup) must add to this number in a given round
const calcSeedSum = (depth: number) => 2 ** depth + 1;

const isBye = (matchup: Matchup, numTeams: number) =>
    matchup.road > numTeams || matchup.home > numTeams;

const subByes = (rounds: Matchup[][], numTeams: number): BracketNode[][] =>
    rounds.map((round) =>
        round.map((matchup) => (isBye(matchup, numTeams) ? "bye" : matchup)),
    );

const calcRound = (prevRound: Matchup[], roundNum: number) => {
    const seedSum = calcSeedSum(roundNum);
    const round: Matchup[] = [];

    for (const matchup of prevRound) {
        round.push({
            road: seedSum - matchup.road,
            home: matchup.road,
        });

        round.push({
            road: seedSum - matchup.home,
            home: matchup.home,
        });
    }

    return round;
};

const calcBracketRounds = (teams: string[]) => {
    const numRounds = calcNumRounds(teams.length);
    const rounds: Matchup[][] = [[{ road: 2, home: 1 }]];

    for (let r = 2; r <= numRounds; r++) {
        const prevRound = rounds.at(-1)!;
        const round = calcRound(prevRound, r);
        rounds.push(round);
    }

    return rounds.reverse();
};

const removeRepeatedNames = (bracket: BracketNode[][]) => {
    const seeds = new Set<number>();
    const newBracket: BracketNode[][] = [];

    for (const matchups of bracket) {
        const newMatchups: BracketNode[] = [];

        for (const matchup of matchups) {
            if (matchup === "bye") {
                newMatchups.push("bye");
            } else {
                const newMatchup: Matchup = {
                    road: seeds.has(matchup.road) ? -1 : matchup.road,
                    home: seeds.has(matchup.home) ? -1 : matchup.home,
                };

                seeds.add(matchup.road);
                seeds.add(matchup.home);

                newMatchups.push(newMatchup);
            }
        }
        newBracket.push(newMatchups);
    }

    return newBracket;
};

export const getBracket = (teams: string[]): BracketColumn[] => {
    const rounds = calcBracketRounds(teams);
    const bracket = subByes(rounds, teams.length);

    return removeRepeatedNames(bracket);
};
