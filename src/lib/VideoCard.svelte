
<script lang="ts">
    import { push } from "svelte-spa-router";
    interface MediaItem{
        id: string;
        name: string;
        path: string;
        ext: string;
    }
  let { MediaItem } = $props();
  const navigateToWatch = () => {
    push(`/watch/${MediaItem.id}`);
  }
</script>

<article
  class="overflow-hidden rounded-lg shadow-sm transition hover:shadow-lg dark:shadow-gray-700/25"
>
  <img
    alt="Can't fecth the thubnail for:{MediaItem.name}"
    src="http://localhost:8000/media/{MediaItem.id}/thumbnail"
    class="h-56 w-full object-cover"
  />

  <div class="bg-white p-4 sm:p-6 dark:bg-gray-900">
      <h3 class="mt-0.5 text-lg text-gray-900 dark:text-white">
        {MediaItem.name}
      </h3>


    <p class="mt-2 line-clamp-3 text-sm/relaxed text-gray-500 dark:text-gray-400">
        Path: {MediaItem.path} <br>
        Extension: {MediaItem.ext}
    </p>
    <button onclick={navigateToWatch} class="lg:hover:bg-green-600 lg:bg-green-900 bg-green-600 rounded-2xl p-4 lg:hover:text-gray-200 font-bold text-white">
        Watch Now
    </button>
  </div>
</article>
