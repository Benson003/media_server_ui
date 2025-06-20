<script lang="ts">
    import { onMount, afterUpdate } from "svelte";
    import { pop, push } from "svelte-spa-router";
    import { API_ROUTE } from "../lib/store";
    import { queue } from "../lib/queueStore";
    import type { MediaItem } from "../lib/media_item";

    export let params: { id: string };

    let name = "";
    let path = "";
    let ext = "";
    let errorMessage: unknown;
    let queueList: MediaItem[];
    let currentIndex = -1;

    let showSidebar = true;
    let videoElement: HTMLVideoElement;

    queue.subscribe((val) => {
        queueList = val;
        currentIndex = queueList.findIndex((item) => item.id === params.id);
    });

    const toggleSidebar = () => (showSidebar = !showSidebar);
    const goBack = () => push("/");

    const fetchMediaInfo = async (id: string) => {
        try {
            const req = await fetch(`${$API_ROUTE}/media/${id}`);
            const res = await req.json();
            name = res.name;
            path = res.path;
            ext = res.ext;
        } catch (err) {
            console.error(err);
            errorMessage = err;
        }
    };

    onMount(() => {
        fetchMediaInfo(params.id);
    });

    // Runs whenever ID changes via router
    afterUpdate(() => {
        const newIndex = queueList.findIndex((item) => item.id === params.id);
        if (newIndex !== -1) {
            currentIndex = newIndex;
            fetchMediaInfo(params.id);
        }
    });

    const playNext = () => {
        if (currentIndex >= 0 && currentIndex < queueList.length - 1) {
            const nextItem = queueList[currentIndex + 1];
            push(`/watch/${nextItem.id}`);
        }
    };
</script>

<main
    class="flex flex-col lg:flex-row min-h-screen bg-white dark:bg-gray-900 text-white"
>
    {#if !errorMessage}
        <!-- Video & Info Section -->
        <div class="flex-1 p-4 flex flex-col items-center">
            <div
                class="w-full max-w-5xl aspect-video rounded-3xl overflow-hidden shadow-lg"
            >
                <video
                    bind:this={videoElement}
                    src={`${$API_ROUTE}/media/${params.id}/stream`}
                    controls
                    autoplay
                    class="w-full h-full object-contain rounded-2xl"
                    on:ended={playNext}
                ></video>
            </div>

            <div class="mt-4 text-left w-full max-w-5xl">
                <h1 class="text-3xl font-bold">{name}</h1>
                <p class="mt-2 text-gray-400 text-sm">Path: {path}</p>
                <p class="text-gray-400 text-sm">Ext: {ext}</p>
            </div>

            <div class="mt-4 w-full max-w-5xl flex justify-between">
                <button
                    on:click={goBack}
                    class="bg-red-600 hover:bg-red-700 rounded-2xl px-4 py-2 font-bold text-white"
                >
                    Go Back
                </button>

                <button
                    on:click={toggleSidebar}
                    class="bg-gray-700 hover:bg-gray-600 rounded-2xl px-4 py-2 font-bold text-white"
                >
                    {showSidebar ? "Hide Queue" : "Show Queue"}
                </button>
            </div>
        </div>

        <!-- Sidebar Queue -->
        {#if showSidebar}
            <aside
                class="w-full lg:w-96 bg-gray-800 border-l border-gray-700 shadow-inner p-4 overflow-y-auto"
            >
                <h2 class="text-lg font-semibold mb-3">Queue</h2>

                {#if queueList.length === 0}
                    <p class="text-sm text-gray-400 text-center">
                        Your queue is empty.
                    </p>
                {:else}
                    <ul class="space-y-2">
                        {#each queueList as item, i (item.id)}
                            <li
                                class="cursor-pointer p-2 rounded-lg transition flex justify-between items-center
									{params.id === item.id
                                    ? 'bg-blue-700 font-semibold'
                                    : 'bg-gray-700 hover:bg-gray-600'}"
                                on:click={() => push(`/watch/${item.id}`)}
                            >
                                <span class="truncate max-w-[200px]"
                                    >{item.name}</span
                                >
                                <span class="text-xs text-gray-400"
                                    >{item.ext}</span
                                >
                            </li>
                        {/each}
                    </ul>
                {/if}
            </aside>
        {/if}
    {:else}
        <!-- Error Message -->
        <div
            class="w-full max-w-5xl text-3xl font-extrabold bg-red-700 text-white rounded-3xl shadow-lg p-4 mx-auto my-10"
        >
            {errorMessage}
            <button
                on:click={goBack}
                class="mt-4 bg-red-900 hover:bg-red-700 rounded-2xl px-4 py-2 font-bold text-white"
            >
                Go Back
            </button>
        </div>
    {/if}
</main>
