<script lang="ts">
    import { onMount } from "svelte";
    import { pop } from "svelte-spa-router";
    export let params: { id: string };
    let name: string;
    let path: string;
    let ext: string;
    let errorMessage: unknown;
    onMount(async () => {
        try {
            let req = await fetch(`http://localhost:8000/media/${params.id}`);
            let res = await req.json();
            name = res.name;
            path = res.path;
            ext = res.ext;
        } catch (err) {
            console.log(err);
            errorMessage = err;
        }
    });

    const goBack = () => {
        pop();
    }

</script>

<main
    class="flex justify-center items-center min-h-screen bg-white dark:bg-gray-900 text-white"
>
    {#if !errorMessage}
    <div class="grid grid-cols-1">
        <div
        class="w-full max-w-5xl aspect-video rounded-3xl overflow-hidden shadow-lg p-2"
    >
        <video
            src={`http://localhost:8000/media/${params.id}/stream`}
            controls
            autoplay
            class="w-full h-full object-contain rounded-2xl"
        ></video>
    </div>
    <div class="font-bold text-white">
        <h1 class="text-5xl">
            {name}
        </h1>
        <br />
        <h5>
            Path: {path}
        </h5><br>
        <h5>
            Ext: {ext}
        </h5>
    </div>

    <button onclick={goBack} class="lg:hover:bg-red-600 bg-red-900 rounded-2xl p-4 lg:hover:text-gray-200 font-bold text-white">
        Go Back
    </button>

    </div>
    {:else}
        <div
            class="w-full max-w-5xl text-3xl font-extrabold bg-red-700 text-white rounded-3xl overflow-hidden shadow-lg p-2"
        >
            {errorMessage}
            <button onclick={goBack} class="lg:hover:bg-red-600 bg-red-900 rounded-2xl p-4 lg:hover:text-gray-200 font-bold text-white">
                Go Back
            </button>
        </div>
    {/if}
</main>
