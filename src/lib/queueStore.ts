// src/stores/queueStore.ts
import { writable } from 'svelte/store';
import { QueueNode,QueueList } from './queue'; // Adjust path as needed
import { type MediaItem } from "./media_item";
// 1. Create an instance of your QueueList
const mediaQueue = new QueueList();

// 2. Create a custom Svelte writable store
// The store's value will be the *current state* of the queue (e.g., an array of MediaItems)
// We'll use a custom store to expose methods for manipulating the queue.
function createMediaQueueStore() {
    // Initialize a writable store with the initial array representation of the queue
    const { subscribe, set, update } = writable<MediaItem[]>(mediaQueue.toArray());

    // Helper function to update the Svelte store whenever the underlying QueueList changes
    const updateStore = () => {
        set(mediaQueue.toArray());
    };

    return {
        subscribe, // The standard Svelte store subscribe method

        /**
         * Enqueues a new MediaItem to the end of the queue.
         * @param item The MediaItem to add.
         */
        enqueue: (item: MediaItem) => {
            mediaQueue.enqueue(item);
            updateStore(); // Update the Svelte store
        },

        /**
         * Dequeues an item from the front of the queue.
         * @returns The dequeued MediaItem, or null if the queue was empty.
         */
        dequeue: () => {
            const dequeuedItem = mediaQueue.dequeue();
            updateStore(); // Update the Svelte store
            return dequeuedItem;
        },

        /**
         * Removes a specific MediaItem from the queue.
         * Note: This method needs to find the corresponding QueueNode.
         * You might need a way to pass the actual QueueNode or iterate to find it.
         * For simplicity here, let's assume we can remove by ID, which would require
         * an O(N) traversal in QueueList.
         * For truly O(1) removal, you'd need to store references to QueueNodes, e.g., in a Map.
         */
        removeById: (id: string) => {
            let current = mediaQueue.head;
            let nodeToRemove: QueueNode | null = null;
            while(current !== null) {
                if (current.value.id === id) {
                    nodeToRemove = current;
                    break;
                }
                current = current.next!;
            }
            if (nodeToRemove) {
                mediaQueue.removeNode(nodeToRemove); // Use your removeNode from QueueList
                updateStore();
            }
        },

        /**
         * Peeks at the item at the front of the queue without removing it.
         * @returns The MediaItem at the front, or null if empty.
         */
        peek: () => {
            return mediaQueue.peek();
        },

        /**
         * Checks if the queue is currently empty.
         */
        isEmpty: () => {
            return mediaQueue.isEmpty();
        },

        /**
         * Gets the current size of the queue.
         */
        getSize: () => {
            return mediaQueue.getSize();
        },

        /**
         * Resets the queue to an empty state.
         */
        reset: () => {
            mediaQueue.head = null;
            mediaQueue.tail = null;
            mediaQueue.size = 0;
            updateStore();
        }
    };
}

// Export the custom store instance
export const queue = createMediaQueueStore();
