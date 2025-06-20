import { type MediaItem } from "./media_item";
export class QueueNode {
    // Renamed 'node' to 'value' for clarity
    public value: MediaItem;
    public prev: QueueNode | null;
    public next: QueueNode | null;

    constructor(media: MediaItem) {
        this.value = media;
        this.prev = null;
        this.next = null;
    }
    // Removed setValueNext/setValuePrevious as direct property access is common
}

export class QueueList {
    public head: QueueNode | null;
    public tail: QueueNode | null; // Added tail pointer
    public size: number;          // Added size property

    constructor() {
        this.head = null;
        this.tail = null;
        this.size = 0;
    }

    /**
     * Adds an item to the end of the queue (enqueue operation).
     * O(1) time complexity.
     */
    public enqueue(data: MediaItem): void {
        const newNode = new QueueNode(data);
        if (this.head === null) {
            // If the queue is empty, new node is both head and tail
            this.head = newNode;
            this.tail = newNode;
        } else {
            // Append to the current tail
            this.tail!.next = newNode; // Use ! because tail is guaranteed not null here
            newNode.prev = this.tail;
            this.tail = newNode; // Update tail to the new node
        }
        this.size++;
    }

    /**
     * Removes and returns the item from the front of the queue (dequeue operation).
     * O(1) time complexity.
     * @returns The dequeued MediaItem, or null if the queue is empty.
     */
    public dequeue(): MediaItem | null {
        if (this.head === null) {
            return null; // Queue is empty
        }

        const removedValue = this.head.value; // Get the value before removal
        this.head = this.head.next; // Move head to the next node

        if (this.head) {
            this.head.prev = null; // The new head's previous pointer should be null
        } else {
            // If the queue became empty after dequeue, tail should also be null
            this.tail = null;
        }
        this.size--; // Decrement size

        return removedValue;
    }

    /**
     * Returns the item at the front of the queue without removing it (peek operation).
     * O(1) time complexity.
     * @returns The MediaItem at the front, or null if the queue is empty.
     */
    public peek(): MediaItem | null {
        return this.head ? this.head.value : null;
    }

    /**
     * Checks if the queue is empty.
     * O(1) time complexity.
     */
    public isEmpty(): boolean {
        return this.head === null;
    }

    /**
     * Returns the current number of items in the queue.
     * O(1) time complexity.
     */
    public getSize(): number {
        return this.size;
    }

    /**
     * Removes a specific node from the queue. This is useful for arbitrary removal,
     * but not a standard queue operation.
     * O(1) time complexity if you have the node reference.
     */
    public removeNode(nodeToRemove: QueueNode): void {
        if (!nodeToRemove) {
            return; // Nothing to remove
        }

        // Check if the node to remove is actually in this list (optional, but good for robustness)
        // This check would make it O(n) unless you store node references in a map
        // For simplicity, we'll assume the node belongs to this list.

        // Handle removing the head
        if (nodeToRemove === this.head) {
            this.head = nodeToRemove.next;
            if (this.head) {
                this.head.prev = null;
            } else {
                this.tail = null; // List becomes empty
            }
        }
        // Handle removing the tail
        else if (nodeToRemove === this.tail) {
            this.tail = nodeToRemove.prev;
            if (this.tail) {
                this.tail.next = null;
            } else {
                this.head = null; // List becomes empty
            }
        }
        // Handle removing a node in the middle
        else {
            const prev = nodeToRemove.prev;
            const next = nodeToRemove.next;
            if (prev) {
                prev.next = next;
            }
            if (next) {
                next.prev = prev;
            }
        }
        this.size--;
    }


    /**
     * Returns an array of all items in the queue, from head to tail.
     * O(n) time complexity.
     */
    public toArray(): MediaItem[] { // Renamed from display for clarity
        const list: MediaItem[] = [];
        let current = this.head;
        while (current !== null) {
            list.push(current.value);
            current = current.next;
        }
        return list;
    }
}
