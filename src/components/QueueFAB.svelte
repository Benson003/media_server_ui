<script lang="ts">
    import { push } from "svelte-spa-router";
    import type { MediaItem } from "../lib/media_item";
    import { queue } from "../lib/queueStore";
    import { API_ROUTE } from "../lib/store";
    let open = $state(false);
    let list: MediaItem[] = $state([]);

    queue.subscribe((val) => (list = val));

    function removeFromQueue(id: string) {
        queue.removeById(id);
    }
    function resetqueue() {
        queue.reset();
    }
    function playFromHead() {
        let current = queue.peek()?.id
        push(`/watch/${current}`);
    }
</script>

<!-- Floating Queue Panel -->
{#if open}
    <div
        class="fixed bottom-24 not-lg:w-11/12 w-2/6 right-6 bg-gray-700 text-white p-8 rounded-xl shadow-xl z-40 max-h-96 overflow-y-auto space-y-3"
    >
        {#if list.length === 0}
            <p class="text-sm text-gray-400 text-center">Queue is empty</p>
        {:else}
            <button
                onclick={(e) => {
                    e.stopPropagation();
                    resetqueue();
                }}
                class="bg-red-900 hover:bg-red-500 hover:border-1 hover:border-white border-0 rounded-xl fixed bottom-5 right-20 p-4 m-4 font-bold"
            >
                Clear Queue</button
            >
            <button
                onclick={(e) => {
                    e.stopPropagation();
                    playFromHead()
                }}
                class="bg-green-900 hover:bg-green-500 hover:border-1 hover:border-white border-0 rounded-xl fixed bottom-5 right-52 p-4 m-4 font-bold"
            >
                Play </button
            >
            {#each list as item}
                <button
                    class="flex justify-between items-center bg-gray-800 rounded-lg shadow-inner"
                    onclick={(e) => {
                        e.stopPropagation();
                        push(`/watch/${item.id}`);
                    }}
                >
                    <span class="overflow-auto p-2">{item.name}</span>
                    <span
                        onclick={(e) => {
                            e.stopPropagation();
                            removeFromQueue(item.id);
                        }}
                        class="text-red-400 hover:text-red-600 text-lg ml-2 mt-0 mb-0 mr-0 p-2 bg-white font-bold rounded-br-lg rounded-tr-lg"
                        aria-label="Remove item"
                    >
                        ×
                    </span>
                </button>
            {/each}
        {/if}
    </div>
{/if}

<!-- Floating Action Button -->
<button
    onclick={() => (open = !open)}
    class="fixed flex bottom-6 right-6 bg-blue-700 lg:bg-blue-900 w-16 h-16 hover:bg-blue-600 hover:border-1 hover:border-white text-white rounded-full shadow-lg z-50 justify-center items-center"
>
    {#if open}
        <div class="relative w-5 h-5">
            <span
                class="absolute top-1/2 left-0 w-5 h-1 bg-white rounded-2xl transform -translate-y-1/2 rotate-45"
            ></span>
            <span
                class="absolute top-1/2 left-0 w-5 h-1 bg-white rounded-2xl transform -translate-y-1/2 -rotate-45"
            ></span>
        </div>
    {:else}
        <ul class="flex flex-col justify-center items-center gap-1">
            <li class="w-5 h-1 bg-white rounded-2xl"></li>
            <li class="w-5 h-1 bg-white rounded-2xl"></li>
            <li class="w-5 h-1 bg-white rounded-2xl"></li>
        </ul>
    {/if}
</button>
