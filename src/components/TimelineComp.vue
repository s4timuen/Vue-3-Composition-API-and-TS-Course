<template>
    <div class="timeline" ref="root">
        <div class="selection">
            <a class="link" :class="{ '--active': isActive(period) }" v-for="(period, key) of  periods" :key="key"
                @click="selectPeriod(period)">
                {{ $t(`views.home.filter.${period}`) }}
            </a>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Ref, ref } from 'vue';
import { periods, Period } from '@/models/period.ts'

const root: Ref<HTMLElement | null> = ref(null);

// period selection
const selectedPeriod: Ref<Period> = ref(periods[0]);

function selectPeriod(period: Period): void {
    selectedPeriod.value = period;
}
function isActive(period: Period) {
    return period === selectedPeriod.value ? true : false;
}
</script>

<style scoped lang="scss">
.timeline {
    @include link;

    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;

    .selection {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        gap: 2rem;
        width: 100%;

        a {
            text-decoration: underline;
            text-underline-offset: 0.2rem;
        }

        a.--active {
            color: $color-white;
            text-shadow: $shadow-active;
        }
    }
}
</style>@/models/period