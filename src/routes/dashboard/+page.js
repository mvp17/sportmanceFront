import { dev } from '$app/environment';
import { eventsFile, eventsKeywords, jwt } from '../../stores/sessionStore';
import { get } from 'svelte/store';
import { redirect } from '@sveltejs/kit';
import { toast } from 'svelte-sonner';

// we don't need any JS on this page, though we'll load
// it in dev so that we get hot module replacement
export const csr = dev;

// since there's no dynamic data here, we can prerender
// it so that it gets served as a static asset in production
export const prerender = true;
export function load() {
    if (get(jwt) === '') throw redirect(307, '/signin');

    if (get(eventsFile) === 0) {
        toast.error('There is no events file registered. Upload events file', 
                    { style: 'background: Red; border-color: Red;' }
                   );
        throw redirect(307, '/uploadCSVFile');
    } else if (get(eventsKeywords) === 0) {
        toast.error('There are no events key words registered.', 
                    { style: 'background: Red; border-color: Red;' }
                   );
        throw redirect(307, '/eventsKeyWords');
    }
}
