<script setup lang="ts">
import { displayTeam } from "./team/team";
import type { Division, Team } from "./team/team";

const props = defineProps<{
    division: Division;
    teams: Team[];
}>();
</script>

<template>
    <h2>{{ props.division.name }}</h2>

    <ol>
        <li v-for="team in props.teams">
            {{ displayTeam(team) }}
        </li>
    </ol>
</template>
