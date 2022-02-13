import { Writable, writable } from "svelte/store";

export interface MenuItem {
	img: { src: string; alt: string };
	desc: string;
	price: number;
}

export const basket: Writable<Record<string, number>> = writable({});
