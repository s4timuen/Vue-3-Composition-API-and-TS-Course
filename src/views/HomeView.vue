<template>
    <div class="home__view" ref="root">
        <section>
            <div class="container">
                <Suspense>
                    <template #default>
                        <TimelineComp />
                    </template>
                    <template #fallback>
                        <div class="suspense__loading">
                            <p>{{ $t('suspense.loading') }}</p>
                        </div>
                    </template>
                </Suspense>
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
import TimelineComp from '@/components/TimelineComp.vue';
import { Ref, ref } from 'vue';

const root: Ref<HTMLElement | null> = ref(null);
</script>

<style scoped lang="scss">
.home__view {
    @include view;
    @include suspense-loading;

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