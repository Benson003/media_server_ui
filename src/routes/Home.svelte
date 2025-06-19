
<script lang="ts">

    import Header from "../lib/Header.svelte";
    import Pagination from "../lib/Pagination.svelte";
    import VideoCard from "../lib/VideoCard.svelte";
    import { current_page } from "../lib/store";
    interface MediaItem{
        id: string;
        name: string;
        path: string;
        ext: string;
    }

    let items: MediaItem[] = $derived([]);

    let page:number = $state(1)
    let count:number = 8;
    let number_of_pages: number = $state(1);
    current_page.subscribe(val=> page = val);


    $effect(()=>{
        fetchData();
    })
    async function fetchData() {
        try{
        let req = await fetch(`http://localhost:8000/media/paginated?page=${page}&count=${count}`)
        let res = await req.json()
        number_of_pages = res.pages
        let objects = res.items.map((item:MediaItem):MediaItem=>({
            id: item.id,
            name: item.name,
            path: item.path,
            ext: item.ext,
        }));

        items = [...objects];
        }catch(error){
            console.log(error);
        }

    }


</script>
<div class="bg-white dark:bg-gray-900">
    <Header/>
    <Pagination number_of_pages={number_of_pages}/>
<main class="grid grid-cols-1 gap-4 lg:grid-cols-4 lg:gap-8 bg-white dark:bg-gray-900 mb-3 p-4">

{#each items as item}
<VideoCard MediaItem={item}/>
{/each}

</main>
</div>
