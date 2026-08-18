const calcMaxDepth = (numTeams: number) =>
    Math.ceil(Math.log(numTeams) / Math.log(2));

// Seeds (in a matchup) must add to this number in a given round
const getSeedSum = (depth: number) => 2 ** depth + 1;

const subByes = (rounds: number[][], numTeams: number) => {
    const res = [];

    for (const round of rounds) {
        const newRound = round.map((num) => (num <= numTeams ? num : "bye"));
        res.push(newRound);
    }

    return res;
};

const calcRoundsIter = (teams: string[]) => {
    const numRounds = calcMaxDepth(teams.length);
    const rounds = [[1]]; // Prepopulate championship

    for (let r = 1; r <= numRounds; r++) {
        const prevRound = rounds.at(-1);
        const round = [];

        const seedSum = getSeedSum(r);

        if (prevRound) {
            for (const seed of prevRound) {
                const right = seed;
                const left = seedSum - right;

                round.push(left);
                round.push(right);
            }
        }

        rounds.push(round);
    }

    return rounds;
};

export const getBracket = (teams: string[]) => {
    const b = calcRoundsIter(teams);
    return subByes(b, teams.length);
};

interface Matchup {
    road: number;
    home: number;
}

type BracketNode = Matchup | "bye";

export const toBracketNodes = (teams: (number | "bye")[]) => {
    const nodes: BracketNode[] = [];

    for (let i = 0; i < teams.length; i += 2) {
        const road = teams[i];
        const home = teams[i + 1];

        if (road !== undefined && home !== undefined) {
            if (road === "bye" || home === "bye") {
                nodes.push("bye");
            } else {
                nodes.push({
                    road: road,
                    home: home,
                });
            }
        } else {
            console.log(`undefined at ind ${i}`);
        }
    }

    return nodes;
};

export const removeRepeatedNames = (bracket: BracketNode[][]) => {
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
