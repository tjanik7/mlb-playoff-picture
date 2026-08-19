<script setup lang="ts">
import SmartBracket from "./bracket/SmartBracket.vue";

const mlbTeams = [
    "Dodgers",
    "Padres",
    "Giants",
    "Rockies",
    "Diamondbacks",
    "Cubs",
    "Cardinals",
    "Brewers",
    "Reds",
    "Pirates",
    "Mets",
    "Phillies",
    "Nationals",
    "Marlins",
    "Braves",
    "Angels",
    "Astros",
    "Athletics",
    "Rangers",
    "Mariners",
    "White Sox",
    "Tigers",
    "Royals",
    "Twins",
    "Guardians",
    "Rays",
    "Orioles",
    "Yankees",
    "Red Sox",
    "Blue Jays",
];

const shuffle = (arr: string[]) => {
    const arrCopy = [...arr];

    for (let i = mlbTeams.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));

        [arrCopy[i], arrCopy[j]] = [arrCopy[j]!, arrCopy[i]!];
    }

    return arrCopy;
};

const getRandomTeams = (n: number) => shuffle(mlbTeams).slice(0, n);

const t = getRandomTeams(10);
</script>

<template>
    <SmartBracket :teams="t" />
</template>

<style lang="css" scoped>
.flex-row {
    display: flex;
}

.flex-col {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
}
</style>
