<template>
    <div class="home__view" ref="root"></div>
</template>

<script setup lang="ts">
import { Ref, ref } from 'vue';

const root: Ref<null> = ref(null);
</script>

<style scoped lang="scss">
.home__view {
    @include view;

    display: flex;
    align-items: center;
    justify-content: center;
}
</style>