
<script lang="ts">
    import ErrorWindow from "../components/ErrorWindow.svelte";


    import Header from "../components/Header.svelte";
    import Pagination from "../components/Pagination.svelte";
    import VideoCard from "../components/VideoCard.svelte";
    import { current_page,API_ROUTE } from "../lib/store";
    import { type MediaItem } from "../lib/media_item";
    import QueueFab from "../components/QueueFAB.svelte";

    let items: MediaItem[] = $derived([]);

    let page:number = $state(1)
    const  count:number = 8;
    let number_of_pages: number = $state(1);
    current_page.subscribe(val=> page = val);
    let error = $state();

    $effect(()=>{
        fetchData();
    })
    async function fetchData() {
        try{
        let req = await fetch(`${$API_ROUTE}/media/paginated?page=${page}&count=${count}`)
        let res = await req.json()
        number_of_pages = res.pages
        let objects = res.items.map((item:MediaItem):MediaItem=>({
            id: item.id,
            name: item.name,
            path: item.path,
            ext: item.ext,
        }));

        items = [...objects];
        }catch(err){
            console.log(err);
            error = err;
        }

    }


</script>
<div class="bg-white dark:bg-gray-900">
    <Header/>
    <Pagination number_of_pages={number_of_pages}/>
<main class="grid grid-cols-1 gap-4 lg:grid-cols-4 lg:gap-8 bg-white dark:bg-gray-900 mb-3 p-4">
{#each items as item}
<VideoCard mediaItem={item}/>
{/each}
</main>
<QueueFab/>
<ErrorWindow error={error}/>
</div>
