<script lang="ts">
    let { error } = $props();
</script>

{#if error}
    <div
        class="fixed bottom-4 right-4 z-50 bg-red-600 text-white p-4 rounded-lg shadow-lg max-w-sm animate-bounce-in"
    >
        <strong class="block mb-1">🚨 Error</strong>
        <p class="text-sm">{error}</p>
    </div>
{/if}

<style>
    @keyframes bounce-in {
        0% {
            transform: translateY(100%);
            opacity: 0;
        }
        60% {
            transform: translateY(-10%);
            opacity: 1;
        }
        100% {
            transform: translateY(0);
        }
    }

    .animate-bounce-in {
        animation: bounce-in 0.3s ease-out;
    }
</style>
