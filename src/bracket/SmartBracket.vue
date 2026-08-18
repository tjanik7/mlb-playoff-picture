<script setup lang="ts">
import { computed } from "vue";
import SingleBracket from "./SingleBracket.vue";
import SingleTeam from "./SingleTeam.vue";
import { getSeedArr, run } from "./seeds.ts";

// TODO next: Shift to using node/tree structure here so we can easily iterate
// through each round
// (Will prob need to produce an arr for each round after building the tree)

const props = defineProps<{
    numTeams: number;
}>();

const seeds = computed(() => {
    const res = [];
    const n = props.numTeams;

    for (let i = 0; i < Math.trunc(n / 2); i++) {
        res.push(n - i);
        res.push(i + 1);
    }

    return res;
});

// Number of teams in a given column
const teamsInCol = computed(() => {
    const colArr = [];
    let n = props.numTeams;

    while (n > 0) {
        colArr.push(n);
        n = Math.trunc(n / 2);
    }

    return colArr;
});

// Number of SingleBracket components needed in a given column
const getNumBrackets = (col: number) =>
    Math.trunc(teamsInCol.value[col - 1]! / 2);

// Calc number of columns needed (via number of teams)
const numCols = computed(() =>
    Math.ceil(Math.log(props.numTeams) / Math.log(2) + 1),
);

const getHeight = (colNumber: number) => 2 ** colNumber;

const offsets = computed(() => {
    const res = [0];

    for (let i = 1; i < numCols.value; i++) {
        const prevHeight = getHeight(i);
        res.push(res[i - 1]! + Math.trunc(prevHeight / 2));
    }

    return res;
});

const seedArr = computed(() => getSeedArr(props.numTeams));

interface Matchup {
    road: number;
    home: number;
}
const r1Matchups = computed(() => {
    const arr = seedArr.value;
    const matchups: (Matchup | "bye")[] = [];

    for (let i = 0; i < props.numTeams; i += 2) {
        const road = arr[i];
        const home = arr[i + 1];

        if (
            road === "bye" ||
            home === "bye" ||
            road === undefined ||
            home === undefined
        ) {
            matchups.push("bye");
        } else {
            const matchup: Matchup = {
                road: road,
                home: home,
            };

            matchups.push(matchup);
        }
    }

    return matchups;
});

// console.log("seedArr is");
// console.log(seedArr.value);

// console.log(r1Matchups.value);

run();
</script>

<template>
    <div class="flex-row">
        <div class="flex-col">
            <template v-for="matchup in r1Matchups">
                <template v-if="matchup !== 'bye'">
                    <SingleBracket
                        :road-team="String(matchup.road)"
                        :home-team="String(matchup.home)"
                        :height="getHeight(1)"
                    />
                </template>
            </template>
        </div>

        <div v-for="colNum in numCols - 2" class="flex-col">
            <SingleBracket
                v-for="j in getNumBrackets(colNum + 1)"
                :height="getHeight(colNum + 1)"
                :bottom-offset="offsets[colNum]"
            />
        </div>

        <SingleTeam :bottom-offset="offsets.at(-1)" />
    </div>
</template>

<style scoped lang="css">
.flex-col {
    display: flex;
    flex-direction: column;
}
</style>
