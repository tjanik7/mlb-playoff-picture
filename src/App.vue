<script setup lang="ts">
import SingleBracket from "./bracket/SingleBracket.vue";
import SingleTeam from "./bracket/SingleTeam.vue";
import SmartBracket from "./bracket/SmartBracket.vue";
</script>

<template>
    <div class="flex-row">
        <SmartBracket :num-teams="2" />
    </div>

    <div class="flex-row">
        <div class="flex-col">
            <SingleBracket road-team="Phillies" home-team="Cubs" :height="2" />
            <SingleBracket road-team="Giants" home-team="Padres" :height="2" />
        </div>

        <div class="flex-col">
            <SingleBracket
                road-team="Cubs"
                home-team="Padres"
                :height="4"
                :bottom-offset="1"
            />
        </div>

        <div class="flex-col">
            <SingleTeam team="Cubs" :bottom-offset="3" />
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
    justify-content: flex-end;
}
</style>
