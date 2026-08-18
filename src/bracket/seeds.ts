const calcMaxDepth = (numTeams: number) =>
    Math.ceil(Math.log(numTeams) / Math.log(2));

export const printBracketInfo = (n: number) => {
    const res = calcMaxDepth(n);
    const r2 = 2 ** res;

    const numByes = r2 - n;
    const numR1Teams = n - numByes;
    const numR1Matchups = numR1Teams / 2;

    console.log(`In a bracket with ${n} teams`);
    console.log(`${numByes} teams get a bye`);
    console.log(`${numR1Teams} teams play in the first round`);
    console.log(`There are ${numR1Matchups} first round matchups`);
};

interface Node {
    left: Node | undefined;
    right: Node | undefined;
    value: number; // Seed
}

const rec = (
    value: number,
    depth: number,
    maxDepth: number,
    seeds: number[],
) => {
    if (depth >= maxDepth) {
        seeds.push(value);
        return {
            value: value,
            left: undefined,
            right: undefined,
        };
    }

    depth++;

    const numTeams = 2 ** depth; // In next round
    const seedSum = numTeams + 1;

    const rightVal = value;
    const leftVal = seedSum - rightVal;

    const node: Node = {
        value: value,
        right: rec(rightVal, depth, maxDepth, seeds),
        left: rec(leftVal, depth, maxDepth, seeds),
    };

    return node;
};

export const getSeedArr = (numTeams: number) => {
    const seedArr: number[] = [];

    rec(1, 0, calcMaxDepth(numTeams), seedArr);

    const withByes = seedArr.map((seed) => (seed > numTeams ? "bye" : seed));

    return withByes.reverse();
};

const getBracketTree = (numTeams: number) =>
    rec(1, 0, calcMaxDepth(numTeams), []);

const bfs = (root: Node) => {
    const res = [];
    const queue = [root];

    while (queue.length > 0) {
        const node = queue.shift();

        if (node) {
            res.push(node.value);

            if (node.left) {
                queue.push(node.left);
            }

            if (node.right) {
                queue.push(node.right);
            }
        }
    }

    return res;
};

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

// TODO: delete this
export const run = () => {
    const n = 6;

    const rounds = calcRoundsIter(n);

    const withByes = subByes(rounds, n);

    console.log("Rounds are:");
    for (const round of withByes) {
        console.log(round);
    }

    // const seedArr = getSeedArr(n);
    // console.log("Seed array is:");
    // console.log(seedArr);

    // const tree = getBracketTree(n);
    // console.log(tree);

    // if (tree) {
    //     const res = bfs(tree);

    //     console.log("BFS node order:");
    //     console.log(res);
    // }
};
