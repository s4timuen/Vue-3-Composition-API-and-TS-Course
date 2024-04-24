<template>
    <div class="schedule__view" ref="root">
        <Suspense>
            <template #default>
                <TimelineComp />
            </template>
            <template #fallback>
                <SuspenseText />
            </template>
        </Suspense>
    </div>
</template>

<script setup lang="ts">
import SuspenseText from '@/components/SuspenseText.vue';
import TimelineComp from '@/components/TimelineComp.vue';
import { Ref, ref } from 'vue';

const root: Ref<HTMLElement | null> = ref(null);
</script>

<style scoped lang="scss">
.schedule__view {
    @include view;

    display: flex;
    align-items: start;
    justify-content: center;
}
</style>
