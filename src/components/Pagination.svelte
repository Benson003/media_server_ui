
<script lang="ts">
    import { onDestroy, onMount } from "svelte";
    import { current_page } from "../lib/store";

  let { number_of_pages } = $props();
  let page:number = $state(1);
  current_page.subscribe(val => page = val);

  onMount(()=>window.addEventListener('keydown',keyboardListner));
  onDestroy(()=>window.addEventListener('keydown',keyboardListner));

  const keyboardListner = (e: KeyboardEvent)=>{
    e.stopPropagation()
    switch (e.key) {
        case 'q':
            document.getElementById("page_prev")?.click()
            break;
        case 'e':
            document.getElementById("page_next")?.click()
            break;
        default:
            break;
    }
  }
  </script>
<ul class="flex justify-center gap-3 text-gray-900 dark:text-white w-svw fixed top-1 z-20">
    <li>
        <button
        id="page_prev"
        onclick= {current_page.subtract}
        disabled={page <= 1}
        class="grid size-12 place-content-center rounded border transition-colors rtl:rotate-180"
        class:border-gray-200={page > 1}
        class:dark:border-gray-700={page > 1}
        class:hover:bg-gray-50={page > 1}
        class:dark:hover:bg-gray-800={page > 1}
        class:bg-gray-200={page <= 1}
        class:text-gray-400={page <= 1}
        aria-label="Previous page"
    >
        <svg
            xmlns="http://www.w3.org/2000/svg"
            class="size-4"
            viewBox="0 0 20 20"
            fill="currentColor"
        >
            <path
                fill-rule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clip-rule="evenodd"
            />
        </svg>
    </button>
    </li>

    <li class="text-sm/8 font-medium tracking-widest"> <input
        type="number"
        id="Page"
        value={page}
        onchangecapture={(e)=>current_page.set(e.currentTarget.valueAsNumber)}
        class="h-8 w-10 rounded border-gray-300 sm:text-sm dark:border-gray-600 dark:bg-gray-900 dark:text-white"
      />/{ number_of_pages }</li>

    <li>

        <button
        id="page_next"
        disabled={page >= number_of_pages}
        onclick={current_page.add}
        class="grid size-12 place-content-center rounded border transition-colors rtl:rotate-180 aria-label-next-page"
        class:border-gray-200={page >= number_of_pages}
        class:dark:border-gray-700={page >= number_of_pages}
        class:hover:bg-gray-50={page >= number_of_pages}
        class:dark:hover:bg-gray-800={page >= number_of_pages}
        class:bg-gray-200={page >= number_of_pages}
        class:text-gray-400={page >= number_of_pages}
        aria-label="Next page"
    >
        <svg
            xmlns="http://www.w3.org/2000/svg"
            class="size-4"
            viewBox="0 0 20 20"
            fill="currentColor"
        >
            <path
                fill-rule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clip-rule="evenodd"
            />
        </svg>
    </button>
    </li>
  </ul>
