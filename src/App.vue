<script setup lang="ts">
import StyledBracket from "./StyledBracket.vue";
import SingleBracket from "./SingleBracket.vue";
</script>

<template>
    <!-- <StyledBracket /> -->

    <div class="flex-row">
        <div class="flex-col">
            <SingleBracket
                :height="'2em'"
                road-team="Phillies"
                home-team="Cubs"
            />
            <SingleBracket
                :height="'2em'"
                road-team="Giants"
                home-team="Padres"
            />
        </div>

        <div class="flex-col">
            <SingleBracket
                :height="'4em'"
                road-team="Cardinals"
                home-team="Brewers"
            />
        </div>
    </div>
</template>

<style scoped>
.flex-row {
    display: flex;
}

.flex-col {
    display: flex;
    flex-direction: column;
}
</style>
