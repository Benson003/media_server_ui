<script lang="ts">
    import { push } from "svelte-spa-router";
    import { API_ROUTE } from "../lib/store";
    import { queue } from "../lib/queueStore";

    let { mediaItem } = $props();

    const navigateToWatch = () => {
        queue.enqueue(mediaItem);
        push(`/watch/${mediaItem.id}`);
    };

    const addToQueue = () => {
        queue.enqueue(mediaItem);
    };
</script>

<article
    class="overflow-hidden rounded-lg shadow-sm transition hover:shadow-lg hover:rotate-x-6 hover:rotate-y-6 dark:shadow-gray-700/25"
>
    <img
        alt="Can't fetch the thumbnail for: {mediaItem.name}"
        src="{$API_ROUTE}/media/{mediaItem.id}/thumbnail"
        class="h-56 w-full object-cover"
    />

    <div class="bg-white p-4 sm:p-6 dark:bg-gray-900">
        <h3 class="text-lg text-gray-900 dark:text-white font-semibold truncate">
            {mediaItem.name}
        </h3>

        <p class="mt-2 line-clamp-3 text-sm text-gray-500 dark:text-gray-400 break-all">
            <strong>Path:</strong> {mediaItem.path} <br />
            <strong>Extension:</strong> {mediaItem.ext}
        </p>

        <div class="mt-4 flex gap-2 flex-wrap">
            <button
                onclick={navigateToWatch}
                class="bg-green-600 hover:bg-green-700 dark:bg-green-900 dark:hover:bg-green-600 rounded-2xl px-4 py-2 font-bold text-white transition hover:-rotate-x-6 hover:-rotate-y-12 hover:-rotate-z-2"
            >
                ▶ Watch Now
            </button>
            <button
                onclick={addToQueue}
                class="bg-gray-600 hover:bg-gray-700 dark:bg-gray-900 dark:hover:bg-gray-600 rounded-2xl px-4 py-2 font-bold text-white transition hover:-rotate-x-6 hover:-rotate-y-12 hover:border-2 hover:border-white  hover:-rotate-z-2"
            >
                ➕ Add to Queue
            </button>
        </div>
    </div>
</article>
