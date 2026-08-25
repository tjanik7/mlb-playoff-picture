<script setup lang="ts">
import { computed } from "vue";
import SingleBracket from "./SingleBracket.vue";
import SingleTeam from "./SingleTeam.vue";
import { getBracket } from "./seeds.ts";
import Bye from "./Bye.vue";

const props = defineProps<{
    teams: string[];
}>();

const getHeight = (colIdx: number) => 2 ** (colIdx + 1);

const columns = computed(() => getBracket(props.teams));

const offsets = computed(() => {
    const res = [0];

    for (let i = 1; i < columns.value.length + 1; i++) {
        const prevHeight = getHeight(i - 1);
        res.push(res[i - 1]! + Math.trunc(prevHeight / 2));
    }

    return res;
});
</script>

<template>
    <div class="flex-row">
        <div v-for="(col, idx) in columns" class="flex-col">
            <template v-for="matchup in col">
                <template v-if="matchup !== 'bye'">
                    <SingleBracket
                        :roadSeed="matchup.road"
                        :road-name="teams[matchup.road - 1]"
                        :homeSeed="matchup.home"
                        :home-name="teams[matchup.home - 1]"
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
