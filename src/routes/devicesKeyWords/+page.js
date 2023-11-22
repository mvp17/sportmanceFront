import { dev } from '$app/environment';
import { redirect } from '@sveltejs/kit';
import { dataInput, eventsFile, jwt } from '../../stores/sessionStore';
import { get } from 'svelte/store';
import { toast } from 'svelte-sonner';

// we don't need any JS on this page, though we'll load
// it in dev so that we get hot module replacement
export const csr = dev;

// since there's no dynamic data here, we can prerender
// it so that it gets served as a static asset in production
export const prerender = true;

export function load() {
    if (get(jwt) === '') throw redirect(307, '/signin');

    if (get(dataInput) === '') {
        toast.error('There is no data to analyse. Please upload some csv files ', 
                    { style: 'background: Red; border-color: Red;' }
                   );
        throw redirect(307, '/uploadCSVFile');
    } else if (get(eventsFile) !== '' && get(dataInput) === '') {
        toast.error('There are not devices files uploaded.', 
                    { style: 'background: Red; border-color: Red;' }
                   );
        throw redirect(307, '/uploadCSVFile');
    }

}
