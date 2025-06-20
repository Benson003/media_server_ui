<script lang="ts">
    import Router from "svelte-spa-router";
    import Home from "./routes/Home.svelte";
    import Watch from "./routes/Watch.svelte";
    import NotFound from "./routes/NotFound.svelte";
    import QueueFab from "./components/QueueFAB.svelte";



    let routes = {
        "/":Home,
        "/watch/:id": Watch,
        "*": NotFound
    }
</script>
<main>
    <Router {routes}/>
</main>
