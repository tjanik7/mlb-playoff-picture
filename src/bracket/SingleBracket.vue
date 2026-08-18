<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
    roadSeed?: number;
    roadName?: string;
    homeSeed?: number;
    homeName?: string;

    height: number; // in "em"
    bottomOffset?: number; // in "em"
}>();

const heightStr = computed(() => String(props.height) + "em");
const dblheightStr = computed(() => String(props.height * 2) + "em");

const offset = computed(() => {
    const asNum = props.bottomOffset ?? 0;
    return String(asNum) + "em";
});

const formatTeam = (seed: number | undefined, team: string | undefined) => {
    if (seed === -1) {
        return "";
    }

    if (team === undefined) {
        return String(seed);
    }

    return seed + ". " + team;
};

const roadFmt = computed(() => formatTeam(props.roadSeed, props.roadName));
const homeFmt = computed(() => formatTeam(props.homeSeed, props.homeName));
</script>

<template>
    <div class="col-container">
        <div class="flex-item">
            {{ roadFmt }}
        </div>
        <div class="flex-item home">
            {{ homeFmt }}
        </div>
        <div class="spacer"></div>
    </div>
</template>

<style scoped lang="css">
.col-container {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    min-width: 4em;

    height: v-bind(dblheightStr);
}

.flex-item {
    box-sizing: border-box;

    width: 100%;
    border-bottom: 3px solid black;

    /* Align text to bottom of div */
    display: flex;
    flex-direction: column;
    justify-content: flex-end;

    padding: 0 4px;
}

.home {
    border-right: 3px solid black;
    height: v-bind(heightStr);
}

.spacer {
    height: v-bind(offset);
}
</style>
