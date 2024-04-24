<template>
    <div class="home__view" ref="root">
        <section>
            <div class="container">
                <Suspense>
                    <template #default>
                        <TimelineComp />
                    </template>
                    <template #fallback>
                        <SuspenseText />
                    </template>
                </Suspense>
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
import SuspenseText from '@/components/SuspenseText.vue';
import TimelineComp from '@/components/TimelineComp.vue';
import { Ref, ref } from 'vue';

const root: Ref<HTMLElement | null> = ref(null);
</script>

<style scoped lang="scss">
.home__view {
    @include view;

    display: flex;
    align-items: start;
    justify-content: center;

    section {
        width: 100%;

        .container {
            width: 100%;
            padding-top: 1rem;
        }
    }
}
</style>