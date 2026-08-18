<script setup lang="ts">
import { computed } from "vue";
import SingleBracket from "./SingleBracket.vue";
import SingleTeam from "./SingleTeam.vue";
import { getBracket, removeRepeatedNames, toBracketNodes } from "./seeds.ts";
import Bye from "./Bye.vue";

const props = defineProps<{
    teams: string[];
}>();

const numTeams = computed(() => props.teams.length);

const getHeight = (colIdx: number) => 2 ** (colIdx + 1);

const cols = computed(() => {
    const bracket = getBracket(numTeams.value);

    const sliced = bracket.slice(1);
    const reversed = sliced.reverse();

    const nodes = reversed.map((col) => toBracketNodes(col));
    return removeRepeatedNames(nodes);
});

const offsets = computed(() => {
    const res = [0];

    for (let i = 1; i < cols.value.length + 1; i++) {
        const prevHeight = getHeight(i - 1);
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
                        :height="getHeight(idx)"
                        :bottom-offset="offsets[idx]"
                    />
                </template>

                <template v-else>
                    <Bye :height="getHeight(idx)" />
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
