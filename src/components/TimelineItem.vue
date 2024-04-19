<template>
    <div class="timeline__item" ref="root">
        <p>{{ post.created.toFormat("d MMM") }}</p>
        <p>{{ post.title }}</p>
    </div>
</template>

<script setup lang="ts">
import { Ref, ref } from 'vue';
import { TimelinePost } from '@/models/timelinePost.ts';

const root: Ref<HTMLElement | null> = ref(null);

// eslint-disable-next-line -- compiler macro
defineProps<{
    post: TimelinePost
}>();
</script>

<style scoped lang="scss">
.timeline__item {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    gap: 0.5rem;
    width: 75%;
    padding: 0.5rem 1rem;
    background-color: $color-main-tint-04;
    border: 1px solid $color-gray;
    border-radius: 10px;
    box-shadow: $shadow;

    p {
        margin: 0;
    }
}
</style>
