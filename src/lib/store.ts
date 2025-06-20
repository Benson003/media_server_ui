import { readable, readonly, writable } from "svelte/store";


const route = readable(import.meta.env.VITE_API_HOST)
export const API_ROUTE = readonly(route)

interface MediaItem{
    id: string;
    name: string;
    path: string;
    ext: string;
}




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
