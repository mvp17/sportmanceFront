import { writable } from 'svelte/store';

export const jwt = writable('');
export const settings = writable(0);
export const devicesKeywords = writable(0);
export const eventsKeywords = writable(0);
export const dataInput = writable(0);
export const eventsFile = writable(0);
