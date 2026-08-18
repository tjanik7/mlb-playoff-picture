<script setup lang="ts">
import { computed } from "vue";
import SingleBracket from "./SingleBracket.vue";
import SingleTeam from "./SingleTeam.vue";
import { getBracket, run, toBracketNodes } from "./seeds.ts";
import Bye from "./Bye.vue";

const props = defineProps<{
    numTeams: number;
}>();

const getHeight = (colNumber: number) => 2 ** colNumber;

const cols = computed(() => {
    const bracket = getBracket(props.numTeams);

    const sliced = bracket.slice(1);
    const reversed = sliced.reverse();

    return reversed.map((col) => toBracketNodes(col));
});

const offsets = computed(() => {
    const res = [0];

    for (let i = 1; i < cols.value.length + 1; i++) {
        const prevHeight = getHeight(i);
        res.push(res[i - 1]! + Math.trunc(prevHeight / 2));
    }

    return res;
});
</script>

<template>
    <div class="flex-row">
        <div v-for="(col, idx) in cols" class="flex-col">
            <template v-for="matchup in col">
                <template v-if="matchup !== 'bye'">
                    <SingleBracket
                        :road-team="String(matchup.road)"
                        :home-team="String(matchup.home)"
                        :height="getHeight(idx + 1)"
                        :bottom-offset="offsets[idx]"
                    />
                </template>

                <template v-else>
                    <Bye :height="getHeight(idx + 1)" />
                </template>
            </template>
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
