import { writable } from "svelte/store";

const createStore  = () => {
    const { set ,update, subscribe} = writable<number>(1);

    return {
        subscribe,
        set,
        add: () => update( val => val+=1),
        subtract: () => update( val => val-=1),

    }
}

export const current_page = createStore();
