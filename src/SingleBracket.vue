<script setup lang="ts">
import { ref } from "vue";

const props = defineProps<{
    height: string;
    roadTeam: string;
    homeTeam: string;
}>();

// TODO: Need to be able to set bottom padding dynamically
</script>

<template>
    <div class="col-container">
        <div class="flex-item">{{ props.roadTeam }}</div>
        <div class="flex-item home">{{ props.homeTeam }}</div>
    </div>
</template>

<style scoped lang="css">
.col-container {
    display: flex;
    flex-direction: column;
    width: 100%;
    background-color: lightblue;

    /* height: v-bind("props.height * 2"); */
}

.flex-item {
    box-sizing: border-box;
    height: v-bind("props.height");

    background-color: coral;
    width: 100%;
    border-bottom: 3px solid black;

    /* Align text to bottom of div */
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
}

.home {
    border-right: 3px solid black;
    /* margin-bottom: 4px; */
}
</style>
