<script setup lang="ts"></script>

<template>
    <div class="row-container">
        <div class="col-container r1">
            <div class="flex-item">Cubs</div>
            <div class="flex-item bottom">Dodgers</div>
            <div class="flex-item">Padres</div>
            <div class="flex-item bottom">Cardinals</div>
        </div>

        <div class="col-container r2">
            <div class="flex-item">Cubs</div>
            <div class="flex-item bottom">Padres</div>
        </div>

        <div class="col-container r3">
            <div class="flex-item">Cubs</div>
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

.bottom {
    border-right: 3px solid black;
}

.flex-item {
    background-color: coral;
    width: 100%;
    border-bottom: 3px solid black;
    box-sizing: border-box;

    /* Align text to bottom of div */
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
}

.r1 > .flex-item {
    height: 2em;
}

.r2 > .bottom {
    height: 4em;
    margin-bottom: 1em;
}

.r2 {
    justify-content: flex-end;
}
</style>
