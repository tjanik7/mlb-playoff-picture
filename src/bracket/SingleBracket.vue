<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
    height: number; // in "em"
    roadTeam?: string;
    homeTeam?: string;
    bottomOffset?: number; // in "em"
}>();

const heightStr = computed(() => String(props.height) + "em");
const h2Str = computed(() => String(props.height * 2) + "em");

const offset = computed(() => {
    const asNum = props.bottomOffset ?? 0;
    return String(asNum) + "em";
});
</script>

<template>
    <div class="col-container">
        <div class="flex-item">
            {{ props.roadTeam === "-1" ? "" : props.roadTeam }}
        </div>
        <div class="flex-item home">
            {{ props.homeTeam === "-1" ? "" : props.homeTeam }}
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

    height: v-bind(h2Str);
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
