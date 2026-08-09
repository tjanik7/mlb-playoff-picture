<script setup lang="ts">
import type { Team } from "./team/team";

const props = defineProps<{
    teams: Team[];
}>();

const display = (team: Team | undefined) => {
    if (team === undefined) {
        return "";
    }

    return (
        team.location +
        " " +
        team.name +
        " (" +
        team.winPct.toFixed(3).slice(1) +
        ")"
    );
};

const teamStr = (idx: number) => {
    const seed = idx + 1;
    return "(" + seed + ") " + display(props.teams[idx]);
};
</script>

<template>
    <ul>
        <li>{{ teamStr(0) }}</li>
        <li>{{ teamStr(4) }} @ {{ teamStr(3) }}</li>
    </ul>

    <ul>
        <li>{{ teamStr(1) }}</li>
        <li>{{ teamStr(5) }} @ {{ teamStr(2) }}</li>
    </ul>
</template>
