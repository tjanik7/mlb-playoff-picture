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

const teamStr = (idx: number) => display(props.teams[idx]);
</script>

<template>
    <h2>Byes</h2>
    <ol>
        <li>{{ teamStr(0) }}</li>
        <li>{{ teamStr(1) }}</li>
    </ol>

    <h2>Wild Card Matchups</h2>

    <ul>
        <li>{{ teamStr(5) }} @ {{ teamStr(2) }}</li>
        <li>{{ teamStr(4) }} @ {{ teamStr(3) }}</li>
    </ul>
</template>
