<script lang="ts">
    import type { MediaItem } from "../lib/media_item";
    import { queue } from "../lib/queueStore";
    import { API_ROUTE } from "../lib/store";
    let open = $state(false);
    let list: MediaItem[] = $state([]);

    queue.subscribe((val) => (list = val));

    function removeFromQueue(id: string) {
        queue.removeById(id);
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
            {#each list as item}
                <div
                    class="flex justify-between items-center bg-gray-800 px-4 py-2 rounded-lg shadow-inner"
                >

                   <span class="overflow-auto">{item.name}</span>
                    <button
                        onclick={() => removeFromQueue(item.id)}
                        class="text-red-400 hover:text-red-600 text-lg font-bold"
                        aria-label="Remove item"
                    >
                        ×
                    </button>
                </div>
            {/each}
        {/if}
    </div>
{/if}

<!-- Floating Action Button -->
<button
    onclick={() => (open = !open)}
    class="fixed flex bottom-6 right-6 bg-blue-700 lg:bg-blue-900 w-16 h-16 hover:bg-blue-600 text-white rounded-full shadow-lg z-50 justify-center items-center"
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
