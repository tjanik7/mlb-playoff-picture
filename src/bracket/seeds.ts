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

const calcRoundsIter = (numTeams: number) => {
    const numRounds = calcMaxDepth(numTeams);
    const rounds = [[1]]; // Prepopulate 1st round

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

export const getBracket = (numTeams: number) => {
    const b = calcRoundsIter(numTeams);
    return subByes(b, numTeams);
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
                    road: matchup.road in seeds ? -1 : matchup.road,
                    home: matchup.home in seeds ? -1 : matchup.home,
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

// TODO: delete this
export const run = () => {
    const n = 6;

    const rounds = calcRoundsIter(n);

    const withByes = subByes(rounds, n);

    console.log("Rounds are:");
    for (const round of withByes) {
        console.log(round);
    }
};
