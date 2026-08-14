<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
    numTeams: number;
}>();

// Length of 'columns' tells you how many columns we need
// Each member tells you how many SingleBrackets we need in that column
const columns = computed(() => {
    let n = props.numTeams;
    const cols = [];

    while (n > 0) {
        console.log(n);

        n = Math.trunc(n / 2);
        cols.push(n);
    }

    return cols;
});
</script>

<template>
    <div v-for="col in columns">
        <div></div>
    </div>
</template>

<style scoped lang="css"></style>
