<template>
    <div class="new-post__view" ref="root">
        <PostWriter :post="newPost" />
    </div>
</template>

<script setup lang="ts">
import { Ref, ref } from 'vue';
import { DateTime } from 'luxon';
import { TimelinePost } from '@/models/timelinePost';
import PostWriter from '@/components/PostWriter.vue';

const root: Ref<HTMLElement | null> = ref(null);

const newPost: TimelinePost = {
    id: '',
    title: '',
    created: DateTime.now(),
    markdown: ''
}
</script>

<style scoped lang="scss">
.new-post__view {
    @include view;

    display: flex;
    align-items: start;
    justify-content: center;
}
</style>
