<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
    height: number;
}>();

const heightStr = computed(() => String(props.height * 2) + "em");
</script>

<template>
    <div class="bye" />
</template>

<style scoped lang="css">
.bye {
    height: v-bind(heightStr);
}
</style>
