<script setup lang="ts">
import { computed } from "vue";
import SingleBracket from "./SingleBracket.vue";
import SingleTeam from "./SingleTeam.vue";

const props = defineProps<{
    numTeams: number;
}>();

// Length of 'columns' tells you how many columns we need
// Each member tells you how many SingleBrackets we need in that column
const columns = computed(() => {
    let n = props.numTeams;
    const cols = [];

    while (n > 0) {
        console.log(n);

        n = Math.trunc(n / 2);
        cols.push(n);
    }

    return cols;
});

const getHeight = (colNumber: number) => 2 ** colNumber;
</script>

<template>
    <div class="flex-row">
        <div class="flex-col">
            <SingleBracket
                v-for="teamNum in numTeams"
                :road-team="String(teamNum * 2 - 1)"
                :home-team="String(teamNum * 2)"
                :height="getHeight(1)"
            />
        </div>

        <div class="flex-col">
            <SingleBracket
                v-for="n in Math.trunc(props.numTeams / 2)"
                :height="getHeight(2)"
                :bottom-offset="1"
            />
        </div>

        <SingleTeam :bottom-offset="3" />
    </div>
</template>

<style scoped lang="css">
.flex-col {
    display: flex;
    flex-direction: column;
}
</style>
