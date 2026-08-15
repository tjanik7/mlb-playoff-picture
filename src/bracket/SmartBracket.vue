<script setup lang="ts">
import { computed } from "vue";
import SingleBracket from "./SingleBracket.vue";
import SingleTeam from "./SingleTeam.vue";

const props = defineProps<{
    numTeams: number;
}>();

// Member represents num teams in the given column
const cols = computed(() => {
    const colArr = [];
    let n = props.numTeams;

    while (n > 0) {
        colArr.push(n);
        n = Math.trunc(n / 2);
    }

    return colArr;
});

// Number of SingleBrackets needed in a given column
const getNumBrackets = (col: number) => Math.trunc(cols.value[col - 1]! / 2);

// Calc number of columns needed (via number of teams)
// TODO: make computed?
const getNumCols = (numTeams: number) =>
    Math.ceil(Math.log(numTeams) / Math.log(2) + 1);

const getHeight = (colNumber: number) => 2 ** colNumber;

const offsets = computed(() => {
    const res = [0];

    const numCols = getNumCols(props.numTeams);
    console.log(numCols);
    console.log("hi");

    for (let i = 1; i < numCols; i++) {
        const prevHeight = getHeight(i);
        res.push(res[i - 1]! + Math.trunc(prevHeight / 2));
    }

    return res;
});

console.log(`Generating ${props.numTeams} team bracket`);
console.log(`Requires ${getNumCols(props.numTeams)} columns`);

console.log(offsets.value);
</script>

<template>
    <div class="flex-row">
        <div class="flex-col">
            <SingleBracket
                v-for="teamNum in Math.trunc(cols[0]! / 2)"
                :road-team="String(teamNum * 2 - 1)"
                :home-team="String(teamNum * 2)"
                :height="getHeight(1)"
            />
        </div>

        <div v-for="colNum in getNumCols(props.numTeams) - 2" class="flex-col">
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
