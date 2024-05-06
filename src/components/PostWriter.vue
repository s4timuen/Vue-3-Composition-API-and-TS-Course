<template>
    <div class="post-writer" ref="root">
        <h3>{{ $t('links.new-post') }}</h3>
        <button class="btn btn--save" @click="savePost()">
            <i class="fa fa-plus"></i>
            {{ $t('buttons.save') }}
        </button>
        <div class="post-writer__title">
            <label for="post-writer-title">{{ $t('views.post-writer.title') }}</label>
            <input type="text" id="post-writer-title" v-model="title" />
        </div>
        <div class="post-writer__content">
            <div class="post-writer__editor">
                <label for="post-writer-editor">{{ $t('views.post-writer.editor') }}</label>
                <div id="post-writer-editor" ref="contentEditor" contenteditable @input="handleInput()" />
            </div>
            <div class="post-writer__preview">
                <label for="post-writer-preview">{{ $t('views.post-writer.preview') }}</label>
                <div id="post-writer-preview" v-html="parsedContent"></div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Ref, ref, onMounted, watch } from 'vue';
import { TimelinePost } from '@/models/timelinePost';
import { Marked } from 'marked';
import { markedHighlight } from 'marked-highlight';
import hljs from 'highlight.js';
import debounce from 'lodash/debounce';
import { v4 as uuid } from 'uuid';
import { DateTime } from 'luxon';
import { usePostsStore } from '@/stores/postsStore';
import { useRouter } from 'vue-router';

const root: Ref<HTMLElement | null> = ref(null);
const contentEditor: Ref<HTMLElement | null> = ref(null);

// eslint-disable-next-line -- compiler macro
const props = defineProps<{
    post: TimelinePost;
}>();

const postsStore = usePostsStore();
const router = useRouter();

const title: Ref<string> = ref(props.post.title);
const content: Ref<string> = ref(props.post.markdown);
const parsedContent: Ref<string> = ref('');

// todo: custom marked for import
const marked = new Marked(
    {
        gfm: true,
        breaks: true
    },
    markedHighlight({
        highlight(code: string) {
            return `<pre><code class="hljs">${hljs.highlightAuto(code).value}</code></pre>`;
        }
    })
);

watch(
    content,
    debounce(async (newContent) => {
        parsedContent.value = await marked.parse(newContent);
    }, 250),
    { immediate: true }
);

async function handleInput(): Promise<void> {
    if (!contentEditor.value) {
        throw Error('ContentEditor/Preview DOM note(s) was not found');
    }
    content.value = contentEditor.value.innerText;
}

function savePost(): void {
    const newPost: TimelinePost = {
        id: uuid(),
        title: title.value,
        created: DateTime.now(),
        markdown: content.value
    };
    // todo: check mandatory fields
    postsStore.createPost(newPost);
    router.push('/');
}

onMounted(() => {
    if (!contentEditor.value) {
        throw Error('ContentEditor/Preview DOM note(s) was not found');
    }
    contentEditor.value.innerText = content.value;
});
</script>

<style scoped lang="scss">
@import 'highlight.js/styles/atom-one-dark.css';

.post-writer {
    @include custom-scrollbar;
    @include button;

    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    padding: 1rem;
    gap: 2rem;
    width: 100%;

    h3 {
        margin: 0;
    }

    .btn.btn--save i.fa.fa-plus {
        font-size: 1.2rem;
    }

    .post-writer__title {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        gap: 0.5rem;
        width: 100%;

        #post-writer-title {
            background-color: $color-white;
            border: 1px solid $color-gray;
            border-radius: 5px;
            height: 1.25rem;
            padding: 0.2rem 0.5rem;
            width: calc(100% - 1rem);
            outline: none;
        }
    }

    .post-writer__content {
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        justify-content: space-between;
        gap: 2rem;
        width: 100%;

        .post-writer__editor {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: center;
            width: 50%;

            :focus {
                outline: none;
            }
        }

        .post-writer__preview {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: center;
            width: 50%;
        }

        label {
            margin-bottom: 0.5rem;
            cursor: pointer;
        }

        #post-writer-editor,
        #post-writer-preview {
            background-color: $color-white;
            border: 1px solid $color-gray;
            border-radius: 5px;
            width: calc(100% - 2rem);
            min-height: 15rem;
            height: calc(100% - 2rem);
            padding: 1rem;
            text-align: start;
        }

        #post-writer-editor {
            line-height: 1.5;
        }
    }

    @media (max-width: 800px) {
        .post-writer__content {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: start;

            .post-writer__editor {
                width: 100%;
            }

            .post-writer__preview {
                width: 100%;
            }
        }
    }

    @media (min-width:800px) {
        .btn.btn--save {
            position: absolute;
            top: 4rem;
            right: 1rem;
        }
    }
}
</style>
