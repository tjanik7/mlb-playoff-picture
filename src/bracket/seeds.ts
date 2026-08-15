export const getSeeds = (n: number) => {
    const res = Math.ceil(Math.log(n) / Math.log(2));
    const r2 = 2 ** res;

    const numByes = r2 - n;
    const numR1Teams = n - numByes;
    const numR1Matchups = numR1Teams / 2;

    console.log(`In a bracket with ${n} teams`);
    console.log(`${numByes} teams get a bye`);
    console.log(`${numR1Teams} teams play in the first round`);
    console.log(`There are ${numR1Matchups} first round matchups`);
};

// TODO: delete this
export const run = () => {
    getSeeds(9);
};
