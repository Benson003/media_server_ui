<script lang="ts">
    import { onMount } from "svelte";
    import { push } from "svelte-spa-router";
    import { API_ROUTE } from "../lib/store";
    import { queue } from "../lib/queueStore";

    export let params: { id: string };

    let name = "";
    let path = "";
    let ext = "";
    let errorMessage: unknown = null;

    let videoElement: HTMLVideoElement;
    let wrapperElement: HTMLDivElement;
    let isPlaying = false;
    let duration = 0;
    let currentTime = 0;
    let volume = 1.0;
    let showSidebar = true;
    let isFullscreen = false;

    $: queueList = $queue;
    $: currentIndex = queueList.findIndex((item) => item.id === params.id);
    $: if (params.id) fetchMediaInfo(params.id);

    onMount(() => {
        if (!videoElement) return;
        videoElement.addEventListener("play", () => (isPlaying = true));
        videoElement.addEventListener("pause", () => (isPlaying = false));
        videoElement.addEventListener("loadedmetadata", () => duration = videoElement.duration);
        videoElement.addEventListener("timeupdate", () => currentTime = videoElement.currentTime);
        videoElement.addEventListener("contextmenu", (e) => e.preventDefault());
        document.addEventListener("fullscreenchange", () => {
            isFullscreen = document.fullscreenElement === wrapperElement;
        });
    });

    const fetchMediaInfo = async (id: string) => {
        try {
            const res = await fetch(`${$API_ROUTE}/media/${id}`);
            const data = await res.json();
            name = data.name;
            path = data.path;
            ext = data.ext;
            errorMessage = null;
        } catch (err) {
            errorMessage = err;
        }
    };

    const togglePlayPause = () => {
        if (!videoElement) return;
        isPlaying ? videoElement.pause() : videoElement.play();
    };

    const playNext = () => {
        queue.removeById(params.id);
        if (currentIndex < queueList.length - 1) push(`/watch/${queueList[currentIndex + 1].id}`);
        else push("/");
    };
    const playNextWithoutSkipping = () => {
        if (currentIndex < queueList.length - 1) push(`/watch/${queueList[currentIndex + 1].id}`);
    }

    const playPrevious = () => {
        if (currentIndex > 0) push(`/watch/${queueList[currentIndex - 1].id}`);
    };

    const toggleSidebar = () => showSidebar = !showSidebar;
    const removeCurrentAndGoBack = () => { queue.removeById(params.id); push("/"); };
    const removeAndMaybeRedirect = (id: string) => { queue.removeById(id); if (id === params.id) push("/"); };
    const onSliderChange = (e: Event) => videoElement.currentTime = parseFloat((e.target as HTMLInputElement).value);
    const onVolumeChange = (e: Event) => { volume = parseFloat((e.target as HTMLInputElement).value); videoElement.volume = volume; };
    const toggleFullscreen = () => {
        if (!wrapperElement) return;
        if (!document.fullscreenElement) {
            wrapperElement.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    };
    </script>

    <main class="flex flex-col lg:flex-row min-h-screen bg-white dark:bg-gray-900 text-white">
    {#if !errorMessage}
        <div class="flex-1 p-4 flex flex-col items-center">
            <div bind:this={wrapperElement} class="w-full max-w-5xl aspect-video relative rounded-3xl overflow-hidden shadow-lg">
                <div class="relative w-full h-full">
                    <video
                        bind:this={videoElement}
                        src={`${$API_ROUTE}/media/${params.id}/stream`}
                        preload="metadata"
                        controlsList="nodownload"
                        class="w-full h-full object-contain rounded-2xl"
                        onended={playNext}
                    ></video>
                    {#if isFullscreen}
                        <div class="absolute top-2 right-2 z-50">
                            <button
                                onclick={toggleFullscreen}
                                class="bg-black bg-opacity-60 hover:bg-opacity-90 px-4 py-2 rounded-xl font-bold text-white"
                            >
                                ✕ Exit Fullscreen
                            </button>
                        </div>
                        <div onclick={togglePlayPause} class="absolute left-6/12 bottom-2 bg-black text-white p-4 rounded-3xl">
                            {isPlaying ? "⏸ Pause" : "▶ Play"}
                        </div>

                    {/if}
                </div>
            </div>

            <div class="w-full max-w-5xl mt-4 space-y-4">
                <input type="range" min="0" max={duration} step="0.1" value={currentTime} oninput={onSliderChange} class="w-full h-2 bg-gray-500 rounded-lg appearance-none accent-blue-500" />

                <div class="flex flex-wrap gap-4 justify-center items-center">
                    <button onclick={playPrevious} class="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-xl font-bold" disabled={currentIndex <= 0}>⏮ Prev</button>
                    <button onclick={togglePlayPause} class="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-xl font-bold">{isPlaying ? "⏸ Pause" : "▶ Play"}</button>
                    <button onclick={playNextWithoutSkipping} class="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-xl font-bold" disabled={currentIndex >= queueList.length - 1}>⏭ Next</button>
                    <button onclick={toggleFullscreen} class="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-xl font-bold">{isFullscreen ? "⛶ Exit FS" : "⛶ Fullscreen"}</button>
                </div>

                <div class="flex justify-center items-center gap-4">
                    <label class="text-sm">🔊 Volume</label>
                    <input type="range" min="0" max="1" step="0.01" value={volume} oninput={onVolumeChange} class="w-40 accent-blue-500" />
                </div>

                <div class="text-left">
                    <h1 class="text-2xl font-bold">{name}</h1>
                    <p class="text-gray-400 text-sm">Path: {path}</p>
                    <p class="text-gray-400 text-sm">Ext: {ext}</p>
                </div>

                <div class="flex justify-between">
                    <button onclick={removeCurrentAndGoBack} class="bg-red-600 hover:bg-red-700 rounded-2xl px-4 py-2 font-bold text-white">Go Back</button>
                    <button onclick={toggleSidebar} class="bg-gray-700 hover:bg-gray-600 rounded-2xl px-4 py-2 font-bold text-white">{showSidebar ? "Hide Queue" : "Show Queue"}</button>
                </div>
            </div>
        </div>

        {#if showSidebar}
            <aside class="w-full lg:w-96 bg-gray-800 border-l border-gray-700 shadow-inner p-4 overflow-y-auto">
                <h2 class="text-lg font-semibold mb-3">Queue</h2>
                {#if queueList.length === 0}
                    <p class="text-sm text-gray-400 text-center">Your queue is empty.</p>
                {:else}
                    <ul class="space-y-2">
                        {#each queueList as item (item.id)}
                            <li class="cursor-pointer p-2 rounded-lg flex justify-between items-center transition {params.id === item.id ? 'bg-blue-700 font-semibold' : 'bg-gray-700 hover:bg-gray-600'}" onclick={() => item.id !== params.id && push(`/watch/${item.id}`)}>
                                <span class="truncate max-w-[200px]">{item.name}</span>
                                <span class="text-xs text-gray-400">{item.ext}</span>
                                {#if params.id !== item.id}
                                    <button onclick={(e) => { e.stopPropagation(); removeAndMaybeRedirect(item.id); }} class="text-red-400 hover:text-2xl text-lg font-bold w-8 h-8 rounded-3xl bg-white text-center justify-center " aria-label="Remove item">×</button>
                                {/if}
                            </li>
                        {/each}
                    </ul>
                {/if}
            </aside>
        {/if}
    {:else}
        <div class="w-full max-w-5xl text-3xl font-extrabold bg-red-700 text-white rounded-3xl shadow-lg p-4 mx-auto my-10">
            {errorMessage}
            <button onclick={removeCurrentAndGoBack} class="mt-4 bg-red-900 hover:bg-red-700 rounded-2xl px-4 py-2 font-bold text-white">Go Back</button>
        </div>
    {/if}
    </main>

    <style>
        video::-webkit-media-controls-enclosure {
            display: none !important;
        }
    </style>
