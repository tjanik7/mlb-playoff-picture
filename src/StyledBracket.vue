<script setup lang="ts"></script>

<template>
    <div class="row-container">
        <div class="col-container">
            <div class="flex-item">Cubs</div>
            <div class="flex-item bottom">Dodgers</div>
            <div class="flex-item">Padres</div>
            <div class="flex-item bottom">Cardinals</div>
        </div>
        <div class="col-container">
            <div class="flex-item">CHC</div>
            <div class="flex-item bottom invisible">.</div>
            <div class="flex-item bottom">SD</div>
        </div>
    </div>
</template>

<style scoped lang="css">
.row-container {
    background-color: lightgreen;

    display: flex;
    align-items: stretch;
}

.col-container {
    display: flex;
    flex-direction: column;
    width: fit-content;
    background-color: lightblue;

    justify-content: center;
}

.flex-item {
    background-color: coral;
    width: 100%;
    border-bottom: 3px solid black;
    box-sizing: border-box;
    /* flex-grow: 1; */
}

.bottom {
    border-right: 3px solid black;
}

.invisible {
    border-bottom: none;
}
</style>
