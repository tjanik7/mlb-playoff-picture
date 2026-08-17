const calcNumRounds = (numTeams: number) =>
    Math.ceil(Math.log(numTeams) / Math.log(2));

export const printBracketInfo = (n: number) => {
    const res = calcNumRounds(n);
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
        return;
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
    rec(1, 0, calcNumRounds(numTeams), seedArr);

    const withByes = seedArr.map((seed) => (seed > numTeams ? "bye" : seed));

    return withByes.reverse();
};

// TODO: delete this
export const run = () => {
    console.log(getSeedArr(12));
};
