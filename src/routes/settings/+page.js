import { dev } from '$app/environment';
import { redirect } from '@sveltejs/kit';
import { jwt } from '../../stores/sessionStore';
import { get } from 'svelte/store';

// we don't need any JS on this page, though we'll load
// it in dev so that we get hot module replacement
export const csr = dev;

// since there's no dynamic data here, we can prerender
// it so that it gets served as a static asset in production
export const prerender = true;

export function load() {
    if (get(jwt) === '') {
        throw redirect(307, '/signin');
    }
}
