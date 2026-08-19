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

const subByes = (rounds: number[][], numTeams: number) => {
    const res = [];

    for (const round of rounds) {
        const newRound = round.map((num) => (num <= numTeams ? num : "bye"));
        res.push(newRound);
    }

    return res;
};

const calcRoundsIter = (teams: string[]) => {
    const numRounds = calcNumRounds(teams.length);
    const rounds = [[1]]; // Prepopulate championship

    for (let r = 1; r <= numRounds; r++) {
        const prevRound = rounds.at(-1);
        const round = [];

        const seedSum = calcSeedSum(r);

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

const calcRoundsIter2 = (teams: string[]) => {
    const numRounds = calcNumRounds(teams.length);
    // const rounds = [[1]]; // Prepopulate championship
    const rounds: BracketNode[][] = [[{ road: 2, home: 1 }]];

    for (let r = 1; r <= numRounds; r++) {
        const prevRound = rounds.at(-1);
        const round: BracketNode[] = [];

        const seedSum = calcSeedSum(r);

        if (prevRound) {
            for (const matchup of prevRound) {
                if (matchup !== "bye") {
                    const right = matchup.home;
                    const left = seedSum - right;

                    round.push({
                        road: left,
                        home: right,
                    });
                } else {
                    console.error("found a bye");
                }
            }
        }

        rounds.push(round);
    }

    return rounds;
};

const getBracketOld = (teams: string[]) => {
    const b = calcRoundsIter(teams);
    const withByes = subByes(b, teams.length);

    // TODO: PICK BACK UP HERE TRANSITIONING TO ONLY USING NODES

    return withByes.reverse();
};

const toBracketNode = (
    roadSeed: number | "bye",
    homeSeed: number | "bye",
): BracketNode => {
    if (roadSeed === "bye" || homeSeed === "bye") {
        return "bye";
    }

    return {
        road: roadSeed,
        home: homeSeed,
    };
};

const toBracketNodes = (teams: (number | "bye")[]) => {
    const nodes: BracketNode[] = [];

    for (let i = 0; i < teams.length; i += 2) {
        const road = teams[i];
        const home = teams[i + 1];

        if (road !== undefined && home !== undefined) {
            const matchup = toBracketNode(road, home);
            nodes.push(matchup);
        } else {
            console.error(`undefined at ind ${i}`);
        }
    }

    return nodes;
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
    const bracket = getBracketOld(teams);

    const nodes = bracket.map((col) => toBracketNodes(col));
    return removeRepeatedNames(nodes);
};
