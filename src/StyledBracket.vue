<script setup lang="ts"></script>

<template>
    <div class="flex-col">
        <div class="team">Cubs</div>
        <div class="team bottom">Brewers</div>
    </div>
</template>

<style scoped lang="css">
.flex-col {
    background-color: lightcoral;
    display: grid;
    grid-template-columns: min-content;
}

.team {
    /* width: fit-content; */
    background-color: lightblue;

    padding: 4px 16px;

    border-bottom: 3px solid black;
}

.bottom {
    border-right: 3px solid black;
}
</style>
